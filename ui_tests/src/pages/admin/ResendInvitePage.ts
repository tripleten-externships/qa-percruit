import { Page } from '@playwright/test';

export class ResendInvitePage {

  constructor(private page: Page) {}

  async goToAllUsers() {
    await this.page.getByRole('tab', { name: 'All Users' }).click();
  }

  async clickInviteUser() {
    await this.page.getByRole('button', { name: 'Invite User' }).click();
  }

  async fillName(name: string) {
    await this.page.getByPlaceholder('Name').fill(name);
  }

  async fillEmail(email: string) {
    await this.page.getByPlaceholder('Email').fill(email);
  }

  async sendInvitation() {
    await this.page.getByRole('button', { name: 'Send Invitation' }).click();
}}
