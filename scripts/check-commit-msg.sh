#!/usr/bin/env bash
# Reject AI / coding-tool attribution in commit messages.
# Used by .githooks/commit-msg
#
# Allowed human Co-authored-by only:
#   dinesh-ad  <56721895+dinesh-ad@users.noreply.github.com>
#   sowmipriya <13678035+sowmipriya@users.noreply.github.com>
#
# Everything else that looks like tool attribution is blocked.

set -euo pipefail

MSG_FILE="${1:-}"
if [[ -z "$MSG_FILE" || ! -f "$MSG_FILE" ]]; then
  echo "usage: check-commit-msg.sh <commit-message-file>" >&2
  exit 2
fi

ALLOW_DINESH='^[[:space:]]*Co-authored-by:[[:space:]]*dinesh-ad[[:space:]]+<56721895\+dinesh-ad@users\.noreply\.github\.com>[[:space:]]*$'
ALLOW_SOWMI='^[[:space:]]*Co-authored-by:[[:space:]]*sowmipriya[[:space:]]+<13678035\+sowmipriya@users\.noreply\.github\.com>[[:space:]]*$'

# Domains / tokens that must never appear in the commit message.
AI_EMAIL_RE='(noreply@anthropic\.com|@anthropic\.com|cursoragent@|@cursor\.(com|so|sh)|@openai\.com|copilot@|@devin\.ai|@windsurf\.(com|ai)|@codeium\.com|@tabnine\.com|@perplexity\.ai|chatgpt@|claude@)'

BAD=0
BAD_OUT=""

while IFS= read -r line || [[ -n "$line" ]]; do
  # Human allowlist - case-insensitive match on the two owners only
  if echo "$line" | grep -Eiq "$ALLOW_DINESH|$ALLOW_SOWMI"; then
    continue
  fi

  reason=""
  if echo "$line" | grep -Eiq '^[[:space:]]*Co-authored-by:'; then
    reason="Co-authored-by is only allowed for dinesh-ad or sowmipriya"
  elif echo "$line" | grep -Eiq "$AI_EMAIL_RE"; then
    reason="AI / tool email domain is forbidden"
  elif echo "$line" | grep -Eiq 'Generated[[:space:]]+with[[:space:]]+(Claude|Cursor|Copilot|ChatGPT|GPT|Codex|Gemini|Devin|Aider|Windsurf)'; then
    reason="Generated-with AI attribution is forbidden"
  elif echo "$line" | grep -Eiq 'Made[[:space:]]+with[[:space:]]+(Claude|Cursor|Copilot|ChatGPT)'; then
    reason="Made-with AI attribution is forbidden"
  elif echo "$line" | grep -Eq '🤖'; then
    reason="robot attribution emoji is forbidden"
  elif echo "$line" | grep -Fq "$(printf '\u2014')"; then
    reason="em dash (U+2014) is forbidden; use ASCII hyphen (-)"
  fi

  if [[ -n "$reason" ]]; then
    BAD=1
    BAD_OUT+="  • $line"$'\n'"    ($reason)"$'\n'
  fi
done < "$MSG_FILE"

if [[ "$BAD" -ne 0 ]]; then
  echo "✗ Commit blocked: forbidden content in the commit message." >&2
  echo "" >&2
  echo "Offending lines:" >&2
  echo -n "$BAD_OUT" >&2
  echo "" >&2
  echo "Allowed human co-authors only:" >&2
  echo "  Co-authored-by: dinesh-ad <56721895+dinesh-ad@users.noreply.github.com>" >&2
  echo "  Co-authored-by: sowmipriya <13678035+sowmipriya@users.noreply.github.com>" >&2
  echo "" >&2
  echo "Em dash (U+2014) is also forbidden; use ASCII hyphen (-)." >&2
  echo "See docs/GIT.md and docs/RULES.md" >&2
  exit 1
fi

exit 0
