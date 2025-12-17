@Zach
Feature: Email notification preferences
  As an Admin
  I want to manage email notification preferences
  So that my account receives emails according to my selections

  Background:
    Given the Admin is authenticated in the system
    And the Admin is on the Notifications tab in Profile Settings

  @smoke
  Scenario: Notification controls and guidance are visible
    Then the Email Notifications section is visible
    And the preferences Message Notifications, Task & Goal Notifications, and Resume Review Notifications are available
    And each preference displays descriptive guidance about when emails are sent
    And the current state of each preference is clearly indicated

  Scenario Outline: Enable a notification preference (auto-saves and persists)
    When the Admin enables <preference>
    Then the preference is saved automatically
    And the Notifications Disabled status panel for <preference> is not shown
    And the enabled state remains after switching to another tab and returning
    And the enabled state remains after a page refresh
    
    Examples:
      | preference                  |
      | Message Notifications       |
      | Task & Goal Notifications   |
      | Resume Review Notifications |

  Scenario Outline: Disable a notification preference (shows disabled status, persists)
    Given <preference> is currently enabled
    When the Admin disables <preference>
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
    When the Admin disables Message Notifications
    Then Task & Goal Notifications remains disabled and its Notifications Disabled panel remains visible
    And Resume Review Notifications remains enabled and its Notifications Disabled panel is not shown
