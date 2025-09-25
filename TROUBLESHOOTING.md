
````markdown
# QA Externship Troubleshooting Guide

This guide covers the most common issues you might encounter when setting up your local environment or working with Git and GitHub.

---

## 1. Command Not Found on Local Machine (e.g., `poetry`, `brew`) 🕵️

This is almost always a `PATH` issue, meaning your terminal doesn't know where to find the program.

> **First Action:** Completely close and reopen your terminal. This solves the problem 50% of the time.

> **If that fails, do a clean install (on Mac).** A clean install is faster than debugging a bad one. This is the most reliable fix.
> ```bash
> # This example is for Poetry, but applies to other tools.
> brew install poetry
> ```

> **Verify:** Check that the command now works.
> ```bash
> poetry --version
> ```

---

## 2. Tests Won't Run Locally (e.g., "pytest not found") ⚙️

This means the project's dependencies aren't installed yet.

> **For API tests:** The virtual environment created by Poetry is empty. You must install the tools listed in `pyproject.toml`.
> ```bash
> # Run this inside the api_tests folder
> poetry install
> ```

> **For UI tests:** The `node_modules` folder is missing or out of date.
> ```bash
> # Run this inside the ui_tests folder
> npm install
> ```

---

## 3. Git & Pull Request (PR) Problems Git Problems 🤔

#### **Problem: "My changes are not showing up on my PR!"**
> **Ask:** "Which branch am I on?"
>
> **Check:** Run `git branch`. The asterisk (`*`) must be next to your feature branch, **not** `main`.
>
> **Fix:** `git checkout <your-feature-branch-name>` and re-apply your changes.

#### **Problem: `git push` is rejected with a "(fetch first)" error.**
> **Ask:** "Did I just resolve a merge conflict or revert a change on the GitHub website?"
>
> **Explanation:** The GitHub branch has a commit that your local machine doesn't.
>
> **Fix:** Run `git pull` first, then `git push`.
> ```bash
> git pull
> git push
> ```

#### **Problem: "My PR has a merge conflict!"**
> **Reassurance:** This is normal. It just needs a human decision.
>
> **Fix for Beginners:** Use the GitHub UI. Go to the pull request page and click the **"Resolve conflicts"** button. 

---

## 4. Automated Tests are Failing on GitHub (Red X ❌)

> **First Action, Always:** Click the **"Details"** link next to the failed check to read the log.

> **If `npm ci` failed:** The `package-lock.json` file is missing from the repository. Run `npm install` locally to generate it, then commit the new `package-lock.json` file to your PR.

> **If `poetry install` failed:** There's likely a configuration error in `api_tests/pyproject.toml`. The log will have the specific error (like a "missing readme" or "package-mode" issue).

````