Feature: Skills Assessment

Scenario: No data inputted into assessment
Given the student submits assessment with no data
Then the student should see an error message

Scenario: Career Roadmap Generation
Given the student is authenticated in the system
And completed the Career Path assessment
When the student submits assessment
Then the student should see a personalized Roadmap
And tabs "career Roadmap, "Learning Resources", "Industry Insights" and "Project Ideas" should display relevant information based on Target Role

Scenario: Assessment Validation of Required Fields
Given the student is authenticated in the system
And the user starts the assessment
When they submit with missing required fields
Then validation errors should display
And the submission should fail