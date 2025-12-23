import { expect, Page } from '@playwright/test';
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { Given, Then, When } from '@cucumber/cucumber';
declare const page: Page;

    // Given('the Admin is authenticated in the system', async function () {
    //   const loginPage = new LoginPage(page);
    //   await this.page.goto(env.getBaseUrl());
    //   //await loginPage.loginAsUserType('Admin');
    // });

    When('the Admin is on the Notifications tab in Profile Settings', async function () {
      await this.page.waitForLoadState('networkidle');
      await this.page.locator('.MuiAvatar-root').first().click();
      await this.page.getByRole('menuitem', { name: 'View Profile' }).click();
      await page.locator('.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiAvatar-fallback').first().click();
      await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
      await page.locator('.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiAvatar-fallback > path').first().click();
      await page.getByRole('menuitem', { name: 'View Profile' }).click();
      await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
      await this.page.getByRole('tab', { name: 'Notifications' }).click();
      await expect(page).toHaveURL(/.*profile\?tab=notifications/);
    });
    
    Then('the Email Notifications section is visible', async function () {
      await expect(this.page.getByText('Email NotificationsMessage')).toBeVisible();
    });

    Then('the preferences Message Notifications, Task & Goal Notifications, and Resume Review Notifications are available', async function () {
      await expect(this.page.getByRole('heading', { name: 'Message Notifications'})).toBeVisible();
      await expect(this.page.getByRole('heading', { name: 'Task & Goal Notifications'})).toBeVisible();
      await expect(this.page.getByRole('heading', { name: 'Resume Review Notifications'})).toBeVisible();
    });

    Then('each preference displays descriptive guidance about when emails are sent', async function () {
    await expect(this.page.getByText('Recieve email notifications when you get new messages from mentors or students')).toBeVisible();
    await expect(this.page.getByText('Recieve email notifications when your mentor assigns you new tasks or goals')).toBeVisible();
    await expect(this.page.getByText('Recieve email notifications when your mentor reviews your resume or when a')).toBeVisible();
    });

    Then('the current state of each preference is clearly indicated', async function () {
    await this.page.getByRole('switch', { name: 'Message Notifications Receive' }).isVisible();
    await this.page.getByRole('switch', { name: 'Task & Goal Notifications' }).isVisible();
    await this.page.getByRole('switch', { name: 'Resume Review Notifications' }).isVisible();
    });

    

    When('the Admin enables Message Notifications, Task & Goal Notifications, & Resume Review Notifications', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
    await expect(this.page.getByRole('switch', { name: 'Message Notifications Receive' })).toBeChecked();
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).check();
    await expect(this.page.getByRole('switch', { name: 'Task & Goal Notifications' })).toBeChecked();
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).check();
    await expect(this.page.getByRole('switch', { name: 'Resume Review Notifications' })).toBeChecked();
    });

    Then('the preference is saved automatically', async function () {
    await this.page.getByText('All changes saved').isVisible();
    });

    Then('the Notifications Disabled status panel for Message Notifications, Task & Goal Notifications, & Resume Review Notifications is not shown', async function () {
    await page.getByRole('alert').first().isHidden();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isHidden();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).isHidden();
    });

    Then('the enabled state remains after switching to another tab and returning', async function () {

    await page.getByRole('button', { name: 'Dashboard' }).click();
    await page.locator('#root').getByText('Admin', { exact: true }).click();
    await page.getByRole('menuitem', { name: 'View Profile' }).click();
    await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
    await page.getByRole('tab', { name: 'Notifications' }).click();
    await expect(page.getByRole('switch', { name: 'Message Notifications Receive' })).toBeChecked();
    await page.getByRole('alert').first().isHidden();
    await expect(page.getByRole('switch', { name: 'Task & Goal Notifications' })).toBeChecked();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isHidden();
    await expect(page.getByRole('switch', { name: 'Resume Review Notifications' })).toBeChecked();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).isHidden();
    });

    Then('the enabled state remains after a page refresh', async function () {
    await page.goto('https://stage.tripleten.percruit.com/profile?tab=notifications');
    await expect(page.getByRole('switch', { name: 'Message Notifications Receive' })).toBeChecked();
    await page.getByText('alert').first().isHidden();
    await expect(page.getByRole('switch', { name: 'Task & Goal Notifications' })).toBeChecked();
    await page.getByText('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isHidden();
    await expect(page.getByRole('switch', { name: 'Resume Review Notifications' })).toBeChecked();
    await page.getByText('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).isHidden();
    });

    

    Given('Message Notifications, Task & Goal Notifications, & Resume Review Notifications is currently enabled', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
    await expect(this.page.getByRole('switch', { name: 'Message Notifications Receive' })).toBeChecked();
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).check();
    await expect(this.page.getByRole('switch', { name: 'Task & Goal Notifications' })).toBeChecked();
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).check();
    await expect(this.page.getByRole('switch', { name: 'Resume Review Notifications' })).toBeChecked();
    });

    When('the Admin disables Message Notifications, Task & Goal Notifications, & Resume Review Notifications', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).uncheck();
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).uncheck();
    });

    Then('the preference is saved automatically', async function () {
    await this.page.getByText('All changes saved').isVisible();
    });

    Then('a Notifications Disabled status panel for Message Notifications, Task & Goal Notifications, & Resume Review Notifications is displayed with explanatory text', async function () {
    await this.page.getByRole('alert').first().isVisible();
    await this.page.getByText('Notifications Disabled: You').first().isVisible();
    await this.page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isVisible();
    await this.page.getByText('Notificaions Disabled: You will not recieve email notifications for new tasks').isVisible();
    await this.page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).isVisible();
    await this.page.getByText('Notificaions Disabled: You will not recieve email notifications for resume').isVisible();
    });

    Then('the disabled state remains after switching to another tab and returning', async function () {
    
    await this.page.getByRole('button', { name: 'Dashboard' }).click();
    await this.page.locator('#root').getByText('Admin', { exact: true }).click();
    await this.page.getByRole('menuitem', { name: 'View Profile' }).click();
    await this.page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
    await this.page.getByRole('tab', { name: 'Notifications' }).click();
    await this.page.getByRole('alert').first().isVisible();
    await this.page.getByText('Notifications Disabled: You').first().isVisible();
    await this.page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isVisible();
    await this.page.getByText('Notificaions Disabled: You will not recieve email notifications for new tasks').isVisible();
    await this.page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).isVisible();
    await this.page.getByText('Notificaions Disabled: You will not recieve email notifications for resume').isVisible();
    });

    Then('the disabled state remains after a page refresh', async function () {
    await this.page.goto('https://stage.tripleten.percruit.com/profile?tab=notifications');
    await this.page.getByRole('alert').first().isVisible();
    await this.page.getByText('Notifications Disabled: You').first().isVisible();
    await this.page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isVisible();
    await this.page.getByText('Notificaions Disabled: You will not recieve email notifications for new tasks').isVisible();
    await this.page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).isVisible();
    await this.page.getByText('Notificaions Disabled: You will not recieve email notifications for resume').isVisible();
    });



    Given('Message Notifications is enabled', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
    await expect(this.page.getByRole('switch', { name: 'Message Notifications Receive' })).toBeChecked();
    });

    Given('Task & Goal Notifications is disabled', async function () {
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).uncheck();
    });

    Given('Resume Review Notifications is enabled', async function () {
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).check();
    await expect(this.page.getByRole('switch', { name: 'Resume Review Notifications' })).toBeChecked();
    });

    When('the Admin disables Message Notifications', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
    });

    Then('Task & Goal Notifications remains disabled and its Notifications Disabled panel remains visible', async function () {
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).uncheck();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isVisible;
    await page.getByText('Notificaions Disabled: You will not recieve email notifications for new tasks').isVisible();
    });

    Then('Resume Review Notifications remains enabled and its Notifications Disabled panel is not shown', async function () {
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).check();
    await expect(this.page.getByRole('switch', { name: 'Resume Review Notifications' })).toBeChecked();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).isHidden();
    });
      

