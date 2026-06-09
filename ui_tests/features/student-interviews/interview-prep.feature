Feature: Interview under Interview Prep Category
    
    
    Scenario: When user goes to the page, the page loads as expected
        Given the student is authenticated in the system
        When I add the title When user goes to the page, the page loads as expected. to the log
        When the user navigates to the Interview prep page
        Then the Interview Prep page displays

    
    Scenario: Student clicks on Peer Interview
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        When I add the title Student clicks on Peer Interview to the log
        When the student clicks on the Schedule Interview button
        And the student selects "Peer Interview"
        Then the student should see an option to join or schedule a Peer Interview session
    
    Scenario: Student clicks on Expert Interview
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        When I add the title Student clicks on Expert Interview to the log
        When the student clicks on the Schedule Interview button
        And the student selects "Expert Interview"
        Then the student should see an option to join or schedule an Expert Interview session

    
    Scenario: Student clicks on AI Practice
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        When I add the title Student clicks on AI Practice to the log
        When the student clicks on the Schedule Interview button
        And the student selects "AI Practice"
        Then the student should see an option to start or end an AI Practice session

    
    Scenario: Student successfully schedules a Peer Interview
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        When I add the title Student successfully schedules a Peer Interview to the log
        When the student clicks on the Schedule Interview button
        And the student selects "Peer Interview"
        And the student clicks on the Create New Session option
        And clicks on the Create Session button
        Then the Interview Prep page displays
        And Upcoming Sessions list shows the newly scheduled Peer Interview with correct details
    
    @wip
    Scenario: Student successfully books an Expert Interview session
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        When I add the title Student successfully books an Expert Interview session to the log
        When the student clicks on the Schedule Interview button
        And the student selects "Expert Interview"
        And inputs a valid Mentor date for the interview
        And selects a valid Mentor time slot for the interview
        And the student clicks on the Next button
        And inputs a valid mentor interview topic
        And clicks on the Schedule Interview button on the Expert Interview form
        Then the Interview Prep page displays
        And Upcoming Sessions list shows the newly scheduled Expert Interview with correct details

    @wip
    Scenario: Student successfully starts an AI Practice session
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "AI Practice" 
        And gave the browser permissions to access microphone
        When I add the title Student successfully starts an AI Practice session to the log
        When the student clicks on the Start AI Practice button
        Then the AI Practice session should begin
        And the student should see the AI Practice questions and be able to respond to them
        And the student should be able to end the session by clicking on the End Session button at any time

    @wip
    Scenario: Student successfully joins a Peer Interview session
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "Peer Interview" 
        When I add the title Student successfully joins a Peer Interview session to the log
        When the student selects an upcoming peer interview session from the list
        And clicks on the Join Session button
        Then the student should be redirected to the interview session interface
        And the student should see the details of the interview session including topic, date, time, and participants

    @wip
    Scenario: Student cancels a scheduled Peer Interview session
        Given the student is authenticated in the system
        And the student is on theInterview page
        And selects "Peer Interview" 
        When I add the title Student cancels a scheduled Peer Interview session to the log
        When the student selects a scheduled peer interview session from the list
        And clicks on the Cancel Session button
        Then a confirmation prompt should appear asking the student to confirm the cancellation
        When the student confirms the cancellation
        Then the selects peer interview session should be removed from the list of scheduled Interview
        And the student should see a confirmation message indicating the session has been cancelled

    @wip
    Scenario: Student clicks on Provide Feedback for a completed Peer Interview session
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "Peer Interview" 
        When I add the title Student clicks on Provide Feedback for a completed Peer Interview session to the log
        When the student selects a completed peer interview session from the list
        And clicks on the Provide Feedback button
        Then the student should see a feedback form with fields for rating and comments
        When the student fills out the feedback form and submits it
        Then the student should see a confirmation message indicating the feedback has been submitted

    @wip
    Scenario: Student successfully joins an Expert Interview session
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "Expert Interview" 
        When I add the title Student successfully joins an Expert Interview session to the log
        When the student selects a booked expert interview session from the list
        And clicks on the Join Session button
        Then the student should be redirected to the expert interview session interface
        And the student should see the details of the interview session including expert name, topic, date, time, and participants
    
    @wip
    Scenario: Student views past AI Practice sessions
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "AI Practice" 
        When I add the title Student views past AI Practice sessions to the log
        When the student clicks on the Past Sessions tab
        Then the student should see a list of previously completed AI Practice sessions
        And the student can review their performance and feedback for each session

    @wip
    Scenario: Student views the AI analysis of past AI Practice sessions
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "AI Practice"
        When I add the title Student views the AI analysis of past AI Practice sessions to the log
        When the student selects a past AI Practice session from the list
        And clicks on the View Analysis button
        Then the student should see a detailed analysis of their performance including strengths, weaknesses, and areas for improvement
    
    @wip
    Scenario: Student views transcriptions of past AI Practice sessions
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "AI Practice" 
        When I add the title Student views transcriptions of past AI Practice sessions to the log
        When the student selects a past AI Practice session from the list
        And clicks on the View Transcription button
        Then the student should see a complete transcription of their responses during the AI Practice session

    @wip
    Scenario: Student downloads transcriptions of past AI Practice sessions
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "AI Practice" 
        When I add the title Student downloads transcriptions of past AI Practice sessions to the log
        When the student selects a past AI Practice session from the list
        And clicks on the Download Transcription button
        Then the student should be able to download the transcription as a text file or PDF document
        And if the student clicked on the AI analysis prior to downloading the transcription, the analysis report should be included in the download as well
    
    @wip
    Scenario: Student deletes a past AI Practice session
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "AI Practice" 
        When I add the title Student deletes a past AI Practice session to the log
        When the student selects a past AI Practice session from the list
        And clicks on the Delete Session button
        Then a confirmation prompt should appear asking the student to confirm the deletion
        When the student confirms the deletion
        Then the selects AI Practice session should be removed from the list of past sessions
        And the student should see a confirmation message indicating the session has been deleted
    
    @wip
    Scenario: Student cannots start an AI Practice session without microphone permissions
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "AI Practice" 
        When I add the title Student cannots start an AI Practice session without microphone permissions to the log
        When the student clicks on the Start AI Practice button without granting microphone permissions
        Then the student should see an error message indicating that microphone access is required to start the AI Practice session
        And the AI Practice session should not begin until microphone permissions are granted
    
    @wip
    Scenario: Student tries to schedule a session when no time slots are available for Expert Interview
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "Expert Interview" 
        When I add the title Student tries to schedule a session when no time slots are available for Expert Interview to the log
        When the student clicks on the Schedule Interview button
        And there are no available time slots for any experts
        Then the student should see a message indicating that no time slots are currently available
        And the student should be prompted to check back later or contact support for assistance

    @wip
    Scenario: Student tries to schedule a session when there's no experts or mentors assigned to the student
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "Expert Interview" 
        When I add the title Student tries to schedule a session when there's no experts or mentors assigned to the student to the log
        When the student clicks on the Schedule Interview button
        And there are no experts or mentors assigned to the student
        Then the student should see a message indicating that no experts or mentors are currently available
        And the student should be prompted to contact support for assistance or check back later
    
    @wip
    Scenario: Student tries to schedule a session for a past date/time for Peer Interview
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        And selects "Peer Interview" 
        When I add the title Student tries to schedule a session for a past date/time for Peer Interview to the log
        When the student clicks on the Schedule Interview button
        And inputs a past date and time for the interview
        Then the student should see an error message indicating that scheduling for past dates/times is not allowed
        And the student should be prompted to select a valid future date and time for the interview
    
    


