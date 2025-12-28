import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  await page.getByRole('textbox', { name: 'user@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'user@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'user@example.com' }).fill('cheyannejaileen16+admin@gmail.com');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Mentors' }).click();

  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('"Jon');
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('Jon');
  await page.getByText('nmleszgear1+mentor1@gmail.comnmleszgear1+mentor1@gmail.com3 Students').click();
  await page.getByText('jonathan.cost+mentor1@tripleten.comjonathan.cost+mentor1@tripleten.com1 Student').click();
  await page.getByText('Jonathan Calvin Saintilusjcsaintilus+mentor1@gmail.com0 Students').click();
  await page.getByText('jonathan.cost+admintester1@tripleten.comjonathan.cost+admintester1@tripleten.').click();
  await page.locator('.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-row.MuiGrid-spacing-xs-3.css-177xvbk > div:nth-child(4) > .MuiPaper-root').click();
  await page.getByRole('heading', { name: 'Mentors (4)' }).click();

  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).click();
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('"NoSuchMentor');
  await page.getByRole('heading', { name: 'No mentors found' }).click();
  
  await page.getByRole('textbox', { name: 'Search mentors by name, email' }).click();
await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('Cheyanne Darby');
await page.getByRole('heading', { name: 'Cheyanne Darby' }).click();
await page.getByText('CCheyanne Darbycheyannejaileen16+mentor@gmail.com1 StudentView DetailsAssigned').click();
await page.getByRole('heading', { name: 'Mentors (1)' }).click();
await page.getByRole('textbox', { name: 'Search mentors by name, email' }).click();
await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('Cheyanne Darb');
await page.locator('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-1skn7a5').click();
await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('');";
await page.getByRole('textbox', { name: 'Search mentors by name, email' }).click();
await page.getByRole('textbox', { name: 'Search mentors by name, email' }).fill('roojzk+mentor1@gmail.com');
await page.getByText('Rroojzk+mentor1@gmail.comroojzk+mentor1@gmail.com4 StudentsView DetailsAssigned').click();
await page.getByRole('heading', { name: 'Mentors (1)' }).click();";
});