
Feature: Industry news screen tests

    Scenario: When user goes to the page, the page loads as expected.
        Given the Student is authenticated in the system
        When the user navigates to the Industry News webpage
        Then the Industry News webpage displays

    @wip
    Scenario: Verify selected preferences keyword is displayed for each article when user selects and saves preference from dropdown
        Given the Student is authenticated in the system
        And the user navigates to the Industry News webpage
        When the user selects 'preferences'
        And Selects a /keyword/ from the preferences dropdown
        Then the selected preference keyword is displayed for each article

    #Articles
    @wip
    Scenario: Verify when the user selects an article title, it opens in a new tab
        Given the Student is authenticated in the system
        And the user navigates to the Industry News webpage
        When user selects an article title
        Then the article opens in a new tab
    @wip
    Scenario: Verify when the user selects comments, the comments are displayed for that article
        Given the Student is authenticated in the system
        And the user navigates to the Industry News webpage
        When user selects the comments button for an article
        Then the comments are displayed for that article

    @wip
    Scenario: Verify when use selects sort by date, the articles are listed from newest to oldest
        Given the Student is authenticated in the system
        When the user navigates to the Industry News webpage
    @wip   
    Scenario: Verify when user selects close after opening comments, that the popup closes
        Given the Student is authenticated in the system
        When the user navigates to the Industry News webpage

    #  Feature: Filter Articles by Field of Interest
    # As a student
    # The user wants to filter articles by field of interest
    # Background:
    # Given the student is authenticated in the system
    # And the student views the Industry News page
    # And no preferences are applied

    @wip
    Scenario: View all articles when no preferences are applied
        Given the user is authenticated in the system
        And the user navigates to the Industry News webpage
        When no preferences are applied
        Then all articles are displayed

    @wip
    Scenario: Filter articles by a single field of interest
        Given the user is authenticated in the system
        And the user navigates to the Industry News webpage
        When the user applies a single field of interest preference
        #When the user selects <Preferences> from the industry news page
        #And the user selects <Field of interest> from the Field of Interest filter
        #Then the user should see all articles relevant to <field of interest> tag
        Then only articles related to that field of interest are displayed

    @wip
    Scenario: Search articles by keyword only
        Given the user is authenticated in the system
        And the user navigates to the Industry News webpage
        And no preferences are applied
        When the user enters a keyword in the search box
        Then only articles containing that keyword are displayed

    @wip
    Scenario: No articles match the keyword
        Given the user is authenticated in the system
        And the user navigates to the Industry News webpage
        And no preferences are applied
        When the user enters a non-matching keyword in the search box
        Then the user sees a 'No articles found' message