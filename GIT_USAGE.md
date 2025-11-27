# Git Workflow Guide

This guide covers the complete Git workflow for contributing to the QA test automation repository. Whether you're adding new tests, fixing bugs, or updating documentation, follow these steps to ensure a smooth collaboration process.

---

## Table of Contents
- [Quick Reference](#quick-reference)
- [Initial Setup](#initial-setup)
- [Daily Workflow](#daily-workflow)
- [Creating & Managing Branches](#creating--managing-branches)
- [Making Changes](#making-changes)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pushing Changes](#pushing-changes)
- [Creating Pull Requests](#creating-pull-requests)
- [Handling Feedback](#handling-feedback)
- [Common Scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)

---

## Quick Reference

| Action | Command |
|--------|---------|
| Clone repository | `git clone https://github.com/tripleten-externships/qa-percruit.git` |
| Create new branch | `git checkout -b yourname/feature-description` |
| Check current branch | `git branch` or `git status` |
| Switch branches | `git checkout branch-name` |
| Pull latest changes | `git pull origin main` |
| Stage all changes | `git add .` |
| Stage specific file | `git add path/to/file` |
| Commit changes | `git commit -m "type: description"` |
| Push to remote | `git push -u origin branch-name` |
| View commit history | `git log --oneline` |
| Check file status | `git status` |
| Discard local changes | `git restore file-name` |
| Stash changes | `git stash` |
| Apply stashed changes | `git stash pop` |

---

## Initial Setup

### 1. Clone the Repository

If you haven't already, clone the repository to your local machine:

```bash
git clone https://github.com/tripleten-externships/qa-percruit.git
cd qa-percruit
```

### 2. Configure Git (First Time Only)

Set your name and email for commit attribution:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Verify your configuration:

```bash
git config --global --list
```

### 3. Understand the Repository Structure

```
qa-percruit/
├── ui_tests/
│   ├── features/            # Domain-grouped feature files
│   │   ├── auth/
│   │   ├── admin-dashboard/
│   │   ├── mentor-dashboard/
│   │   ├── mentor-assignments/
│   │   ├── interview-questions/
│   │   ├── metrics/
│   │   ├── system-health/
│   │   └── shared/
│   └── src/
│       ├── pages/
│       └── step-definitions/
└── api_tests/
    └── tests/               # API test files
```

---

## Daily Workflow

Before starting any new work, **always** sync with the latest changes:

```bash
# Make sure you're on main branch
git checkout main

# Pull the latest changes from remote
git pull origin main
```

This prevents merge conflicts and ensures you're working with the most recent code.

---

## Creating & Managing Branches

### Branch Naming Convention

Use **kebab-case** with the format: `yourname/type-description`

**Examples:**
```bash
# New test feature
git checkout -b sarah/login-validation-tests

# Bug fix
git checkout -b james/fix-dashboard-timeout

# Documentation update
git checkout -b maria/update-readme

# Refactoring
git checkout -b alex/refactor-page-objects
```

### Create a New Branch

Always create branches from an up-to-date `main`:

```bash
# 1. Switch to main
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Create and switch to new branch
git checkout -b yourname/feature-description
```

**Verify you're on the correct branch:**
```bash
git branch
# The current branch will have an asterisk (*) next to it
```

### Switch Between Branches

```bash
# Switch to an existing branch
git checkout branch-name

# Switch back to main
git checkout main
```

### List All Branches

```bash
# Local branches only
git branch

# All branches (local and remote)
git branch -a

# Remote branches only
git branch -r
```

---

## Making Changes

### 1. Make Your Code Changes

Edit files, add new tests, or update documentation. Use your IDE or text editor of choice.

### 2. Check What Changed

```bash
# See which files have changes
git status

# See detailed changes in files
git diff

# See changes for a specific file
git diff path/to/file
```

### 3. Stage Your Changes

**Stage all changes:**
```bash
git add .
```

**Stage specific files:**
```bash
# Stage a single file
git add ui_tests/features/auth/login.feature

# Stage multiple specific files
git add file1.ts file2.feature

# Stage all files in a directory
git add ui_tests/features/shared/
```

**Verify what's staged:**
```bash
git status
# Staged files appear in green
# Unstaged changes appear in red
```

### 4. Review Before Committing

```bash
# See what will be committed
git diff --staged

# If you need to unstage a file
git restore --staged file-name
```

---

## Commit Message Guidelines

We follow **Conventional Commits** format for clear, searchable history.

### Format

```
type: short description

Optional longer explanation of what changed and why.

Closes #issue-number
```

### Commit Types

| Type | When to Use | Example |
|------|-------------|---------|
| `test` | Adding or modifying tests | `test: add login validation scenarios` |
| `fix` | Fixing a bug or broken test | `fix: resolve timeout in dashboard test` |
| `feat` | New feature or functionality | `feat: add page object for profile page` |
| `refactor` | Code restructuring without changing behavior | `refactor: simplify authentication step definitions` |
| `docs` | Documentation changes | `docs: update GETTING_STARTED with setup steps` |
| `chore` | Maintenance tasks, dependency updates | `chore: update Playwright to v1.56` |
| `style` | Code formatting, missing semicolons (no logic change) | `style: format files with Prettier` |
| `ci` | CI/CD configuration changes | `ci: add parallel test execution` |

### Good Commit Examples

✅ **Good:**
```bash
git commit -m "test: add student profile edit scenarios"
git commit -m "fix: resolve flaky login test timeout"
git commit -m "docs: add troubleshooting section for Windows users"
git commit -m "refactor: extract common selectors to BasePage"
```

❌ **Bad:**
```bash
git commit -m "updated stuff"
git commit -m "fixed bugs"
git commit -m "changes"
git commit -m "WIP"
```

### Multi-line Commits

For more complex changes, add a detailed description:

```bash
git commit -m "test: add comprehensive profile edit scenarios

Added 5 new test scenarios covering:
- Basic profile information updates
- Profile picture upload
- Contact information changes
- Data persistence after logout
- Invalid email format validation

All tests follow the Page Object Model pattern and include
proper cleanup in After hooks.

Closes #42"
```

---

## Pushing Changes

### First Push (New Branch)

The first time you push a new branch, use the `-u` flag to set up tracking:

```bash
git push -u origin yourname/feature-description
```

Example:
```bash
git push -u origin sarah/login-validation-tests
```

### Subsequent Pushes

After the initial push, simply use:

```bash
git push
```

### What Happens Next

After pushing, GitHub will provide a URL to create a pull request:

```
remote: Create a pull request for 'yourname/feature-description' on GitHub by visiting:
remote:   https://github.com/tripleten-externships/qa-percruit/pull/new/yourname/feature-description
```

---

## Creating Pull Requests

### Via GitHub Web Interface

1. **Go to the Repository:** Navigate to https://github.com/tripleten-externships/qa-percruit

2. **Create PR:** You'll see a banner:
   ```
   yourname/feature-description had recent pushes
   [Compare & pull request]
   ```
   Click **Compare & pull request**

3. **Fill Out the Template:** The PR template will auto-populate. Complete all sections:
   - **Summary:** Clear description of your changes
   - **Ticket:** Link the related issue (`Closes #123`)
   - **Change Type:** Check the appropriate box
   - **Risk & Impact:** Assess the risk level
   - **Verification:** Document your testing
   - **Checklist:** Check all completed items

4. **Submit:** Click **Create Pull Request**

### PR Title Format

Use the same format as commit messages:

```
type: brief description
```

**Examples:**
- `test: add student profile edit scenarios`
- `fix: resolve timeout in mentor dashboard test`
- `docs: update Windows setup instructions`

### Manual PR Creation

If you don't see the banner:

1. Click **Pull Requests** tab
2. Click **New Pull Request**
3. Select your branch from the **compare** dropdown
4. Ensure **base** is set to `main`
5. Click **Create Pull Request**

---

## Handling Feedback

### Responding to Review Comments

When a reviewer requests changes:

1. **Make the requested changes** in your local branch
2. **Stage and commit** the changes:
   ```bash
   git add .
   git commit -m "fix: address review feedback - update test assertions"
   ```
3. **Push to the same branch:**
   ```bash
   git push
   ```

The PR will automatically update with your new commits!

### Syncing with Main (Avoiding Conflicts)

If `main` has been updated while your PR is open:

```bash
# 1. Make sure all your work is committed
git status

# 2. Switch to main and pull latest
git checkout main
git pull origin main

# 3. Switch back to your branch
git checkout yourname/feature-description

# 4. Merge main into your branch
git merge main

# 5. Resolve any conflicts if they occur (see below)

# 6. Push the updated branch
git push
```

### Resolving Merge Conflicts

If you see merge conflicts:

1. **Identify conflicted files:**
   ```bash
   git status
   # Conflicted files will be listed under "Unmerged paths"
   ```

2. **Open each conflicted file** - look for conflict markers:
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Changes from main
   >>>>>>> main
   ```

3. **Edit the file** to keep the correct code (remove conflict markers)

4. **Stage the resolved files:**
   ```bash
   git add path/to/resolved/file
   ```

5. **Complete the merge:**
   ```bash
   git commit -m "merge: resolve conflicts with main"
   git push
   ```

---

## Common Scenarios

### Scenario 1: Work in Progress - Use @wip Tag

While developing tests, use the `@wip` tag so they don't run in CI:

```gherkin
@wip
Scenario: New test I'm still working on
  Given I am on the login page
  ...
```

Before creating a PR, remove the `@wip` tag.

### Scenario 2: Switching Tasks Mid-Work

If you need to switch branches but have uncommitted changes:

```bash
# Save your work temporarily
git stash

# Switch to another branch
git checkout other-branch

# Do your work...

# Switch back to original branch
git checkout yourname/feature-description

# Restore your work
git stash pop
```

### Scenario 3: Discard Local Changes

If you want to throw away local changes:

```bash
# Discard changes in a specific file
git restore file-name

# Discard all local changes (careful!)
git restore .
```

### Scenario 4: Amend the Last Commit

If you forgot to include a file in your last commit:

```bash
# Stage the forgotten file
git add forgotten-file.ts

# Amend the previous commit
git commit --amend --no-edit

# Force push if already pushed (use carefully!)
git push --force-with-lease
```

**⚠️ Warning:** Only amend commits that haven't been reviewed yet!

### Scenario 5: View Commit History

```bash
# Compact view
git log --oneline

# Last 5 commits
git log --oneline -5

# Detailed view with changes
git log -p

# Graphical view of branches
git log --oneline --graph --all
```

### Scenario 6: Check Remote Repository

```bash
# See remote URL
git remote -v

# See remote branches
git branch -r

# Fetch latest info without merging
git fetch origin
```

---

## Troubleshooting

### Problem: "Your branch is behind 'origin/main'"

**Solution:** Pull the latest changes:
```bash
git pull origin main
```

### Problem: "fatal: not a git repository"

**Solution:** You're not in the repository directory:
```bash
cd qa-percruit
```

### Problem: "Permission denied (publickey)"

**Solution:** Set up SSH keys or use HTTPS:
```bash
# Use HTTPS instead
git remote set-url origin https://github.com/tripleten-externships/qa-percruit.git
```

### Problem: "Merge conflict in file.ts"

**Solution:** See [Resolving Merge Conflicts](#resolving-merge-conflicts) above.

### Problem: Accidentally Committed to Main

**Solution:** Create a branch from your current state:
```bash
# Create a new branch with your changes
git branch yourname/feature-description

# Switch to main
git checkout main

# Reset main to match remote
git reset --hard origin/main

# Switch to your new branch
git checkout yourname/feature-description

# Push your branch
git push -u origin yourname/feature-description
```

### Problem: Want to Undo Last Commit (Not Pushed Yet)

**Solution:**
```bash
# Keep changes but undo commit
git reset --soft HEAD~1

# Discard changes and undo commit (careful!)
git reset --hard HEAD~1
```

### Problem: Pushed Sensitive Data by Mistake

**Solution:**
1. **Immediately notify your team lead**
2. Remove the sensitive data from the file
3. Add it to `.gitignore` if needed
4. **Never** include `.env` files with real credentials

---

## Best Practices

### ✅ Do:
- Pull from `main` before starting new work
- Create small, focused branches (one feature/fix per branch)
- Write clear, descriptive commit messages
- Test your changes locally before pushing
- Keep commits atomic (one logical change per commit)
- Use `@wip` tag while developing tests
- Respond promptly to PR feedback
- Delete branches after they're merged

### ⛔ Don't:
- Push directly to `main` (it's protected anyway)
- Commit `.env` files with real credentials
- Make huge commits with unrelated changes
- Use vague commit messages like "fix" or "update"
- Force push to shared branches (use `--force-with-lease` if needed)
- Ignore merge conflicts (resolve them properly)
- Commit commented-out code or debug statements

---

## Additional Resources

- **Conventional Commits:** https://www.conventionalcommits.org/
- **GitHub Flow Guide:** https://guides.github.com/introduction/flow/
- **Resolving Conflicts:** https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts

---

## Need Help?

- **Git Issues:** Ask your mentor or team lead
- **PR Process:** Review [EXAMPLE-PR.md](./EXAMPLE-PR.md)
- **Branch Naming:** Check [BRANCHING_GUIDE.md](./BRANCHING_GUIDE.md)
- **General Setup:** See [GETTING_STARTED.md](./GETTING_STARTED.md)

---

## Summary: Complete Workflow

```bash
# 1. Start with updated main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b yourname/feature-description

# 3. Make your changes
# ... edit files ...

# 4. Stage changes
git add .

# 5. Commit with conventional format
git commit -m "test: add login validation scenarios"

# 6. Push to remote
git push -u origin yourname/feature-description

# 7. Create PR on GitHub
# ... fill out PR template ...

# 8. Address review feedback
# ... make changes ...
git add .
git commit -m "fix: address review feedback"
git push

# 9. After merge, clean up
git checkout main
git pull origin main
git branch -d yourname/feature-description
```

---

**Happy coding and testing!** 🚀
