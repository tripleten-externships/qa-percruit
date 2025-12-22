import { expect, Page } from '@playwright/test';
export class ProfileSettingsPage {
      phoneNumber: any;

   
constructor(private page: Page) {}



async gotoProfileSettings(): Promise<void> {

await this.page.goto(`${process.env.BASE_URL}/profile?tab=basic-info`);

}


async openBasicInfoSection(): Promise<void> {

await this.page.getByRole('heading', { name: 'Basic Information' }).click();

expect(this.page.isVisible('text=Basic Information'));

}





async updateFullName(name: string): Promise<void> {

await this.page.getByRole('textbox', { name: 'Full Name' }).click();

await this.page.fill('[data-test="input-full-name"]', name);

}



async updateLocation(location: string): Promise<void> {

await this.page.getByRole('textbox', { name: 'Location' }).click();

await this.page.fill('[data-test="input-location"]', location); }




async getFullName(): Promise<string> {

return await this.page.inputValue('[data-test="input-full-name"]'); }




async getLocation(): Promise<string> {

return await this.page.inputValue('[data-test="input-location"]'); }



async getPhoneNumber(): Promise<string> {

return await this.page.inputValue('[data-test="input-phone-number"]'); }



async getTimezone(): Promise<string> {

const timezone = await this.page.inputValue('[data-test="input-timezone"]');

return timezone; }



async errormessages (): Promise<string[]> {

await expect(this.page.getByText('Please enter a valid phone number')).not.toBeVisible();

return []; }


//couldnt find locator 

async isFieldEditable(selector: string): Promise<boolean> {
return await this.page.isEditable(selector);
 }


async PhonefieldEditable(): Promise<boolean> {
await expect(this.page.locator('[data-test="input-phone-number"]')).toBeEditable();
return true;
 }


async LocationfieldEditable(): Promise<boolean> {
await expect(this.page.locator('[data-test="input-location"]')).toBeEditable();
return true;  
}


async TimezonefieldEditable(): Promise<boolean> {
await expect(this.page.locator('[data-test="input-timezone"]')).toBeEditable();
return true;  
}


async FullnamefieldEditable(): Promise<boolean> {
await expect(this.page.locator('[data-test="input-full-name"]')).toBeEditable();
return true;  
}


 //couldnt find locator 

async isEmailReadOnly(): Promise<boolean> {
await this.page.getAttribute('[data-test="input-email"]', 'readonly');
const Emailfield = this.page.locator('[data-test="input-email"]');
await expect(Emailfield).not.toBeEditable();
return true;
 }


 async gotoProfessionalTab(): Promise<void> {
 await this.page.goto(`${process.env.BASE_URL}/profile?tab=professional`);}



 //couldn't find locator 

 async refresh(): Promise<void> {

 await this.page.reload();

 }
}



