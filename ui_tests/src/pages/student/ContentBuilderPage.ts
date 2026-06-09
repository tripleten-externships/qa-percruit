import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class ContentBuilderPage extends BasePage {
    readonly contentBuilderSidebarLink: Locator;
    readonly createNewTab: Locator;
    readonly savedTab: Locator;
    readonly recruiterEmailButton: Locator;
    readonly followUpEmailButton: Locator;
    readonly thankYouLetterButton: Locator;
    readonly networkingEmailButton: Locator;
    readonly linkedinConnectionButton: Locator;
    readonly linkedinInMailButton: Locator;
    readonly contextDropdown: Locator;
    readonly myResumesButton: Locator;
    readonly AITailoredResumeButton: Locator;
    readonly fromJobTrackerButton: Locator;
    readonly manualEntryButton: Locator;
    readonly fromNetworkTrackerButton: Locator;
    readonly newContactButton: Locator;
    readonly settingsOptions: Locator;
    readonly toneDropdown: Locator;
    readonly professionalToneOption: Locator;
    readonly friendlyToneOption: Locator;
    readonly formalToneOption: Locator;
    readonly casualToneOption: Locator;

    readonly generateWithAIButton: Locator;
    readonly AIGeneratedContent: Locator;
    readonly copyToClipboardButton: Locator;
    readonly saveButton: Locator;
    readonly notYetButton: Locator;
    
    

    constructor(page: Page) {
        super(page);
        this.contentBuilderSidebarLink = page.getByRole('link', { name: 'Content Builder' });
        this.createNewTab = page.getByRole('tab', { name: 'Create New' });
        this.savedTab = page.getByRole('tab', { name: 'Saved' });
        this.recruiterEmailButton = page.getByRole('button', { name: 'Recruiter Email Cold outreach' });
        this.followUpEmailButton = page.getByRole('button', { name: 'Follow-up Email After' });
        this.thankYouLetterButton = page.getByRole('button', { name: 'Thank You Letter Post-' });
        this.networkingEmailButton = page.getByRole('button', { name: 'Networking Email Build' });
        this.linkedinConnectionButton = page.getByRole('button', { name: 'LinkedIn Connection Short' });
        this.linkedinInMailButton = page.getByRole('button', { name: 'LinkedIn InMail Professional' });
        this.contextDropdown = page.locator('div').filter({ hasText: /^Context \(Optional\)1 selected$/ }).first();
        this.myResumesButton = page.getByRole('button', { name: '📄 My Resumes' });
        this.AITailoredResumeButton = page.getByRole('button', { name: 'AI-Tailored Resume' });
        this.fromJobTrackerButton = page.getByRole('button', { name: '📋 From Job Tracker' });
        this.manualEntryButton = page.getByRole('button', { name: '✏️ Manual Entry' });
        this.fromNetworkTrackerButton = page.getByRole('button', { name: 'From Network Tracker' });
        this.newContactButton = page.getByRole('button', { name: 'Add Contact' });
        this.settingsOptions = page.getByText('Settings');
        this.toneDropdown = page.locator('label').filter({ hasText: 'Tone' });
        this.professionalToneOption = page.getByRole('option', { name: 'Professional' });
        this.friendlyToneOption = page.getByRole('option', { name: 'Friendly' });
        this.formalToneOption = page.getByRole('option', { name: 'Formal' });
        this.casualToneOption = page.getByRole('option', { name: 'Casual' });

        this.generateWithAIButton = page.getByRole('button', { name: 'Generate with AI' });
        this.AIGeneratedContent = page.getByRole('textbox', { name: 'Message Content' });
        this.copyToClipboardButton = page.getByRole('button', { name: 'Copy to clipboard' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.notYetButton = page.getByRole('button', { name: 'Not yet' });
    }

    //navigate to content builder page
    async navigateToContentBuilderPage() {
        await this.contentBuilderSidebarLink.click();
    }

    //verify navigate to content builder page and loading the page correctly
    async verifyContentBuilderPageLoaded() {
        await expect(this.page.getByRole('heading', { name: 'Content Builder' })).toBeVisible();
        await expect(this.createNewTab).toBeVisible();
        await expect(this.page.getByText('Select Content Type📧 EMAIL')).toBeVisible();
        await expect(this.contextDropdown).toBeVisible();
    }
    //Selecting and creating recruiter email content and generating content with AI
    async createRecruiterEmailContent() {
        await this.createNewTab.click();
        await this.recruiterEmailButton.click();
    }

    //Selecting and creating follow-up email content and generating content with AI
    async createFollowUpEmailContent() {
        await this.createNewTab.click();
        await this.followUpEmailButton.click();
        
    }

    //Selecting and creating thank you letter content and generating content with AI
    async createThankYouLetterContent() {
        await this.createNewTab.click();
        await this.thankYouLetterButton.click();
    }

    //Selecting and creating networking email content and generating content with AI
    async createNetworkingEmailContent() {
        await this.createNewTab.click();
        await this.networkingEmailButton.click();
    }

    //Selecting and creating LinkedIn connection request content and generating content with AI
    async createLinkedInConnectionContent() {
        await this.createNewTab.click();
        await this.linkedinConnectionButton.click();
    }

    //Selecting and creating LinkedIn InMail content and generating content with AI
    async createLinkedInInMailContent() {
        await this.createNewTab.click();
        await this.linkedinInMailButton.click();
    }

    // 
    async sellectToneOption(tone: string) {
        await this.toneDropdown.click();
        await this.page.getByText(tone, { exact: true }).click();   
        await this.page.getByRole('option', { name: tone }).click();
    }

    async clickGenerateContentWithAI() {
        await this.generateWithAIButton.click();
    }

    async getGeneratedText(): Promise<string> {
        return (await this.AIGeneratedContent.textContent()) || '';
    }

    async getGeneratedContentCharacterCount() {
        const text = await this.getGeneratedText();
        return text.length;
    }



    
}

 
//   await page.locator('div').filter({ hasText: /^Context \(Optional\)1 selected$/ }).first().click();
//   await page.getByRole('button', { name: '📄 My Resumes' }).click();
//   await page.getByRole('button', { name: 'Clear' }).click();
//   await page.getByRole('button', { name: 'Open' }).first().click();
//   await page.getByText('Alex Rivera • 3/19/').click();
//   await page.getByText('Job📋 From Job Tracker✏️').click();
//   await page.getByRole('button', { name: '📋 From Job Tracker' }).click();
//   await page.getByRole('combobox', { name: 'Select Job' }).click();
//   await page.locator('[id="_r_2s_-option-3"]').getByText('Multi Media, LLC • null').click();
//   await page.getByRole('button', { name: '✏️ Manual Entry' }).click();
//   await page.getByRole('textbox', { name: 'Company Name' }).click();
//   await page.getByRole('textbox', { name: 'Company Name' }).fill('test.co');
//   await page.getByRole('textbox', { name: 'Job Title' }).click();
//   await page.getByRole('textbox', { name: 'Job Title' }).fill('QA engineer');
//   await page.getByRole('button', { name: 'From Network Tracker' }).click();
//   await page.getByRole('combobox', { name: 'Select Contact' }).click();
//   await page.getByRole('combobox', { name: 'Select Contact' }).click();
//   await page.getByText('Settings').click();
//   await page.getByText('Professional', { exact: true }).click();
//   await page.getByRole('option', { name: 'Professional' }).click();
//   await page.getByText('Professional', { exact: true }).click();
//   await page.getByRole('option', { name: 'Friendly' }).click();
//   await page.getByText('Friendly').click();
//   await page.getByRole('option', { name: 'Formal' }).click();
//   await page.getByText('Formal').click();
//   await page.getByRole('option', { name: 'Casual' }).click();
//   await page.getByText('SettingsToneCasualToneMax').click();
//   await page.getByText('Casual').click();
//   await page.locator('.MuiBackdrop-root').click();
//   await page.getByText('Settings').click();
//   await page.locator('label').filter({ hasText: 'Tone' }).click();
//   await page.getByText('Casual').click();
//   await page.getByRole('option', { name: 'Professional' }).click();
//   await page.getByRole('textbox', { name: 'Title (for your reference)' }).click();
//   await page.getByRole('textbox', { name: 'Subject Line' }).click();
//   await page.getByRole('textbox', { name: 'Message Content' }).click();
//   await page.getByRole('button', { name: 'Generate with AI' }).click();
//   await page.getByText('/ 1900 characters').click();
//   await page.getByText('remaining').click();
//   await page.getByRole('progressbar').click();
//   await page.locator('div').filter({ hasText: /^1241 \/ 1900 characters659 remaining$/ }).first().click();
//   await page.getByRole('button', { name: 'Save' }).click();
//   await page.locator('div').filter({ hasText: /^Did you send it\?$/ }).click();
//   await page.getByRole('button', { name: 'Not yet' }).click();
//   await page.getByRole('tab', { name: 'Saved' }).click();
//   await page.getByText('Saved ContentTitleTypeStatusCompanyLast ModifiedActionstest.co QA engineer -').click();
//   await page.getByText('Saved Content').click();
//   await page.getByText('Saved ContentTitleTypeStatusCompanyLast ModifiedActionstest.co QA engineer -').click();
//   await page.getByText('test.co QA engineer -').click();
//   await page.locator('.MuiBox-root.css-1lc98ku').click();
//   await page.getByRole('tab', { name: 'Create New' }).click();
// await page.getByRole('button', { name: 'Recruiter Email Cold outreach' }).click();
//   await page.getByRole('button', { name: 'Generate with AI' }).click();
//   await page.getByRole('button', { name: 'Copy to clipboard' }).click();
//   await page.getByRole('button', { name: 'Save' }).click();
//   await page.getByRole('button', { name: 'Not yet' }).click();
//   await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
//   await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
//   await page.locator('div').filter({ hasText: /^Context \(Optional\)1 selected$/ }).first().click();
//   await page.locator('div').filter({ hasText: /^Context \(Optional\)1 selected$/ }).first().click();
//   await page.locator('div').filter({ hasText: /^Context \(Optional\)1 selected$/ }).first().click();
//   await page.getByRole('button', { name: 'Clear' }).click();
//   await page.getByRole('button', { name: '📄 My Resumes' }).click();
//   await page.getByRole('button', { name: 'Open' }).first().click();
// await page.getByRole('button', { name: 'Recruiter Email Cold outreach' }).click();
//   await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
//   await page.getByRole('button', { name: 'Generate with AI' }).click();
//   await page.getByRole('textbox', { name: 'Message Content' }).click();
//   await page.getByRole('textbox', { name: 'Title (for your reference)' }).click();
//   await page.getByRole('textbox', { name: 'Subject Line' }).click();
// });
