Feature: Career Diary selections on the Dashboard

Background: Login
Given the student is logged in
And the student is on the Dashboard page
And the student is viewing the Career Diary section

Scenario: Student selects the "Struggling" mood
When the student clicks the "Struggling" button
Then the system should record the student's mood as "Struggling"
And the button will turn red 

Scenario: Student selects the "Challenging" mood
When the student clicks the "Challenging" button
Then the system should record the student's mood as "Challenging"
And the button will turn orange

Scenario: Student selects the "Ok" mood
When the student clicks the "Ok" button
Then the system should record the student's mood as "Ok"
And the button will turn grey

Scenario: Student selects the "Good" mood
When the student clicks the "Good" button
Then the system should record the student's mood as "Good"
And the button will turn blue

Scenario: Student selects the "Excellent" mood
When the student clicks the "Excellent" button
Then the system should record the student's mood as "Excellent"
And the button will turn green

Scenario: Studen selects an energy level
When the student selects energy level "1"
Then the system should record the student's energy level as "1"
And the button will turn orange

Scenario: Studen selects an energy level
When the student selects energy level "2"
Then the system should record the student's energy level as "2"
And the button will turn orange

Scenario: Studen selects an energy level
When the student selects energy level "3"
Then the system should record the student's energy level as "3"
And the button will turn orange

Scenario: Studen selects an energy level
When the student selects energy level "4"
Then the system should record the student's energy level as "4"
And the button will turn orange

Scenario: Studen selects an energy level
When the student selects energy level "5"
Then the system should record the student's energy level as "5"
And the button will turn orange

Scenario: Studen selects an confidence level
When the student selects confidence level "1"
Then the system should record the student's confidence level as "1"
And the button will turn green 

Scenario: Studen selects an confidence level
When the student selects confidence level "2"
Then the system should record the student's confidence level as "2"
And the button will turn green 

Scenario: Studen selects an confidence level
When the student selects confidence level "3"
Then the system should record the student's confidence level as "3"
And the button will turn green 

Scenario: Studen selects an confidence level
When the student selects confidence level "4"
Then the system should record the student's confidence level as "4"
And the button will turn green 

Scenario: Student selects an confidence level
When the student selects confidence level "5"
Then the system should record the student's confidence level as "5"
And the button will turn green 

Scenario: Student selects "Add Details (Optional)"
When the student selects "Add Details (Optional)"
Then the button should turn purple
And the "Hide details" button should appear
And the "Carrer Wins & Achievements" section should expand and become visible
And the "Challenges & Growth Areas" section should expand and become visible
And the "Daily Reflection (Optional)" section should become visible

Scenario: Student clicks the "Need Ideas" link to view suggestion options
When the student clicks the "Need Ideas" link
Then a list of suggestion options should appear
And the list should include:
  option
  Completed a job application
  Had a good interview
  Learned a new skill
  Recieved positive feedback
  Made a new professional connection
  Finished a project

Scenario: Student selects the "+" button to add a new win
Given the student is logged in
And the student is on the Dashboard page
And the student is viewing the Career Diary section
And the "+" button is visible in the Career Wins & Achievements section

When the student clicks the "+" button
Then a "Describe your win" text box should appear
And the text box should be ready for the student to enter their response

Scenario: Student removes the “Describe your win” text box
Given the student is logged in
And the student is on the Dashboard page
And the student is viewing the Career Diary section
And a "Describe your win" text box is visible
And a red trashcan icon is displayed for that text box

When the student clicks the red trashcan icon
Then the "Describe your win" text box should be removed
And no empty placeholder or text area should remain in its place

Scenario: Student selects “Common Areas” and options become available
Given the student is logged in
And the student is on the Dashboard page
And the student is viewing the Career Diary section
And the "Common Areas" dropdown or selection button is visible

When the student clicks the "Common Areas" option
Then a list of selectable options should appear
And the list should include:
  option 
  Interview Preparation 
  Résumé Improvement
  Skill Gap Identification 
  Time Management 
  Confidence Building 
  Networking Opportunity 

Scenario: Student removes the “What challenge did you face?” text box
Given the student is logged in
And the student is on the Dashboard page
And the student is viewing the Career Diary section
And a "What challenge did you face?" text box is visible
And a red trashcan icon is displayed for that text box

Scenario: Student selects the "+" button to add a new win
Given the student is logged in
And the student is on the Dashboard page
And the student is viewing the Career Diary section
And the "+" button is visible in the Challenges & Growth Areas section

When the student clicks the "+" button
Then a "What challenge did you face?" text box should appear
And the text box should be ready for the student to enter their response

Scenario: Student cancels without completing any Career Diary sections
Given the student is logged in
And the student is on the Dashboard page
And the student is viewing the Career Diary section
And no mood, energy level, details, or reflection sections have been filled out
And the "Cancel" button is visible

When the student clicks the "Cancel" button
Then the system should discard any unsubmitted or empty entries
And the student should be redirected to a confirmation page
And the confirmation page should display the message "Great job tracking your mood today"

Scenario: Student completes the Career Diary and selects “Save”
Given the student is logged in
And the student is on the Dashboard page
And the student is viewing the Career Diary section
And the student has entered information in the Career Wins & Achievements section
And the student has entered information in the Challenges & Growth Areas section
And the student has entered information in the Daily Reflection section
And the student has selected an Energy Level
And the student has selected a Confidence Level
And the "Save" button is visible

When the student clicks the "Save" button
Then the system should save all completed Career Diary entries
And the current date should appear on the saved diary entry
And the saved diary entry should display:
  section |
  Career Wins & Achievements |
  Challenges & Growth Areas |
  Daily Reflection |
  Energy Level |
  Confidence Level |
Then the student should be redirected or shown a confirmation of their saved Career Diary

Scenario: Student navigates between Career Diary dates using back and forward arrows
Given the student is logged in
And the student is on the Dashboard page
And the student is viewing the Career Diary for the current date
And back and forward navigation arrows are visible

When the student clicks the back arrow
Then the Career Diary should display the previous date’s entry
And the displayed date should update to the previous date

When the student clicks the forward arrow
Then the Career Diary should display the current date’s entry
And the displayed date should update back to the current date