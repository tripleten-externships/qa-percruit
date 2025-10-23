# Sprint 4 — BDD Section Assignments for QA Percruit

Each student owns a **section** of the Admin Portal and will create multiple Gherkin feature files to cover positive scenarios.  
All features should be stored inside their assigned folder under `ui_tests/features/` using **kebab-case** names.

---

## Derian — Login & Authentication
**Folder:** `ui_tests/features/login/`

**Example Features:**
- `login-success.feature` — Verify login works with valid credentials.
- `logout.feature` — Confirm admin can sign out successfully.
- `forgot-password-link.feature` — Ensure Forgot Password flow opens correctly.

**Branch Example:** `derian/login-auth-tests`

---

## Ben — Admin Dashboard Overview
**Folder:** `ui_tests/features/dashboard/`

**Example Features:**
- `dashboard-load.feature` — Verify dashboard loads correctly.
- `metrics-visible.feature` — Confirm total users, active mentors, and new this week stats appear.
- `system-status-tile.feature` — Ensure uptime and response time display correctly.

**Branch Example:** `ben/dashboard-tests`

---

## Arooj — Interview Questions (Manager)
**Folder:** `ui_tests/features/interview-questions/`

**Example Features:**
- `view-questions.feature` — Displays all questions grouped by job title.
- `filter-by-job-title.feature` — Filters questions by category.
- `add-question-form-opens.feature` — Clicking Add Question opens form modal.

**Branch Example:** `arooj/interview-questions-tests`

---

## Lili — All Users
**Folder:** `ui_tests/features/all-users/`

**Example Features:**
- `view-all-users.feature` — Validate user list appears with status badges.
- `search-users-by-email.feature` — Search by email shows correct user.
- `open-user-details.feature` — Clicking View Details opens user profile.

**Branch Example:** `lili/all-users-tests`

---

## Chris — Coding Problems
**Folder:** `ui_tests/features/coding-problems/`

**Example Features:**
- `view-problems.feature` — Displays coding problem list.
- `filter-by-difficulty.feature` — Filters by Easy/Medium/Hard.
- `open-problem-details.feature` — Opening a problem shows its description.

**Branch Example:** `chris/coding-problems-tests`

---

## Nicole — Usage Metrics (Overview)
**Folder:** `ui_tests/features/usage-metrics/overview/`

**Example Features:**
- `overview-loads.feature` — Overview tab loads correctly.
- `switch-date-range.feature` — Changing date filters updates metrics.
- `refresh-data-updates-timestamp.feature` — Refresh updates data and timestamp.

**Branch Example:** `nicole/usage-metrics-overview`

---

## Ayoub — System Health Monitor
**Folder:** `ui_tests/features/system-health/`

**Example Features:**
- `uptime-visible.feature` — System uptime displays 99% or above.
- `avg-response-time-visible.feature` — Average response time is shown.
- `no-critical-issues-banner.feature` — No issues appear on dashboard.

**Branch Example:** `ayoub/system-health-tests`

---

## Latoya — Mentors
**Folder:** `ui_tests/features/mentors/`

**Example Features:**
- `view-mentors-list.feature` — Mentors list loads with total count.
- `search-mentors.feature` — Filter mentors by name or email.
- `expand-mentor-assigned-students.feature` — Expanding mentor shows assigned students.

**Branch Example:** `latoya/mentors-tests`

---

## Chuy — Mentor Assignments
**Folder:** `ui_tests/features/mentor-assignments/`

**Example Features:**
- `create-assignment.feature` — Create mentor-student assignment.
- `check-assignment-issues.feature` — Check incomplete mentor info tool works.
- `assignments-table-visible.feature` — Assignment table loads correctly.

**Branch Example:** `chuy/mentor-assignments-tests`

---

## Cee — Profile & Settings
**Folder:** `ui_tests/features/profile/`

**Example Features:**
- `view-profile.feature` — Profile information loads correctly.
- `edit-basic-info-visible.feature` — Edit fields (name, phone, location) visible.
- `privacy-and-ai-tab-loads.feature` — Privacy settings tab loads.

**Branch Example:** `cee/profile-settings-tests`

---

## Tareq — Usage Metrics (Student Readiness)
**Folder:** `ui_tests/features/usage-metrics/student-readiness/`

**Example Features:**
- `readiness-overview-loads.feature` — Student readiness tab loads correctly.
- `switch-time-window.feature` — Changing timeframe updates results.
- `quick-insights-visible.feature` — Quick Insights section displays readiness score.

**Branch Example:** `tareq/usage-metrics-readiness`

---

## Thelma — Resume Reviews
**Folder:** `ui_tests/features/resume-reviews/`

**Example Features:**
- `view-all-reviews.feature` — All reviews load with status labels.
- `filter-by-status-tabs.feature` — Tabs show Pending/In Progress/Completed.
- `open-view-feedback.feature` — Clicking View Feedback opens feedback page.

**Branch Example:** `thelma/resume-reviews-tests`

---

## Anshuma — Usage Metrics (Real-time Activity)
**Folder:** `ui_tests/features/usage-metrics/real-time-activity/`

**Example Features:**
- `realtime-activity-loads.feature` — Real-time Activity tab loads correctly.
- `date-pills-update-counters.feature` — Time filters update counts.
- `total-actions-visible.feature` — Total actions displayed at bottom.

**Branch Example:** `anshuma/usage-metrics-realtime`

---

## Joe — Usage Metrics (Expert Interviews)
**Folder:** `ui_tests/features/usage-metrics/expert-interviews/`

**Example Features:**
- `expert-interviews-tab-loads.feature` — Tab loads correctly.
- `scheduled-and-completed-cards-visible.feature` — Displays correct counts.
- `refresh-updates-stats.feature` — Refresh button updates values.

**Branch Example:** `joe/usage-metrics-expert-interviews`

---

## Amanda — Usage Metrics (Platform Analytics)
**Folder:** `ui_tests/features/usage-metrics/platform-analytics/`

**Example Features:**
- `platform-analytics-loads.feature` — Platform Analytics tab loads correctly.
- `switch-timeframes.feature` — Switching date ranges updates analytics.
- `summary-cards-visible.feature` — Summary cards display totals.

**Branch Example:** `amanda/usage-metrics-platform-analytics`

---

## Folder Structure Example

```
ui_tests/
  features/
    login/
    dashboard/
    usage-metrics/
      overview/
      student-readiness/
      real-time-activity/
      expert-interviews/
      platform-analytics/
    all-users/
    mentors/
    mentor-assignments/
    system-health/
    coding-problems/
    interview-questions/
    resume-reviews/
    profile/
```

---

### Guidelines for All Students

- Write **positive, user-focused BDD tests** using Gherkin syntax.
- Keep scenarios small, business-readable, and easy to automate later.
- Use **kebab-case** for branch names, folders, and files.
- Commit and push frequently, and open **one PR per feature or pair of related scenarios**.
- Always run `npm run bdd:pretty` in Codespaces to validate syntax locally.

---

### Example Template

```gherkin
Feature: View mentor list
  As an admin
  I want to see all mentors and their assigned students
  So that I can track mentor engagement

  @smoke
  Scenario: Mentor list loads successfully
    Given I am logged in as an admin
    When I navigate to the Mentors section
    Then I should see a list of mentors with emails and student counts
```
