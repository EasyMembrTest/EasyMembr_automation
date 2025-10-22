import { Page, Locator, expect } from '@playwright/test';

export class SlotsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  plansSlotsAddonsLink(): Locator {
    return this.page.locator("//a[text()=' Plans, Slots & Addons']");
  }
  createSlotButton(): Locator {
    return this.page.locator("//span[text()='Create Slot']");
  }
  createEditSlotHeader(): Locator {
    return this.page.locator("//h5[text()='Create/Edit Slot']");
  }
  slotNameInputField(): Locator {
    return this.page.locator("//input[@name='slotname']");
  }
  slotDropSelect1(): Locator {
    return this.page.locator("(//select[@class='slotdrop'])[1]");
  }
  saveSlotButton(): Locator {
    return this.page.locator("//button[text()='Save']");
  }
  slotSavedAlert(): Locator {
    return this.page.getByText('Slot saved successfully');
  }
  dashboardTab(): Locator {
    return this.page.locator('//a[text()=" Dashboard"]');
  }
  slotsTabLink(): Locator {
    return this.page.locator("//a[text()='Slots']");
  }
  slotSearchInput(): Locator {
    return this.page.locator("//input[@class='form-control discountsDataTableSearch']");
  }
  slotRowByNameAndTime(slotName: string, time: string): Locator {
    return this.page.locator(`//div[contains(@class,'datatable sno mt-2')]//tbody/tr/td[text()='${slotName}']/../td[text()='${time}']`);
  }
  slotEditButton(slotName: string, time: string): Locator {
    return this.page.locator(`//div[contains(@class,'datatable sno mt-2')]//tbody/tr/td[text()='${slotName}']/../td[text()='${time}']/../td/i[@class='fas fa-edit fs-6 ps-2']`);
  }
  slotNameInputWithValue(slotName: string): Locator {
    return this.page.locator(`//input[@name='slotname'][@value='${slotName}']`);
  }
  slotDropSelect2(): Locator {
    return this.page.locator('(//select[@class="slotdrop"])[2]');
  }
  noMatchingResultsCell(): Locator {
    return this.page.locator("//td[text()='No matching results found']");
  }
  slotRowByNameAndTimeSimple(slotName: string, time: string): Locator {
    return this.page.locator(`//div[contains(@class,'datatable sno mt-2')]//tbody/tr/td[text()='${slotName}']/../td[text()='${time}']`);
  }
  createPlanButton(): Locator {
    return this.page.locator("//span[text()='Create Plan']");
  }
  allowedSlotBoxByName(slotName: string): Locator {
    return this.page.locator(`//div[@class='allowedslot-box']/..//span[text()='${slotName}']`);
  }
  closeButton(): Locator {
    return this.page.locator("//button[@class='ripple ripple-surface btn-close']");
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
  slotsImportedAlert(): Locator {
    return this.page.getByText('Slot(s) Imported successfully!');
  }
  async DeleteExistingSlot(slotName: string,page: Page,time: string) {
    await page.locator('//a[text()=" Dashboard"]').click();
    await this.plansSlotsAddonsLink().click();
    await this.slotsTabLink().click();
     await this.page.waitForTimeout(2000);
    await this.slotSearchInput().click();
    await this.slotSearchInput().fill('');
    await this.slotSearchInput().fill(slotName);
    await this.page.waitForTimeout(5000);
    const slotRow = this.page.locator(`//div[contains(@class,'datatable sno mt-2')]//tbody/tr/td[text()='${slotName}']/../td[text()='${time}']/../td/i[@class='fas fa-trash fs-6 ps-2']`);
    if (await slotRow.isVisible()) {
         page.once('dialog', async dialog => {
         expect(dialog.message()).toBe('Are you sure want to delete this Slot?');
         await dialog.accept();
    });
      await slotRow.click();
        await expect(this.page.getByText('Slot deleted successfully')).toBeVisible();
    }
  }
}
