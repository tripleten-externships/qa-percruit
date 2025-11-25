#!/bin/bash

cd /Users/jcost/coding/ex20/qa-percruit

# Rename expert-interviews features to kebab-case
git mv ui_tests/features/usage-metrics/expert-interviews/All-Expert-Interview.feature ui_tests/features/usage-metrics/expert-interviews/all-expert-interview.feature
git mv ui_tests/features/usage-metrics/expert-interviews/Completed-Expert-Interview.feature ui_tests/features/usage-metrics/expert-interviews/completed-expert-interview.feature
git mv ui_tests/features/usage-metrics/expert-interviews/Scheduled-Expert-Interview.feature ui_tests/features/usage-metrics/expert-interviews/scheduled-expert-interview.feature
git mv ui_tests/features/usage-metrics/expert-interviews/Search-By-Expert.feature ui_tests/features/usage-metrics/expert-interviews/search-by-expert.feature
git mv ui_tests/features/usage-metrics/expert-interviews/Search-By-Student.feature ui_tests/features/usage-metrics/expert-interviews/search-by-student.feature
git mv ui_tests/features/usage-metrics/expert-interviews/Search-By-Topic.feature ui_tests/features/usage-metrics/expert-interviews/search-by-topic.feature

# Rename dashboard feature
git mv ui_tests/features/dashboard/system.status.feature ui_tests/features/dashboard/system-status.feature

# Rename interview-questions features (expand "ques" to "questions")
git mv ui_tests/features/interview-questions/ques-preview-with-properties.feature ui_tests/features/interview-questions/question-preview-with-properties.feature
git mv ui_tests/features/interview-questions/filter-ques-by-difficulty.feature ui_tests/features/interview-questions/filter-questions-by-difficulty.feature
git mv ui_tests/features/interview-questions/filter-ques-by-job-title.feature ui_tests/features/interview-questions/filter-questions-by-job-title.feature
git mv ui_tests/features/interview-questions/search-ques-by-keyword.feature ui_tests/features/interview-questions/search-questions-by-keyword.feature
git mv ui_tests/features/interview-questions/total-ques-count-by-difficulty.feature ui_tests/features/interview-questions/total-questions-count-by-difficulty.feature
git mv ui_tests/features/interview-questions/total-ques-count-by-job.feature ui_tests/features/interview-questions/total-questions-count-by-job.feature

# Rename folders
git mv ui_tests/features/mentor-list-test ui_tests/features/mentor-list
git mv ui_tests/features/student-readiness-code ui_tests/features/student-readiness-coding

echo "File and folder renaming complete!"
