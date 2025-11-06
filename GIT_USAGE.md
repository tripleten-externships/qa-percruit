# How to Stage, Commit, Push, and Create a Pull Request

Follow these steps when you're ready to submit your BDD feature work.

---

## 1. Check your branch

Make sure you’re working on your own branch. Use kebab-case and include your name and section.

```bash
git branch
```

If you’re not already on your branch, switch to it:

```bash
git checkout <your-branch-name>
```

**Example:**

```bash
git checkout chris/login-auth-tests
```

If you haven’t created your branch yet:

```bash
git checkout -b chris/login-auth-tests
```

---

## 2. Stage your changes

Add all new or modified files to the staging area.

```bash
git add .
```

Or to add a specific file:

```bash
git add ui_tests/features/login/login-success.feature
```

To confirm what’s staged:

```bash
git status
```

You should see your new or changed files listed in green.

---

## 3. Commit your changes

Write a clear, short commit message describing what you did.

```bash
git commit -m "chris/login-auth-tests: added login success and logout scenarios"
```

You can verify the commit worked by doing this:

```bash
git log --oneline -1
```

---

## 4. Push your branch to GitHub

Send your changes to the remote repository.

```bash
git push -u origin <your-branch-name>
```

**Example:**

```bash
git push -u origin chris/login-auth-tests
```

The first push adds the `-u` flag to set up tracking between your local branch and the remote branch on GitHub.  
Next time, you can simply use:

```bash
git push
```

---

## 5. Create a Pull Request (PR)

After pushing, go to your GitHub repository page.

You’ll see a banner like:

> “Compare & pull request”

Click **Compare & pull request**.

Or manually:
- Click **Pull Requests** in the top menu.
- Click **New Pull Request**.
- Choose your branch from the dropdown (e.g., `chris/login-auth-tests`).
- Compare against `main`.

---

## 6. Fill out the PR form

Include:
- **Title:** `chris/login-auth-tests: add login and logout scenarios`
- **Description:** Briefly explain what you tested and any notes for the reviewer.
- Link to related Jira ticket (if applicable).
- Check off your checklist (if you have a PR template).

Then click **Create Pull Request**.

---

## 7. Request a Review

- On the right-hand side of the PR, click **Reviewers**.
- Select your team lead or assigned peer reviewer.

Wait for feedback or approval.

---

## 8. Make Changes (if requested)

If the reviewer requests edits:
- Update your files.
- Repeat **steps 2–4** (stage, commit, push).  
Your PR will automatically update.

---

## 9. Merge (when approved)

Once approved and CI passes:
- The team lead will merge your PR into `main`.
- You’ll get a confirmation once merged.

Then delete your branch (if prompted).

---

## Common Commands Summary

| Action | Command |
|--------|----------|
| Create branch | `git checkout -b <branch-name>` |
| Stage changes | `git add .` |
| Commit | `git commit -m "<message>"` |
| Push | `git push -u origin <branch-name>` |
| Check status | `git status` |
| Pull latest main | `git checkout main && git pull origin main` |

---

## Notes

- Always pull the latest `main` before starting new work.
- Keep commits small and descriptive.
- One pull request per feature or logical group of tests.
