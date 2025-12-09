Feature: Interviews under Interview Prep Category
    
    
    Scenario: When user goes to the page, the page loads as expected
        Given the student is authenticated in the system
        When the user navigates to the Interview prep page
        Then the Interview Prep page displays

    
    Scenario: Student clicks on "Peer Interviews"
        Given the student is authenticated in the system
        And the student is on the Interview Prep page
        When the student clicks on the "Schedule Your First Interview" button
        And the student selects "Peer Interviews"
        Then the student should see an option to join or schedule a peer interview session
  
    @wip
    Scenario: Student succesfully schedules a Peer Interview
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "Peer Interviews" 
        When the student clicks on the "Schedule Interview" button
        And clicks on the "Create New Session" option
        And inputs a valid date and time for the interview
        And inpits a valid interview topic
        And inputs a valid difficulty level
        And clicks on thje "Create Session" button
        Then the student should see a confirmation message indicating the interview has been scheduled
        And the new interview should appear in the list of scheduled peer interviews

    @wip
    Scenario: Student sucesfully joins a Peer Interview session
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "Peer Interviews" 
        When the student selects an upcoming peer interview session from the list
        And clicks on the "Join Session" button
        Then the student should be redirected to the interview session interface
        And the student should see the details of the interview session including topic, date, time, and participants

    @wip
    Scenario: Student cancels a scheduled Peer Interview session
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "Peer Interviews" 
        When the student selects a scheduled peer interview session from the list
        And clicks on the "Cancel Session" button
        Then a confirmation prompt should appear asking the student to confirm the cancellation
        When the student confirms the cancellation
        Then the selected peer interview session should be removed from the list of scheduled interviews
        And the student should see a confirmation message indicating the session has been cancelled

    @wip
    Scenario: Student clicks on "Provide Feedback" for a completed Peer Interview session
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "Peer Interviews" 
        When the student selects a completed peer interview session from the list
        And clicks on the "Provide Feedback" button
        Then the student should see a feedback form with fields for rating and comments
        When the student fills out the feedback form and submits it
        Then the student should see a confirmation message indicating the feedback has been submitted
    
    @wip
    Scenario: Student clicks on "Expert Interviews"
        Given the student is authenticated in the system
        And the student is on the "Interviews" subcategory page
        When the student clicks on the "Expert Interviews" button
        Then the student should see a list of expert interview sessions available for booking
        And the student can join and/or book a session with an industry expert
    
    @wip
    Scenario: Student succesfully books an Expert Interview session
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "Expert Interviews" 
        When the student clicks on the "Schedule Interview" button
        And selects an available mentor from the list
        And selects a date and time for the interview
        And clicks on the "Create Session" button
        Then the student should see a confirmation message indicating the expert interview has been booked
        And the new expert interview should appear in the list of booked expert interviews

    @wip
    Scenario: Student succesfully joins an Expert Interview session
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "Expert Interviews" 
        When the student selects a booked expert interview session from the list
        And clicks on the "Join Session" button
        Then the student should be redirected to the expert interview session interface
        And the student should see the details of the interview session including expert name, topic, date, time, and participants
    
    @wip
    Scenario: Student clicks on "AI Interviews"
        Given the student is authenticated in the system
        And the student is on the "Interviews" subcategory page
        When the student clicks on the "AI Interviews" button
        Then the student should see a list of AI-powered interview simulations
        And the student can start and/or schedule a new AI interview session

    @wip
    Scenario: Student succesfully starts an AI Interview session
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "AI Interviews" 
        And gave the browser permissions to access microphone
        When the student clicks on the "Start AI Interview" button
        Then the AI interview session should begin
        And the student should see the AI interview questions and be able to respond to them
        And the student should be able to end the session by clicking on the "End Session" button at any time

    @wip
    Scenario: Student views past AI Interview sessions
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "AI Interviews" 
        When the student clicks on the "Past Sessions" tab
        Then the student should see a list of previously completed AI interview sessions
        And the student can review their performance and feedback for each session

    @wip
    Scenario: Student views the AI analysis of past AI Interview sessions
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "AI Interviews" 
        When the student selects a past AI interview session from the list
        And clicks on the "View Analysis" button
        Then the student should see a detailed analysis of their performance including strengths, weaknesses, and areas for improvement
    
    @wip
    Scenario: Student views transcriptions of past AI Interview sessions
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "AI Interviews" 
        When the student selects a past AI interview session from the list
        And clicks on the "View Transcription" button
        Then the student should see a complete transcription of their responses during the AI interview session

    @wip
    Scenario: Student downloads transcriptions of past AI Interview sessions
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "AI Interviews" 
        When the student selects a past AI interview session from the list
        And clicks on the "Download Transcription" button
        Then the student should be able to download the transcription as a text file or PDF document
        And if the student clicked on the AI analysis prior to downloading the transcription, the analysis report should be included in the download as well
    
    @wip
    Scenario: Student deletes a past AI Interview session
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "AI Interviews" 
        When the student selects a past AI interview session from the list
        And clicks on the "Delete Session" button
        Then a confirmation prompt should appear asking the student to confirm the deletion
        When the student confirms the deletion
        Then the selected AI interview session should be removed from the list of past sessions
        And the student should see a confirmation message indicating the session has been deleted
    
    @wip
    Scenario: Student cannots start an AI Interview session without microphone permissions
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "AI Interviews" 
        When the student clicks on the "Start AI Interview" button without granting microphone permissions
        Then the student should see an error message indicating that microphone access is required to start the AI interview session
        And the AI interview session should not begin until microphone permissions are granted
    
    @wip
    Scenario: Student tries to schedule a session when no time slots are available for "Expert Interviews"
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "Expert Interviews" 
        When the student clicks on the "Schedule Interview" button
        And there are no available time slots for any experts
        Then the student should see a message indicating that no time slots are currently available
        And the student should be prompted to check back later or contact support for assistance

    @wip
    Scenario: Student tries to schedule a session when there's no experts or mentors assigned to the student
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "Expert Interviews" 
        When the student clicks on the "Schedule Interview" button
        And there are no experts or mentors assigned to the student
        Then the student should see a message indicating that no experts or mentors are currently available
        And the student should be prompted to contact support for assistance or check back later
    
    @wip
    Scenario: Student tries to schedule a session for a past date/time for "Peer Interviews"
        Given the student is authenticated in the system
        And the student is on the "Interviews" page
        And selected "Peer Interviews" 
        When the student clicks on the "Schedule Interview" button
        And inputs a past date and time for the interview
        Then the student should see an error message indicating that scheduling for past dates/times is not allowed
        And the student should be prompted to select a valid future date and time for the interview
    
    


