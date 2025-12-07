const baseUrl = 'https://stage.tripleten.percruit.com';

export class LoginPage {
  page: any;

  constructor(page: any) {
    this.page = page;
  }

  async gotoLoginPage() {
  
    await this.page.goto(`${baseUrl}/login`);
  }

  async loginAsAdmin(email: string, password: string) {
    await this.page
      .getByRole('textbox', { name: 'ebc951+@gmail.com' })
      .fill(email);

    await this.page
      .getByRole('textbox', { name: 'NotSoLittle1' })
      .fill(password);

    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }
}
