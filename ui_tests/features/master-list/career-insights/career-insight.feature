Feature:Percruit Career-insights page

  @wip
  Scenario:Career Insights page opens up 
    Given the student is authenticated in the system 
    When student clicks on the career insights from the side menu
    Then the career insights page is displayed

  @wip
  Scenario: Career Insights page shows target role
    Given the Student is authenticated in the system
    When student selects career insights
    Then Career Insights page opens up
    And displays the target role on the page

  @wip
  Scenario: Career Insights page shows metrics for target role successfully
    Given the Student is authenticated in the system
    When student selects a career insights from the side menu
    Then Career Insights displays metrics for the target role
    And the student should see Job Growth Rate
    And the student should see Annual Job Openings
    And the student should see Talent shortage 
    And the student should see ML Engineer Growth

  @wip
  Scenario: Verify user can scroll to view Salary Ranges by Role & Experience (2025)
    Given the student is authenticated in the system
    When the student selects the career insights from the side menu
    Then the student should see the target role metrics 
    And the student should be able to scroll down
    And the student should see Salary Ranges by Role & Experience (2025) below the fold
    And the student should see a bar diagram displaying salary ranges for various roles and Experience

  @wip
  Scenario: Verify user can scroll to view Industry distribution and work arrangements adjacently
    Given the student is authenticated in the system
    When the student selects the career insights from the side menu
    Then the student should be able to scroll to see a bar diagram displaying salary ranges for various roles and Experience
    And work arrangements adjacent to the Industry distribution

  @wip
  Scenario: Verify user can scroll to view Career Progression Path
    Given the student is authenticated in the system
    When the student selects the career insights from the side menu
    Then the student should be able to scroll to see Career Progression path 
    And entry-level tile
    And Mid-level tile
    And Senior-level tile
    And leadership tile

  @wip
  Scenario: Verify user can scroll to view Top Companies Hiring Data Professionals
    Given the student is authenticated in the system
    When the student selects the career insights from the side menu
    Then the student should be able to scroll to see Companies Hiring Data Professionals
    And view technology tile
    And view Finance tile
    And view Healthcare tile
    And view Retail tile
    And view consulting tile

  @wip
  Scenario: Verify user can scroll to view Key Insights & Recommendations
    Given the student is authenticated in the system
    When the student selects the career insights from the side menu
    Then the student should be able to scroll to see Key Insights & Recommendations
    And view Market opportunities
    And view the bullet points below Market opportunities
    And view Success Strategies
    And view bullet points below the Success Strategies

  @wip
  Scenario: Question appears at bottom of the page
    Given the student is authenticated in the system
    When the student scrolls to the bottom of the page
    Then the student should see the question text displayed at the bottom of the page
    And the question is not visible at the top of the page 
    
        

