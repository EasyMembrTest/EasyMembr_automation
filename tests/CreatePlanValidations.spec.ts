import { test, expect, Browser, Page } from '@playwright/test';
import testdata from '../testdata.json';
import { CreatePlanPage } from '../pageobjects/CreatePlanPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import * as fs from 'fs';
import * as path from 'path';


const tempFile = path.join(__dirname, 'temp.json');

test.describe('CreatePlanValidations', () => {
let browser: Browser;
let page: Page;
let planPage: CreatePlanPage;
let randomPlanName_OneTime=testdata.randomPlanName_OneTime;
let randomPlanName_Recurring=testdata.randomPlanName_Recurring;

function updateTempJson(newData: Record<string, any>) {
  let existing = {};
  if (fs.existsSync(tempFile)) {
    existing = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  }
  const merged = { ...existing, ...newData }; // merge old and new
  fs.writeFileSync(tempFile, JSON.stringify(merged), 'utf-8');
}

test.beforeAll(async ({ playwright }) => {
  browser = await playwright.chromium.launch({ headless: false });
  page = await browser.newPage();
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


test('CreatePlan_WithOutSessionLimit_TypeAsOneTime', async ({  }) => {
  // const planPage = new CreatePlanPage(page);
  // await planPage.gotoLogin();
  // await planPage.emailInput().fill(testdata.email);
  // await planPage.passwordInput().fill(testdata.password);
  // await planPage.loginButton().click();

  // // 1. Check Dashboard is visible
  // await expect(planPage.dashboardText()).toBeVisible();
  // 1. Click on Plans, Slots & Addons and verify the create plan is visible.
  await planPage.plansLink().click();
  await expect(planPage.createPlanLink()).toBeVisible();

  // 2. Click on create plan (link)
  await planPage.createPlanLink().click();

  // 3. Enter Plan name and validity
  await expect(planPage.planNameInput()).toBeVisible();
   console.log('randomPlanName_OneTime:', randomPlanName_OneTime);
  await planPage.planNameInput().click();
  await planPage.planNameInput().fill(randomPlanName_OneTime);
  await planPage.validityInput().click();
  await planPage.validityInput().fill(testdata.validity);

  // Select 10% discount from dropdown
  await planPage.discountDropdown().selectOption({ value: '2' });

  await planPage.priceInput().click();
  await planPage.priceInput().fill(testdata.price);
  await planPage.saveButton().click();

  // 6. Verify the visibility of Plan saved successfully Alert message
  await expect(planPage.planSavedAlert()).toBeVisible();

  // 7. Search the plan name in search here...
  await planPage.searchInput().click();
  await planPage.searchInput().fill(randomPlanName_OneTime);
  await page.waitForTimeout(2000);
  // 8. Verify the visibility of plan name in table
  await expect(planPage.planRow(randomPlanName_OneTime)).toBeVisible();

  const rows = await planPage.tableRows().count();
  expect(rows).toBe(1);

  //9. Verify the first member row contains all required details
  await expect(planPage.secondCell()).toHaveText(randomPlanName_OneTime);
  await expect(planPage.validityCell(randomPlanName_OneTime)).toContainText(testdata.validity);
  await expect(planPage.discountCell()).toHaveText('10');
  await expect(planPage.daysCell(randomPlanName_OneTime)).toContainText('All days');
  await expect(planPage.slotsCell(randomPlanName_OneTime)).toContainText('afternoon, evening, morning');
  await expect(planPage.priceCell(randomPlanName_OneTime)).toContainText(testdata.price);

  // 1. Click on Point of Sale
  await planPage.pointOfSaleButton().click();

  // 2. Search the randomPlanName in Search Plan/Addon
  await planPage.searchPlan_POSInput().fill(randomPlanName_OneTime);

  // 3. Verify the visibility of randomPlanName
  await expect(planPage.planNameInPOS(randomPlanName_OneTime)).toBeVisible();
});

test('CreatePlan_WithSessionLimit_TypeAsRecurring_DisablePlan_CreateAllowedSlot', async ({  }) => {
  await planPage.plansLink().click();
  await expect(planPage.createPlanLink()).toBeVisible();
  await planPage.createPlanLink().click();
  await expect(planPage.planNameInput()).toBeVisible();
  console.log('randomPlanName_Recurring:', randomPlanName_Recurring);
  await planPage.planNameInput().click();
  await planPage.planNameInput().fill(randomPlanName_Recurring);
  await planPage.validityInput().click();
  await planPage.validityInput().fill(testdata.validity);
  // 2. Session Limit
  await planPage.sessionLimitInput().click();
  // 3. Validity (second input)
  await planPage.validityInput2().click();
  await planPage.validityInput2().fill(testdata.PlanSessionLimit);
  // 4. Session Sharing Limit
  await planPage.sessionSharingLimitInput().click();
  await planPage.sessionSharingLimitInput().fill(testdata.PlanSessionSharingLimit);
  // 5. Sunday & Saturday
  await planPage.sundayCheckbox().click();
  await planPage.saturdayCheckbox().click();
  // 6. Allowed slots plus button
  await planPage.allowedSlotsPlusButton().click();
  // 7. Slot Name
  await planPage.slotNameInput().click();
  await planPage.slotNameInput().fill(testdata.SlotName);
  // 8. Select 12 in slot drop
  await planPage.slotDropSelect1().selectOption('12');
  // 9. Save and wait
  await page.locator('(//button[@type="submit"][text()="Save"])[2]').click();
  await page.waitForTimeout(4000);
  // 10. Verify Midnoon/12 slot
  await expect(planPage.allowedSlotBoxMidnoon12()).toBeVisible();
  // 11. Uncheck afternoon
  await planPage.uncheckAfternoonInput().click();
  // 12. PlanType as Recurring
  await planPage.planTypeSelect().selectOption({ value: '2' });
  // 13. Discount & Price
  await planPage.discountDropdown().selectOption({ value: '2' });
  await planPage.priceInput().click();
  await planPage.priceInput().fill(testdata.price);
  // 14. Enable/Disable Plan
  await planPage.enableDisableSlider().click();
  // 15. Force Trainer
  await planPage.forceTrainerSlider().click();
  // 16. Description
  await planPage.descriptionTextarea().click();
  await planPage.descriptionTextarea().fill('ThisPlan is Recurring');
  await planPage.saveButton().click();
  //await expect(planPage.planSavedAlert()).toBeVisible();
  // 17. Slot saved alert
  await expect(planPage.slotSavedAlert()).toBeVisible();
  // 18. Search and verify plan row
  await planPage.searchInput().click();
  await planPage.searchInput().fill(randomPlanName_Recurring);
  await page.waitForTimeout(2000);
  await expect(planPage.planRow(randomPlanName_Recurring)).toBeVisible();
  const rows = await planPage.tableRows().count();
  expect(rows).toBe(1);
  await expect(planPage.secondCell()).toHaveText(randomPlanName_Recurring);
  await expect(planPage.validityCell(randomPlanName_Recurring)).toContainText(testdata.validity);
  await expect(planPage.discountCell()).toHaveText('10');
  await expect(planPage.daysCell(randomPlanName_Recurring)).toContainText('Mon, Tue, Wed, Thu, Fri, ');
  await expect(planPage.slotsCell(randomPlanName_Recurring)).toContainText(`evening, morning, ${testdata.SlotName}`);
  await expect(planPage.priceCell(randomPlanName_Recurring)).toContainText(testdata.price);
  // 18. Session assertion
  await expect(planPage.planRowSessionCell(randomPlanName_Recurring)).toHaveText('10');
  // 19. Plan Type assertion
  await expect(planPage.planRowTypeCell(randomPlanName_Recurring)).toHaveText('Recurring');
  // 20. Enable/Disable assertion
  await expect(planPage.planRowEnableCell(randomPlanName_Recurring)).toHaveText('Disabled');
  // 21. Force Trainer assertion
  await expect(planPage.planRowForceTrainerCell(randomPlanName_Recurring)).toHaveText('Enabled');
  // POS flow
  await planPage.pointOfSaleButton().click();
  await planPage.searchPlan_POSInput().click();
  await planPage.searchPlan_POSInput().fill(randomPlanName_Recurring);
  await expect(planPage.planNameInPOS(randomPlanName_Recurring)).not.toBeVisible();
});

test('VerifyFilterDropDowns_Plans', async ({  }) => {
  await planPage.plansLink().click();
  await expect(planPage.createPlanLink()).toBeVisible();

  // 2. Select Disable in first emailReminder dropdown and wait
  await planPage.emailReminderSelect1().selectOption({ label: 'Disable' });
  await page.waitForTimeout(2000);

  // 3. Verify slots cell for Recurring plan
   console.log('randomPlanName_Recurring:', randomPlanName_Recurring);
  await expect(planPage.planRowSlotsCell(`${randomPlanName_Recurring}`)).toBeVisible();

  // 4. Get all Enable/Disable cells and assert only Disabled present
  const enableCells = await planPage.planEnableCells().allTextContents();
  expect(enableCells).toContain('Disabled');
  expect(enableCells).not.toContain('Enabled');

  // 5. Select All in first emailReminder dropdown and wait
  await planPage.emailReminderSelect1().selectOption({ label: 'All' });
  await page.waitForTimeout(5000);

  // 6. Select Recurring in second emailReminder dropdown and wait
  await planPage.emailReminderSelect2().selectOption({ value: 'recuring' });
  await page.waitForTimeout(2000);

  // 7. Verify slots cell for Recurring plan again
  await expect(planPage.planRowSlotsCell(`${randomPlanName_Recurring}`)).toBeVisible();

  // 8. Get all Plan Type cells and assert only Recurring present
  const typeCells = await planPage.planTypeCells().allTextContents();
  expect(typeCells).toContain('Recurring');
  expect(typeCells).not.toContain('One-time');
});

test('DeleteSlot', async ({  }) => {
  // const planPage = new CreatePlanPage(page);
  // await planPage.gotoLogin();
  // await planPage.emailInput().fill(testdata.email);
  // await planPage.passwordInput().fill(testdata.password);
  // await planPage.loginButton().click();
  // await expect(planPage.dashboardText()).toBeVisible();
  // 1. Plans link and create plan link visible
  await planPage.plansLink().click();
  await expect(planPage.createPlanLink()).toBeVisible();
  // 2. Click Slots tab
  await planPage.slotsTabLink().click();
  // 3. Search for slot, clear and enter slotName
  await planPage.slotSearchInput().click();
  await planPage.slotSearchInput().fill('');
  await planPage.slotSearchInput().fill(testdata.SlotName);
  await page.waitForTimeout(2000);
  // 4. Assert only one row
  const slotRows = await planPage.slotTableRows().count();
  expect(slotRows).toBe(1);
  // 5. Handle dialog and click delete
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Are you sure want to delete this Slot?');
    await dialog.accept();
  });
  await planPage.slotDeleteButton(testdata.SlotName).click();
  // 6. Verify slot deleted alert
  await expect(planPage.slotDeletedAlert()).toBeVisible();
  // 7. Click Point of Sale tab
  await planPage.pointOfSaleButton().click();
  // 8. Plans link again
  await planPage.plansLink().click();
  // 9. Click Slots tab again
  await planPage.slotsTabLink().click();
  // 10. Search for slot again
  await planPage.slotSearchInput().click();
  await planPage.slotSearchInput().fill('');
  await planPage.slotSearchInput().fill(testdata.SlotName);
  // 11. Verify no matching results
  await expect(planPage.noMatchingResultsCell()).toBeVisible();
});

test('CreatePlan_ImportSheet', async ({  }) => {
  const filePath = 'D:/EasyMembr_TestData/Sample_Plan_Data.xlsx';
  const planName = testdata.ImportPlanName;
  // 1. Import flow
  await planPage.dashboardTab().click();
  await planPage.plansSlotsAddonsLink().click();
  await planPage.importButton().click();
  const fileInput = planPage.fileInput();
  await fileInput.setInputFiles(filePath);
  await expect(planPage.uploadedFileVisible(testdata.ImportPlanSheetName)).toBeVisible();
  await planPage.uploadButton().click();
  await expect(planPage.planImportedAlert()).toBeVisible();
  // Navigate away and back
  await planPage.dashboardTab().click();
  await planPage.plansSlotsAddonsNoSpaceLink().click();
  await planPage.searchInput().click();
  await planPage.searchInput().fill(planName);
  // 2. Table assertions
  const rows = await planPage.tableRows().count();
  expect(rows).toBe(1);
  await expect(planPage.secondCell()).toHaveText(planName);
  await expect(planPage.validityCell(planName)).toContainText('20 Days');
  await expect(planPage.discountCell()).toHaveText('15');
  await expect(planPage.daysCell(planName)).toContainText('Mon, Tue, ');
  await expect(planPage.slotsCell(planName)).toContainText('morning');
  await expect(planPage.priceCell(planName)).toContainText('5000');
  await expect(planPage.planRowSessionCell(planName)).toHaveText('20');
  await expect(planPage.planRowTypeCell(planName)).toHaveText('Recurring');
  await expect(planPage.planRowEnableCell(planName)).toHaveText('Enabled');
  await expect(planPage.planRowForceTrainerCell(planName)).toHaveText('Disabled');
  await expect(planPage.includedCell(planName)).toHaveText('Included');
  // POS flow
  await planPage.pointOfSaleButton().click();
  await planPage.searchPlan_POSInput().click();
  await planPage.searchPlan_POSInput().fill(planName);
  await expect(planPage.planNameInPOS(planName)).toBeVisible();
});

test('EditPlan', async ({  }) => {
  const oldPlanName = testdata.ImportPlanName;
  const newPlanName = testdata.EditImportPlanName;
  // 1. Dashboard > Plans,Slots & Addons > search old plan
  await planPage.dashboardTab().click();
  await planPage.plansSlotsAddonsNoSpaceLink().click();
  await planPage.searchInput().click();
  await planPage.searchInput().fill(oldPlanName);
  await page.waitForTimeout(3000);
  let rows = await planPage.tableRows().count();
  expect(rows).toBe(1);
  await expect(planPage.secondCell()).toHaveText(oldPlanName);
  // 2. Click edit button
  await planPage.planEditButton(oldPlanName).click();
  // 3. Edit plan name
  await expect(planPage.planNameInputWithValue(oldPlanName)).toBeVisible();
  await planPage.planNameInput().click();
  await planPage.planNameInput().fill('');
  await planPage.planNameInput().fill(newPlanName);
  // 4. Edit validity
  await planPage.validityInput1().click();
  await planPage.validityInput1().fill('');
  await planPage.validityInput1().fill(testdata.EditPlanValidity);
  // 5-7. Session, Sunday, Afternoon
  await planPage.sessionLimitInput().click();
  await planPage.sundayCheckbox().click();
  await planPage.uncheckAfternoonInput().click();
  // 8. Plan type One-time
  await planPage.planTypeSelect().selectOption({ value: '1' });
  // 9. Discount & price
  await planPage.discountDropdown().selectOption({ value: '2' });
  await planPage.priceInput().click();
  await planPage.priceInput().fill(testdata.price);
  // 10. Force Trainer
  await planPage.forceTrainerSlider().click();
  // 11. Save and verify
  await planPage.saveButton().click();
  await expect(planPage.planSavedAlert()).toBeVisible();
  // Search for old plan name (should not exist)
  await planPage.searchInput().click();
  await planPage.searchInput().fill(oldPlanName);
  await expect(planPage.noMatchingResultsCell()).toBeVisible();
  // Search for new plan name
  await planPage.dashboardTab().click();
  await planPage.plansSlotsAddonsNoSpaceLink().click();
  await planPage.searchInput().click();
  await planPage.searchInput().fill(newPlanName);
  await page.waitForTimeout(2000);
  await expect(planPage.planRow(newPlanName)).toBeVisible();
  rows = await planPage.tableRows().count();
  expect(rows).toBe(1);
  await expect(planPage.secondCell()).toHaveText(newPlanName);
  await expect(planPage.validityCell(newPlanName)).toContainText(`${testdata.EditPlanValidity} Days`);
  await expect(planPage.planRowSessionCell(newPlanName)).toHaveText('--');
  await expect(planPage.discountCell()).toHaveText('10');
  await expect(planPage.daysCell(newPlanName)).toContainText('Mon, Tue, Sun, ');
  await expect(planPage.slotsCell(newPlanName)).toContainText('morning, afternoon');
  await expect(planPage.priceCell(newPlanName)).toContainText('1000');
  await expect(planPage.planRowTypeCell(newPlanName)).toHaveText('One-time');
  await expect(planPage.planRowEnableCell(newPlanName)).toHaveText('Enabled');
  await expect(planPage.planRowForceTrainerCell(newPlanName)).toHaveText('Enabled');
  // POS flow
  await planPage.pointOfSaleButton().click();
  await planPage.searchPlan_POSInput().click();
  await planPage.searchPlan_POSInput().fill(newPlanName);
  await expect(planPage.planNameInPOS(newPlanName)).toBeVisible();
});

test('DeletePlan', async ({  }) => {
  const DeleteplanName = testdata.EditImportPlanName;
  await planPage.dashboardTab().click();
  await planPage.plansSlotsAddonsNoSpaceLink().click();
  await planPage.searchInput().click();
  await planPage.searchInput().fill(DeleteplanName);
  await page.waitForTimeout(3000);
  const rows = await planPage.tableRows().count();
  expect(rows).toBe(1);
  await expect(planPage.secondCell()).toHaveText(DeleteplanName);
 console.log('Deleting Plan:', DeleteplanName);
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Are you sure want to delete this Plan?');
    await dialog.accept();
  });
  await planPage.planDeleteButton(DeleteplanName).click();
  await expect(planPage.planDeletedAlert()).toBeVisible();
  await planPage.dashboardTab().click();
  await planPage.plansSlotsAddonsNoSpaceLink().click();
  await planPage.searchInput().click();
  await planPage.searchInput().fill(DeleteplanName);
  await expect(planPage.noMatchingResultsCell()).toBeVisible();
  // POS flow
  await planPage.pointOfSaleButton().click();
  await planPage.searchPlan_POSInput().click();
  await planPage.searchPlan_POSInput().fill(DeleteplanName);
  await expect(planPage.planNameInPOS(DeleteplanName)).not.toBeVisible();
});

test('CreateVariationPlan_VerifyinPOS', async () => {
  const randomVariationPlanName = planPage.generateRandomName();
   const randomVariationPlanName1 = planPage.generateRandomName();
  updateTempJson({ randomVariationPlanName });
  updateTempJson({ randomVariationPlanName1 });
  console.log('Saved randomVariationPlanName to temp.json:', randomVariationPlanName);
  console.log('Saved randomVariationPlanName1 to temp.json:', randomVariationPlanName1);
  // 1. Plans link and create plan link visible
  await planPage.plansLink().click();
  await expect(planPage.createPlanLink()).toBeVisible();
  // 2. Click create plan
  await planPage.createPlanLink().click();
  await expect(planPage.planNameInput()).toBeVisible();
  // 3. Fill plan details
  await planPage.planNameInput().click();
  await planPage.planNameInput().fill(randomVariationPlanName);
  await planPage.validityInput().click();
  await planPage.validityInput().fill(testdata.validity);
  await planPage.discountDropdown().selectOption({ value: '2' });
  await planPage.priceInput().click();
  await planPage.priceInput().fill(testdata.price);
  // 4. Add variation plan
  await planPage.descriptionTextarea().click();
  await planPage.descriptionTextarea().fill('VariationPlan');
  await planPage.addVariationPlanButton().click();
  await expect(planPage.planBadge(randomVariationPlanName)).toBeVisible();
  await planPage.variationPlanInput().click();
  await planPage.variationPlanInput().fill(randomVariationPlanName1);
  await expect(planPage.variationPlanValidityInput(testdata.validity)).toBeVisible();
  await expect(planPage.variationPlanPriceInput(testdata.price)).toBeVisible();
  await planPage.saveButton().click();
  await expect(planPage.planSavedAlert()).toBeVisible();
  await planPage.searchInput().click();
  await planPage.searchInput().fill(`${randomVariationPlanName}-${randomVariationPlanName1}`);
  await page.waitForTimeout(2000);
  await expect(planPage.planRow(`${randomVariationPlanName}-${randomVariationPlanName1}`)).toBeVisible();
  const rows = await planPage.tableRows().count();
  expect(rows).toBe(1);
  await expect(planPage.secondCell()).toHaveText(`${randomVariationPlanName}-${randomVariationPlanName1}`);
  await expect(planPage.validityCell(`${randomVariationPlanName}-${randomVariationPlanName1}`)).toContainText(testdata.validity);
  await expect(planPage.discountCell()).toHaveText('10');
  await expect(planPage.daysCell(`${randomVariationPlanName}-${randomVariationPlanName1}`)).toContainText('All days');
  await expect(planPage.slotsCell(`${randomVariationPlanName}-${randomVariationPlanName1}`)).toContainText('afternoon, evening, morning');
  await expect(planPage.priceCell(`${randomVariationPlanName}-${randomVariationPlanName1}`)).toContainText(testdata.price);
  // POS flow
  await planPage.pointOfSaleButton().click();
  await planPage.searchPlan_POSInput().fill(randomVariationPlanName);
  await expect(planPage.variationBadgeInPOS(randomVariationPlanName)).toBeVisible();
  await planPage.variationBadgeInPOS(randomVariationPlanName).click();
  await expect(planPage.variationSelectOptionInPOS(`${randomVariationPlanName}-${randomVariationPlanName1}`)).toBeVisible();
});

test('DeletePlan_AfterSetup', async ({  }) => {
   const tempFile = path.join(__dirname, 'temp.json');
   const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
   await planPage.DeletePlanByName(randomPlanName_Recurring, page);
   await planPage.DeletePlanByName(randomPlanName_OneTime, page);
   await planPage.DeletePlanByName(`${data.randomVariationPlanName}-${data.randomVariationPlanName1}`, page);
});



})