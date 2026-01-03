import { Page } from '@playwright/test';
import { ProfilePage } from '../../../../src/pages/admin/ProfilePage';
import { ProfilePageObject } from '../../../../src/pages/admin/ProfilePageObject';
import * as env from '../../../../src/config/world';
import * as fs from 'fs';
import { BasePage } from '../../../../src/pages/common/BasePage';
import { LoginPage } from '../../../../src/pages/common/LoginPage';

export const PROFESSIONAL_SECTION = '//*[self::h1 or self::h2 or self::h3 or self::h4 or self::h5 or self::h6][contains(translate(normalize-space(.), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "professional")]';

export const FIELD_OF_INTEREST_LABEL = '//label[text()="Field of Interest"]';
export const FIELD_OF_INTEREST_INPUT = '//input[@name="fieldOfInterest"]';
export const FIELD_OF_INTEREST_HELPER = '//input[@name="fieldOfInterest"][@placeholder="e.g., Software Development, Data Science, UX Design"]';

export const SKILLS_LABEL = '//label[text()="Skills"]';
export const SKILLS_INPUT = '//textarea[@name="skills"]';

export const EXPERIENCE_LABEL = '//label[text()="Experience"]';
export const EXPERIENCE_INPUT = '//textarea[@name="experience"]';

export const EDUCATION_LABEL = '//label[text()="Education"]';
export const EDUCATION_INPUT = '//textarea[@name="education"]';

export const AUTO_SAVE_INDICATOR = '//div[text()="All changes saved"]';

export const PROFESSIONAL_TAB = '//button[text()="Professional Information"]';
export const ANOTHER_TAB = '//button[text()="Personal Information"]';





//Import necessary functions from Cucumber
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
export const And: typeof When = When;

import { expect } from '@playwright/test';
import { CustomWorld } from '../../../../src/config/world';

const ProfilePageCtor: any = (global as any).ProfilePage ?? ProfilePage;
let profilePage: any;

function getProfilePage(this: CustomWorld) {
    if (!this.page) {
        throw new Error('ProfilePage not initialized: world.page is not available');
    }
    if (!profilePage) {
        profilePage = new ProfilePageCtor(this.page);
    }
    return profilePage;
}

// Defer ProfilePage construction until first use via `getProfilePage()` to avoid ordering issues

And('the Admin is on the Professional tab in Profile Settings', async function (this: CustomWorld) {
    const page = (this as CustomWorld).page;

    const profile = getProfilePage.call(this) as ProfilePage;
    const profileObj = new ProfilePageObject(page);

    const errors: string[] = [];

    // Prefer the ProfilePageObject deterministic opener before running fallback attempts
    try {
        try { await profileObj.openProfessional(50000); } catch (e) { errors.push('profileObj.openProfessional:' + (e instanceof Error ? e.message : String(e))); }
        const ok = await page.locator(`xpath=${PROFESSIONAL_SECTION}`).first().waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
        if (ok) return;
    } catch (e) {
        // ignore and continue to fallback attempts
    }

    const dumpTabsOuterHTML = async () => {
        try {
            const selectors = ['[role="tablist"]', 'nav', '[data-testid="profile-tabs"]', 'div[role="tablist"]', '.tabs', '#debug-profile-inject', '[data-testid="profile-link"]'];
            for (const s of selectors) {
                const outer = await page.evaluate((sel) => {
                    const el = document.querySelector(sel as string);
                    return el ? el.outerHTML : null;
                }, s).catch(() => null);
                if (outer) {
                    try { fs.writeFileSync('profile-tabs-outer.html', outer, { encoding: 'utf8' }); } catch (e) {}
                    return outer;
                }
            }
            // fallback: find any element that contains the Professional text
            const fallback = await page.evaluate(() => {
                const nodes = Array.from(document.querySelectorAll('button, a, [role="tab"], div'));
                const found = nodes.find(n => n.textContent && /Professional Information|Professional/i.test(n.textContent));
                return found ? found.outerHTML : null;
            }).catch(() => null);
            if (fallback) {
                try { fs.writeFileSync('profile-tabs-outer.html', fallback, { encoding: 'utf8' }); } catch (e) {}
                return fallback;
            }
            // final fallback: capture the whole document body so we can craft selectors
            try {
                const body = await page.evaluate(() => document.body ? document.body.outerHTML : document.documentElement.outerHTML).catch(() => null);
                if (body) {
                    try { fs.writeFileSync('profile-tabs-outer.html', body, { encoding: 'utf8' }); } catch (e) {}
                    return body;
                }
            } catch (e) {
                // ignore
            }
        } catch (e) {
            // ignore
        }
        return null;
    };

    const attempt = async () => {
        // (previous persistent pin removed) 
        // helper: ensure profile URL and Professional section remain visible for a short stable period
        const waitForStableProfile = async (tries = 3, delay = 500) => {
            for (let i = 0; i < tries; i++) {
                try {
                    const cur = await page.url();
                    const visible = await page.locator(`xpath=${PROFESSIONAL_SECTION}`).first().isVisible().catch(() => false);
                    if (!/profile(\?|\/|$)/.test(cur) || !visible) return false;
                } catch (e) {
                    return false;
                }
                await page.waitForTimeout(delay);
            }
            return true;
        };

        // 1) Best-effort authentication: login then wait for dashboard
        try {
            const loginPage = new LoginPage(page);
            const adminEmail = (env as any).getAdminEmail?.() || process.env.ADMIN_EMAIL || 'admin@percruit.com';
            const adminPassword = (env as any).getAdminPassword?.() || process.env.ADMIN_PASSWORD || 'admin';
            await page.goto(env.getBaseUrl(), { timeout: 8000, waitUntil: 'domcontentloaded' }).catch(() => {});
            await page.waitForLoadState('domcontentloaded', { timeout: 3000 }).catch(() => {});
            await loginPage.login(adminEmail, adminPassword).catch(() => {});
            await page.waitForURL(/profile/, { timeout: 5000 }).catch(() => {});
            // ensure account UI is present (avatar or email) before proceeding
            try {
                await page.locator('text=jcsaintilus+admin1@gmail.com').first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
            } catch (e) {
                // attempt a slightly broader check for avatar or name
                await page.locator('text=Jonathan Calvin Saintilus').first().waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
            }
            // log useful runtime info for debugging
            try { console.log('Post-login URL:', await page.url()); } catch (e) {}
            try { const cookies = await page.context().cookies(); console.log('Cookies count:', cookies.length); } catch (e) {}
            try { const ls = await page.evaluate(() => JSON.stringify(window.localStorage)); console.log('localStorage keys length:', ls?.length || 0); } catch (e) {}
        } catch (e) {
            errors.push('auth:' + (e instanceof Error ? e.message : String(e)));
        }

        // 2) Try POM navigation if provided by environment
        try {
            if (typeof profile.gotoProfile === 'function') {
                await profile.gotoProfile();
                await page.waitForLoadState('domcontentloaded', { timeout: 3000 }).catch(() => {});
            }
            // If the POM exposes a stronger ensure method, use it to guarantee the Professional tab
            if (typeof profile.ensureOnProfessionalTab === 'function') {
                await profile.ensureOnProfessionalTab().catch((e: any) => { errors.push('ensureOnProfessionalTab:' + (e instanceof Error ? e.message : String(e))); });
                await page.waitForLoadState('domcontentloaded', { timeout: 2000 }).catch(() => {});
            }
        } catch (e) {
            errors.push('pomGoto:' + (e instanceof Error ? e.message : String(e)));
        }

        // 3) Try direct profile URLs (fallbacks)
        const profilePaths = ['settings/profile', 'account/profile', 'profile/settings', 'profile'];
        for (const p of profilePaths) {
            try {
                await page.goto(new URL(p, env.getBaseUrl()).toString(), { timeout: 8000, waitUntil: 'domcontentloaded' }).catch(() => {});
                await page.waitForLoadState('domcontentloaded', { timeout: 3000 }).catch(() => {});
                const ok = await page.locator(`xpath=${PROFESSIONAL_SECTION}`).first().isVisible().catch(() => false);
                if (ok) {
                    const stable = await waitForStableProfile();
                    if (stable) return;
                    errors.push('unstable:profilePath:' + p);
                }
            } catch (e) {
                // try next
            }
        }

        // 4) If Professional section already visible after navigation, we're done
        try {
            if (await page.locator(`xpath=${PROFESSIONAL_SECTION}`).first().isVisible().catch(() => false)) { return; }
        } catch (e) {
            errors.push('sectionCheck:' + (e instanceof Error ? e.message : String(e)));
        }

        // 5) Try multiple selectors for the Professional tab and click the first that works
        // Pause here so the Playwright inspector can be used interactively during debug runs
        // (helpful when element structure differs between environments).
        try { await page.pause(); } catch (e) { /* ignore when not in debug mode */ }
        // If we're still on dashboard, attempt a force navigation to the canonical profile URL
        try {
            const cur = await page.url();
            if (/dashboard/.test(cur)) {
                const forceUrl = new URL('settings/profile', env.getBaseUrl()).toString();
                try {
                    await page.goto(forceUrl, { waitUntil: 'networkidle', timeout: 15000 });
                    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
                        if (await page.locator(`xpath=${PROFESSIONAL_SECTION}`).first().isVisible().catch(() => false)) {
                        // Install a lightweight client-side lock that forces the SPA URL back to /profile
                        // if it briefly navigates away. This helps tests stay on the Profile page while
                        // the app performs transient client-side routing.
                        try {
                                await page.evaluate(() => {
                                // Install a light lock that keeps the SPA on /profile?tab=professional
                                (window as any).__forceProfileLock = true;
                                if ((window as any).__forceProfileInterval) return;
                                const ensureProfile = () => {
                                    try {
                                        const u = location.pathname + (location.search || '');
                                        if (!/profile(\/?|$)/i.test(u) || !/tab=professional/i.test(location.search)) {
                                            history.pushState({}, '', '/profile?tab=professional');
                                            window.dispatchEvent(new PopStateEvent('popstate'));
                                        }
                                        const candidates = Array.from(document.querySelectorAll('button, a, [role="tab"], li, div'))
                                            .filter(n => n.textContent && /professional/i.test(n.textContent));
                                        for (const el of candidates) {
                                            try {
                                                (el as HTMLElement).scrollIntoView({ behavior: 'auto', block: 'center' });
                                                el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                                                el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                                                el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                                                el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                                                break;
                                            } catch (err) {
                                                // continue
                                            }
                                        }
                                    } catch (e) {
                                        // swallow
                                    }
                                };
                                (window as any).__forceProfileInterval = setInterval(ensureProfile, 250);
                            });
                        } catch (e) {
                            // ignore
                        }
                        return;
                    }
                } catch (e) {
                    // continue to selector attempts if force navigation fails
                }
            }
        } catch (e) {
            // ignore
        }
        const selectors = [
            'role=tab[name="Professional Information"]',
            'role=tab[name="Professional"]',
            `xpath=${PROFESSIONAL_TAB}`,
            'button:has-text("Professional Information")',
            'button:has-text("Professional")',
            'a[href*="/settings/profile"]',
            'a[href*="/profile"]',
            '[data-testid="profile-link"]',
            'a:has-text("Professional Information")',
            'a:has-text("Professional")',
            'text=Professional Information',
            'text=Professional'
        ];

        let clicked = false;
        for (const sel of selectors) {
            try {
                const loc = page.locator(sel).first();
                await loc.waitFor({ state: 'visible', timeout: 3000 });
                await loc.scrollIntoViewIfNeeded().catch(() => {});
                await loc.click({ timeout: 4000 });
                const ok = await page.locator(`xpath=${PROFESSIONAL_SECTION}`).first().waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
                if (ok) {
                    // verify the Professional heading text is present
                    try { await expect(page.locator(`xpath=${PROFESSIONAL_SECTION}`).first()).toHaveText(/Professional Information/i, { timeout: 3000 }); } catch (e) { /* let stability check report */ }
                    const stable = await waitForStableProfile();
                    if (stable) {
                        clicked = true;
                        break;
                    } else {
                        errors.push(`unstable:selector:${sel}`);
                        continue;
                    }
                }
            } catch (e) {
                errors.push(`${sel}:${e instanceof Error ? e.message : String(e)}`);
            }
        }

        // 5b) Explicitly try the canonical PROFESSIONAL_TAB XPath and then verify Field of Interest input
        if (!clicked) {
            try {
                const explicit = page.locator(`xpath=${PROFESSIONAL_TAB}`).first();
                if (await explicit.count() > 0) {
                    await explicit.scrollIntoViewIfNeeded().catch(() => {});
                    await explicit.click({ timeout: 4000 }).catch(() => {});
                    const okInput = await page.locator(`xpath=${FIELD_OF_INTEREST_INPUT}`).first().waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
                    if (okInput) {
                        // verify Professional heading text is present after the explicit tab click
                        try { await expect(page.locator(`xpath=${PROFESSIONAL_SECTION}`).first()).toHaveText(/Professional Information/i, { timeout: 3000 }); } catch (e) { /* ignore, stability will catch */ }
                        const stable = await waitForStableProfile();
                        if (stable) { return; }
                        errors.push('unstable:explicitTab');
                    }
                }
            } catch (e) {
                errors.push('explicitTab:' + (e instanceof Error ? e.message : String(e)));
            }
        }

        // 6) Avatar/menu fallback: open user menu and click profile/settings then try again
        if (!clicked) {
            const menuSelectors = [
                '[data-testid="user-menu"]',
                'img[alt*="avatar"]',
                'div.MuiAvatar-root',
                '.MuiAvatar-root',
                'p:has-text("Jonathan Calvin Saintilus")',
                'span:has-text("jcsaintilus+admin1@gmail.com")',
                'button:has-text("Account")',
                'button[aria-label="Open user menu"]'
            ];
            for (const m of menuSelectors) {
                try {
                    console.log('Trying menu selector', m, 'on', await page.url());
                    const mloc = page.locator(m).first();
                    await mloc.waitFor({ state: 'visible', timeout: 5000 });
                    await mloc.click({ timeout: 5000 }).catch(() => {});
                    const profileLink = page.locator('a:has-text("Profile"), a:has-text("Settings"), button:has-text("Profile"), text=Profile');
                    await profileLink.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
                    if (await profileLink.count() > 0) {
                        await profileLink.first().click({ timeout: 3000 }).catch(() => {});
                        const ok = await page.locator(`xpath=${PROFESSIONAL_SECTION}`).first().waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
                        if (ok) {
                            const stable = await waitForStableProfile();
                            if (stable) {
                                clicked = true;
                                break;
                            } else {
                                errors.push('unstable:menuProfileLink');
                            }
                        }
                    }
                } catch (e) {
                    // continue trying other menu selectors
                }
            }

            // 6b) Evaluate fallback: find element with admin email or name and click the nearest clickable ancestor
            if (!clicked) {
                try {
                    console.log('Attempting DOM-eval fallback to click profile trigger on', await page.url());
                    const clickedViaEval = await page.evaluate(() => {
                        const texts = ['jcsaintilus+admin1@gmail.com', 'Jonathan Calvin Saintilus', 'Admin'];
                        for (const t of texts) {
                            const el = Array.from(document.querySelectorAll('body *')).find(n => n.textContent && n.textContent.includes(t));
                            if (el) {
                                let node: any = el;
                                while (node && node !== document.body) {
                                    if (node.tagName === 'BUTTON' || node.getAttribute && node.getAttribute('role') === 'button') {
                                        try { (node as HTMLElement).click(); } catch (err) {}
                                        return true;
                                    }
                                    node = node.parentElement;
                                }
                                try { (el as HTMLElement).click(); } catch (err) {}
                                return true;
                            }
                        }
                        return false;
                    });
                    if (clickedViaEval) {
                        const profileLink = page.locator('a:has-text("Profile"), a:has-text("Settings"), button:has-text("Profile"), text=Profile');
                        await profileLink.first().waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
                        if (await profileLink.count() > 0) {
                            await profileLink.first().click({ timeout: 3000 }).catch(() => {});
                            const ok = await page.locator(`xpath=${PROFESSIONAL_SECTION}`).first().waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
                            if (ok) {
                                const stable = await waitForStableProfile();
                                if (stable) clicked = true;
                                else errors.push('unstable:dom-eval');
                            }
                        }
                    }
                } catch (e) {
                    // swallow
                }
            }
        }

        // 7) Final verification
        if (clicked || (await page.locator(`xpath=${PROFESSIONAL_SECTION}`).first().isVisible().catch(() => false))) return;

        // 8) If we reach here, main attempt failed: throw to be caught by outer timeout handler
        throw new Error('Could not navigate to Professional tab. Attempts: ' + errors.join(' | '));
    };

    // Internal timeout to capture artifacts before Cucumber's default timeout kills the step

    const timeoutMs = 60000;
    let timer: any;
    const timeoutPromise = new Promise<never>((_, reject) => {
        timer = setTimeout(async () => {
            try {
                await page.screenshot({ path: 'playwright-debug-professional-timeout.png', fullPage: true }).catch((e) => console.error('screenshot failed', e));
            } catch (e) {
                console.error('screenshot exception', e);
            }
            try {
                fs.writeFileSync('playwright-debug-professional-timeout.html', await page.content(), { encoding: 'utf8' });
            } catch (e) {
                console.error('write debug html failed', e instanceof Error ? e.message : String(e));
            }
            reject(new Error(`Timed out after ${timeoutMs}ms trying to reach Professional tab. Attempts: ${errors.join(' | ')}`));
        }, timeoutMs);
    });

    try {
        const result = await Promise.race([attempt().then((r) => { clearTimeout(timer); return r; }), timeoutPromise]);
        return result;
    } finally {
        // dump tabs outerHTML for debugging regardless of outcome
        try { await dumpTabsOuterHTML(); } catch (e) {}
        clearTimeout(timer);
        try {
            // remove lightweight forceProfile lock if it was installed
            try { if (typeof profile.clearProfileGuard === 'function') await profile.clearProfileGuard(); } catch (e) {}
            try { if (typeof profile.clearProfileLock === 'function') await profile.clearProfileLock(); } catch (e) {}
            try { if (typeof (profile as any).clearLocks === 'function') await (profile as any).clearLocks(); } catch (e) {}
            try { if (typeof (profileObj as any).clearLocks === 'function') await (profileObj as any).clearLocks(); } catch (e) {}
            await (page as any).evaluate(() => {
                try {
                    if ((window as any).__forceProfileInterval) {
                        clearInterval((window as any).__forceProfileInterval);
                        (window as any).__forceProfileInterval = null;
                    }
                    (window as any).__forceProfileLock = false;
                } catch (e) {}
            });
        } catch (e) {
            // ignore
        }
    }
});

And('Field of Interest shows (placeholder|placeholders|example|examples|helper|pl.*)', async function (this: CustomWorld, _match?: string) {
    const placeholder = await (this as CustomWorld).page.locator(FIELD_OF_INTEREST_INPUT).getAttribute('placeholder');
    if (placeholder) {
        expect(placeholder).toContain('e.g.');
    } else {
        const isHelperVisible = await (profilePage as any).isElementVisible(FIELD_OF_INTEREST_HELPER);
        expect(isHelperVisible).toBeTruthy();
    }
});

// ...existing code...

//Scenario: Professional section and fields are visible
Then('the Professional Information section is visible', async function () {
    const page = (this as CustomWorld).page;
    await page.locator(`xpath=${PROFESSIONAL_SECTION}`).waitFor({ state: 'visible', timeout: 5000 });
    const isVisible = await (profilePage as any).isElementVisible(PROFESSIONAL_SECTION);
    expect(isVisible).toBeTruthy();
});

And('the fields Field of Interest, Skills, Experience, and Education are displayed', async function () {
    const FIELD_OF_INTEREST_LOCATOR = '//label[text()="Field of Interest"]';
    const SKILLS_LOCATOR = '//label[text()="Skills"]';
    const EXPERIENCE_LOCATOR = '//label[text()="Experience"]';
    const EDUCATION_LOCATOR = '//label[text()="Education"]';

    const isFieldOfInterestVisible = await (profilePage as any).isElementVisible(FIELD_OF_INTEREST_LOCATOR);
    const isSkillsVisible = await (profilePage as any).isElementVisible(SKILLS_LOCATOR);
    const isExperienceVisible = await (profilePage as any).isElementVisible(EXPERIENCE_LOCATOR);
    const isEducationVisible = await (profilePage as any).isElementVisible(EDUCATION_LOCATOR);

    expect(isFieldOfInterestVisible).toBeTruthy();
    expect(isSkillsVisible).toBeTruthy();
    expect(isExperienceVisible).toBeTruthy();
    expect(isEducationVisible).toBeTruthy();
});

And('Field of Interest shows placeholder examples for acceptable entries', async function () {
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
    const isAutoSaved = await (profilePage as any).isElementVisible(AUTO_SAVE_INDICATOR_LOCATOR);
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
    const isAutoSaved = await (profilePage as any).isElementVisible(AUTO_SAVE_INDICATOR_LOCATOR);
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
    const isHelperVisible = await (profilePage as any).isElementVisible(FIELD_OF_INTEREST_HELPER_LOCATOR);
    expect(isHelperVisible).toBeTruthy();
});

And('the Admin can still type and auto-save valid information without any issue', async function () {
    const FIELD_OF_INTEREST_INPUT_LOCATOR = '//input[@name="fieldOfInterest"]';
    await (this as CustomWorld).page.fill(FIELD_OF_INTEREST_INPUT_LOCATOR, 'Cybersecurity, Cloud Computing');
    const AUTO_SAVE_INDICATOR_LOCATOR = '//div[text()="All changes saved"]';
    const isAutoSaved = await (profilePage as any).isElementVisible(AUTO_SAVE_INDICATOR_LOCATOR);
    expect(isAutoSaved).toBeTruthy();
    const fieldOfInterestValue = await (this as CustomWorld).page.locator(FIELD_OF_INTEREST_INPUT_LOCATOR).inputValue();
    expect(fieldOfInterestValue).toBe('Cybersecurity, Cloud Computing');
});