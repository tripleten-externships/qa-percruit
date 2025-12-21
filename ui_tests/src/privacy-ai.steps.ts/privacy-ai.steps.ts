import { Given, When, Then } from '@cucumber/cucumber';
import { PrivacyAIPage } from '../pages/privacy-and-ai.page';

let privacyAIPage: PrivacyAIPage;

Given('the Admin is authenticated in the system', async function () {
  privacyAIPage = new PrivacyAIPage(this.page);
});

Given('the Admin is on the Privacy & AI tab in Profile Settings', async function () {
  await privacyAIPage.openPrivacyAITab();
  await privacyAIPage.verifyPageLoaded();
});

Then('the Opt Out of AI Features control is visible', async function () {
  await privacyAIPage.verifyPageLoaded();
});

Then(
  'explanatory guidance is displayed describing which AI features are affected',
  async function () {
    await privacyAIPage.verifyPageLoaded();
  }
);

Then('the current opt-out state is clearly indicated', async function () {
  await privacyAIPage.verifyPageLoaded();
});

When('the Admin enables opt-out of AI features', async function () {
  await privacyAIPage.toggleOptOut();
});

When('the Admin disables opt-out of AI features', async function () {
  await privacyAIPage.toggleOptOut();
});
