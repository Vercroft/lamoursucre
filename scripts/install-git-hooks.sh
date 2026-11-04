#!/usr/bin/env bash
# Point this repo at versioned hooks in .githooks/ (local config only).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

chmod +x \
  scripts/check-commit-msg.sh \
  scripts/check-no-em-dash.sh \
  scripts/check-no-secrets.sh \
  scripts/install-git-hooks.sh \
  .githooks/pre-commit \
  .githooks/commit-msg \
  .githooks/prepare-commit-msg

git config core.hooksPath .githooks

echo "✓ core.hooksPath → .githooks"
echo "  Hooks: pre-commit, prepare-commit-msg, commit-msg"
echo "  Policy: docs/GIT.md"
