//Import necessary functions from Cucumber
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
export const And: typeof When = When;

import { expect } from '@playwright/test';
import { CustomWorld } from '../../../../src/config/world';

import { Page } from 'playwright';
import { BasePage } from '../../../../src/pages/common/BasePage';

import * as env from '../../../../src/config/world';

let ProfessionalPage: BasePage;

Before(async function (this: CustomWorld) {
    ProfessionalPage = new BasePage(this.page);
});


//Scenario: Professional section and fields are visible
Then('the Professional Information section is visible', async function () {
    await ProfessionalPage.waitForPageLoad();
    const PROFESSIONAL_SECTION_LOCATOR = '//h2[text()="Professional Information"]';
    const isVisible = await (ProfessionalPage as any).isElementVisible(PROFESSIONAL_SECTION_LOCATOR);
    expect(isVisible).toBeTruthy();
});

And('the fields Field of Interest, Skills, Experience, and Education are displayed', async function () {
    const FIELD_OF_INTEREST_LOCATOR = '//label[text()="Field of Interest"]';
    const SKILLS_LOCATOR = '//label[text()="Skills"]';
    const EXPERIENCE_LOCATOR = '//label[text()="Experience"]';
    const EDUCATION_LOCATOR = '//label[text()="Education"]';

    const isFieldOfInterestVisible = await (ProfessionalPage as any).isElementVisible(FIELD_OF_INTEREST_LOCATOR);
    const isSkillsVisible = await (ProfessionalPage as any).isElementVisible(SKILLS_LOCATOR);
    const isExperienceVisible = await (ProfessionalPage as any).isElementVisible(EXPERIENCE_LOCATOR);
    const isEducationVisible = await (ProfessionalPage as any).isElementVisible(EDUCATION_LOCATOR);

    expect(isFieldOfInterestVisible).toBeTruthy();
    expect(isSkillsVisible).toBeTruthy();
    expect(isExperienceVisible).toBeTruthy();
    expect(isEducationVisible).toBeTruthy();
});

And('Field of Interest shows placeholder exmaples for acceptable entries', async function () {
    const FIELD_OF_INTEREST_INPUT_LOCATOR = '//input[@name="fieldOfInterest"]';
    const placeholder = await (this as CustomWorld).page.locator(FIELD_OF_INTEREST_INPUT_LOCATOR).getAttribute('placeholder');
    expect(placeholder).toBe('e.g., Software Development, Data Science, UX Design');
});

And('each field contains existing text or is empty if not yet provided', async function () {
    const FIELD_OF_INTEREST_INPUT_LOCATOR = '//input[@name="fieldOfInterest"]';
    const fieldOfInterestValue = await (this as CustomWorld).page.locator(FIELD_OF_INTEREST_INPUT_LOCATOR).inputValue();
    expect(fieldOfInterestValue).not.toBeNull();
});


//Scenario: Admin provides professional details (auto-save persists)
When('the Admin enters valid text into the Field of Interest, Skills, Experience, and Education', async function () {
    const FIELD_OF_INTEREST_INPUT_LOCATOR = '//input[@name="fieldOfInterest"]';
    const SKILLS_INPUT_LOCATOR = '//textarea[@name="skills"]';
    const EXPERIENCE_INPUT_LOCATOR = '//textarea[@name="experience"]';
    const EDUCATION_INPUT_LOCATOR = '//textarea[@name="education"]';

    await (this as CustomWorld).page.fill(FIELD_OF_INTEREST_INPUT_LOCATOR, 'Software Development, Data Science');
    await (this as CustomWorld).page.fill(SKILLS_INPUT_LOCATOR, 'JavaScript, Python, SQL');
    await (this as CustomWorld).page.fill(EXPERIENCE_INPUT_LOCATOR, '3 years at TechCorp as a Software Engineer');
    await (this as CustomWorld).page.fill(EDUCATION_INPUT_LOCATOR, 'B.Sc. in Computer Science from University X');
});

Then('changes should automatically save as the Admin types', async function () {
    // Assuming there is an auto-save indicator that appears when saving
    const AUTO_SAVE_INDICATOR_LOCATOR = '//div[text()="All changes saved"]';
    const isAutoSaved = await (ProfessionalPage as any).isElementVisible(AUTO_SAVE_INDICATOR_LOCATOR);
    expect(isAutoSaved).toBeTruthy();
});

And('each field should display the updated text immediately', async function () {
    const FIELD_OF_INTEREST_INPUT_LOCATOR = '//input[@name="fieldOfInterest"]';
    const SKILLS_INPUT_LOCATOR = '//textarea[@name="skills"]';
    const EXPERIENCE_INPUT_LOCATOR = '//textarea[@name="experience"]';
    const EDUCATION_INPUT_LOCATOR = '//textarea[@name="education"]';
    // Additional locators for Skills, Experience, and Education can be added similarly
    const fieldOfInterestValue = await (this as CustomWorld).page.locator(FIELD_OF_INTEREST_INPUT_LOCATOR).inputValue();
    const skillsValue = await (this as CustomWorld).page.locator(SKILLS_INPUT_LOCATOR).inputValue();
    const experienceValue = await (this as CustomWorld).page.locator(EXPERIENCE_INPUT_LOCATOR).inputValue();
    const educationValue = await (this as CustomWorld).page.locator(EDUCATION_INPUT_LOCATOR).inputValue();
    expect(fieldOfInterestValue).toBe('Software Development, Data Science');
    expect(skillsValue).toBe('JavaScript, Python, SQL');
    expect(experienceValue).toBe('3 years at TechCorp as a Software Engineer');
    expect(educationValue).toBe('B.Sc. in Computer Science from University X');
});

And('the updated values remain after switching to another tab and returning', async function () {
    const ProfessionalTabLocator = '//button[text()="Professional Information"]';
    const AnotherTabLocator = '//button[text()="Personal Information"]';
    await (this as CustomWorld).page.click(AnotherTabLocator);
    await (this as CustomWorld).page.click(ProfessionalTabLocator);
    expect(await (this as CustomWorld).page.locator('//input[@name="fieldOfInterest"]').inputValue()).toBe('Software Development, Data Science');
    expect(await (this as CustomWorld).page.locator('//textarea[@name="skills"]').inputValue()).toBe('JavaScript, Python, SQL');
    expect(await (this as CustomWorld).page.locator('//textarea[@name="experience"]').inputValue()).toBe('3 years at TechCorp as a Software Engineer');
    expect(await (this as CustomWorld).page.locator('//textarea[@name="education"]').inputValue()).toBe('B.Sc. in Computer Science from University X');
});

And('the updated values remain after a page refresh', async function () {
    await (this as CustomWorld).page.reload();
    expect(await (this as CustomWorld).page.locator('//input[@name="fieldOfInterest"]').inputValue()).toBe('Software Development, Data Science');
    expect(await (this as CustomWorld).page.locator('//textarea[@name="skills"]').inputValue()).toBe('JavaScript, Python, SQL');
    expect(await (this as CustomWorld).page.locator('//textarea[@name="experience"]').inputValue()).toBe('3 years at TechCorp as a Software Engineer');
    expect(await (this as CustomWorld).page.locator('//textarea[@name="education"]').inputValue()).toBe('B.Sc. in Computer Science from University X');
});


//Scenario:Updating one field does not alter others
Given('all four fields currently contain valid text', async function () {
    const FIELD_OF_INTEREST_INPUT_LOCATOR = '//input[@name="fieldOfInterest"]';
    const SKILLS_INPUT_LOCATOR = '//textarea[@name="skills"]';
    const EXPERIENCE_INPUT_LOCATOR = '//textarea[@name="experience"]';
    const EDUCATION_INPUT_LOCATOR = '//textarea[@name="education"]';
    await (this as CustomWorld).page.fill(FIELD_OF_INTEREST_INPUT_LOCATOR, 'Software Development, Data Science');
    await (this as CustomWorld).page.fill(SKILLS_INPUT_LOCATOR, 'JavaScript, Python, SQL');
    await (this as CustomWorld).page.fill(EXPERIENCE_INPUT_LOCATOR, '3 years at TechCorp as a Software Engineer');
    await (this as CustomWorld).page.fill(EDUCATION_INPUT_LOCATOR, 'B.Sc. in Computer Science from University X');
});

When('the Admin updates only the Skills field', async function () {
    const SKILLS_INPUT_LOCATOR = '//textarea[@name="skills"]';
    await (this as CustomWorld).page.fill(SKILLS_INPUT_LOCATOR, 'JavaScript, Python, React');
});

Then('the change should automatically save', async function () {
    const AUTO_SAVE_INDICATOR_LOCATOR = '//div[text()="All changes saved"]';
    const isAutoSaved = await (ProfessionalPage as any).isElementVisible(AUTO_SAVE_INDICATOR_LOCATOR);
    expect(isAutoSaved).toBeTruthy();
});

And('the Field of Interest, Experience, and Education fields remain unchanged', async function () {
    const FIELD_OF_INTEREST_INPUT_LOCATOR = '//input[@name="fieldOfInterest"]';
    const EXPERIENCE_INPUT_LOCATOR = '//textarea[@name="experience"]';
    const EDUCATION_INPUT_LOCATOR = '//textarea[@name="education"]';
    const fieldOfInterestValue = await (this as CustomWorld).page.locator(FIELD_OF_INTEREST_INPUT_LOCATOR).inputValue();
    const experienceValue = await (this as CustomWorld).page.locator(EXPERIENCE_INPUT_LOCATOR).inputValue();
    const educationValue = await (this as CustomWorld).page.locator(EDUCATION_INPUT_LOCATOR).inputValue();
    expect(fieldOfInterestValue).toBe('Software Development, Data Science');
    expect(experienceValue).toBe('3 years at TechCorp as a Software Engineer');
    expect(educationValue).toBe('B.Sc. in Computer Science from University X');
});

And('all values remain consistent after a page refresh', async function () {
    await (this as CustomWorld).page.reload();
    expect(await (this as CustomWorld).page.locator('//input[@name="fieldOfInterest"]').inputValue()).toBe('Software Development, Data Science');
    expect(await (this as CustomWorld).page.locator('//textarea[@name="skills"]').inputValue()).toBe('JavaScript, Python, React');
    expect(await (this as CustomWorld).page.locator('//textarea[@name="experience"]').inputValue()).toBe('3 years at TechCorp as a Software Engineer');
    expect(await (this as CustomWorld).page.locator('//textarea[@name="education"]').inputValue()).toBe('B.Sc. in Computer Science from University X');
});


//Scenario: Multi-line content is preserved for long-form fields
When('the Admin enters multi-line content into Experience and Education fields', async function () {
    const EXPERIENCE_INPUT_LOCATOR = '//textarea[@name="experience"]';
    const EDUCATION_INPUT_LOCATOR = '//textarea[@name="education"]';
    const multiLineExperience = `Software Engineer at TechCorp
- Developed web applications using JavaScript and React
- Collaborated with cross-functional teams
- Led code reviews and mentored junior developers`;
    const multiLineEducation = `B.Sc. in Computer Science from University X
- Graduated with Honors
- Relevant Coursework: Data Structures, Algorithms, Database Systems
- Member of the Computer Science Club`;
    await (this as CustomWorld).page.fill(EXPERIENCE_INPUT_LOCATOR, multiLineExperience);
    await (this as CustomWorld).page.fill(EDUCATION_INPUT_LOCATOR, multiLineEducation);
});

Then('the line breaks and spacing should be preserved in the displayed content', async function () {
    const EXPERIENCE_INPUT_LOCATOR = '//textarea[@name="experience"]';
    const EDUCATION_INPUT_LOCATOR = '//textarea[@name="education"]';
    const experienceValue = await (this as CustomWorld).page.locator(EXPERIENCE_INPUT_LOCATOR).inputValue();
    const educationValue = await (this as CustomWorld).page.locator(EDUCATION_INPUT_LOCATOR).inputValue();
    expect(experienceValue).toContain('\n- Developed web applications using JavaScript and React\n- Collaborated with cross-functional teams\n- Led code reviews and mentored junior developers');
    expect(educationValue).toContain('\n- Graduated with Honors\n- Relevant Coursework: Data Structures, Algorithms, Database Systems\n- Member of the Computer Science Club');
});

And('the content remains formatted after a page refresh', async function () {
    await (this as CustomWorld).page.reload();
    const EXPERIENCE_INPUT_LOCATOR = '//textarea[@name="experience"]';
    const EDUCATION_INPUT_LOCATOR = '//textarea[@name="education"]';
    const experienceValue = await (this as CustomWorld).page.locator(EXPERIENCE_INPUT_LOCATOR).inputValue();
    const educationValue = await (this as CustomWorld).page.locator(EDUCATION_INPUT_LOCATOR).inputValue();
    expect(experienceValue).toContain('\n- Developed web applications using JavaScript and React\n- Collaborated with cross-functional teams\n- Led code reviews and mentored junior developers');
    expect(educationValue).toContain('\n- Graduated with Honors\n- Relevant Coursework: Data Structures, Algorithms, Database Systems\n- Member of the Computer Science Club');
});


//Scenario: Field hints are visible and do not interfere with typing
Then('example texts and helper messages are shown where provided', async function () {
    const FIELD_OF_INTEREST_HELPER_LOCATOR = '//input[@name="fieldOfInterest"][@placeholder="e.g., Software Development, Data Science, UX Design"]';
    const isHelperVisible = await (ProfessionalPage as any).isElementVisible(FIELD_OF_INTEREST_HELPER_LOCATOR);
    expect(isHelperVisible).toBeTruthy();
});

And('the Admin can still type and auto-save valid information without any issue', async function () {
    const FIELD_OF_INTEREST_INPUT_LOCATOR = '//input[@name="fieldOfInterest"]';
    await (this as CustomWorld).page.fill(FIELD_OF_INTEREST_INPUT_LOCATOR, 'Cybersecurity, Cloud Computing');
    const AUTO_SAVE_INDICATOR_LOCATOR = '//div[text()="All changes saved"]';
    const isAutoSaved = await (ProfessionalPage as any).isElementVisible(AUTO_SAVE_INDICATOR_LOCATOR);
    expect(isAutoSaved).toBeTruthy();
    const fieldOfInterestValue = await (this as CustomWorld).page.locator(FIELD_OF_INTEREST_INPUT_LOCATOR).inputValue();
    expect(fieldOfInterestValue).toBe('Cybersecurity, Cloud Computing');
});