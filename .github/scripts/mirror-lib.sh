# shellcheck shell=bash
# Shared helpers for GitHub-only sync/publish workflows.
# Sourced by workflows and by .github/tests/run.sh.

# Print refs/tags/<name> if that tag exists. A branch of the same name is not enough.
require_tag_ref() {
  local name="$1"
  if [ -z "${name}" ]; then
    echo '::error::Tag name is empty.' >&2
    return 1
  fi
  if ! git show-ref --verify --quiet "refs/tags/${name}"; then
    echo "::error::No git tag refs/tags/${name} (a branch of that name is not enough)." >&2
    return 1
  fi
  printf '%s\n' "refs/tags/${name}"
}

# Dist-tag to pass to npm publish for <version> given the registry's current latest.
# Prints "latest" when this version should own latest; otherwise prints the version
# so the caller can `npm publish --tag <version>` without moving latest.
# Backfill case: latest=1.8.0, version=1.1.0 -> 1.1.0
npm_publish_dist_tag() {
  local version="$1"
  local current_latest="${2:-}"
  if [ -z "${version}" ]; then
    echo '::error::Version is empty.' >&2
    return 1
  fi
  if [ -z "${current_latest}" ]; then
    printf '%s\n' 'latest'
    return 0
  fi
  local highest
  highest="$(printf '%s\n%s\n' "${current_latest}" "${version}" | sort -V | tail -n1)"
  if [ "${highest}" = "${version}" ]; then
    printf '%s\n' 'latest'
    return 0
  fi
  printf '%s\n' "${version}"
}

peel_commit() {
  local peeled
  peeled="$(printf '%s\n' "$1" | awk '/\^\{\}$/ { print $1; exit }')"
  if [ -n "${peeled}" ]; then
    printf '%s\n' "${peeled}"
    return
  fi
  printf '%s\n' "$1" | awk '{ print $1; exit }'
}

json_string_array() {
  if [ "$#" -eq 0 ]; then
    printf '%s\n' '[]'
    return
  fi
  printf '%s\n' "$@" | jq -R . | jq -s -c .
}

# Restore the complete pre-merge .github/ tree from HEAD (first parent while merging).
preserve_dot_github_from_head() {
  git rm -r --ignore-unmatch -f -- .github >/dev/null 2>&1 || true
  if git cat-file -e 'HEAD:.github' 2>/dev/null; then
    git checkout HEAD -- .github
  fi
}

# Merge <upstream-ref> into HEAD without dropping GitHub-only .github/.
# GitLab-owned paths take GitLab's version on conflict. Never force-pushes.
merge_preserving_dot_github() {
  local upstream="$1"

  if git merge-base --is-ancestor "${upstream}" HEAD; then
    echo 'GitHub main already contains GitLab main; skipping merge.'
    return 0
  fi

  local extra=()
  if ! git merge-base HEAD "${upstream}" >/dev/null 2>&1; then
    echo 'Unrelated histories; merging with --allow-unrelated-histories.'
    extra+=(--allow-unrelated-histories)
  fi

  set +e
  git merge --no-commit --no-ff -X theirs "${extra[@]}" "${upstream}"
  local merge_status=$?
  set -e

  if [ "${merge_status}" -ne 0 ] && ! git rev-parse -q --verify MERGE_HEAD >/dev/null; then
    echo "::error::git merge ${upstream} failed before a merge state was created." >&2
    return 1
  fi

  if [ "${merge_status}" -ne 0 ]; then
    echo 'Merge conflicts: taking GitLab versions for GitLab-owned paths (keeping .github/).'
    while IFS= read -r file; do
      [ -z "${file}" ] && continue
      case "${file}" in
        .github | .github/*)
          git checkout --ours -- "${file}"
          ;;
        *)
          git checkout --theirs -- "${file}"
          ;;
      esac
      git add -- "${file}"
    done < <(git diff --name-only --diff-filter=U)
  fi

  if git diff --name-only --diff-filter=U | grep -q .; then
    echo '::error::Unresolved merge conflicts remain.' >&2
    git diff --name-only --diff-filter=U >&2
    return 1
  fi

  preserve_dot_github_from_head
  git commit --no-verify -m 'chore(mirror): merge GitLab main into GitHub main'
}
