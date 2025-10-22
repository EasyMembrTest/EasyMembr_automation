import { Page, Locator, expect } from '@playwright/test';

export class AddOnsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Click Delete button for Enabled AddOn by name
  async clickDeleteButtonForEnabledAddOn(name: string) {
    await this.page.locator(`//div[contains(@class,'datatable sno addOnsDataTable')]//tbody/tr/td[6][text()='Enabled']/../td[text()='${name}']/../td[8]/i`).click();
  }

  // Wait for and accept delete confirmation dialog
  async acceptDeleteAddonDialog(expectedMessage: string) {
    this.page.once('dialog', async dialog => {
      expect(dialog.message()).toBe(expectedMessage);
      await dialog.accept();
    });
  }

  // Verify Addon deleted successfully alert
  async verifyAddonDeletedAlert() {
    await expect(this.page.getByText('Addon deleted successfully')).toBeVisible();
  }

  // 1. Click Dashboard
  async clickDashboard() {
    await this.page.locator("//a[text()=' Dashboard']").click();
  }

  // 2. Click Plans, Slots & Addons and wait
  async clickPlansSlotsAddonsAndWait(waitMs: number = 3000) {
    await this.page.locator("//a[text()=' Plans, Slots & Addons']").click();
    await this.page.waitForTimeout(waitMs);
  }

  // 3. Click Addons tab
  async clickAddonsTab() {
    await this.page.locator("//a[text()='Addons']").click();
  }

  // 4. Click Create Addons
  async clickCreateAddons() {
    await this.page.locator("//span[text()='Create Addons']").click();
  }

  // 5. Enter product name
  async enterProductName(name: string) {
    const input = this.page.locator("//input[@id='product_name']");
    await input.click();
    await input.fill('');
    await input.fill(name);
  }

  // 6. Enter price
  async enterPrice(price: string) {
    const input = this.page.locator('input[placeholder="Enter Price"]');
    await input.click();
    await input.fill('');
    await input.fill(price);
  }

  // 7. Uncheck IncludeTax
  async uncheckIncludeTax() {
    const checkbox = this.page.locator("//input[@name='tax']");
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
    }
  }

  // 8. Enter description
  async enterDescription(desc: string) {
    const textarea = this.page.locator("//textarea[@name='description']");
    await textarea.click();
    await textarea.fill('');
    await textarea.fill(desc);
  }

  // 9. Click Save
  async clickSave() {
    await this.page.locator('//button[text()="Save"]').click();
  }

  // 10. Verify Addon saved alert
  async verifyAddonSavedAlert() {
    await expect(this.page.getByText('Addon saved successfully')).toBeVisible();
  }

  // 11. Click Dashboard (duplicate)
  async clickDashboardAgain() {
    await this.clickDashboard();
  }

  // 12. Click Plans, Slots & Addons and wait (duplicate)
  async clickPlansSlotsAddonsAndWaitAgain(waitMs: number = 3000) {
    await this.clickPlansSlotsAddonsAndWait(waitMs);
  }

  // 13. Click Addons tab (duplicate)
  async clickAddonsTabAgain() {
    await this.clickAddonsTab();
  }

  // 14. Search Addons
  async searchAddons(name: string) {
    const input = this.page.locator("(//input[@class='form-control mb-4'])[2]");
    await input.click();
    await input.fill('');
    await input.fill(name);
    await this.page.waitForTimeout(2000);
  }

  // 15. Get Addons table rows
  async getAddonsTableRows() {
    return this.page.locator("//div[contains(@class, 'datatable sno addOnsDataTable')]//tbody/tr");
  }

  // 16. Verify Addons table row by name, price, tax
  async verifyAddonsTableRow(name: string, price: string, tax: string) {
    await expect(this.page.locator(`//div[contains(@class, 'datatable sno addOnsDataTable')]//tbody/tr/td[text()='${name}']/../td[text()='${price}']/../td[text()='${tax}']`)).toBeVisible();
  }

  // 17. Click Point of Sale
  async clickPointOfSale() {
    await this.page.locator("//a[text()=' Point of Sale']").click();
  }

  // 18. Verify and click Search Plan/Addon input
  async clickSearchPlanAddonInput() {
    const input = this.page.locator('//input[@placeholder="Search Plan/Addon"]');
    await expect(input).toBeVisible();
    await input.click();
  }

  // 19. Search for Addon in POS
  async searchAddonInPOS(name: string) {
    const input = this.page.locator('//input[@placeholder="Search Plan/Addon"]');
    await input.click();
    await input.fill('');
    await input.fill(name);
    await this.page.waitForTimeout(2000);
  }

  // 20. Click Addon in POS
  async clickAddonInPOS(name: string) {
    await expect(this.page.locator(`//span[text()='Addon']/../../div[text()='${name}']`)).toBeVisible();
    await this.page.locator(`//span[text()='Addon']/../../div[text()='${name}']`).click();
  }

  // 21. Click Members Add button
  async clickMembersAddButton() {
    await this.page.locator('(//img[@alt="Add"])[1]').click();
    await this.page.waitForTimeout(2000);
  }

  // 22. Search for member
  async searchMember(name: string) {
    const input = this.page.locator('input[placeholder="Search"]');
    await input.click();
    await input.fill('');
    await input.fill(name);
  }

  // 23. Click member by name
  async clickMemberByName(name: string) {
    await this.page.locator(`//h6[text()='${name}']`).click();
  }

  // 24. Click Done button
  async clickDoneButton() {
    await this.page.locator('//button[text()="Done"]').click();
  }

  // 25. Verify the visibility of price element
  async verifyPriceVisibility(price: string) {
    await expect(this.page.locator(`//div[@class='d-flex align-items-center fw-bold'][text()='${price}']`)).toBeVisible();
  }

  

  // 26. Click and enter value in number input
  async enterNumberInput(value: string) {
    const input = this.page.locator("//input[@type='number']");
    await input.click();
    await input.fill('');
    await input.fill(value);
  }

 

  // 27. Verify the visibility of calculated value
  async verifyCalculatedValue(value: string) {
    await expect(this.page.locator(`//span[@class='ms-1 text-success']/strong[text()='${value}']`)).toBeVisible();
  }

  // 28. Verify the visibility of input with member name
  async verifyMemberInputValue(name: string) {
    await expect(this.page.locator(`//input[@value='${name}']`)).toBeVisible();
  }

  // 29. Click EDIT button
  async clickEditButton() {
    await this.page.locator("//button[text()='EDIT']").click();
  }

  // 30. Verify the visibility of li with member name
  async verifyMemberListItem(name: string) {
    await expect(this.page.locator(`//li[text()='${name}']`)).toBeVisible();
  }

  // 31. Click Add Name from the system and wait
  async clickAddNameFromSystem() {
    await this.page.locator("//button[text()='Add Name from the system']").click();
    await this.page.waitForTimeout(2000);
  }

  // 32. Click FirstMember in List
  async clickFirstMemberInList() {
    await this.page.locator('(//div[@class="row usercar-prev"])[2]//h6').click();
  }

  // 32. Get text from FirstMember in List
  async getFirstMemberName() {
    return await this.page.locator('(//div[@class="row usercar-prev"])[2]//h6').textContent();
  }

  // 34. Verify the visibility of li containing text
  async verifyMemberListItemContains(text: string) {
    await expect(this.page.locator(`//li[contains(text(),'${text}')]`)).toBeVisible();
  }

  // 35. Click Add New Billing Name
  async clickAddNewBillingName() {
    await this.page.locator("//button[text()='Add New Billing Name']").click();
  }

  // 36. Enter billing name
  async enterBillingName(name: string) {
    const input = this.page.locator("//input[@name='name']");
    await input.click();
    await input.fill('');
    await input.fill(name);
  }

  // 37. Enter billing mobile
  async enterBillingMobile(mobile: string) {
    const input = this.page.locator("//input[@name='mobile']");
    await input.click();
    await input.fill('');
    await input.fill(mobile);
  }

  // 38. Enter billing email
  async enterBillingEmail(email: string) {
    const input = this.page.locator("//input[@name='email']");
    await input.click();
    await input.fill('');
    await input.fill(email);
  }

  // 39. Click Save
  async clickSaveButton() {
    await this.page.locator("//button[text()='Save']").click();
  }

  // 40. Verify visibility of billing name, mobile, email inputs
  async verifyBillingInputs(name: string, mobile: string, email: string) {
    await expect(this.page.locator(`//input[@value='${name}']`)).toBeVisible();
    await expect(this.page.locator(`//input[@value='${mobile}']`)).toBeVisible();
    await expect(this.page.locator(`//input[@value='${email}']`)).toBeVisible();
  }

  // 41. Click Continue button
  async clickContinueButton() {
    await this.page.locator("//button[text()='Continue']").click();
  }

  // 42. Click Multiple and wait
  async clickMultipleAndWait() {
    await this.page.locator("//div[text()='Multiple']").click();
    await this.page.waitForTimeout(4000);
  }

  // 43. Scroll, click first split input, type amount, get balance amount
  async enterFirstSplitAmountAndGetBalance(amount: string) {
    const input = this.page.locator("(//input[@class='splitinput w-50'])[1]");
    await input.scrollIntoViewIfNeeded();
    await input.click();
    await this.page.keyboard.type(amount);
    await this.page.waitForTimeout(5000);
    const balance = await this.page.locator("//span[text()=' Balance due amount']/..//span[2]").textContent();
    return balance?.trim() || '';
  }

  // 44. Scroll, click second split input, type balance amount
  async enterSecondSplitAmount(balanceamount: string) {
    const input = this.page.locator("(//input[@class='splitinput w-50'])[2]");
    await input.scrollIntoViewIfNeeded();
    await input.click();
    await this.page.keyboard.type(balanceamount);
    await this.page.waitForTimeout(5000);
  }

  // 45. Click Done
  async clickDonePaymentButton() {
    await this.page.locator("//button[text()='Done']").click();
  }

  // 46. Verify Transaction created successfully alert
  async verifyTransactionCreatedAlert() {
    await expect(this.page.getByText('Transaction created successfully')).toBeVisible();
  }

  // 47. Verify Payment Successful
  async verifyPaymentSuccessful() {
    await expect(this.page.locator("//div[text()='Payment Successful']")).toBeVisible();
  }

  // 48. Select trainer in dropdown
  async selectTrainer(trainerName: string) {
    await this.page.locator("//label[text()='Select Trainer: ']/..//select").selectOption({ label: trainerName });
  }

  // 49. Click Check-In and wait
  async clickCheckInAndWait() {
    await this.page.locator("//input[@value='Check-In']").click();
    await this.page.waitForTimeout(5000);
  }

  // 50. Verify Check-Out and click
  async verifyAndClickCheckOut() {
    const checkOut = this.page.locator("//input[@value='Check-Out']");
    await expect(checkOut).toBeVisible();
    await checkOut.click();
  }

  // 51. Click close button
  async clickSecondCloseButton() {
    await this.page.locator("(//button[@aria-label='Close'])[2]").click();
  }

  // 52. Click Members Management
  async clickMembersManagement() {
    await this.page.locator("//a[text()=' Members Management']").click();
  }

  // 53. Search for member
  async searchMemberInManagement(name: string) {
    const input = this.page.getByPlaceholder('search here...');
    await input.click();
    await input.fill('');
    await input.fill(name);
  }

  // 54. Click Apply button
  async clickApplyButton() {
    await this.page.locator("//button[text()='Apply']").click();
  }

  // 55. Verify and click member row with AddOn
  async verifyAndClickMemberAddOnRow(member: string, addon: string) {
    const row = this.page.locator(`//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='${member}']/../td[text()='${addon}']`);
    await expect(row).toBeVisible();
    await row.click();
  }

  // 56. Click Addons tab in member and verify row count
  async clickMemberAddonsTabAndVerifyRowCount(expectedCount: number) {
    await this.page.locator("//a[text()='Addons']").click();
    const rows = this.page.locator("//div[contains(@class, 'datatable sno addOnTable')]//tbody/tr/td[2]");
    await expect(rows).toHaveCount(expectedCount);
  }

  // 57. Verify Addons row by name in member
  async verifyMemberAddonsRowByName(name: string) {
    await expect(this.page.locator(`//div[contains(@class, 'datatable sno addOnTable')]//tbody/tr/td[text()='${name}']`)).toBeVisible();
  }

  


  // Import AddOns: Click Import button
  async clickImportButton() {
    await this.page.locator('(//button[@type="submit"][text()="Import"])[2]').click();
  }

  // Upload file in input[type="file"]
  async uploadAddOnsFile(filePath: string) {
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
  }

  // Verify file name visibility after upload
  async verifyUploadedFileVisible(fileName: string) {
    await expect(this.page.getByText(fileName)).toBeVisible();
  }

  // Click Upload button
  async clickUploadButton() {
    await this.page.locator('//button[text()="Upload"]').click();
  }

  // Verify Addon(s) Imported successfully! alert
  async verifyAddonsImportedAlert() {
    await expect(this.page.getByText('Addon(s) Imported successfully!')).toBeVisible();
  }

  // Verify AddOns table row by all columns
  async verifyAddonsTableRowAll(name: string, price: string, tax: string, status: string) {
    await expect(this.page.locator(`//div[contains(@class, 'datatable sno addOnsDataTable')]//tbody/tr/td[text()='${name}']/../td[text()='${price}']/../td[text()='${tax}']/../td[text()='${status}']`)).toBeVisible();
  }

  // Verify Addon is not visible in POS
  async verifyAddonNotVisibleInPOS(name: string) {
    await expect(this.page.locator(`//span[text()='Addon']/../../div[text()='${name}']`)).not.toBeVisible();
  }
  // Select Disable in FilterDropdown and wait
  async selectDisableInFilterDropdownAndWait() {
    await this.page.locator("//select[@name='emailReminder']").selectOption({ label: 'Disable' });
    await this.page.waitForTimeout(5000);
  }

  // Get all status text from 6th column in AddOns table
  async getAddOnsStatusList(): Promise<string[]> {
    const statusCells = await this.page.locator("//div[@class='datatable sno addOnsDataTable']//tbody/tr/td[6]").all();
    const statusList: string[] = [];
    for (const cell of statusCells) {
      const text = (await cell.textContent())?.trim() || '';
      statusList.push(text);
    }
    return statusList;
  }

  // Verify Disabled status for Gloves
  async verifyDisabledStatusForGloves(name: string) {
    await expect(this.page.locator(`//div[contains(@class, 'datatable sno addOnsDataTable')]//tbody/tr/td[6][text()='Disabled']/../td[text()='${name}']`)).toBeVisible();
  }

  // Click Edit button for Disabled Gloves
  async clickEditButtonForDisabledGloves() {
    await this.page.locator("//div[contains(@class, 'datatable sno addOnsDataTable')]//tbody/tr/td[6][text()='Disabled']/../td[text()='Gloves']/../td[7]/i").click();
  }

  // Verify and edit AddOn name input
  async verifyAndEditAddOnNameInput( newName: string) {
    // const input = this.page.locator(`//input[@value='${oldName}']`);
    // await expect(input).toBeVisible();
    await this.page.locator("//input[@id='product_name']").click();
    await this.page.locator("//input[@id='product_name']").fill('');
    await this.page.locator("//input[@id='product_name']").fill(newName);
  }

  // Select value in Validity dropdown
  async selectValidityDropdown(value: string) {
    await this.page.locator("//select[@id='rentbasis']").selectOption({ label: value });
  }

  // Edit price input
  async editPriceInput(price: string) {
    const input = this.page.locator("//input[@name='price']");
    await input.click();
    await input.fill('');
    await input.fill(price);
  }

  // Click Enable/Disable Addon slider
  async clickEnableDisableSlider() {
    await this.page.locator("//label[text()='Enable/Disable Addon: ']/..//span").click();
  }

  // Verify and edit AddOn description textarea
  async verifyAndEditAddOnDescriptionTextarea(oldText: string, newText: string) {
    const textarea = this.page.locator(`//textarea[text()='${oldText}']`);
    await expect(textarea).toBeVisible();
    await textarea.click();
    await textarea.fill('');
     await this.page.locator("//textarea[@placeholder='Describe about this Addon here...']").click();
    await this.page.locator("//textarea[@placeholder='Describe about this Addon here...']").fill(newText);
  }

  // Verify 'No matching results found' in AddOns table
  async verifyNoMatchingResults() {
    await expect(this.page.locator("//td[text()='No matching results found']")).toBeVisible();
  }

  // Verify AddOn visible in POS
  async verifyAddonVisibleInPOS(name: string) {
    await expect(this.page.locator(`//span[text()='Addon']/../../div[text()='${name}']`)).toBeVisible();
  }


   // Delete an enabled AddOn by name, including dialog and alert verification
  async DeleteExistingAddONS(name: string,page: Page) {
    await this.clickDashboard();
    await this.clickPlansSlotsAddonsAndWait();
    await this.clickAddonsTabAgain();
    await this.searchAddons(name);
    await this.page.waitForTimeout(3000);
    const rows = await this.getAddonsTableRows();
    const slotRow=this.page.locator(`//div[contains(@class, 'datatable sno addOnsDataTable')]//tbody/tr/td[6][text()='Enabled']/../td[text()='${name}']/../td[8]/i`);
      if (await slotRow.isVisible()) {
         page.once('dialog', async dialog => {
         expect(dialog.message()).toBe('Are you sure want to delete this Addon?');
         await dialog.accept();
    });
    await this.clickDeleteButtonForEnabledAddOn(name);
    await this.verifyAddonDeletedAlert();
    
      }
  }

  // Click Transactions link
  async clickTransactions() {
    await this.page.locator("//a[text()=' Transactions']").click();
  }

  // Select 'Today' in dropdown and wait
  async selectTodayInDropdownAndWait() {
    await this.page.locator("//select[@id='shr']").selectOption({ label: 'Today' });
    await this.page.locator("//button[text()='Apply']").click();
    await this.page.waitForTimeout(2000);
  }

  // Click Export button (first one)
  async clickExportButton() {
    await this.page.locator("(//button[text()='Export'])[1]").click();
  }
}
