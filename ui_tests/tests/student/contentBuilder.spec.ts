import { test, expect } from '@playwright/test';
import { ContentBuilderPage } from '../../src/pages/student/ContentBuilderPage';
import { LoginPage } from '../../src/pages/common/LoginPage';
import * as env from '../../src/config/world';
import { evaluateEmailQualityLocal } from '../../src/utils/aiJudge';

test.describe('Student Content Builder Feature', () => {
    let loginPage: LoginPage;
    let contentBuilderPage: ContentBuilderPage;
    const baseUrl = env.getBaseUrl();

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        contentBuilderPage = new ContentBuilderPage(page);
        // Navigate to the application
        await page.goto(baseUrl);
        // Handle cookie consent if it appears
        const cookieButton = page.locator('button:has-text("Accept all cookies")');
        if (await cookieButton.isVisible()) {
            await cookieButton.click();
        }
        //Log in as student
        await loginPage.loginAsUserType('student');

    });

    test('User should be able to load the content builder page', async ({ page }) => {
        await contentBuilderPage.navigateToContentBuilderPage();
        await contentBuilderPage.verifyContentBuilderPageLoaded();
    });

    test('User can generate a professional follow-up message using AI', async ({ page }) => {
        await contentBuilderPage.navigateToContentBuilderPage();
        await contentBuilderPage.createFollowUpEmailContent();
        await contentBuilderPage.sellectToneOption("Professional");
        await contentBuilderPage.clickGenerateContentWithAI();
        const generatedText = await contentBuilderPage.getGeneratedText();
        expect(generatedText).not.toBe('');
        console.log('Generated Follow-Up Email Content:', generatedText);

        // Basic checks for content quality
        // Length check (not too short, not too long)
        expect(generatedText.length).toBeGreaterThan(50);
        expect(generatedText.length).toBeLessThan(2000);
        // Contains expected keyword
        expect(generatedText.toLowerCase()).toContain('thank you');

        // Professional tone (basic heuristic)
        expect(generatedText.toLowerCase()).not.toContain('yo ');
        expect(generatedText).toMatch(/Dear|Hello|Hi/i);
    });

    test.only('AI-generated follow-up email content should pass quality evaluation', async ({ page }) => {
        await contentBuilderPage.navigateToContentBuilderPage();
        await contentBuilderPage.createFollowUpEmailContent();
        await contentBuilderPage.sellectToneOption("Professional");
        await contentBuilderPage.clickGenerateContentWithAI();

        const generatedText = await contentBuilderPage.getGeneratedText();
        console.log('Generated Follow-Up Email Content for AI Evaluation:', generatedText);
        expect(generatedText.length).toBeLessThan(2000);
        const isQualityAcceptable = await evaluateEmailQualityLocal(generatedText);
        expect(isQualityAcceptable).toBeTruthy();

    });
});
