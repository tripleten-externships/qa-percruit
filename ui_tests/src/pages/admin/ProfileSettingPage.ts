import { expect, Page } from '@playwright/test';
import * as env from '../../config/world';
import { time } from 'console';

// Page Object Model (POM) class for the Profile Settings page

export class ProfileSettingsPage {
      phoneNumber: any;

 // Constructor to initialize the page object  
constructor(private page: Page) {
    this.page = page;

}

// Function to navigate to Profile Settings page and verify its visibility
async gotoProfileSettings(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}/profile?tab=basic-info`);
    await expect(this.page.getByRole('heading', { name: 'Profile Settings' })).toBeVisible();

}

// Function to open Basic Information section and verify its visibility
async openBasicInfoSection(): Promise<void> {
    await this.page.getByRole('heading', { name: 'Basic Information' }).click();
    await expect(this.page.getByRole('heading', { name: 'Basic Information' })).toBeVisible();
    
   }


// Function to update and edit Phone Number value 
async updatePhoneNumber(phoneNumber: string): Promise<void> {
    await this.page.getByText('Phone Number').click();
    await this.page.fill('phone-number', phoneNumber);

    //await this.page.getByRole('textbox', { name: 'Phone Number' }).click();
    //await this.page.fill('[data-test="input-phone-number"]', phoneNumber);
   
}

// Function to update and edit Full Name value
async updateFullName(name: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Full Name' }).click();
    await this.page.fill('[data-test="input-full-name"]', name);
 

}

// Function to update and edit Location value
async updateLocation(location: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Location' }).click();
    await this.page.fill('[data-test="input-location"]', location); 
}


// Function to get Full Name value
async getFullName(): Promise<string> {
    return await this.page.inputValue('[data-test="input-full-name"]'); 
}


// Function to get Location value
async getLocation(): Promise<string> {
    return await this.page.inputValue('[data-test="input-location"]'); 
}


// Function to get Phone Number value
async getPhoneNumber(): Promise<string> {
    return await this.page.inputValue('[data-test="input-phone-number"]'); 
}


// Function to get Timezone value
async getTimezone(): Promise<string> {
    const timezone = await this.page.inputValue('[data-test="input-timezone"]');
    return timezone;
}

// Function to get error messages related to phone number
async errormessages (): Promise<string[]> {
    await expect(this.page.getByText('Please enter a valid phone number')).not.toBeVisible();
    return []; 
}


// Function to check if a field is editable
async isFieldEditable(selector: string): Promise<boolean> {
    return await this.page.isEditable(selector);
 }

// Functions to check if the Phone Number field is editable
async PhonefieldEditable(): Promise<boolean> {
    await expect(this.page.getByRole('textbox', { name: 'Phone Number' })).toBeEditable();
    await expect(this.page.locator('phone-number')).toBeEditable();
    await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    return true;
 }

// Functions to check if the Location field is editable
async LocationfieldEditable(): Promise<boolean> {
    await expect(this.page.locator('[data-test="input-location"]')).toBeEditable();
    return true;  
}

// Functions to check if the Time Zone field is editable
async TimezonefieldEditable(): Promise<boolean> {
    await expect(this.page.locator('[data-test="input-timezone"]')).toBeEditable();
    return true;  
}

// Functions to check if The Full Name field is editable
async FullnamefieldEditable(): Promise<boolean> {
    await expect(this.page.locator('[data-test="input-full-name"]')).toBeEditable();
    return true;  
}

// Function to check if The Email field is read-only
async isEmailReadOnly(): Promise<boolean> {
    await expect(this.page.getByText('Email cannot be changed', { exact: true })).toBeVisible();
    // await this.page.getAttribute('[data-test="input-email"]', 'readonly');
   // const Emailfield = this.page.locator('[data-test="input-email"]');
    const Emailfield = this.page.getByText('Email cannot be changed', { exact: true }); 
    await expect(Emailfield).not.toBeEditable();
    return true;
 }

// Function to navigate to Professional tab
 async gotoProfessionalTab(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}/profile?tab=professional`);
    await expect(this.page.getByRole('heading', { name: 'Professional Details' })).toBeVisible();
}

// Function to refresh the page
 async refresh(): Promise<void> {
    await this.page.reload();
}
}




