@wip
Feature: Email notification preferences
  As an admin
  The admin manages email notification preferences
  So that the admin's account receives emails according to their selections

  Background:
    Given the admin is authenticated in the system
    And the admin is on the Notifications tab in Profile Settings

  @smoke
  Scenario: Notification controls and guidance are visible
    Then the Email Notifications section is visible
    And the preferences Message Notifications, Task & Goal Notifications, and Resume Review Notifications are available
    And each preference displays descriptive guidance about when emails are sent
    And the current state of each preference is clearly indicated

  Scenario Outline: Enabling a notification preference (auto-saves and persists)
    When the admin enables <preference>
    Then the preference is saved automatically
    And the Notifications Disabled status panel for <preference> is not shown
    And the enabled state remains after switching to another tab and returning
    And the enabled state remains after a page refresh
    
    Examples:
      | preference                  |
      | Message Notifications       |
      | Task & Goal Notifications   |
      | Resume Review Notifications |

  Scenario Outline: Disabling a notification preference (shows disabled status, persists)
    Given <preference> is enabled
    When the admin disables <preference>
    Then the preference is saved automatically
    And a Notifications Disabled status panel for <preference> is displayed with explanatory text
    And the disabled state remains after switching to another tab and returning
    And the disabled state remains after a page refresh
   
    Examples:
      | preference                  |
      | Message Notifications       |
      | Task & Goal Notifications   |
      | Resume Review Notifications |

  Scenario: Changing one preference does not affect the others
    Given Message Notifications is enabled
    And Task & Goal Notifications is disabled
    And Resume Review Notifications is enabled
    When the admin disables Message Notifications
    Then Task & Goal Notifications remains disabled and its Notifications Disabled panel remains visible
    And Resume Review Notifications remains enabled and its Notifications Disabled panel is not shown
