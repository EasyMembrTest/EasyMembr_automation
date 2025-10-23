import { Page, expect } from '@playwright/test';

export class TransactionsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async gotoMembersManagement() {
    await this.page.click("//a[text()=' Members Management']");
  }

  async searchMember(name: string) {
    const input = this.page.locator('input[placeholder="search here..."]');
    await input.fill('');
    await input.fill(name);
  }

  async clickApplyButton() {
    await this.page.click('button:has-text("Apply")');
    await this.page.waitForTimeout(2000);
  }

  async expectNoDataFound() {
    await expect(this.page.locator("//p[text()=' No Data Found']")).toBeVisible();
  }

  async gotoTransactions() {
    await this.page.click("//a[text()=' Transactions']");
  }

  async clickImportButton() {
    await this.page.click("//button[text()='Import']");
  }

  async uploadFile(filePath: string) {
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
    await expect(this.page.getByText('Transaction_Data.xlsx')).toBeVisible();
  }

  async clickUploadButton() {
    await this.page.locator('//button[text()="Upload"]').click();
  }

  async expectImportSuccess() {
    await expect(this.page.locator('text=Imported successfully!')).toBeVisible();
  }

  async closeAlertIfVisible() {
    const closeBtn = this.page.locator('//button[@class="ripple ripple-surface btn-close"]');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  }

  async searchTransaction(name: string) {
    const input = this.page.locator('(//input[@placeholder="search here..."])[1]');
    await input.fill('');
    await input.fill(name);
  }

  async expectTransactionRowCount(count: number) {
    const rows = this.page.locator("//div[@class='TransactionsTable sno']//tbody/tr");
    await expect(rows).toHaveCount(count);
  }

  async expectTransactionRowCountGreaterThan(count: number) {
    const rows = this.page.locator("//div[@class='TransactionsTable sno']//tbody/tr");
    await expect(await rows.count()).toBeGreaterThan(count);
  }

   expectTransactionRowVisible(name: string, amount: string, plan:string, date: string) {
    return this.page.locator(`//div[@class='TransactionsTable sno']//tbody/tr/td[text()='${name}']/../td[11][text()='${amount}']/../td/div[text()='${plan}']/../../td/span[contains(text(),'${date}')]/../../td[23]/i[@class='fas fa-trash']`);
  }

   expectTotalAmount(amount: string) {
    return this.page.locator(`//div[text()='Total Amount Received: ']/..//b[text()='${amount}']`)
  }

  async clickClearButton() {
    await this.page.click('button:has-text("Clear")');
    await this.page.waitForTimeout(2000);
  }

   deleteTransaction(name: string, amount: string, plan:string, date: string) {
    return this.page.locator(`//div[@class='TransactionsTable sno']//tbody/tr/td[text()='${name}']/../td[11][text()='${amount}']/../td/div[text()='${plan}']/../../td/span[contains(text(),'${date}')]/../../td[23]/i[@class='fas fa-trash']`);
    
  }

  async expectNoDataFoundTransaction() {
    await expect(this.page.locator("//p[text()=' No Data Found']")).toBeVisible();
  }

  async expectTotalAmountZero() {
    await expect(this.page.locator('(//div[text()="Total Amount Received: "]/..//b[text()="0"])[1]')).toBeVisible();
  }

  async deleteMember(name: string, mobile: string) {
    this.page.once('dialog', async dialog => {
      expect(dialog.message()).toBe("Are you sure want to delete this Member?");
      await dialog.accept();
    });
    await this.page.click(`//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='${name}']/../td[text()='${mobile}']/../td[text()='No Plan Associated']/../td/div[text()='Active']/../../td/span/img[@alt='Delete']`);
  }

  async gotoDashboard() {
    await this.page.click("//a[text()=' Dashboard']");
  }

   expectMemberRowVisible(name:String, mobile:String, Plan:String, date:String) {
    return this.page.locator(`//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='${name}']/../td[text()='${mobile}']/../td[text()='${Plan}']/../td/div[text()='Inactive']/../../td[text()='${date}']`);
  }

    async expectTransactionImportSuccess() {
    await expect(this.page.locator('text=Transaction(s) Imported successfully!')).toBeVisible();
  }
}
