@settings @admin @smoke @wip
Feature: Privacy & AI preferences
  As an Admin
  I want to manage AI-related preferences
  So that account behavior reflects the selected privacy setting

  Background:
    Given the Admin is authenticated in the system
    And the Admin is on the "Privacy & AI" tab in Profile Settings

  Scenario: Opt-out control and guidance are visible
    Then the "Opt Out of AI Features" control is visible
    And explanatory guidance is displayed describing which AI features are affected
    And the current opt-out state is clearly indicated

  Scenario: Enable opt-out successfully (auto-saves)
    When the Admin enables opt-out of AI features
    Then the preference is saved automatically
    And a status message indicates that AI features are disabled
    And the opt-out state remains enabled after switching tabs and returning
    And the opt-out state remains enabled after a page refresh

  Scenario: Disable opt-out successfully (auto-saves)
    Given the Admin has opt-out enabled
    When the Admin disables opt-out of AI features
    Then the preference is saved automatically
    And any opt-out status message is no longer shown
    And the opt-out state remains disabled after switching tabs and returning
    And the opt-out state remains disabled after a page refresh
