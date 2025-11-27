# Branch Naming & Workflow Guide

This guide establishes consistent branch naming conventions and workflows for all contributors to maintain clean, searchable history in GitHub and enable smooth automation.

---

## Table of Contents
- [Branch Naming Convention](#branch-naming-convention)
- [Creating Branches](#creating-branches)
- [Commit Message Format](#commit-message-format)
- [Opening Pull Requests](#opening-pull-requests)
- [Branch Examples](#branch-examples)
- [Best Practices](#best-practices)
- [Common Mistakes](#common-mistakes)

---

## Branch Naming Convention

### Format

Use **kebab-case** (all lowercase with hyphens):

```
yourname/type-description
```

**Components:**
- **yourname**: Your first name or GitHub username
- **type**: The type of work (test, fix, feat, docs, refactor, chore)
- **description**: Brief description of the change (2-4 words max)

### Examples

✅ **Good Branch Names:**
```bash
sarah/test-login-validation
james/fix-dashboard-timeout
maria/docs-update-readme
alex/refactor-page-objects
```

❌ **Bad Branch Names:**
```bash
sarah/bdd-login                    # Missing type
fix-dashboard                      # Missing name
sarah_fix_dashboard                # Use hyphens, not underscores
SarahFixDashboard                  # Use kebab-case, not camelCase
sarah/this-is-a-very-long-branch-name-that-describes-everything  # Too long
```

---

## Creating Branches

### 1. Start from Updated Main

**Always** create branches from an up-to-date `main`:

```bash
# Switch to main
git checkout main

# Pull latest changes
git pull origin main

# Create and switch to new branch
git checkout -b yourname/type-description
```

**Example:**
```bash
git checkout main
git pull origin main
git checkout -b sarah/test-profile-edit
```

### 2. Verify Your Branch

```bash
# Check current branch
git branch
# The current branch will have an asterisk (*) next to it

# Or use git status
git status
```

---

## Commit Message Format

Follow **Conventional Commits** format. This is critical for automated changelog generation and semantic versioning.

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
| `style` | Code formatting (no logic change) | `style: format files with Prettier` |
| `ci` | CI/CD configuration changes | `ci: add parallel test execution` |

### Good Commit Examples

✅ **Good:**
```bash
git commit -m "test: add student profile edit scenarios"
git commit -m "fix: resolve flaky login test timeout"
git commit -m "docs: add troubleshooting section for Windows users"
```

❌ **Bad:**
```bash
git commit -m "sarah/test-profile-edit: added profile scenarios"  # Don't include branch name
git commit -m "updated stuff"                                     # Too vague
git commit -m "WIP"                                               # Not descriptive
```

**See [GIT_USAGE.md](./GIT_USAGE.md) for detailed commit guidelines.**

---

## Opening Pull Requests

### PR Title Format

Use the **same format** as commit messages:

```
type: brief description
```

**Examples:**
- `test: add student profile edit scenarios`
- `fix: resolve timeout in mentor dashboard test`
- `docs: update Windows setup instructions`

### Creating the PR

1. **Push your branch:**
   ```bash
   git push -u origin yourname/type-description
   ```

2. **Go to GitHub:**
   - Navigate to https://github.com/tripleten-externships/qa-percruit
   - Click the "Compare & pull request" button that appears

3. **Fill out the PR template:**
   - Complete all sections (Summary, Ticket, Change Type, Risk & Impact, Verification, Checklist)
   - See [EXAMPLE-PR.md](./EXAMPLE-PR.md) for a filled-out example

4. **Request review:**
   - Assign your mentor or team lead as a reviewer
   - Ensure all CI checks pass

**See [GIT_USAGE.md](./GIT_USAGE.md#creating-pull-requests) for detailed PR creation steps.**

---

## Branch Examples

### Scenario 1: Adding New Test Feature

**Goal:** Create tests for student profile editing

```bash
# 1. Create branch
git checkout -b sarah/test-profile-edit

# 2. Create feature file
# ui_tests/features/shared/profile-edit.feature

# 3. Create step definitions
# ui_tests/steps/profile.steps.ts

# 4. Commit changes
git add .
git commit -m "test: add student profile edit scenarios

Added 5 new scenarios covering:
- Basic profile information updates
- Profile picture upload
- Contact information changes
- Data persistence after logout
- Invalid email format validation

Closes #42"

# 5. Push branch
git push -u origin sarah/test-profile-edit
```

### Scenario 2: Fixing Broken Test

**Goal:** Fix timeout in dashboard test

```bash
# 1. Create branch
git checkout -b james/fix-dashboard-timeout

# 2. Update test file
# ui_tests/features/admin-dashboard/dashboard-load.feature

# 3. Commit fix
git add .
git commit -m "fix: resolve timeout in dashboard test

Increased wait time for dashboard metrics to load.
Dashboard API response can be slow in staging environment.

Closes #58"

# 4. Push branch
git push -u origin james/fix-dashboard-timeout
```

### Scenario 3: Updating Documentation

**Goal:** Update README with new setup instructions

```bash
# 1. Create branch
git checkout -b maria/docs-update-readme

# 2. Edit README.md

# 3. Commit changes
git add README.md
git commit -m "docs: update README with Codespaces setup

Added section explaining how to use GitHub Codespaces
for quick project setup without local installation."

# 4. Push branch
git push -u origin maria/docs-update-readme
```

### Scenario 4: Refactoring Code

**Goal:** Extract common selectors to base page class

```bash
# 1. Create branch
git checkout -b alex/refactor-page-objects

# 2. Update page objects
# ui_tests/src/pages/BasePage.ts

# 3. Commit changes
git add .
git commit -m "refactor: extract common selectors to BasePage

Moved navigation and header selectors to BasePage class
to reduce duplication across all page objects."

# 4. Push branch
git push -u origin alex/refactor-page-objects
```

---

## Best Practices

### ✅ Do:

1. **Keep branches focused**
   - One feature/fix per branch
   - Avoid mixing unrelated changes

2. **Use descriptive names**
   ```bash
   # Good
   sarah/test-login-validation

   # Bad
   sarah/test-stuff
   ```

3. **Start from updated main**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b yourname/type-description
   ```

4. **Keep branch names short**
   - Aim for under 40 characters total
   - Focus on the core change

5. **Use conventional commit types**
   - Makes history searchable
   - Enables automated tooling

6. **Use @wip tag while developing**
   ```gherkin
   @wip
   Scenario: Test I'm still working on
     Given I am on the login page
     ...
   ```
   - Remove before creating PR

7. **Delete branches after merge**
   ```bash
   # After PR is merged
   git checkout main
   git pull origin main
   git branch -d yourname/type-description
   ```

### ⛔ Don't:

1. **Don't include branch name in commits**
   ```bash
   # Bad
   git commit -m "sarah/test-login: add login scenarios"

   # Good
   git commit -m "test: add login scenarios"
   ```

2. **Don't push directly to main**
   - Main branch is protected
   - All changes must go through PRs

3. **Don't create branches with unrelated changes**
   ```bash
   # Bad - mixing test and docs
   sarah/test-and-docs-updates

   # Good - separate branches
   sarah/test-login-validation
   sarah/docs-update-readme
   ```

4. **Don't use vague descriptions**
   ```bash
   # Bad
   sarah/fix-stuff
   james/updates

   # Good
   sarah/fix-login-timeout
   james/refactor-selectors
   ```

5. **Don't forget to sync with main**
   - Before creating PR, ensure your branch is up to date
   - Resolve conflicts before requesting review

---

## Common Mistakes

### Mistake 1: Wrong Branch Name Format

❌ **Wrong:**
```bash
git checkout -b fix-dashboard           # Missing name
git checkout -b sarah_fix_dashboard     # Using underscores
git checkout -b SarahFixDashboard       # Using camelCase
```

✅ **Correct:**
```bash
git checkout -b sarah/fix-dashboard-timeout
```

### Mistake 2: Including Branch Name in Commits

❌ **Wrong:**
```bash
git commit -m "sarah/test-profile: add profile edit tests"
```

✅ **Correct:**
```bash
git commit -m "test: add profile edit scenarios"
```

### Mistake 3: Creating Branch from Outdated Main

❌ **Wrong:**
```bash
git checkout -b sarah/test-profile-edit  # Without updating main first
```

✅ **Correct:**
```bash
git checkout main
git pull origin main
git checkout -b sarah/test-profile-edit
```

### Mistake 4: Mixing Multiple Changes

❌ **Wrong:**
```bash
# One branch with:
# - New login tests
# - Fixed dashboard bug
# - Updated README
git checkout -b sarah/multiple-changes
```

✅ **Correct:**
```bash
# Separate branches for each change
git checkout -b sarah/test-login-validation
# ... complete and merge ...

git checkout -b sarah/fix-dashboard-timeout
# ... complete and merge ...

git checkout -b sarah/docs-update-readme
```

---

## Repository Structure Reference

### UI Tests

All BDD work goes under:
```
ui_tests/
├── features/
│   ├── auth/
│   ├── admin-dashboard/
│   ├── mentor-dashboard/
│   ├── mentor-assignments/
│   ├── interview-questions/
│   ├── metrics/
│   ├── system-health/
│   └── shared/
├── src/
│   ├── config/
│   ├── pages/
│   └── step-definitions/
└── api_tests/
    └── tests/
```

### What Goes in Each Branch

**Test Branch (`yourname/test-description`):**
- New `.feature` files in the appropriate domain folder under `ui_tests/features/`
- New `.steps.ts` files in `ui_tests/src/step-definitions/`
- New page objects in `ui_tests/src/pages/` (if needed)

**Fix Branch (`yourname/fix-description`):**
- Updates to existing `.feature` files
- Fixes to `.steps.ts` files
- Corrections to page objects or selectors

**Docs Branch (`yourname/docs-description`):**
- Changes to `README.md`
- Updates to `GETTING_STARTED.md`
- Edits to any `.md` documentation files

---

## Quick Reference

| Action | Command |
|--------|---------|
| Start new branch | `git checkout -b yourname/type-description` |
| Check current branch | `git branch` or `git status` |
| Switch branches | `git checkout branch-name` |
| Push new branch | `git push -u origin yourname/type-description` |
| Update from main | `git checkout main && git pull origin main` |
| Delete local branch | `git branch -d branch-name` |

---

## Additional Resources

- **Complete Git Workflow:** [GIT_USAGE.md](./GIT_USAGE.md)
- **PR Template Example:** [EXAMPLE-PR.md](./EXAMPLE-PR.md)
- **Setup Instructions:** [GETTING_STARTED.md](./GETTING_STARTED.md)
- **Troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Conventional Commits:** https://www.conventionalcommits.org/

---

## Need Help?

- **Branch naming questions:** Ask your mentor or team lead
- **Git workflow issues:** See [GIT_USAGE.md](./GIT_USAGE.md#troubleshooting)
- **PR process:** Review [EXAMPLE-PR.md](./EXAMPLE-PR.md)

---

**Remember:** Consistent branch names and commit messages make everyone's life easier, including your own when you look back at your work later!
