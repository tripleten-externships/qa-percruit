# Manual Refactoring Steps

Due to technical issues with automated execution, please run these commands manually in your terminal.

## Status So Far

✅ **Completed:**
- Moved `sprint-4-assignments.md` to `ui_tests/docs/`
- Removed `master-list` directory
- Consolidated login features into `ui_tests/features/login/`

## Remaining Steps

### 1. Rename Feature Files to kebab-case

```bash
cd /Users/jcost/coding/ex20/qa-percruit

# Rename expert-interviews features (PascalCase -> kebab-case)
git mv ui_tests/features/usage-metrics/expert-interviews/All-Expert-Interview.feature ui_tests/features/usage-metrics/expert-interviews/all-expert-interview.feature
git mv ui_tests/features/usage-metrics/expert-interviews/Completed-Expert-Interview.feature ui_tests/features/usage-metrics/expert-interviews/completed-expert-interview.feature
git mv ui_tests/features/usage-metrics/expert-interviews/Scheduled-Expert-Interview.feature ui_tests/features/usage-metrics/expert-interviews/scheduled-expert-interview.feature
git mv ui_tests/features/usage-metrics/expert-interviews/Search-By-Expert.feature ui_tests/features/usage-metrics/expert-interviews/search-by-expert.feature
git mv ui_tests/features/usage-metrics/expert-interviews/Search-By-Student.feature ui_tests/features/usage-metrics/expert-interviews/search-by-student.feature
git mv ui_tests/features/usage-metrics/expert-interviews/Search-By-Topic.feature ui_tests/features/usage-metrics/expert-interviews/search-by-topic.feature

# Rename dashboard feature (dot notation -> kebab-case)
git mv ui_tests/features/dashboard/system.status.feature ui_tests/features/dashboard/system-status.feature

# Rename interview-questions features (expand abbreviation "ques" -> "questions")
git mv ui_tests/features/interview-questions/ques-preview-with-properties.feature ui_tests/features/interview-questions/question-preview-with-properties.feature
git mv ui_tests/features/interview-questions/filter-ques-by-difficulty.feature ui_tests/features/interview-questions/filter-questions-by-difficulty.feature
git mv ui_tests/features/interview-questions/filter-ques-by-job-title.feature ui_tests/features/interview-questions/filter-questions-by-job-title.feature
git mv ui_tests/features/interview-questions/search-ques-by-keyword.feature ui_tests/features/interview-questions/search-questions-by-keyword.feature
git mv ui_tests/features/interview-questions/total-ques-count-by-difficulty.feature ui_tests/features/interview-questions/total-questions-count-by-difficulty.feature
git mv ui_tests/features/interview-questions/total-ques-count-by-job.feature ui_tests/features/interview-questions/total-questions-count-by-job.feature
```

### 2. Rename Folders for Consistency

```bash
# Rename folders
git mv ui_tests/features/mentor-list-test ui_tests/features/mentor-list
git mv ui_tests/features/student-readiness-code ui_tests/features/student-readiness-coding
```

### 3. Verify Structure

After running the above commands, your structure should look like:

```
ui_tests/features/
├── coding-problems/
├── dashboard/
├── interview-questions/
├── login/
├── mentor-assignments/
├── mentor-events/
├── mentor-list/           (renamed from mentor-list-test)
├── profile/
├── resume-reviews/
├── student-readiness/
├── student-readiness-coding/  (renamed from student-readiness-code)
├── system-health/
└── usage-metrics/
    ├── expert-interviews/
    ├── overview/
    └── real-time-activity/
```

### 4. Check Git Status

```bash
git status
```

You should see all the renames staged for commit.

### 5. Continue with Remaining Configuration

After completing these manual steps, I'll continue with:
- Setting up multi-externship environment configuration
- Updating cucumber.js if needed
- Verifying all tests can be discovered
