### **Title: `docs: Add QA pull request template`**

### Description

This change adds a new, QA-specific pull request template to the repository's `.github` directory. The goal is to standardize the PR creation process for the team, ensuring that every submission includes a clear description, risk assessment, and detailed testing evidence. This will help speed up code reviews and improve documentation.

### Related Issue(s)

* Closes #14

### Type of Change

-   [ ] Bug Fix (a change that fixes a defect in the application)
-   [ ] New Test (a change that adds a new automated test case)
-   [ ] Test Framework Improvement (a change to the test code, configuration, or CI/CD pipeline)
-   [x] Documentation Update

### Risk Assessment

* **Risk Level:** Low
* **Potential Impact:** No impact on the application or test suite. This change only affects the repository's meta-process for creating pull requests.

### Testing Strategy & Evidence

#### Manual Test Steps (if applicable)

1.  Merged the branch containing `PULL_REQUEST_TEMPLATE.md` into `main`.
2.  Created a new test branch locally (`test-pr-template`).
3.  Made a trivial change to `README.md` and pushed the new branch.
4.  Navigated to the repository on GitHub and clicked the "Compare & pull request" button.
5.  **Verified** that the new PR's description field was automatically populated with the full content of the template.

#### Automated Tests

-   [x] All existing automated tests pass successfully.
-   [ ] New automated test(s) have been added to cover this change.

#### Test Environment

* **Browser(s):** N/A (GitHub Process)
* **OS:** N/A (GitHub Process)
* **Device(s):** Desktop

#### Screenshots or Videos

Here is the result after creating a new PR—the template is loaded automatically:


### Checklist

-   [x] I have performed a self-review of my own code.
-   [x] My changes are small, focused, and address a single issue.
-   [x] I have tested my changes on the specified environments.
-   [ ] My tests cover both "happy path" and relevant edge cases.