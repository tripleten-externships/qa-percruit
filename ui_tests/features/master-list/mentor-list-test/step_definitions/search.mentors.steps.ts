import { Given, Then, When, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../../../../src/pages/common/LoginPage";
import { env } from "process";
import { LogoutPage } from "../../../../src/pages/common/LogoutPage";
import { MentorsPage } from "../../../../src/pages/admin/MentorsPage";
import * as MentorListTestData from "../../../../src/test-data/MentorListTestData";



setDefaultTimeout(120_000);

BeforeAll(async function(){
    console.log('BeforeAll: global setup complete');
});

let loginPage: LoginPage;
let logoutPage: LogoutPage;
let mentorsPage: MentorsPage;


       //scenario 1
         Given('the admin is logged in and viewing the mentors list', async function () {
           // Write code here that turns the phrase above into concrete actions
            const loginPage = new LoginPage(this.page);
            logoutPage = new LogoutPage(this.page);
            mentorsPage = new MentorsPage(this.page);

            await this.page.goto(env.BASE_URL);
            await loginPage.loginAsUserType('Admin');
            await logoutPage.isOnHomePage();

            await this.page.getByRole('button', { name: 'USER MANAGEMENT' }).click();
            //await this.page.getByRole('button', { name: 'Mentors' }).click();
            //await this.page.getByRole('textbox', { name: 'Search career coaches by name' }).click();
            await mentorsPage.goToMentorsPage();
            await mentorsPage.waitForMentorsPageReady();
         });
    
         When('the admin user searches for a mentor by full name', async function () {
           // The user inputs a full name into the mentor search field
            await mentorsPage.SearchMentors(MentorListTestData.FULL_NAME);
         });
       
         Then('the mentors list should display only mentors whose names matches the search criteria', async function () {
           // Confirms the search results match the Full name entered in the mentor search field
            await mentorsPage.allMentorNamesMatch(MentorListTestData.FULL_NAME);
         });
       
         Then('the total count should update to reflect the number of matching mentors', async function () {
           // Confirms the total mentor count reflects the number of matches searched
        
         });
  
            //Scenario 2
         When('the admin user searches using part of a mentor name', async function () {
           // The user inputs a partial name into the mentor search field
            await mentorsPage.SearchMentors(MentorListTestData.PARTIAL_NAME);
         });
       
         Then('the mentors list should show all mentors whose names contain the part of what was typed in', async function () {
           // Confirms the search results match the partial name entered in the mentor search field
            await mentorsPage.allMentorNamesMatch(MentorListTestData.PARTIAL_NAME);
         });
       
         Then('the total count should reflect the number of matches', async function () {
           // Confirms the total mentor count reflects the number of matches searched
      
         });

         //scenario 3
         When('the admin user searches using a mentor email address', async function () {
           // The user inputs an email into the mentor search field
            await mentorsPage.SearchMentors(MentorListTestData.MENTOR_EMAIL);
         });
        
         Then('only the mentor with that email address should appear in the list', async function () {
           // Confirms the search results match the email entered in the mentor search field
            await mentorsPage.allMentorNamesMatch(MentorListTestData.MENTOR_EMAIL);
         });
       
         Then('the total count should be {int}', async function (int) {
         // Then('the total count should be {float}', function (float) {
           // Confirms the total mentor count reflects the number of matches searched

         });

         //Scenario 4
         When('the admin user searches for a name or email that does not exist', async function () {
           // The user inputs a name or email that does not exist in the system, into the mentor search field
            await mentorsPage.SearchMentors(MentorListTestData.NON_EXISTENT_NAME);

         });
       
         Then('the mentors list should display a message saying {string}', async function (string) {
           // Confirms that when a nonexistent name or email is entered a message is displayed
             await mentorsPage.NoMentorsMessageIsVisible();
         });
       
         Then('the total count should reflect {int}', async function (int) {
         // Then('the total count should be {float}', function (float) {
           // Confirms the total mentor search count is 0
             await mentorsPage.MentorsCountIsZero();
         });