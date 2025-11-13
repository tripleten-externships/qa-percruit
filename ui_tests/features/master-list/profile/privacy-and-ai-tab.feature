@wip
Feature: Privacy & AI preferences
  As an admin
  The admin manages AI-related preferences
  So that the admin's account behavior reflects the selected privacy setting

  Background:
    Given the admin is authenticated in the system
    And the admin is on the Privacy & AI tab in Profile Settings

  @smoke
  Scenario: Opt-out control and guidance are visible
    Then the Opt Out of AI Features control is visible
    And explanatory guidance is displayed describing which AI features are affected
    And the current opt-out state is clearly indicated

  Scenario: Enabling opt-out successfully (auto-saves)
    When the admin enables opt-out of AI features
    Then the preference is saved automatically
    And a status message indicates that AI features are disabled
    And the opt-out state remains enabled after switching tabs and returning
    And the opt-out state remains enabled after a page refresh

  Scenario: Disabling opt-out successfully (auto-saves)
    Given the admin has opt-out enabled
    When the admin disables opt-out of AI features
    Then the preference is saved automatically
    And any opt-out status message is no longer shown
    And the opt-out state remains disabled after switching tabs and returning
    And the opt-out state remains disabled after a page refresh
