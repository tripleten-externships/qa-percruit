@wip 
Feature: Successfully viewing weekly job applications

As a job seeker, the ability to view all jobs with submitted applications is provided, enabling tracking of application progress and facilitating follow-up when needed.

Background:
The user is logged into the application.
The following job applications exist:
  | Job Title                              | Status        | Date Saved |
  | Software Engineer Visa                  | Interviewing  | 10/16/25   |
  | Software Developer Oracle               | Applied       |            |
  | Entry Level Software Engineer Developer | Negotiating   |            |

@wip
Scenario: All job applications and their status are displayed
When the weekly application view is accessed
Then a list is shown containing all jobs the user has applied for
And Software Engineer Visa is displayed with status Interviewing
And Software Developer Oracle is displayed with status Applied
And Entry Level Software Engineer Developer is displayed with status Negotiating

@wip
Scenario: Software Engineer job details and date saved are displayed
When the weekly application view is accessed
Then a list is shown containing all jobs the user has applied for
And Software Engineer Visa is selected
Then the date saved 10/16/25 and job description are displayed

@wip
Scenario: No active job applications are present
Given the user has no active job applications
When the weekly application view is accessed
Then a message is displayed stating "you have no active job applications"
And no job listings or application status are shown
