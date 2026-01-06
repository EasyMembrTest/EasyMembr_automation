import { Page } from "@playwright/test";

export class SamplePage {
  private page: Page;
  private emailInputSelector = "//input[@placeholder='Email / Mobile Number.']";
  private passwordInputSelector = "//input[@placeholder='Password']";
  private submitButtonSelector = "button[type='submit']";
  private loginUrl = "https://portal.zencruz.com/login";

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the login page
   */
  async navigateToLoginPage() {
    await this.page.goto(this.loginUrl);
  }

  /**
   * Enter email/mobile number
   * @param email - Email or mobile number to enter
   */
  async enterEmail(email: string) {
    await this.page.fill(this.emailInputSelector, email);
  }

  /**
   * Enter password
   * @param password - Password to enter
   */
  async enterPassword(password: string) {
    await this.page.fill(this.passwordInputSelector, password);
  }

  /**
   * Click the submit button
   */
  async clickSubmitButton() {
    await this.page.click(this.submitButtonSelector);
  }

  /**
   * Complete login flow
   * @param email - Email or mobile number
   * @param password - Password
   */
  async login(email: string, password: string) {
    await this.navigateToLoginPage();
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmitButton();
  }
}
