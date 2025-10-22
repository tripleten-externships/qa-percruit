# Branching Template — QA Percruit

**Goal:** Maintain consistent branch names across all contributors so reviews, automation, and traceability remain clean and searchable in GitHub and Jira.

---

## General Format
Branch names should use **kebab-case** (all lowercase with hyphens). Avoid spaces, underscores, or camelCase.

### Examples

| Purpose                      | Branch Example                         | Notes                                       |
| ---------------------------- | -------------------------------------- | ------------------------------------------- |
| New BDD feature test         | `jonathan/bdd-login`                   | For a new `.feature` + step definition      |
| Update to existing BDD steps | `ayoub/refactor-login-steps`           | Non-functional changes or refactors         |
| Bug fix in existing feature  | `derian/fix-dashboard-validation`      | Use when fixing test logic or selectors     |
| Add regression test          | `amanda/regression-search`             | For regression suites outside core BDD flow |
| Update documentation         | `lilia/docs-bdd-readme`                | For editing README, wikis, or setup docs    |

---

## Feature Directory Reference

All BDD work goes under:
ui_tests/
features/master-list/
steps/

Each branch should contain:
ui_tests/
features/master-list/.feature
steps/.steps.ts

---

## Team Workflow Steps

1. **Create your branch**

   ```bash
   git checkout -b <your-name>/<scope>-<topic>
example
   git checkout -b jonathan/bdd-login

2.	Write or edit your feature
	•	Place under ui_tests/features/master-list/
	•	Follow Gherkin syntax and tag with @smoke or @regression.
3.	Commit and push

    git add .
git commit -m "<your-name>/<scope>-<topic>: added login feature scenario for valid credentials"
git push -u origin <your-name>/<scope>-<topic>

4.	Open a Pull Request
	•	Target branch: main
	•	Title: <your-name>/<scope>-<short-summary>
	•	Description: Follow the PR template.
	•	Request a reviewer (team lead or peer).

Pull Request Naming Convention
<your-name>/<scope>: <feature or scenario summary>
Examples:
	•	jonathan/bdd-login: add login scenario for valid credentials
	•	ayoub/fix-dashboard-validation: update verification step
	•	lilia/docs-bdd-readme: update readme instructions

Team Tips
	•	Use kebab-case for all branch names (e.g., jonathan/bdd-login).
	•	One scenario per branch or PR to keep reviews fast and CI focused.
	•	Keep branch names short (under 50 characters total).
	•	Never push directly to main; all work goes through a PR.
	•	Pullpull before opening a PR to avoid conflicts:

 git fetch origin
git pull origin/main