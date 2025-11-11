
Feature: Add Question
  As an Admin
  The user wants to open a form to add a new interview question
  So that new questions can be added to the system for interview practice

  Background:
    Given the Admin is authenticated in the system
    And the Admin views the Interview Questions page

  Scenario: Adding a new question 
    When the Admin adds a new interview question with valid details
    Then the question is successfully saved
    And the Admin should see the added question correctly displayed on Interview Questions page
@wip
  Scenario: Displaying the Add Question form modal
    When the admin selects the "Add Question" button
    Then a form modal is displayed containing the following fields:
      | Field Name    | Type        |
      | Title         | Text Field  |
      | Question      | Text Area   |
      | Solution      | Text Area   |
      | Tags          | Text Field  |
      | Difficulty    | Dropdown    |
      | Job Title     | Dropdown    |
    
    And the form provides options to add or remove following containers:
      | Container Type  |
      | Text Container  |
      | Image Container |
    And the form displays "Save" and "Cancel" buttons

 @wip
  Scenario: Saving a new question successfully
    When the Admin enters valid information in all required fields in form modal to add a new question
    And the Admin selects the "Save" button
    Then the new question is saved
    And the modal closes
    And the newly added question appears in the Questions Management list
@wip
  Scenario: Cancelling the add question process
    Given the Add Question form modal is open
    When the Admin selects the "Cancel" button
    Then the modal closes
    And no new question is added

 