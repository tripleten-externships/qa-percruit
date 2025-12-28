import { Given, Then, When, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../../../../src/pages/common/LoginPage";
import { env } from "process";
import { LogoutPage } from "../../../../src/pages/common/LogoutPage";
import { MentorsPage } from "../../../../src/pages/admin/MentorsPage";
import { expect } from "@playwright/test";

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
            await mentorsPage.goToMentorsPage();
            await mentorsPage.waitForMentorsPageReady();
         });
    
         When('the admin user searches for a mentor by full name', async function () {
           // Write code here that turns the phrase above into concrete actions
            await mentorsPage.SearchMentorsFullName();
         });
       
         Then('the mentors list should display only mentors whose names matches the search criteria', async function () {
           // Write code here that turns the phrase above into concrete actions
          
         });
       
         Then('the total count should update to reflect the number of matching mentors', async function () {
           // Write code here that turns the phrase above into concrete actions
        
         });
  
            //Scenario 2
         When('the admin user searches using part of a mentor name', async function () {
           // Write code here that turns the phrase above into concrete actions
            await mentorsPage.SearchMentorsPartialName();
         });
       
         Then('the mentors list should show all mentors whose names contain the part of what was typed in', async function () {
           // Write code here that turns the phrase above into concrete actions
   
         });
       
         Then('the total count should reflect the number of matches', async function () {
           // Write code here that turns the phrase above into concrete actions
      
         });

         //scenario 3
         When('the admin user searches using a mentor email address', async function () {
           // Write code here that turns the phrase above into concrete actions
            await mentorsPage.SearchMentorsEmail();
         });
        
         Then('only the mentor with that email address should appear in the list', async function () {
           // Write code here that turns the phrase above into concrete actions
         
         });
       
         Then('the total count should be {int}', async function (int) {
         // Then('the total count should be {float}', function (float) {
           // Write code here that turns the phrase above into concrete actions

         });

         //Scenario 4
         When('the admin user searches for a name or email that does not exist', async function () {
           // Write code here that turns the phrase above into concrete actions
            await mentorsPage.SearchMentorNotInSystem();
         });
       
         Then('the mentors list should display a message saying {string}', async function (string) {
           // Write code here that turns the phrase above into concrete actions
  
         });
       
         Then('the total count should reflect {int}', async function (int) {
         // Then('the total count should be {float}', function (float) {
           // Write code here that turns the phrase above into concrete actions
         });