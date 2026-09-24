#!/usr/bin/env bash
# Release preflight: run before opening a release pull request (integration → main).
# Read-only. Fails with a reason if the release is not ready.
#
#   bash scripts/release/preflight.sh
set -euo pipefail

REPO="${REPO:-Algorythmos-AI/ichr-website}"
fail() { echo "✗ $*" >&2; exit 1; }
ok() { echo "✓ $*"; }

git fetch -q origin main integration --tags

ahead=$(git rev-list --count origin/main..origin/integration)
[ "$ahead" -gt 0 ] || fail "integration has nothing new for main"
ok "integration is $ahead commit(s) ahead of main"

tip=$(git rev-parse origin/integration)
runs=$(gh api "repos/$REPO/commits/$tip/check-runs?per_page=100" \
  --jq '.check_runs[] | [.name, .status, (.conclusion // "")] | @tsv')
[ -n "$runs" ] || fail "no checks have run on integration's tip ${tip:0:7}"
if printf '%s\n' "$runs" | awk -F'\t' '$2 != "completed"' | grep -q .; then
  fail "checks are still running on integration's tip ${tip:0:7}"
fi
bad=$(printf '%s\n' "$runs" | awk -F'\t' '$3 != "success" && $3 != "neutral" && $3 != "skipped" {print $1 " (" $3 ")"}')
[ -z "$bad" ] || fail "checks failed on integration's tip ${tip:0:7}: $bad"
ok "every check passed on integration's tip ${tip:0:7}"

version=$(git show "origin/integration:package.json" | jq -r .version)
git show origin/integration:CHANGELOG.md | grep -q "^## \[$version\]" \
  || fail "CHANGELOG.md on integration has no '## [$version]' section"
ok "CHANGELOG.md has a section for $version"
if git rev-parse -q --verify "refs/tags/v$version" >/dev/null; then
  echo "! v$version is already tagged — fine for an infrastructure-only release; bump the version for user-visible changes"
else
  ok "v$version will be tagged after the deploy is verified"
fi

open=$(gh pr list --repo "$REPO" --base main --state open --json number --jq 'length')
[ "$open" = 0 ] || fail "a pull request into main is already open"
ok "no release pull request is open"

echo
echo "Ready. Commits going out:"
git log --oneline origin/main..origin/integration
