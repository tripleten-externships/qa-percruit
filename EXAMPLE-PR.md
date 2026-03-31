# Example Pull Request

This document shows a filled-out example of our pull request template to help you understand what reviewers are looking for. Use this as a reference when creating your own PRs.

---

## Summary

This PR adds automated tests for the student profile edit functionality. Previously, we only had manual test cases for profile updates. These new tests verify that students can successfully update their personal information, upload profile pictures, and save changes across different browsers.

The tests use the Page Object Model pattern and follow our existing test structure in `ui_tests/features/master-list/profile/`.

## Ticket
Closes #42

## Change Type
- [x] New test
- [ ] Test fix
- [ ] Framework/config update
- [ ] Docs update

## Risk & Impact

**Risk Level:** Low

**Impact:**
- Adds 5 new test scenarios to the profile feature suite
- No changes to existing tests or framework code
- Increases test coverage for student profile functionality
- Estimated execution time: ~2 minutes for the full profile suite

## Verification

- [x] Playwright/UI run
  - All 5 new profile tests passed locally
  - Existing profile tests still pass
  - Full UI suite: 65/65 scenarios passed

- [x] API/Integration run
  - No API changes in this PR
  - All existing API tests pass: 12/12 passed

- [x] Manual check
  - Verified tests run correctly in both headed and headless modes
  - Tested against staging environment
  - Confirmed tests clean up test data properly

- [ ] Other: ___

**Test Evidence:**

```bash
# Local test run results
cd ui_tests
npm test

Feature: Student Profile Management

  Scenario: Student can update basic profile information ✓
  Scenario: Student can upload profile picture ✓
  Scenario: Student can update contact information ✓
  Scenario: Profile changes persist after logout ✓
  Scenario: Student cannot save invalid email format ✓

5 scenarios (5 passed)
23 steps (23 passed)
0m47.328s
```

**Screenshots:**
- Test execution in Playwright Inspector (attached)
- Before/after profile changes (attached)

## Checklist

- [x] I have merged the latest changes from `main` into my branch.
- [x] My code follows the project's style guidelines and branching conventions.
- [x] I have added comments to my code where necessary, particularly in hard-to-understand areas.
- [x] Self-review complete
- [x] All existing automated tests pass successfully with my changes locally.

---

## Additional Notes for Reviewers

### What to look for:
1. **Step definitions** in `profile.steps.ts` - Do they follow our existing patterns?
2. **Page Object methods** in `StudentProfilePage.ts` - Are selectors robust and maintainable?
3. **Test data** - Is cleanup handled properly in the `After` hook?
4. **Assertions** - Are they meaningful and checking the right things?

### Known limitations:
- Profile picture upload test uses a small test image (test-avatar.png) checked into the repo
- Tests assume staging environment has test accounts with editable profiles
- Currently only tests student role; mentor/admin profile tests planned for separate PR

### Questions for reviewers:
- Should we add a `@smoke` tag to the "update basic profile information" test?
- Do we need to test profile updates with special characters in names?

---

## Tips for Your Own PRs

### ✅ Good Practices Demonstrated Here:

1. **Clear Summary**: Explains what, why, and how
2. **Linked Issue**: References the GitHub issue being addressed
3. **Accurate Change Type**: Correctly identified as "New test"
4. **Honest Risk Assessment**: Low risk with clear reasoning
5. **Thorough Verification**: Multiple types of testing with evidence
6. **Complete Checklist**: All items checked with actual work done
7. **Context for Reviewers**: Additional notes help reviewers focus

### ⚠️ Common Mistakes to Avoid:

- ❌ Vague summaries like "Added some tests"
- ❌ Not linking to the related issue
- ❌ Checking checklist items without actually doing them
- ❌ No test evidence or results
- ❌ Submitting PRs without running tests locally first
- ❌ Mixing multiple unrelated changes in one PR

### 📋 Before Submitting Your PR:

1. Run all tests locally and confirm they pass
2. Review your own code changes on GitHub (use the "Files changed" tab)
3. Make sure your branch is up to date with `main`
4. Fill out every section of the template thoughtfully
5. Add screenshots or logs that demonstrate your changes work
6. Consider what questions reviewers might have and address them

### 🎯 What Makes a Great PR:

- **Small and focused** - Addresses one issue or feature
- **Well-documented** - Clear summary and testing evidence
- **Self-reviewed** - You caught your own issues before submission
- **Considerate** - You've made the reviewer's job easier
- **Complete** - Tests pass, documentation updated, checklist done

---

## Example PR Titles

Good PR titles are concise and descriptive. Here are examples following our conventions:

✅ **Good Examples:**
- `test: Add student profile edit scenarios`
- `fix: Resolve flaky login test timeout`
- `feat: Add page object for mentor dashboard`
- `docs: Update GETTING_STARTED with Python setup`
- `chore: Update Playwright to v1.56`
- `refactor: Simplify authentication step definitions`

❌ **Bad Examples:**
- `Updated stuff` (too vague)
- `Fixed the tests that were broken` (not specific)
- `WIP PR` (work in progress should stay in draft)
- `Test` (not descriptive at all)

---

## Questions?

If you're unsure about any part of the PR process:

1. Review the [PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md)
2. Check [GIT_USAGE.md](./GIT_USAGE.md) for Git workflow help
3. Look at recent merged PRs in the repository for examples
4. Ask your mentor or team for guidance

Remember: A well-documented PR makes everyone's life easier, including your own when you look back at it later!
