# Branching model

## New features:

1. Open new branch following patern: feat/[ISSUE-NUMBER]-[ISSUE-NAME]
2. Open PR with commit "Closes #[ISSUE-NUMBER]"

## New bugfixes:

1. Open new branch following patern: fix/[ISSUE-NUMBER]-[ISSUE-NAME]
2. Open PR with commit "Closes #[ISSUE-NUMBER]"

## New doc:

1. Open new branch following patern: doc/[ISSUE-NUMBER]-[ISSUE-NAME]
2. Open PR with commit "Closes #[ISSUE-NUMBER]"

# How to generate a new version

1. Make changes
2. Commit those changes
3. Pull all the tags
4. Run the `npm version [patch|minor|major]` command
5. Git commit CHANGELOG.md
6. Push

# How to revet an unpushed version

1. Delete the tag with `git tag -d [YOUR TAG]`
2. Delete the commit with `git reset --hard HEAD~1`
