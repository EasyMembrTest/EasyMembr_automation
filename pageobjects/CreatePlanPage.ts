import { Page, Locator, expect } from '@playwright/test';
import { testdata } from '../tests/testdata.ts';

export class CreatePlanPage {
 
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoLogin() {
    await this.page.goto('https://zencruz.com/login');
  }

  emailInput() {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  dashboardText() {
    return this.page.getByText(testdata.dashboardText);
  }

  plansLink() {
    return this.page.getByRole('link', { name: new RegExp(testdata.plansLinkText, 'i') });
  }

  createPlanLink() {
    return this.page.getByRole('link', { name: new RegExp(testdata.createPlanLinkText, 'i') });
  }

  planNameInput() {
    return this.page.locator('//input[@placeholder="Plan Name"]');
  }

  validityInput() {
    return this.page.locator('//input[@name="validity"]');
  }

  discountDropdown() {
    return this.page.locator('select[name="discount"]');
  }

  priceInput() {
    return this.page.locator('//input[@name="price"]');
  }

  saveButton() {
    return this.page.locator(testdata.saveButtonXPath);
  }

  planSavedAlert() {
    return this.page.getByText(new RegExp(testdata.planSavedMessage, 'i'));
  }

  searchInput() {
    return this.page.locator(testdata.searchInputXPath);
  }

  planRow(planName: string) {
    return this.page.getByRole('row', { name: new RegExp(planName, 'i') });
  }

  tableRows() {
    return this.page.locator('//div[@class="datatable sno PlansDataTable"]//table/tbody/tr');
  }

  secondCell() {
    return this.page.locator('//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2]');
  }

  validityCell(planName: string) {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td[3]`);
  }

  discountCell() {
    return this.page.locator('//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[5]');
  }

  daysCell(planName: string) {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td[6]`);
  }

  slotsCell(planName: string) {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td[7]`);
  }

  priceCell(planName: string) {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td[9]`);
  }

  // --- Methods for CreatePlan_WithSessionLimit_TypeAsRecurring ---
  sessionLimitInput(): Locator {
    return this.page.locator("//label[text()='Session Limit']/..//input");
  }
  validityInput2(): Locator {
    return this.page.locator("(//input[@id='validity'])[2]");
  }
  sessionSharingLimitInput(): Locator {
    return this.page.locator("//input[@placeholder='Session Sharing Limit']");
  }
  sundayCheckbox(): Locator {
    return this.page.locator("//input[@name='sunday']");
  }
  saturdayCheckbox(): Locator {
    return this.page.locator("//input[@name='saturday']");
  }
  allowedSlotsPlusButton(): Locator {
    return this.page.locator("//span[text()='Allowed Slots:']/..//img");
  }
  slotNameInput(): Locator {
    return this.page.locator("//input[@placeholder='Slot Name']");
  }
  slotDropSelect1(): Locator {
    return this.page.locator("(//select[@class='slotdrop'])[1]");
  }
  allowedSlotBoxMidnoon12(): Locator {
    return this.page.locator("//div[@class='allowedslot-box']//span[text()='Midnoon']/..//span[text()='12']");
  }
  uncheckAfternoonInput(): Locator {
    return this.page.locator("//span[text()='afternoon']/../..//input");
  }
  planTypeSelect(): Locator {
    return this.page.locator("//select[@name='membershiptypes']");
  }
  enableDisableSlider(): Locator {
    return this.page.locator("//label[text()='Enable/Disable Plan:']/..//span[@class='slider round']");
  }
  forceTrainerSlider(): Locator {
    return this.page.locator("//label[text()='Force Trainer at Check-in: ']/..//span[@class='slider round']");
  }
  descriptionTextarea(): Locator {
    return this.page.locator("//label[text()='Description: ']/..//textarea");
  }
  slotSavedAlert(): Locator {
    return this.page.getByText('Slot saved successfully');
  }
  planRowSessionCell(planName: string): Locator {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td[4]`);
  }
  planRowTypeCell(planName: string): Locator {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td[8]`);
  }
  planRowEnableCell(planName: string): Locator {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td[11]`);
  }
  planRowForceTrainerCell(planName: string): Locator {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td[12]`);
  }
  pointOfSaleButton(): Locator {
    return this.page.locator('//a[text()=" Point of Sale"]');
  }
  searchPlanInput(): Locator {
    return this.page.locator('//input[@placeholder="Search Plan"]');
  }
  planNameInPOS(planName: string): Locator {
    return this.page.locator(`//div[text()='${planName}']`);
  }

  emailReminderSelect1(): Locator {
    return this.page.locator('(//select[@id="emailReminder"])[1]');
  }
  emailReminderSelect2(): Locator {
    return this.page.locator('(//select[@id="emailReminder"])[2]');
  }
  planRowByName(planName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno PlansDataTable']//tbody/tr/td[text()='${planName}']`);
  }
  planRowSlotsCell(planName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno PlansDataTable']//tbody/tr/td[text()='${planName}']/../td[text()='evening, morning, Midnoon']`);
  }
  planEnableCells(): Locator {
    return this.page.locator('//div[@class="datatable sno PlansDataTable"]//tbody/tr/td[11]');
  }
  planTypeCells(): Locator {
    return this.page.locator('//div[@class="datatable sno PlansDataTable"]//tbody/tr/td[8]');
  }

  searchPlan_POSInput(): Locator {
    return this.page.locator('//input[@placeholder="Search Plan/Addon"]');
  }

  slotsTabLink(): Locator {
    return this.page.locator("//a[text()='Slots']");
  }
  slotSearchInput(): Locator {
    return this.page.locator("//input[@class='form-control discountsDataTableSearch']");
  }
  slotTableRows(): Locator {
    return this.page.locator("//div[@class='datatable sno mt-2 large-scrool-table']//tbody/tr");
  }
  slotDeleteButton(slotName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno mt-2 large-scrool-table']//tbody/tr/td[text()='${slotName}']/..//td//i[@class='fas fa-trash fs-6 ps-2']`);
  }
  slotDeletedAlert(): Locator {
    return this.page.getByText('Slot deleted successfully');
  }
  noMatchingResultsCell(): Locator {
    return this.page.locator("//td[text()='No matching results found']");
  }

  plansSlotsAddonsLink(): Locator {
    return this.page.locator('//a[text()=" Plans, Slots & Addons"]');
  }
  importButton(): Locator {
    return this.page.locator('(//button[@type="submit"][text()="Import"])[1]');
  }
  fileInput(): Locator {
    return this.page.locator('input[type="file"]');
  }
  uploadedFileVisible(fileName: string): Locator {
    return this.page.getByText(fileName);
  }
  uploadButton(): Locator {
    return this.page.locator('//button[text()="Upload"]');
  }
  planImportedAlert(): Locator {
    return this.page.getByText('Plan(s) Imported successfully!');
  }
  staffRolesAttendanceLink(): Locator {
    return this.page.locator('//a[text()=" Staff Roles & Attendance"]');
  }
  plansSlotsAddonsNoSpaceLink(): Locator {
    return this.page.locator('//a[text()=" Plans, Slots & Addons"]');
  }
  includedCell(planName: string): Locator {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td[10]`);
  }

  dashboardTab(): Locator {
    return this.page.locator('//a[text()=" Dashboard"]');
  }
  planEditButton(planName: string): Locator {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td//i[@class='fas fa-edit fs-6 ps-2']`);
  }
  planNameInputWithValue(planName: string): Locator {
    return this.page.locator(`//input[@placeholder='Plan Name'][@value='${planName}']`);
  }
  validityInput1(): Locator {
    return this.page.locator('(//input[@name="validity"])[1]');
  }

  planDeleteButton(planName: string): Locator {
    return this.page.locator(`//div[@class="datatable sno PlansDataTable"]//table/tbody/tr/td[2][text()='${planName}']/../td//i[@class='fas fa-trash fs-6 ps-2']`);
  }
  planDeletedAlert(): Locator {
    return this.page.getByText('Plan deleted successfully');
  }

  async DeletePlanByName(DeleteplanName: string, page: Page) {
     console.log('Deleting Plan:', DeleteplanName);
    await this.dashboardTab().click();
    await this.plansSlotsAddonsNoSpaceLink().click();
    await this.searchInput().click();
    await this.searchInput().fill(DeleteplanName);
    await page.waitForTimeout(3000);
    const rows = await this.tableRows().count();
    expect(rows).toBe(1);
    await expect(this.secondCell()).toHaveText(DeleteplanName);
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Are you sure want to delete this Plan?');
      await dialog.accept();
    });
    await this.planDeleteButton(DeleteplanName).click();
    await expect(this.planDeletedAlert()).toBeVisible();
    await this.dashboardTab().click();
    await this.plansSlotsAddonsNoSpaceLink().click();
    await this.searchInput().click();
    await this.searchInput().fill(DeleteplanName);
    await expect(this.noMatchingResultsCell()).toBeVisible();
  }

   addVariationPlanButton(): Locator {
    return this.page.locator("//button[text()='Add Variation Plan']");
  }
  planBadge(planName: string): Locator {
    return this.page.locator(`//span[@class='plan-badge'][text()='${planName}']`);
  }
  variationPlanInput(): Locator {
    return this.page.locator("//input[@class='plan-input']");
  }
  variationPlanValidityInput(validity: string): Locator {
    return this.page.locator(`//input[@class='gym-input w-40'][@value='${validity}']`);
  }
  variationPlanPriceInput(price: string): Locator {
    return this.page.locator(`//input[@class='gym-input'][@value='${price}']`);
  }
  variationBadgeInPOS(planName: string): Locator {
    return this.page.locator(`//div[text()='${planName}']/..//span[text()='Variation']`);
  }
  variationSelectOptionInPOS(planName: string): Locator {
    return this.page.locator(`//select[@class='form-select form-select-sm w-25']/option[text()='${planName}']/..`);
  }

   generateRandomName(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

  
  
}
