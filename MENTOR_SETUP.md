# New Cohort Repository Setup Checklist

_This guide is for the mentor. Follow these steps each time you create a new repository from the template to prepare it for a new externship cohort._

---

### 1. Clean Up Copied Branches (If Applicable)
> **Note:** You can avoid this step entirely by **unchecking** the "Include all branches" box when you create the new repository from the template.

- [ ] If old feature branches were copied over, go to the repository's main page and click the **"Branches"** link.
- [ ] Delete all branches except for **`main`**.

---

### 2. Invite Collaborators
- [ ] Go to **`Settings > Collaborators and teams`**.
- [ ] Click **"Add people"** and invite the new externs using their GitHub usernames.

---

### 3. Configure Branch Protection for `main`
- [ ] Go to **`Settings > Branches`** and click **"Add branch protection rule"**.
- [ ] Set "Branch name pattern" to **`main`**.
- [ ] Check **`Require a pull request before merging`**.
  - [ ] Check **`Require approvals`** and set the number to **`1`**.
- [ ] Check **`Require status checks to pass before merging`**.
  - [ ] In the search box, **type in the exact names** of the jobs from your workflows. Add each of the following:
    - [ ] `ui-tests`
    - [ ] `api-tests`
    - [ ] `check-pr-description`
- [ ] Check **`Include administrators`** (Recommended). This ensures everyone, including you, must follow the PR process.
- [ ] Click **"Create"** to save the rule.

---

### 4. Create Starter Issues
- [ ] Go to the **`Issues`** tab.
- [ ] Create 2-3 starter tasks for the team to pick up (e.g., "Write a test for the login page," "Add API test for GET /users").
- [ ] Assign appropriate labels like `status: available` and `priority: medium` to the new issues.
