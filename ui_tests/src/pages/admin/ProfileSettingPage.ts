import { expect, Page } from '@playwright/test';
export class ProfileSettingsPage {
      phoneNumber: any;

   
constructor(private page: Page) {}


// Function to navigate to Profile Settings page
async gotoProfileSettings(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}/profile?tab=basic-info`);

}

// Function to open Basic Information section
async openBasicInfoSection(): Promise<void> {
    await this.page.getByRole('heading', { name: 'Basic Information' }).click();
    expect(this.page.isVisible('text=Basic Information')); }


// Function to update and edit Phone Number value 
async updatePhoneNumber(phoneNumber: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Phone Number' }).click();
    await this.page.fill('[data-test="input-phone-number"]', phoneNumber);
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

// Functions to check if Phone Number field is editable
async PhonefieldEditable(): Promise<boolean> {
    await expect(this.page.getByRole('textbox', { name: 'Phone Number' })).toBeEditable();
    
    await expect(this.page.locator('[data-test="input-phone-number"]')).toBeEditable();
    return true;
 }

// Functions to check if Location field is editable
async LocationfieldEditable(): Promise<boolean> {
    await expect(this.page.locator('[data-test="input-location"]')).toBeEditable();
    return true;  
}

// Functions to check if Time Zone field is editable
async TimezonefieldEditable(): Promise<boolean> {
    await expect(this.page.locator('[data-test="input-timezone"]')).toBeEditable();
    return true;  
}

// Functions to check if Full Name field is editable
async FullnamefieldEditable(): Promise<boolean> {
    await expect(this.page.locator('[data-test="input-full-name"]')).toBeEditable();
    return true;  
}

// Function to check if Email field is read-only
async isEmailReadOnly(): Promise<boolean> {
    await this.page.getAttribute('[data-test="input-email"]', 'readonly');
    const Emailfield = this.page.locator('[data-test="input-email"]');
    await expect(Emailfield).not.toBeEditable();
    return true;
 }

// Function to navigate to Professional tab
 async gotoProfessionalTab(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}/profile?tab=professional`);}

// Function to refresh the page
 async refresh(): Promise<void> {
    await this.page.reload();
}
}



