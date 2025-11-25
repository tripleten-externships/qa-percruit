Feature: Selecting the most in-demand skills for various domains.
Student  wants to filter skills by category So that the student can quickly find the skills in demand for the domain they are in
for a specific domain.

  @wip
  Scenario: Filter the domains by category "All"
    Given The student is authenticated in the system
    And the domains contains multiple categories
    When the student selects the category "All" from the domain tabs
    Then The student should see only skills from the "All" category
    And the skills list should not contain skills from other categories

  @wip
  Scenario: ALl the skills are displayed when nothing is selected
    Given The student is authenticated in the system
    And the domains contains multiple categories
    When the student does not select any category from the domain tabs
    Then The student should see the  skills from the "All" category

  @wip
  Scenario: Filter the domains  by category "Programming"
    Given The student is authenticated in the system
    And the domains contains multiple categories
    When the student selects the category "Programming" from the domain tabs
    Then The student should see only skills from the "Programming" domain
    And the skills list should not contain skills from other domain

  @wip
  Scenario: Filter the domains  by category "AI/ML"
    Given The student is authenticated in the system
    And the domains contains multiple categories
    When the student selects the category "AI/ML" from the domain tabs
    Then The student should see only skills from the "AI/ML" category
    And the skills list should not contain skills from other categories

  @wip
  Scenario: Filter the domains  by category "Infrastructure"
    Given The student is authenticated in the system
    And the domains contains multiple categories
    When the student selects the category "Infrastructure" from the domain tabs
    Then The student should see only skills from the "Infrastructure" category
    And the skills list should not contain skills from other categories

  @wip
  Scenario: Filter the domains  by category "Analytics"
    Given The student is authenticated in the system
    And the domains contains multiple categories
    When the student selects the category ""Analytics"" from the domain tabs
    Then The student should see only skills from the "Analytics" category
    And the skills list should not contain skills from other categories

  @wip
  Scenario: Filter the domains  by category "Mathematics"
    Given The student is authenticated in the system
    And the domains contains multiple categories
    When the student selects the category "Mathematics" from the domain tabs
    Then The student should see only skills from the "Mathematics" category
    And the skills list should not contain skills from other categories
