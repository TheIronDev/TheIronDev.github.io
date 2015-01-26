---
title: "Git Notes"
layout: "default"
isPage: true
wrapperClass: "notes"
---

## Userful Git commands

### Commiting

Command |  Descripion
---|---
git diff --cached  | Diff staged changes
git commit -a -m "Comments" | Skips the staging area
git reset HEAD [file] | Unstages a file
git checkout -- [file] | Reverts the changes to a file (be careful)
git cherry-pick [SHA-1] | Cherry pick a specific commit into the current branch
git commit --amend | Amends the previous commit (Rewrites history).

### Pushing

Command | Description
--- | ---
git push origin :[branchName] | Deletes a remote branch.<br/> The full syntax is: git push [remoteName] [localBranch]:[remoteBranch]
git push origin +[branchName] | Force pushes changes.<br/>This rewrites history, and can be problematic.

### Config

Command | Description
--- | ---
git config --global alias.co checkout | Creates an alias for checking out (git co ...)
git config --global alias.last 'log -1 HEAD' | Alias to see the last commit
git config --global commit.template [newGitMessageFile] | Changes the default template of "git commit"

### Branching

Command | Description
--- | ---
git remote add repoName git://[repo].git| Add a remote repository
git tag -a v1.5 'tag annotation' | Add a tag annotation
git checkout -b [branchName] | Creates a new branches and checks out a new branch.
git rebase -i HEAD~3 | Provides an interactive prompt for rebasing/merging up to 3 commits.
git rebase origin/master | Picks up your commits, fast forwards to origin/master's state, and pops them on top.<br/>This is particularly useful line to keep the git history clean looking

### Magic

Command | Description
--- | ---
git shortlog --no-merges master | Provides a detailed shortlog of all team's commits. It is highly recommended to alias this.
git filter-branch --tree-filter 'rm -f password.txt' HEAD | Removes password.txt from every commit in history.<br/> This is very dangerious. --all will apply changes to all branches.
git submodule add [gitRepo] | Adds a git project within a git project.

 #### TODO: reflog commands

### GitIgnore

.gitignore
```
*.a         //Ignore all "a" files
!other.a    //However, do track "other.a", even if we ignore all "a" files
```
