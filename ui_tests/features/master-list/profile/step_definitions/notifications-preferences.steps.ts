import { expect, Page } from '@playwright/test';
import * as env from '../../../../src/config/world';
import { LoginPage } from '../../../../src/pages/common/LoginPage';
import { Given, Then, When } from '@cucumber/cucumber';
declare const page: Page;

    Given('the Admin is authenticated in the system', async function () {
      const loginPage = new LoginPage(page);
      await this.page.goto(env.getBaseUrl());
      await loginPage.loginAsUserType('Admin');
    });

    Given('the Admin is on the Notifications tab in Profile Settings', async function () {
      await page.waitForLoadState('networkidle');
      await page.locator('#root').getByText('Adminqa+100119@qaexternship.').click();
      await page.getByRole('menuitem', { name: 'View Profile' }).click();
      await page.getByRole('tab', { name: 'Notifications' }).click();
    });
    
    Then('the Email Notifications section is visible', async function () {
      await expect(page.getByText('Email NotificationsMessage')).toBeVisible();
    });

    Then('the preferences Message Notifications, Task & Goal Notifications, and Resume Review Notifications are available', async function () {
      await expect(page.getByRole('heading', { name: 'Message Notifications'})).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Task & Goal Notifications'})).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Resume Review Notifications'})).toBeVisible();
    });

    Then('each preference displays descriptive guidance about when emails are sent', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
    await expect(page.getByRole('switch', { name: 'Message Notifications Receive' })).toBeChecked();
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).check();
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).uncheck();
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).check();
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).uncheck();
    });

    Then('the current state of each preference is clearly indicated', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).isVisible();
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).isVisible();
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).isVisible();
    });

    /*

    When('the Admin enables <preference>', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).check();
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).check();
    });

    Then('the preference is saved automatically', async function () {

    });

    And('the Notifications Disabled status panel for <preference> is not shown', async function () {
    await page.getByRole('alert').first().toBeVisible() == false;
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).toBeVisible == false;
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).toBeVisible == false;
    });

    And('the enabled state remains after switching to another tab and returning', async function () {

    await page.getByRole('button', { name: 'Dashboard' }).click();
    await page.locator('#root').getByText('Admin', { exact: true }).click();
    await page.getByRole('menuitem', { name: 'View Profile' }).click();
    await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
    await page.getByRole('tab', { name: 'Notifications' }).click();
    await page.getByRole('alert').first().toBeVisible() == false;
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).toBeVisible == false;
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).toBeVisible == false;
    });

    And('the enabled state remains after a page refresh', async function () {
    await page.goto('https://stage.tripleten.percruit.com/profile?tab=notifications');
    await page.getByRole('alert').first().toBeVisible() == false;
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).toBeVisible == false;
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).toBeVisible == false;
    });



    Given('<preference> is currently enabled', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).check();
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).check();
    });

    When('the Admin disables <preference>', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).uncheck();
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).uncheck();
    });

    Then('the preference is saved automatically', async function () {

    });

    And('a Notifications Disabled status panel for <preference> is displayed with explanatory text', async function () {
    await page.getByRole('alert').first().isVisible();
    await page.getByText('Notifications Disabled: You').first().isVisible();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isVisible;
    await page.getByText('Notificaions Disabled: You will not recieve email notifications for new tasks').isVisible();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).isVisible;
    await page.getByText('Notificaions Disabled: You will not recieve email notifications for resume').isVisible();
    });

    And('the disabled state remains after switching to another tab and returning', async function () {
    
    await page.getByRole('button', { name: 'Dashboard' }).click();
    await page.locator('#root').getByText('Admin', { exact: true }).click();
    await page.getByRole('menuitem', { name: 'View Profile' }).click();
    await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
    await page.getByRole('tab', { name: 'Notifications' }).click();
    await page.getByRole('alert').first().isVisible();
    await page.getByText('Notifications Disabled: You').first().isVisible();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isVisible;
    await page.getByText('Notificaions Disabled: You will not recieve email notifications for new tasks').isVisible();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).isVisible;
    await page.getByText('Notificaions Disabled: You will not recieve email notifications for resume').isVisible();
    });

    And('the disabled state remains after a page refresh', async function () {
    await page.goto('https://stage.tripleten.percruit.com/profile?tab=notifications');
    await page.getByRole('alert').first().isVisible();
    await page.getByText('Notifications Disabled: You').first().isVisible();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isVisible;
    await page.getByText('Notificaions Disabled: You will not recieve email notifications for new tasks').isVisible();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).isVisible;
    await page.getByText('Notificaions Disabled: You will not recieve email notifications for resume').isVisible();
    });


    
    Given('Message Notifications is enabled', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).check();
    });

    And('Task & Goal Notifications is disabled', async function () {
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).uncheck();
    });

    And('Resume Review Notifications is enabled', async function () {
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).check();
    });

    When('the Admin disables Message Notifications', async function () {
    await page.getByRole('switch', { name: 'Message Notifications Receive' }).uncheck();
    });

    Then('Task & Goal Notifications remains disabled and its Notifications Disabled panel remains visible', async function () {
    await page.getByRole('switch', { name: 'Task & Goal Notifications' }).uncheck();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for new tasks'}).isVisible;
    await page.getByText('Notificaions Disabled: You will not recieve email notifications for new tasks').isVisible();
    });

    And('Resume Review Notifications remains enabled and its Notifications Disabled panel is not shown', async function () {
    await page.getByRole('switch', { name: 'Resume Review Notifications' }).check();
    await page.getByRole('alert').filter({ hasText: 'Notificaions Disabled: You will not recieve email notifications for resume'}).toBeVisible == false;
    await page.getByText('Notificaions Disabled: You will not recieve email notifications for resume').toBeVisible() == false;
    });
      */

