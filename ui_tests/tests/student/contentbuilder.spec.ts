// Import Playwright classes and assertion utilities
import { chromium, Browser, Page, expect, test } from '@playwright/test';

// Import environment configuration and Page Object Models
import * as env from '../../src/config/world';
// Imports Login Page functionality
import { LoginPage } from '../../src/pages/common/LoginPage';
// Imports Assignment Page functionality
import { AssignmentPage } from '../../src/pages/admin/AssignmentPage';   
import { AdminDashboardPage } from '../../src/pages/admin/AdminDashboardPage';
import { ProfilePage } from '../../src/pages/common/ProfilePage';

// Declare variables to hold browser, page, and page object instances
let loginPage: LoginPage;
let profilePage: ProfilePage;

test('student is able to send message to recruiter', {tag: '@smoke'}, async ({ page }) => { 
     await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).dblclick();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'Content Builder' }).click();
    await page.getByRole('button', { name: 'Recruiter Email Cold outreach' }).click();
    await page.getByRole('textbox', { name: 'Title (for your reference)' }).click();
    await page.getByRole('textbox', { name: 'Title (for your reference)' }).fill('google recruiter');
    await page.getByRole('textbox', { name: 'Title (for your reference)' }).press('Tab');
    await page.getByRole('textbox', { name: 'Subject Line' }).fill('test');
    await page.getByRole('textbox', { name: 'Subject Line' }).press('Tab');
    await page.getByRole('textbox', { name: 'Message Content' }).fill('generated');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Yes, I sent it' }).click();
    }); // This closes the test (started at line 17)


//student is able to send thank you message
test('student is able to send thank you message',{tag: '@smoke'}, async ({ page }) => {
   await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click(); 
  await page.getByRole('link', { name: 'Content Builder' }).click();
  await page.getByRole('button', { name: 'Thank You Letter Post-' }).click();
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).click();
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).fill('thank you');
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).press('Tab');
  await page.getByRole('textbox', { name: 'Subject Line' }).fill('dddd');
  await page.getByRole('textbox', { name: 'Message Content' }).click();
  await page.getByRole('textbox', { name: 'Message Content' }).fill('testing again');
  await page.getByRole('button', { name: 'Generate with AI' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Yes, I sent it' }).click();
}); // This closes the test (started at line 45)

  //student is able to send follow-up message
 test('student is able to send follow-up message',{tag: '@smoke'}, async ({page}) => {
     await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
  await page.getByRole('button', { name: 'Follow-up Email After' }).click();
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).click();
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).fill('follow up email 3/33');
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).press('Tab');
  await page.getByRole('textbox', { name: 'Subject Line' }).fill('ddddd');
  await page.getByRole('textbox', { name: 'Message Content' }).click();
  await page.getByRole('textbox', { name: 'Message Content' }).fill('dfffjkkl;;;kdjfkdjfjdfdfjjdjdjjfdjfjdfjjdncnn');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Yes, I sent it' }).click();
}); // This closes the test (started at line 75)

//Student is able to send networking message
test('student is able to send networking message', {tag: '@smoke'},  async ({page}) => {
 await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
  await page.getByRole('button', { name: 'Networking Email Build' }).click();
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).click();
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).fill('this is my test again');
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).press('Tab');
  await page.getByRole('textbox', { name: 'Subject Line' }).fill('testinggggggg');
  await page.getByRole('textbox', { name: 'Subject Line' }).press('Tab');
  await page.getByRole('textbox', { name: 'Message Content' }).fill('here we go');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Yes, I sent it' }).click();
  }); // This closes the test (started at line 103) 

//student is able to send invitation message
test('student is able to send invitationmessage', {tag: '@smoke'}, async ({page}) => {
 await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
  await page.getByRole('button', { name: 'LinkedIn Connection Short' }).click();
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).click();
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).fill('linkedin testing continues');
  await page.getByRole('textbox', { name: 'Message Content' }).click();
  await page.getByRole('textbox', { name: 'Message Content' }).fill('wjat dpes tjos ,eam ;e\nts fomd pit/');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Not yet' }).click();
  }); // This closes the test (started at line 131)

//student is able to send linkedin message
test('student is able to send linkedin invitation message',{tag: '@smoke'}, async ({page}) => {
 await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
  await page.getByRole('button', { name: 'LinkedIn InMail Professional' }).click();
  await page.getByRole('button', { name: 'Generate with AI' }).click();
  await page.getByRole('button', { name: 'Copy to clipboard' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Yes, I sent it' }).click();
  }); // This closes the test (started at line 157)

  //student is able to send LinkedIn Email
  test('student is able to send  LinkedIn Email', {tag: '@smoke'}, async ({page}) => {
 await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
  await page.getByRole('button', { name: 'LinkedIn InMail Professional' }).click();
  await page.getByRole('button', { name: 'Generate with AI' }).click();
  await page.getByRole('button', { name: 'Copy to clipboard' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Yes, I sent it' }).click();
  }); // This closes the test (started at line 175)

  //Are special characters accepted in text fields in settings
    test('Are special characters arent accepted in settings ', {tag: '@smoke'}, async ({page}) => {
 await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
    await page.getByRole('spinbutton', { name: 'Max Character Count (optional)' }).click();
  await page.getByRole('spinbutton', { name: 'Max Character Count (optional)' }).fill('44444444444444');
  await page.getByRole('textbox', { name: 'Additional Instructions (' }).click();
  await page.getByRole('textbox', { name: 'Additional Instructions (' }).fill('###$$$@@!!!!');
  }); // This closes the test (started at line 198)

  //Are special characters accepted in text fields in jobs
test('Are special characters accepted in jobs ', {tag: '@smoke'}, async ({page}) => {
 await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  await page.getByRole('button', { name: '✏️ Manual Entry' }).click();
  await page.getByRole('textbox', { name: 'Company Name' }).click();
  await page.getByRole('textbox', { name: 'Company Name' }).fill('####@@@$$$$^^^&&&***');
  await page.getByRole('textbox', { name: 'Job Title' }).click();
  await page.getByRole('textbox', { name: 'Job Title' }).fill('****&&&@@@!!!^^^');
  await page.getByRole('textbox', { name: 'Recruiter Name (Optional)' }).click();
  await page.getByRole('textbox', { name: 'Recruiter Name (Optional)' }).fill('#######******@&@^!!%');
  }); // This closes the test (started at line 220)

  //Are special characters accepted in text fields in recipent category
test('Are special characters accepted in recipent ', {tag: '@smoke'}, async ({page}) => {
 await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
  await page.locator('.MuiIconButton-root.MuiIconButton-sizeSmall').click();
  // Wait 3 seconds for the dashboard to settle
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'New Contact' }).click();
  await page.getByRole('textbox', { name: 'Name*' }).click();
  // Wait 2 seconds for the dashboard to settle
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Name*' }).fill('#####((**&^^^!%@');
  await page.getByPlaceholder('e.g., Senior Recruiter').click();
  await page.getByPlaceholder('e.g., Senior Recruiter').fill('@@@@@##');
  await page.getByRole('textbox', { name: 'Company', exact: true }).click();
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('$$$$%%');
  await page.getByRole('textbox', { name: 'Notes' }).click();
  await page.getByRole('textbox', { name: 'Notes' }).fill('****&&^^%$$!');
   }); // This closes the test (started at line 246)

  //student is able to view details
test('student is able to view details of content', {tag: '@smoke'}, async ({page}) => {
 await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
  // Wait 3 seconds for the dashboard to settle
  await page.waitForTimeout(3000);
   await page.getByRole('tab', { name: 'Saved' }).click();
  // Wait 1 seconds for the dashboard to settle
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'LinkedIn InMail - Mar 18 Hi' }).getByLabel('View details').click();
  // Wait 1 seconds for the dashboard to settle
  await page.waitForTimeout(1000);
  await page.getByText('×').click();
  await page.getByRole('button', { name: 'Close' }).click();
  }); // this closes test (started at line 278)

  //student is able to edit content
test('student is able to edit content', {tag: '@smoke'}, async ({page}) => {
 await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
  // Wait 3 seconds for the dashboard to settle
  await page.waitForTimeout(3000);
   await page.getByRole('tab', { name: 'Saved' }).click();
   await page.locator('tr:nth-child(7) > .MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight > .MuiBox-root > .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeSmall.css-1lmus55').click();
  await page.getByRole('button', { name: 'Edit' }).click();
  // Wait 2 seconds for the dashboard to settle
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Message Content' }).click();
  await page.getByRole('textbox', { name: 'Message Content' }).fill('generated joddijfjdnndsd');
  await page.getByRole('textbox', { name: 'Subject Line' }).click();
  // Wait 1 seconds for the dashboard to settle
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Subject Line' }).fill('test cddfadf');
  // Wait 2 seconds for the dashboard to settle
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).click();
  await page.getByRole('textbox', { name: 'Subject Line' }).fill('test cddfadf ');
  await page.getByRole('textbox', { name: 'Title (for your reference)' }).fill('google recruiterdddd');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Not yet' }).click();
}); //this closes test (started at line 306)

  //student is able to copy content
test('student is able to copy content', {tag: '@smoke'}, async ({page}) => {
 await page.goto('https://stage.tripleten.percruit.com/');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.comjoshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).click();
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('joshuabennett353+student@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('AuDY6wz9X9eiHdt');
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Content Builder' }).click();
  // Wait 3 seconds for the dashboard to settle
  await page.waitForTimeout(3000);
   await page.getByRole('tab', { name: 'Saved' }).click();
     await page.getByRole('row', { name: 'LinkedIn InMail - Mar 17 Hi' }).getByLabel('Copy content').click();
}); // Closes the test block