#!/usr/bin/env bash
# Apply the branch and tag rulesets in .github/rulesets/ to the repository. Idempotent:
# a ruleset is updated in place when one with the same name exists, created otherwise.
# The JSON files are the source of truth — change protection by editing them and re-running.
#
#   bash scripts/ci/apply-rulesets.sh            # apply
#   bash scripts/ci/apply-rulesets.sh --remove   # delete them (break-glass only)
set -euo pipefail
REPO="${REPO:-Algorythmos-AI/ichr-website}"
dir="$(cd "$(dirname "$0")/../../.github/rulesets" && pwd)"

for file in "$dir"/*.json; do
  name=$(jq -r .name "$file")
  id=$(gh api "repos/$REPO/rulesets" --jq ".[] | select(.name == \"$name\") | .id")
  if [ "${1:-}" = "--remove" ]; then
    [ -n "$id" ] && gh api -X DELETE "repos/$REPO/rulesets/$id" >/dev/null && echo "removed $name"
    continue
  fi
  if [ -n "$id" ]; then
    gh api -X PUT "repos/$REPO/rulesets/$id" --input "$file" >/dev/null && echo "updated $name"
  else
    gh api -X POST "repos/$REPO/rulesets" --input "$file" >/dev/null && echo "created $name"
  fi
done
