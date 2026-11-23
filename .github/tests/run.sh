#!/usr/bin/env bash
# Regression tests for GitHub-only sync/publish helpers.
# These fail if tag-only checkout, latest preservation, or .github/ restore is removed.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck disable=SC1091
source "${ROOT}/.github/scripts/mirror-lib.sh"

FAILS=0
ok() { echo "ok - $*"; }
fail() {
  echo "not ok - $*" >&2
  FAILS=$((FAILS + 1))
}

init_git() {
  git init -q -b main
  git config user.name test
  git config user.email test@example.com
  git config commit.gpgsign false
}

# --- require_tag_ref ---
test_require_tag_ref_rejects_numeric_branch() {
  local dir
  dir="$(mktemp -d)"
  (
    cd "${dir}"
    init_git
    echo branch > file
    git add file
    git commit -q -m init
    git branch 1.9.0
    if require_tag_ref 1.9.0 >/dev/null 2>&1; then
      fail "require_tag_ref accepted branch 1.9.0 without a tag"
    else
      ok "require_tag_ref rejects numeric branch without a tag"
    fi
  )
  rm -rf "${dir}"
}

test_require_tag_ref_accepts_version_tag() {
  local dir
  dir="$(mktemp -d)"
  (
    cd "${dir}"
    init_git
    echo tagged > file
    git add file
    git commit -q -m init
    git tag 1.9.0
    got="$(require_tag_ref 1.9.0)"
    if [ "${got}" = "refs/tags/1.9.0" ]; then
      ok "require_tag_ref accepts a genuine version tag"
    else
      fail "require_tag_ref expected refs/tags/1.9.0, got ${got}"
    fi
  )
  rm -rf "${dir}"
}

# --- npm_publish_dist_tag (1.8.0 present, 1.1.0 missing) ---
test_backfill_does_not_move_latest() {
  got="$(npm_publish_dist_tag 1.1.0 1.8.0)"
  if [ "${got}" = "1.1.0" ]; then
    ok "backfill of 1.1.0 while latest=1.8.0 uses --tag 1.1.0 (latest stays 1.8.0)"
  else
    fail "backfill dist-tag: expected 1.1.0, got ${got}"
  fi
}

test_first_or_newer_uses_latest() {
  got="$(npm_publish_dist_tag 1.1.0 "")"
  if [ "${got}" = "latest" ]; then
    ok "first publish uses latest"
  else
    fail "first publish dist-tag: expected latest, got ${got}"
  fi
  got="$(npm_publish_dist_tag 1.9.0 1.8.0)"
  if [ "${got}" = "latest" ]; then
    ok "newer than latest uses latest"
  else
    fail "newer dist-tag: expected latest, got ${got}"
  fi
}

# --- merge_preserving_dot_github ---
# Two unrelated repos: github (ours, has .github) and gitlab (theirs).
setup_pair() {
  local github_dir="$1"
  local gitlab_dir="$2"
  mkdir -p "${github_dir}/.github/workflows" "${gitlab_dir}"
  (
    cd "${github_dir}"
    init_git
    echo 'github-workflow' > .github/workflows/ci.yml
    echo 'github-mirror' > .github/MIRROR.md
    echo 'github-readme' > README.md
    git add .
    git commit -q -m 'github initial'
  )
  (
    cd "${gitlab_dir}"
    init_git
    echo 'gitlab-readme' > README.md
    git add .
    git commit -q -m 'gitlab initial'
  )
}

test_merge_keeps_ours_on_conflicting_github() {
  local github_dir gitlab_dir
  github_dir="$(mktemp -d)"
  gitlab_dir="$(mktemp -d)"
  setup_pair "${github_dir}" "${gitlab_dir}"
  (
    cd "${gitlab_dir}"
    mkdir -p .github
    echo 'gitlab-mirror' > .github/MIRROR.md
    echo 'gitlab-readme-2' > README.md
    git add .
    git commit -q -m 'gitlab adds conflicting .github/MIRROR.md'
  )
  (
    cd "${github_dir}"
    git remote add gitlab "${gitlab_dir}"
    git fetch -q gitlab
    merge_preserving_dot_github refs/remotes/gitlab/main
    if grep -q github-mirror .github/MIRROR.md && grep -q gitlab-readme-2 README.md; then
      ok "conflicting GitLab .github/ is discarded; GitLab README is kept"
    else
      fail "conflict merge: MIRROR.md=$(cat .github/MIRROR.md) README=$(cat README.md)"
    fi
  )
  rm -rf "${github_dir}" "${gitlab_dir}"
}

test_merge_keeps_ours_on_clean_github_add() {
  local github_dir gitlab_dir
  github_dir="$(mktemp -d)"
  gitlab_dir="$(mktemp -d)"
  setup_pair "${github_dir}" "${gitlab_dir}"
  (
    cd "${gitlab_dir}"
    mkdir -p .github/workflows
    echo 'gitlab-workflow' > .github/workflows/gitlab.yml
    echo 'gitlab-readme-2' > README.md
    git add .
    git commit -q -m 'gitlab adds clean .github/workflows/gitlab.yml'
  )
  (
    cd "${github_dir}"
    git remote add gitlab "${gitlab_dir}"
    git fetch -q gitlab
    merge_preserving_dot_github refs/remotes/gitlab/main
    if [ -f .github/workflows/ci.yml ] && [ ! -f .github/workflows/gitlab.yml ] && grep -q gitlab-readme-2 README.md; then
      ok "clean GitLab .github/ add is discarded; GitLab README is kept"
    else
      fail "clean .github add: files=$(find .github -type f | sort) README=$(cat README.md)"
    fi
  )
  rm -rf "${github_dir}" "${gitlab_dir}"
}

test_require_tag_ref_rejects_numeric_branch
test_require_tag_ref_accepts_version_tag
test_backfill_does_not_move_latest
test_first_or_newer_uses_latest
test_merge_keeps_ours_on_conflicting_github
test_merge_keeps_ours_on_clean_github_add

if [ "${FAILS}" -ne 0 ]; then
  echo "${FAILS} test(s) failed" >&2
  exit 1
fi
echo "All helper tests passed."
