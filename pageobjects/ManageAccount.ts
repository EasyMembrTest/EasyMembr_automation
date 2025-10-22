import { Page, Locator, expect } from '@playwright/test';

export class ManageAccount {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async gotoManageAccount() {
    await this.page.click('text=Manage Account');
  }

    async gotoManageAccount_1() {
    await this.page.click('text= Manage Account');
  }

  async clickEditProfileSettings() {
    await this.page.click("//label[text()='Profile Settings']/..//i[@class='fas fa-pencil-alt fs-6 me-2']");
  }

  async fillFirstName(name: string) {
    const input = this.page.locator('#firs_name');
    await input.fill('');
    await input.fill(name);
  }

  async fillLastName(name: string) {
    const input = this.page.locator('#last_name');
    await input.fill('');
    await input.fill(name);
  }

  async fillAge(age: string) {
    const input = this.page.locator('#age');
    await input.fill('');
    await input.fill(age);
  }

  async fillMobileNumber(number: string) {
    const input = this.page.locator('input[placeholder="Number"]');
    await input.fill('');
    await input.fill(number);
  }

  async clickSave() {
    await this.page.click('button:has-text("Save")');
  }

  async expectProfileSavedAlert() {
    await expect(this.page.getByText('Profile saved successfully')).toBeVisible();
  }

  async gotoDashboard() {
    await this.page.click('//a[text()=" Dashboard"]');
  }

  async assertProfileLabels({ firstName, lastName, age, gender, mobile }: { firstName: string, lastName: string, age: string, gender: string, mobile: string }) {
    await expect(this.page.locator(`//label[text()='${firstName}']`)).toBeVisible();
    await expect(this.page.locator(`//label[text()='${lastName}']`)).toBeVisible();
    await expect(this.page.locator(`//label[text()='${age}']`)).toBeVisible();
    await expect(this.page.locator(`//label[text()='${gender}']`)).toBeVisible();
    await expect(this.page.locator(`//label[text()='${mobile}']`)).toBeVisible();
  }

  async assertFullNameParagraph(firstName: string, lastName: string) {
    await expect(this.page.locator(`//p[text()='${firstName} ${lastName}']`)).toBeVisible();
  }
  async clickSubscriptionTab() {
    await this.page.click('text=Subscription');
  }

  async getPlanName() {
    return this.page.locator('(//div[@class="Business__Details__data mt-2"])[1]/label[2]').textContent();
  }

   async getPlanName_1() {
    return this.page.locator('(//div[@class="Business__Details__data mt-1"])[1]/label[2]').textContent();
  }

  async getDuration() {
    return this.page.locator('(//div[@class="Business__Details__data mt-1"])[2]/label[2]').textContent();
  }

  async getDuration_1() {
    return this.page.locator('(//div[@class="Business__Details__data mt-1"])[3]/label[2]').textContent();
  }

  async clickViewHistory() {
    await this.page.click('text=View History');
  }

  async expectHistoryRow(planName: string, duration: string) {
    await expect(this.page.locator(`(//div[@class='datatable SuscriptionHistoryDataTable']//tbody/tr/td[text()='${planName}']/../td[text()='${duration}'])[1]`)).toBeVisible();
  }

  async clickDownloadButton() {
    await this.page.click('button:has-text("Download")');
  }

  async clickDownloadButton_1() {
    await this.page.click('button:has-text("download")');
  }

  async setDownloadPathAndDeleteIfExists(downloadDir: string, fileName: string) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(downloadDir, fileName);
    if (fs.existsSync(filePath)) {
        console.log(`File ${filePath} already exists. Deleting it.`);
      fs.unlinkSync(filePath);
    }
    return filePath;
  }

  async validateDownloadedFile(filePath: string, planName: string, duration: string) {
    const xlsx = require('xlsx');
    const workbook = xlsx.readFile(filePath);
    let foundPlan = false, foundDuration = false;
    workbook.SheetNames.forEach((sheetName: string) => {
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      for (const row of data) {
        console.log(row);
        if (row.includes(planName)) foundPlan = true;
        if (row.includes(duration)) foundDuration = true;
      }
    });
    if (!foundPlan || !foundDuration) {
      throw new Error('Downloaded file does not contain expected PlanName or Duration');
    }
  }

  async deleteDownloadedFile(filePath: string) {
    const fs = require('fs');
    if (fs.existsSync(filePath)) {
        console.log(`After SetUP:Deleting file ${filePath}`);
      fs.unlinkSync(filePath);
    }
  }

    async clickGymsTab() {
    await this.page.click("//a[text()='Gyms']");
  }

  async clickAddGymsButton() {
    await this.page.click('button:has-text("Add gyms")');
  }

  async fillBusinessName(name: string) {
    const input = this.page.locator('input[placeholder="Busniess Name"]');
    await input.fill('');
    await input.fill(name);
  }

  async fillGymEmail(email: string) {
    const input = this.page.locator('input[placeholder="Email"]');
    await input.fill('');
    await input.fill(email);
  }

  async fillGymPhone(phone: string) {
    const input = this.page.locator('input[placeholder="Enter phone number"]');
    await input.fill('');
    await input.fill(phone);
  }

  async selectCountry(country: string) {
    await this.page.selectOption('select[name="rcrs-country"]', { label: country });
  }

  async selectState(state: string) {
    await this.page.selectOption('(//select[@class="gym-input"])[2]', { label: state });
  }

  async fillGymCity(city: string) {
    const input = this.page.locator('input[placeholder="City"]');
    await input.fill('');
    await input.fill(city);
  }

  async fillGymFirstName(name: string) {
    const input = this.page.locator('input[placeholder="First Name"]');
    await input.fill('');
    await input.fill(name);
  }

  async fillGymLastName(name: string) {
    const input = this.page.locator('input[placeholder="Last Name"]');
    await input.fill('');
    await input.fill(name);
  }

  async fillGymAddress(address: string) {
    const input = this.page.locator('input[placeholder="Address"]');
    await input.fill('');
    await input.fill(address);
  }

  async clickSaveGym() {
    await this.page.click('button:has-text("Save")');
  }

  async expectGymAlert() {
    await expect(this.page.getByText('Gym does not exist with the provided credentials.')).toBeVisible();
  }

  async closeButton() {
    await this.page.click('//button[text()="Close"]');
  }
}
