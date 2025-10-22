import { test, expect, Browser, Page } from '@playwright/test';
import { SlotsPage } from '../pageobjects/SlotsPage';
import { CreatePlanPage } from '../pageobjects/CreatePlanPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import testdata from '../testdata.json';


test.describe('CreateSlotValidations', () => {
  let browser: Browser;
  let page: Page;
  let slotsPage: SlotsPage;
  let planPage: CreatePlanPage;

  test.beforeAll(async ({ playwright }) => {
    browser = await playwright.chromium.launch({ headless: false });
    page = await browser.newPage();
    slotsPage = new SlotsPage(page);
    planPage = new CreatePlanPage(page);
    await planPage.gotoLogin();
    await planPage.emailInput().fill(testdata.email);
    await planPage.passwordInput().fill(testdata.password);
    await planPage.loginButton().click();
    await expect(planPage.dashboardText()).toBeVisible();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.afterEach(async ({}, testInfo) =>{
    // Wait 1 second to ensure screenshots are captured before next test or browser close
    await page.waitForTimeout(1000);
    if (testInfo.status === 'failed') {
      await captureAndAttachScreenshot(page, testInfo, `${testInfo.title}-failed`);
    } else if (testInfo.status === 'passed') {
      await captureAndAttachScreenshot(page, testInfo, `${testInfo.title}-passed`);
    }
  });

  test('CreateSlot_VerifyInCreatePlanPage', async () => {
    // 1. Plans, Slots & Addons
    await slotsPage.plansSlotsAddonsLink().click();
    await slotsPage.DeleteExistingSlot(testdata.RandomSlotName,page,'12:00 AM To 1:00 AM');
    // 2. Create Slot
    await slotsPage.createSlotButton().click();
    // 3. Verify Create/Edit Slot header
    await expect(slotsPage.createEditSlotHeader()).toBeVisible();
    // 4. Enter slot name 'dance'
    await slotsPage.slotNameInputField().click();
    await slotsPage.slotNameInputField().fill('');
    await slotsPage.slotNameInputField().fill(testdata.RandomSlotName);
    // 5. Select 12 in slot drop
    await slotsPage.slotDropSelect1().selectOption('12');
    // 6. Save
    await slotsPage.saveSlotButton().click();
    // 7. Verify slot saved alert
    await expect(slotsPage.slotSavedAlert()).toBeVisible();
    // 8. Dashboard
    await slotsPage.dashboardTab().click();
    // 9. Plans, Slots & Addons
    await slotsPage.plansSlotsAddonsLink().click();
    // 10. Slots tab
    await slotsPage.slotsTabLink().click();
    // 11. Search for 'dance'
    await slotsPage.slotSearchInput().click();
    await slotsPage.slotSearchInput().fill('');
    await slotsPage.slotSearchInput().fill(testdata.RandomSlotName);
    await page.waitForTimeout(2000);
    // 12. Verify slot row for dance/12:00 AM To 1:00 AM
    await expect(slotsPage.slotRowByNameAndTime(testdata.RandomSlotName, '12:00 AM To 1:00 AM')).toBeVisible();
    // 13. Create Plan
    await slotsPage.createPlanButton().click();
    await page.waitForTimeout(2000);
    // 14. Verify allowed slot box for dance
    await expect(slotsPage.allowedSlotBoxByName(testdata.RandomSlotName)).toBeVisible();
    // 15. Close button
    await expect(slotsPage.closeButton()).toBeVisible();
    await slotsPage.closeButton().click();
    await page.waitForTimeout(2000);
  });

  test('CreateSlot_ImportSheet_VerifyInCreatePlanPage', async () => {
    const filePath = 'D:/EasyMembr_TestData/Sample_Slots.xlsx';
    // 1. Plans, Slots & Addons
    await slotsPage.plansSlotsAddonsLink().click();
    // 2. Delete existing slot if present
    await slotsPage.DeleteExistingSlot(testdata.ImportSlotName, page,'5:30 PM To 6:00 PM');
    // 3. Slots tab
    await slotsPage.slotsTabLink().click();
    // 4. Import slot sheet
    await planPage.importButton().click();
    const fileInput = planPage.fileInput();
    await fileInput.setInputFiles(filePath);
    await expect(planPage.uploadedFileVisible(testdata.ImportSlotSheetName)).toBeVisible();
    await planPage.uploadButton().click();
    // 5. Verify slot(s) imported alert
    await expect(slotsPage.slotsImportedAlert()).toBeVisible();
    // 7. Dashboard
    await slotsPage.dashboardTab().click();
    // 8. Plans, Slots & Addons > Slots tab
    await slotsPage.plansSlotsAddonsLink().click();
    await slotsPage.slotsTabLink().click();
    await slotsPage.slotSearchInput().click();
    await slotsPage.slotSearchInput().fill('');
    await slotsPage.slotSearchInput().fill(testdata.ImportSlotName);
    await page.waitForTimeout(2000);
    await expect(slotsPage.slotRowByNameAndTime(testdata.ImportSlotName, '5:30 PM To 6:00 PM')).toBeVisible();
    await slotsPage.createPlanButton().click();
    await page.waitForTimeout(2000);
    await expect(slotsPage.allowedSlotBoxByName(testdata.ImportSlotName)).toBeVisible();
    await expect(slotsPage.closeButton()).toBeVisible();
    await slotsPage.closeButton().click();
    await page.waitForTimeout(2000);
  });

  test('EditSlot_VerifyInCreatePlanPage', async () => {
    // 1. Dashboard
    await slotsPage.dashboardTab().click();
    // 2. Plans, Slots & Addons > Slots tab > search slot
    await slotsPage.plansSlotsAddonsLink().click();
    await slotsPage.slotsTabLink().click();
    await slotsPage.slotSearchInput().click();
    await slotsPage.slotSearchInput().fill('');
    await slotsPage.slotSearchInput().fill(testdata.ImportSlotName);
    await page.waitForTimeout(2000);
    // 3. Edit button for zumba/5:30 PM To 6:00 PM
    await expect(slotsPage.slotEditButton(testdata.ImportSlotName, '5:30 PM To 6:00 PM')).toBeVisible();
    await slotsPage.slotEditButton(testdata.ImportSlotName, '5:30 PM To 6:00 PM').click();
    // 4. Slot name input with value
    await expect(slotsPage.slotNameInputWithValue(testdata.ImportSlotName)).toBeVisible();
    await slotsPage.slotNameInputWithValue(testdata.ImportSlotName).click();
    await slotsPage.slotNameInputField().fill('');
    // 5. Enter 'Yoga'
    await slotsPage.slotNameInputField().fill(testdata.EditImportSlotName);
    // 6. Select 00 in slot drop 2
    await slotsPage.slotDropSelect2().selectOption('00');
    // 7. Save
    await slotsPage.saveSlotButton().click();
    // 8. Dashboard
    await slotsPage.dashboardTab().click();
    // 9. Plans, Slots & Addons > Slots tab > search old slot
    await slotsPage.plansSlotsAddonsLink().click();
    await slotsPage.slotsTabLink().click();
    await slotsPage.slotSearchInput().click();
    await slotsPage.slotSearchInput().fill('');
    await slotsPage.slotSearchInput().fill(testdata.ImportSlotName);
    await page.waitForTimeout(2000);
    // 11. No matching results
    await expect(slotsPage.noMatchingResultsCell()).toBeVisible();
    // 12. Dashboard > search for Yoga
    await slotsPage.dashboardTab().click();
    await slotsPage.plansSlotsAddonsLink().click();
    await slotsPage.slotsTabLink().click();
    await slotsPage.slotSearchInput().click();
    await slotsPage.slotSearchInput().fill('');
    await slotsPage.slotSearchInput().fill(testdata.EditImportSlotName);
    await page.waitForTimeout(2000);
    // 13. Verify Yoga/5:00 PM To 6:00 PM
    await expect(slotsPage.slotRowByNameAndTimeSimple(testdata.EditImportSlotName, '5:00 PM To 6:00 PM')).toBeVisible();
    // 14. Create Plan
    await slotsPage.createPlanButton().click();
    await page.waitForTimeout(2000);
    await expect(slotsPage.allowedSlotBoxByName(testdata.EditImportSlotName)).toBeVisible();
    await expect(slotsPage.closeButton()).toBeVisible();
    await slotsPage.closeButton().click();
    await page.waitForTimeout(2000);
  });

  test('DeleteSlot_VerifyInCreatePlanPage', async () => {
    // 1. Delete slot if present
    await slotsPage.DeleteExistingSlot(testdata.EditImportSlotName, page,'5:00 PM To 6:00 PM');
    // 2. Dashboard > Plans, Slots & Addons > Slots tab > search for Yoga
    await slotsPage.dashboardTab().click();
    await slotsPage.plansSlotsAddonsLink().click();
    await slotsPage.slotsTabLink().click();
    await slotsPage.slotSearchInput().click();
    await slotsPage.slotSearchInput().fill('');
    await slotsPage.slotSearchInput().fill(testdata.EditImportSlotName);
    await page.waitForTimeout(2000);
    await expect(slotsPage.noMatchingResultsCell()).toBeVisible();
    await slotsPage.createPlanButton().click();
    await page.waitForTimeout(2000);
    // 3. Verify Yoga is not visible in allowed slot box
    await expect(slotsPage.allowedSlotBoxByName(testdata.EditImportSlotName)).not.toBeVisible();
    await expect(slotsPage.closeButton()).toBeVisible();
    await slotsPage.closeButton().click();
    await page.waitForTimeout(2000);
  });

  test('DeleteSlot_AfterSetUp', async () => {
      await slotsPage.DeleteExistingSlot(testdata.RandomSlotName, page,'12:00 AM To 1:00 AM');
  })
});
