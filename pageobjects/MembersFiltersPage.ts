import { Page, expect } from '@playwright/test';

export class MembersFiltersPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async clickMembersManagement() {
    await this.page.locator("//a[text()=' Members Management']").click();
  }

  async clickAllPlansAddons() {
    await this.page.locator("//span[text()='All Plans/Addons']/..//i").click();
    await this.page.waitForTimeout(2000);
  }

  async scrollToAndSelectAutomationPlan() {
    const label = this.page.locator("//label[text()='automation (Plan)']");
    await label.scrollIntoViewIfNeeded();
    await expect(label).toBeVisible();
    await this.page.locator("//label[text()='automation (Plan)']/../input").click();
    await this.page.locator("//label[text()='Membership Type']").click();
  }

  async selectMembershipTypePlans() {
    await this.page.locator("//label[text()='Membership Type']/..//select").selectOption({ label: 'Plans' });
    await this.page.waitForTimeout(2000);
  }

  async selectPlanTypeOneTime() {
    await this.page.locator("//label[text()='Plan Type']/..//select").selectOption({ label: 'One-Time' });
    await this.page.waitForTimeout(2000);
  }

  async selectGenderMale() {
    await this.page.locator("//label[text()='Gender']/..//select").selectOption({ label: 'Male' });
    await this.page.waitForTimeout(2000);
  }

  async selectStatusActive() {
    await this.page.locator("//label[text()='Status']/..//select").selectOption({ label: 'Active' });
    await this.page.waitForTimeout(2000);
  }

  async selectTransactionTypeNew() {
    await this.page.locator("//label[text()='Transaction Type']/..//select").selectOption({ label: 'New' });
    await this.page.waitForTimeout(2000);
  }

  async openFirstDatePicker() {
    await this.page.locator("(//div[@class='react-datepicker__input-container'])[1]").click();
    await this.page.waitForTimeout(2000);
  }

async goToMonth(monthText: string, direction: 'Previous' | 'Next', untilYear: string) {
    let attempts = 0;
    while (!(await this.page.locator(`//div[text()='${monthText}']`).isVisible())) {
      console.log(`Current month/year not matching ${monthText}, clicking ${direction} Month`);
        // Stop if we've reached the target year (to avoid infinite loop)
        const currentMonthYear = await this.page.locator("//div[contains(@class,'react-datepicker__current-month')]").textContent();
        if (currentMonthYear && currentMonthYear.includes(untilYear)) {
          console.log(`Reached target year: ${untilYear}`);
            // If we are in the correct year but not the correct month, break to avoid infinite loop
            if (currentMonthYear === monthText) break;
            // If the month is after the target, break
            if (direction === 'Next' && currentMonthYear === monthText) break;
            // If the month is before the target, break
            if (direction === 'Previous' && currentMonthYear === monthText) break;
        }
        console.log(`Clicking ${direction} Month button`);
        await this.page.locator(`//span[text()='${direction} Month']/..`).click();
        await this.page.waitForTimeout(direction === 'Previous' ? 2000 : 1000);
        attempts++;
        if (attempts > 24) break; // safety to avoid infinite loop
    }
}

  async selectDateByAriaLabel(label: string) {
    await this.page.locator(`//div[@aria-label='${label}']`).click();
    await this.page.waitForTimeout(2000);
  }

  async openSecondDatePicker() {
    await this.page.locator("(//div[@class='react-datepicker__input-container'])[2]").click();
    await this.page.waitForTimeout(2000);
  }

  async enterAgeRange(from: string, to: string) {
    await this.page.locator("//label[text()='Age Range']/..//input[@placeholder='From']").fill(from);
    await this.page.locator("//label[text()='Age Range']/..//input[@placeholder='To']").fill(to);
  }

  async clickApplyButton() {
    await this.page.locator("//button[text()='Apply']").click();
  }

  async verifyFilteredMemberRow() {
    await expect(this.page.locator("//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='Vamsi Automation']/../td[text()='09/17/2025']/../td[text()='automation']")).toBeVisible();
  }

   async openThirdDatePicker() {
    await this.page.locator("(//div[@class='react-datepicker__input-container'])[3]").click();
    await this.page.waitForTimeout(2000);
  }
}
