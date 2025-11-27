@wip
Feature: Application Tracker Load 
As a Student, I want to login successfully to my account
So I can verify the Application Tracker loads correctly

Scenario: Successful loading of tracker dashboard
  Given the Student is authenticated in the system
  When they select "Job Tracker" from the features list
  Then the dashboard should load correctly
  And the Student should be able to access their application tracker without issues


Scenario: Unsuccessful loading of tracker dashboard
  Given the Student has valid credentials
  When they log in to the system
  And select "Job Tracker" from the features list
  Then the dashboard should not load successfully
  And the Student should not be able to access their application tracker

Scenario: Dashboard loads but application tracker cannot be accessed
  Given the Student is authenticated in the system
  When they open the "Job Tracker" dashboard
  Then the dashboard frame should load
  But the application tracker data should fail to load
