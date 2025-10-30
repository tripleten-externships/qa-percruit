@wip
Feature: Skill Summary Card Percentage Display

As a user reviewing my profile user wants to see the total percentage achieved for each
skill displayed on summary card

@smoke
Scenario: Summary Card Displays total percentage for single skill
Given the user is viewing Career Insights Most-in-demand-skills (2025) card and
the user clicked on programming icon
When the summary card loads
Then the section for programming should be visible and the displayed percentage for 
python should be 95% and the displayed percentage for r programming should be 45%

@wip
Feature: 