import { Page } from '@playwright/test';
export class ProfileSettingsPage {
constructor(private page: Page) {}



async gotoProfileSettings(): Promise<void> {
await this.page.goto('https://stage.tripleten.percruit.com/profile?tab=profile');

}



async openBasicInfoSection(): Promise<void> {

await this.page.getByRole('heading', { name: 'Basic Information' }).click();

}




async updateFullName(name: string): Promise<void> {

await this.page.getByRole('textbox', { name: 'Full Name' }).click();

await this.page.fill('[data-test="input-full-name"]', name);

}



async updateLocation(location: string): Promise<void> {

await this.page.fill('[data-test="input-location"]', location);

await this.page.getByRole('textbox', { name: 'Location' }).click();

}



async getFullName(): Promise<string> {

return await this.page.inputValue('[data-test="input-full-name"]');
 }



async getLocation(): Promise<string> {

return await this.page.inputValue('[data-test="input-location"]');

}


async getPhoneNumber(): Promise<string> {

return await this.page.inputValue('[data-test="input-phone-number"]');

}



async getTimezone(): Promise<string> {

const timezone = await this.page.inputValue('[data-test="input-timezone"]');

return timezone;
 }

 

//couldnt find locator for this one but leaving method here for future use

async isFieldEditable(selector: string): Promise<boolean> {

return await this.page.isEditable(selector);
 }



 //couldnt find locator for this one but leaving method here for future use

 async isEmailReadOnly(): Promise<boolean> {

 const readonlyAttr = await this.page.getAttribute('[data-test="input-email"]', 'readonly');

 return readonlyAttr !== null;

 }



 //couldn't find locator for this one but leaving method here for future use

 async refresh(): Promise<void> {

 await this.page.reload();

 }

}