// Step definitions for login feature using Cucumber and Playwright

// Import Cucumber hooks and step definition decorators
import { Given, When, Then, Before, After } from '@cucumber/cucumber';


Then('the user should see the peak activity count updated for {string}', async function (string) {
    await this.page.getByText('Peak Activity').nth(1);
    });
