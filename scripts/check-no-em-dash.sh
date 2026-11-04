#!/usr/bin/env bash
# Reject Unicode em dash (U+2014) and common HTML entities that decode to it.
# Prefer ASCII hyphen (-) or rephrase with commas / colons.
#
# Usage:
#   ./scripts/check-no-em-dash.sh file1 [file2 ...]
#   git diff --cached --name-only --diff-filter=ACMR | xargs ./scripts/check-no-em-dash.sh

set -euo pipefail

if [[ "$#" -eq 0 ]]; then
  exit 0
fi

# Construct forbidden forms without embedding U+2014 or &mdash; in this file.
EM="$(printf '\u2014')"
# Named entity: & + mdash + ;
NAMED_ENT="&$(printf 'mdash');"
# Hex form is only 2014 (not 201E low-double-quote). grep -Ei covers case.
ENTITY_RE="${NAMED_ENT}|&#0*8212;|&#x0*2014;"
BAD=0

report_header() {
  if [[ "$BAD" -eq 0 ]]; then
    echo "✗ Em dash (U+2014) is forbidden. Use ASCII hyphen (-) or rephrase." >&2
    echo "  Also forbidden: HTML entities that decode to U+2014 (named mdash, decimal 8212, hex 2014)." >&2
    echo "" >&2
  fi
  BAD=1
}

for f in "$@"; do
  [[ -f "$f" ]] || continue
  case "$f" in
    *.png|*.jpg|*.jpeg|*.webp|*.gif|*.ico|*.woff|*.woff2|*.pdf|*.lock) continue ;;
  esac

  if grep -Fq "$EM" "$f" 2>/dev/null; then
    report_header
    echo "  $f (literal U+2014):" >&2
    grep -Fn "$EM" "$f" >&2 || true
    echo "" >&2
  fi

  # This script builds ENTITY_RE; skip self so the pattern definition is not a hit.
  # Match by basename so absolute paths from tooling still skip correctly.
  case "$(basename "$f")" in
    check-no-em-dash.sh) continue ;;
  esac

  if grep -nEi "$ENTITY_RE" "$f" >/dev/null 2>&1; then
    report_header
    echo "  $f (HTML entity for U+2014):" >&2
    grep -nEi "$ENTITY_RE" "$f" >&2 || true
    echo "" >&2
  fi
done

if [[ "$BAD" -ne 0 ]]; then
  echo "See docs/RULES.md (typography) and docs/GIT.md." >&2
  exit 1
fi

exit 0
