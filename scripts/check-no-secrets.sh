#!/usr/bin/env bash
# Reject secrets and sensitive identifiers in paths passed as arguments.
# Defence in depth: runs locally in pre-commit so nothing reaches the remote.
#
# Blocks (non-exhaustive):
#   - Secret-like filenames (.env, *.pem, private keys, credentials JSON)
#   - PEM / OpenSSH private key material
#   - Common API tokens / cloud keys
#   - password / api_key / secret / token assignments with real values
#   - Credential-bearing URLs (user:pass@host)
#   - Private / link-local / loopback IPs (RFC1918 etc.)
#   - Internal hostnames (*.internal, *.corp, *.lan, *.intranet)
#
# Allowed on purpose:
#   - Public marketing origin (site.url) and public docs URLs
#   - Words like "token" / "secret" in docs when not assigning a value
#
# Usage:
#   ./scripts/check-no-secrets.sh file1 [file2 ...]
#   git diff --cached --name-only --diff-filter=ACMR | xargs ./scripts/check-no-secrets.sh

set -euo pipefail

if [[ "$#" -eq 0 ]]; then
  exit 0
fi

BAD=0

# --- filename denylist ---
is_secret_filename() {
  local f="$1" base
  base="$(basename "$f")"
  case "$base" in
    .env|.env.*|.env.local|.env.production|.env.development)
      return 0
      ;;
    *.pem|*.p12|*.pfx|*.key|*.crt|*.cer)
      # Allow Next.js public icon / cert docs if ever named oddly; block crypto material names.
      case "$base" in
        icon.svg|*.md) return 1 ;;
      esac
      return 0
      ;;
    id_rsa|id_dsa|id_ecdsa|id_ed25519|*.ppk)
      return 0
      ;;
    credentials.json|service-account*.json|*credentials*.json|*secret*.json)
      return 0
      ;;
    *.keystore|*.jks|*.kdbx)
      return 0
      ;;
  esac
  case "$f" in
    *.pem|*.p12|*.pfx|*/id_rsa|*/id_ed25519|*/.ssh/*)
      return 0
      ;;
  esac
  return 1
}

# Skip obvious binaries / lockfiles (content scan).
is_binary_skip() {
  local f="$1"
  case "$f" in
    *.png|*.jpg|*.jpeg|*.webp|*.gif|*.ico|*.woff|*.woff2|*.pdf|*.lock|*.mp4|*.zip|*.gz|*.tgz|*.wasm|*.svg)
      return 0
      ;;
  esac
  return 1
}

report() {
  local f="$1" kind="$2" detail="$3"
  if [[ "$BAD" -eq 0 ]]; then
    echo "✗ Secret / sensitive material check failed." >&2
    echo "  Do not commit tokens, keys, passwords, private IPs, or infra hostnames." >&2
    echo "  Keep them local (.env, out of git). See docs/SECURITY.md." >&2
    echo "" >&2
  fi
  BAD=1
  echo "  $f ($kind)" >&2
  if [[ -n "$detail" ]]; then
    echo "    $detail" >&2
  fi
  echo "" >&2
}

# Content patterns (extended regex). Keep assignments value-ish to cut false positives.
# shellcheck disable=SC2016
scan_content() {
  local f="$1"
  local hits=""

  # Private key PEM blocks
  if hits="$(grep -nE '-----BEGIN ([A-Z0-9 -]+)?PRIVATE KEY-----' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    report "$f" "private-key-pem" "$(echo "$hits" | head -3 | tr '\n' ' ')"
  fi

  # OpenSSH / PGP private
  if hits="$(grep -nE '-----BEGIN OPENSSH PRIVATE KEY-----|-----BEGIN PGP PRIVATE KEY BLOCK-----' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    report "$f" "private-key-block" "$(echo "$hits" | head -3 | tr '\n' ' ')"
  fi

  # AWS access key id
  if hits="$(grep -nE '\bAKIA[0-9A-Z]{16}\b' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    report "$f" "aws-access-key" "$(echo "$hits" | head -3 | tr '\n' ' ')"
  fi

  # GitHub / GitLab PATs
  if hits="$(grep -nE '\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{20,}\b|\bgithub_pat_[A-Za-z0-9_]{20,}\b|\bglpat-[A-Za-z0-9_-]{20,}\b' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    report "$f" "forge-token" "$(echo "$hits" | head -3 | tr '\n' ' ')"
  fi

  # Slack / Stripe / other common API key prefixes
  if hits="$(grep -nE '\bxox[baprs]-[0-9A-Za-z-]{10,}\b|\bsk_live_[0-9A-Za-z]{16,}\b|\bsk_test_[0-9A-Za-z]{16,}\b|\bsk-proj-[A-Za-z0-9_-]{20,}\b|\bsk-[A-Za-z0-9]{32,}\b' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    report "$f" "vendor-token" "$(echo "$hits" | head -3 | tr '\n' ' ')"
  fi

  # Google API key prefix
  if hits="$(grep -nE '\bAIza[0-9A-Za-z_-]{35}\b' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    report "$f" "google-api-key" "$(echo "$hits" | head -3 | tr '\n' ' ')"
  fi

  # JWT-looking (three base64url segments) - only when assigned
  if hits="$(grep -nEi '(token|jwt|authorization|bearer)[[:space:]]*[=:][[:space:]]*["'\'']?eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    report "$f" "jwt-assignment" "$(echo "$hits" | head -3 | tr '\n' ' ')"
  fi

  # password / api_key / secret / token / private_key assignments with a non-placeholder value
  # Placeholders like CHANGE_ME, your-*, <...>, ${...}, process.env are allowed.
  if hits="$(grep -nEi '(api[_-]?key|api[_-]?secret|access[_-]?token|auth[_-]?token|client[_-]?secret|app[_-]?secret|private[_-]?key|secret[_-]?key|password|passwd|pwd)[[:space:]]*[=:][[:space:]]*["'\''][^"'\'']{8,}["'\'']' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    # Filter obvious placeholders
    local filtered=""
    while IFS= read -r line; do
      if echo "$line" | grep -qiE 'CHANGE_ME|REPLACE_ME|YOUR_|<.*>|\$\{|process\.env|example\.com|xxxx|TODO|placeholder|null|undefined'; then
        continue
      fi
      filtered+="$line"$'\n'
    done <<< "$hits"
    if [[ -n "${filtered// }" ]]; then
      report "$f" "credential-assignment" "$(echo "$filtered" | head -3 | tr '\n' ' ')"
    fi
  fi

  # user:password@host (any scheme)
  if hits="$(grep -nE '://[^/[:space:]"'\'']+:[^/[:space:]"'\'']+@' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    report "$f" "credential-url" "$(echo "$hits" | head -3 | tr '\n' ' ')"
  fi

  # Private / link-local / loopback IPv4 (never commit infra addresses)
  if hits="$(grep -nE '\b(10\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|192\.168\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|172\.(1[6-9]|2[0-9]|3[01])\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|127\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|169\.254\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\b' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    report "$f" "private-or-loopback-ip" "$(echo "$hits" | head -3 | tr '\n' ' ')"
  fi

  # Internal-looking hostnames (not public brand domains)
  if hits="$(grep -nEi '\b[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.(internal|corp|lan|intranet)\b' "$f" 2>/dev/null || true)" \
    && [[ -n "$hits" ]]; then
    report "$f" "internal-hostname" "$(echo "$hits" | head -3 | tr '\n' ' ')"
  fi
}

for f in "$@"; do
  [[ -f "$f" ]] || continue

  if is_secret_filename "$f"; then
    report "$f" "forbidden-filename" "Remove from the index; keep secrets out of git."
    continue
  fi

  if is_binary_skip "$f"; then
    continue
  fi

  # Skip empty
  [[ -s "$f" ]] || continue

  scan_content "$f"
done

if [[ "$BAD" -ne 0 ]]; then
  echo "Fix: move secrets to .env (gitignored), rotate any value that was ever staged," >&2
  echo "and re-stage clean files. Do not use --no-verify." >&2
  exit 1
fi

exit 0
