import { test, expect ,Browser, Page} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage'
import { MembersManagementTabPage } from '../pageobjects/MembersManagementTabPage';
import testdata from '../testdata.json';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { BussinessDetailsTabPage } from '../pageobjects/BussinessDetailsTabPage';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

const tempFile = path.join(__dirname, 'temp.json');
const File = 'V:/EasyMembr_TestData/03.png';



test.describe('CreateMemberValidations', () => {
          let browser: Browser;
          let page: Page;
          let membersTab: MembersManagementTabPage;
          let loginPage: LoginPage;
          let businessPage: BussinessDetailsTabPage;
          

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
    const context = await browser.newContext({
    permissions: ['clipboard-read'], // <— grant permission here
  });
    page = await context.newPage();
    membersTab = new MembersManagementTabPage(page);
    loginPage = new LoginPage(page);
    businessPage = new BussinessDetailsTabPage(page);
    await loginPage.gotoLogin();
    await loginPage.emailInput().fill(testdata.email);
    await loginPage.passwordInput().fill(testdata.password);
    await loginPage.loginButton().click();
    await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
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


test('AddMember_WhileAssigningPlan_VerifyINDashboard_ExpiringThisWeek', async ({  }) => {
      let randomFirstName: string = `${testdata.firstNamePrefix}${Math.floor(Math.random() * 10000)}`;
          updateTempJson({ randomFirstName });
          console.log('Saved randomFirstName to temp.json');
     await membersTab.reportsTab().click();
      // 2. Click on Trainer Summary
      await membersTab.trainerSummaryTab().click();
      await page.waitForTimeout(4000);
      // 3. Get current date in MM/DD/YYYY
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const yyyy = now.getFullYear();
      const currentdate = `${mm}/${dd}/${yyyy}`;
      console.log('Current Date:', currentdate);
       //fs.writeFileSync(tempFile, JSON.stringify({ currentdate }));
       updateTempJson({ currentdate });
      console.log('Saved currentdate to temp.json');
      // 4. Get TotalCheckinCount for today if visible
      let TotalCheckinCount = 0;
      if (await membersTab.trainerSummaryDateCell(currentdate).isVisible()) {
        const checkinButton = await membersTab.trainerSummaryCheckinButton(currentdate);
        if (await checkinButton.isVisible()) {
          TotalCheckinCount = parseInt(await checkinButton.innerText(), 10);
        }
      }
      console.log('TotalCheckinCount:', TotalCheckinCount);
      //fs.writeFileSync(tempFile, JSON.stringify({ TotalCheckinCount }));
       updateTempJson({ TotalCheckinCount });
      console.log('Saved TotalCheckinCount to temp.json');
      await membersTab.paymentSummaryTab().click();
      await page.waitForTimeout(4000);
      let TotalAmount = 0;
      if (await membersTab.trainerSummaryDateCell(currentdate).isVisible()) {
         const paymentSummary = await membersTab.paymentSummaryDateCell(currentdate);
         if (await paymentSummary.isVisible()) {
               const amountText = await paymentSummary.innerText();
               // Remove any non-digit characters (like currency symbols, commas, spaces)
               const numericAmount = amountText.replace(/[^\d]/g, '');
               TotalAmount = parseInt(numericAmount, 10);
         }
      }
        console.log('TotalAmount:', TotalAmount);
        updateTempJson({ TotalAmount });
        console.log('Saved TotalAmount to temp.json');
      await membersTab.planSummaryTab().click();
      await page.waitForTimeout(4000);
      await membersTab.planSummaryFilterDropdown(testdata.planNameSetup1);
       let PlanSummaryCount = 0;
        if (await membersTab.trainerSummaryDateCell(currentdate).isVisible()) {
          const planSummary = await membersTab.planSummaryDateCell(currentdate);
              if (await planSummary.isVisible()) {
          PlanSummaryCount = parseInt(await planSummary.innerText(), 10);
        }
        }
        console.log('PlanSummaryCount:', PlanSummaryCount);
          updateTempJson({ PlanSummaryCount });
           console.log('Saved PlanSummaryCount to temp.json');
      await membersTab.sessionSummaryTab().click();
      await page.waitForTimeout(4000);
       let SessionSummaryCount = 0;
        if (await membersTab.trainerSummaryDateCell(currentdate).isVisible()) {
          const sessionSummary = await membersTab.sessionSummaryDateCell(currentdate);
              if (await sessionSummary.isVisible()) {
          SessionSummaryCount = parseInt(await sessionSummary.innerText(), 10);
        }
        }
        console.log('SessionSummaryCount:', SessionSummaryCount);
          updateTempJson({ SessionSummaryCount });
           console.log('Saved SessionSummaryCount to temp.json');
           
  // 1. Go to Point of Sale
  await loginPage.pointOfSaleButton(testdata.pointOfSaleText).click();
  // 2. Search for plan
  await loginPage.planSearchInput(testdata.planSearchPlaceholder).fill(testdata.planNameSetup1);
  // 3. Click on searched plan result
  await loginPage.searchedPlanResult(testdata.planNameSetup1).click();
  // 4. Click add SVG button
  await loginPage.addSvgButton().click();
  // 5. Click on Add New Member button
  await membersTab.addNewMemberButton().click();
  // 6. Fill member details
  await loginPage.firstNameInput().click();
  await loginPage.firstNameInput().fill(randomFirstName);
  await loginPage.lastNameInput().click();
  await loginPage.lastNameInput().fill(testdata.lastName);
  await loginPage.genderSelect().selectOption({ label: testdata.gender });
  await loginPage.ageInput().click();
  await loginPage.ageInput().fill(testdata.age);
  await loginPage.mobileInput().click();
  await loginPage.mobileInput().fill(testdata.CampaignUserPhoneNumber);
  await loginPage.memberEmailInput().click();
  await loginPage.memberEmailInput().fill(testdata.memberEmail);
  await loginPage.bloodGroupSelect().selectOption({ label: testdata.bloodGroup });
  await loginPage.heightInput().click();
  await loginPage.heightInput().fill(testdata.height);
  await loginPage.weightInput().click();
  await loginPage.weightInput().fill(testdata.weight);
  await loginPage.cityInput().click();
  await loginPage.cityInput().fill(testdata.city);
  await loginPage.countryInput().click();
  await loginPage.countryInput().fill(testdata.country);
  await loginPage.addressInput().click();
  await loginPage.addressInput().fill(testdata.address);
  await loginPage.referralSelect().selectOption({ label: 'Member' });
  // 7. Search for member
  await membersTab.memberSearchInput().fill(testdata.SearchReferralMemberName);
  // 8. Verify and click on member
  await expect(membersTab.memberNameDiv(testdata.ReferralMemberName)).toBeVisible();
  await membersTab.memberNameDiv(testdata.ReferralMemberName).click();
  // 9. Click Add button
  await loginPage.addButton(testdata.addButtonSelector).click();
  // 10. Verify chip with randomFirstName
  await expect(membersTab.memberChip(randomFirstName)).toBeVisible();
  // 11. Click Done
  await loginPage.doneButton(testdata.doneButtonText).click();
  // 12. Verify input value for full name
  await expect(membersTab.memberFullNameInput(randomFirstName, testdata.lastName)).toBeVisible();
  // 13. Verify Address input is not empty
  //await expect(membersTab.addressInput()).not.toBeEmpty();
  await loginPage.continueButton().click();
  await loginPage.cashPaymentButton(testdata.cashPaymentText).click();
  await expect(loginPage.transactionSuccessText(testdata.transactionSuccessText)).toBeVisible();
  await expect(loginPage.paymentSuccessText(testdata.paymentSuccessText)).toBeVisible();
  await loginPage.dismissButton().click();
  await page.waitForTimeout(2000);
  await loginPage.membersManagement(testdata.membersManagementText).click();
  await loginPage.memberSearchInputTable().click();
  await loginPage.memberSearchInputTable().fill(randomFirstName);
  await loginPage.applyButtonTable().click();
  await page.waitForTimeout(2000);
  const rows = await loginPage.memberTableRows().count();
  expect(rows).toBe(1);
  await expect(loginPage.memberTableCell(2)).toHaveText(randomFirstName + ' ' + testdata.lastName);
  await expect(loginPage.memberTableCell(6)).toHaveText(testdata.planNameSetup1);
  // 14. Go to Dashboard and Expiring This Week
  await loginPage.dashboardText('Dashboard').click();
  await membersTab.expiringThisWeekTab().click();
  // 15. Pagination arrow and select All
  await membersTab.paginationArrow().click();
  await page.waitForTimeout(2000);
  await membersTab.selectAllOption().click();
  await page.waitForTimeout(2000);
  // 16. Sort by Name header
  await membersTab.nameHeader().click();
  await page.waitForTimeout(2000);
  // 17. Verify row for member and plan
  await membersTab.memberPlanRow(randomFirstName + ' ' + testdata.lastName, testdata.planNameSetup1).scrollIntoViewIfNeeded();
  await expect(membersTab.memberPlanRow(randomFirstName + ' ' + testdata.lastName, testdata.planNameSetup1)).toBeVisible();
});

test('In CheckIN/CheckOUT_Log Time for Member and Verify in Activities Section_Verify in Reports_Trainer Summary', async () => {
  const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
      await page.click('text=Check-In/Check-out');
      await loginPage.checkInOutSearchInput().click();
      await loginPage.checkInOutSearchInput().fill(data.randomFirstName);
      await expect(loginPage.searchedPlanResult(data.randomFirstName)).toBeVisible();
      await page.waitForTimeout(4000);
      // 6. Click log time icon
      await membersTab.logTimeIcon().click();
      // 7. Select trainer
      await loginPage.trainerSelect().selectOption({ label: 'shiva shiva' });
      // 8. Click Log Time button for member
      await membersTab.logTimeButtonForMember(`${data.randomFirstName} ${testdata.lastName}`).click();
      // 9. Click Activities tab
      await membersTab.activitiesTab().click();
      // 10. Select Today in dropdown
      await membersTab.activitiesTodayDropdown().selectOption({ label: 'Today' });
      // 11. Apply and wait
      await loginPage.applyButtonTable().click();
      await page.waitForTimeout(2000);
      // 12. Verify log time success
      await expect(membersTab.activitiesLogTimeSuccessCell(`${data.randomFirstName} ${testdata.lastName}`)).toBeVisible();
      // 13. Go to Reports
      await membersTab.reportsTab().click();
      // 14. Click Trainer Summary
      await membersTab.trainerSummaryTab().click();
      await page.waitForTimeout(4000);
      // 15. Get FinalTotalCheckinCount
      let FinalTotalCheckinCount = 0;
      if (await membersTab.trainerSummaryDateCell(data.currentdate).isVisible()) {
        const checkinButton = await membersTab.trainerSummaryCheckinButton(data.currentdate);
        if (await checkinButton.isVisible()) {
            console.log('Trainer Summary Visible for current date in Reports Tab');
          FinalTotalCheckinCount = parseInt(await checkinButton.innerText(), 10);
        }
      }
        console.log('FinalTotalCheckinCount:', FinalTotalCheckinCount);
      // 16. Assert FinalTotalCheckinCount = TotalCheckinCount + 1
      expect(FinalTotalCheckinCount).toBe(data.TotalCheckinCount + 1);
       await membersTab.paymentSummaryTab().click();
       await page.waitForTimeout(4000);
        let FinalTotalAmount = 0;
      if (await membersTab.trainerSummaryDateCell(data.currentdate).isVisible()) {
         const paymentSummary = await membersTab.paymentSummaryDateCell(data.currentdate);
         if (await paymentSummary.isVisible()) {
              const amountText = await paymentSummary.innerText();
               // Remove any non-digit characters (like currency symbols, commas, spaces)
               const numericAmount = amountText.replace(/[^\d]/g, '');
               FinalTotalAmount = parseInt(numericAmount, 10);
         }
      }
        console.log('FinalTotalAmount:', FinalTotalAmount);
        updateTempJson({ FinalTotalAmount });
      console.log('Saved currentdate to temp.json');
        expect(FinalTotalAmount).toBe(data.TotalAmount + 500);
        await membersTab.planSummaryTab().click();
        await page.waitForTimeout(4000);
        await membersTab.planSummaryFilterDropdown(testdata.planNameSetup1);
       let FinalPlanSummaryCount = 0;
       if (await membersTab.trainerSummaryDateCell(data.currentdate).isVisible()) {
           const planSummary = await membersTab.planSummaryDateCell(data.currentdate);
              if (await planSummary.isVisible()) {
          FinalPlanSummaryCount = parseInt(await planSummary.innerText(), 10);
        }
        }
        console.log('FinalPlanSummaryCount:', FinalPlanSummaryCount);
        expect(FinalPlanSummaryCount).toBe(data.PlanSummaryCount + 1);
});

test('DownloadExportSheet_TrainerSummary', async ({  context }) => {
   const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
     await membersTab.reportsTab().click();
     await membersTab.trainerSummaryTab().click();
     await page.waitForTimeout(4000);
  const downloadDir = 'V:/EasyMembr_Downloads';
  const expectedFileName = 'Trainer Summary.xlsx';
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    await page.locator("(//button[text()='Export'])[1]").click()
  ]);
  const filePath = path.join(downloadDir, expectedFileName);
  await download.saveAs(filePath);
  // 4. Read the file and validate Haritha test and ₹100
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
  expect(flatCells).toContain(data.currentdate);
  const matches = flatCells.filter(c => c === data.currentdate);
  console.log('Matching cells:', matches);
  // 5. Delete the file
  fs.unlinkSync(filePath);
});
    




test('DownloadExportSheet_CheckINSummary', async ({  context }) => {
   const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
     await membersTab.reportsTab().click();
     await membersTab.CheckINSummaryTab().click();
     await page.waitForTimeout(4000);
     const downloadDir = 'V:/EasyMembr_Downloads';
     const expectedFileName = 'checkInReportsData.xlsx';
     const [download] = await Promise.all([
    page.waitForEvent('download'),
    await page.locator("(//button[text()='Export'])[1]").click()
   ]);
    const filePath = path.join(downloadDir, expectedFileName);
     await download.saveAs(filePath);
     // 4. Read the file and validate Haritha test and ₹100
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
  expect(flatCells).toContain(`${data.randomFirstName} Tester`);
  expect(flatCells).toContain(data.currentdate);
  const matches = flatCells.filter(c => c === `${data.randomFirstName} Tester`);
  const matches1 = flatCells.filter(c => c === data.currentdate);
  console.log('Matching cells:', matches);
  console.log('Matching cells for current date:', matches1);
  // 5. Delete the file
  fs.unlinkSync(filePath);

})

test('DownloadExportSheet_PaymentSummary', async ({  context }) => {
   const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
     await membersTab.reportsTab().click();
     await membersTab.paymentSummaryTab().click();
     await page.waitForTimeout(4000);
     const downloadDir = 'V:/EasyMembr_Downloads';
     const expectedFileName = 'TransactionSummary.xlsx';
     const [download] = await Promise.all([
    page.waitForEvent('download'),
    await page.locator("(//button[text()='Export'])[1]").click()
   ]);
    const filePath = path.join(downloadDir, expectedFileName);
     await download.saveAs(filePath);
     // 4. Read the file and validate Haritha test and ₹100
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
  expect(flatCells).toContain(data.FinalTotalAmount.toString());
    expect(flatCells).toContain(data.currentdate);
  const matches = flatCells.filter(c => c === data.FinalTotalAmount.toString());
  const matches1 = flatCells.filter(c => c === data.currentdate);
  console.log('Matching cells:', matches);
  console.log('Matching cells for current date:', matches1);
  // 5. Delete the file
  fs.unlinkSync(filePath);

})

test('DownloadExportSheet_PlanSummary', async ({  context }) => {
   const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
     await membersTab.reportsTab().click();
     await membersTab.planSummaryTab().click();
     await page.waitForTimeout(4000);
     const downloadDir = 'V:/EasyMembr_Downloads';
     const expectedFileName = 'planSummary.xlsx';
     const [download] = await Promise.all([
    page.waitForEvent('download'),
    await page.locator("(//button[text()='Export'])[1]").click()
   ]);
    const filePath = path.join(downloadDir, expectedFileName);
     await download.saveAs(filePath);
     // 4. Read the file and validate Haritha test and ₹100
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
  expect(flatCells).toContain(testdata.planNameSetup1);
    expect(flatCells).toContain(data.currentdate);
  const matches = flatCells.filter(c => c === testdata.planNameSetup1);
  const matches1 = flatCells.filter(c => c === data.currentdate);
  console.log('Matching cells:', matches);
  console.log('Matching cells for current date:', matches1);
  // 5. Delete the file
  fs.unlinkSync(filePath);

})

test('ResumePausedMember_VerifyStatus_As_Active', async () => {
  const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  // 1. Go to Point of Sale
  await loginPage.pointOfSaleButton(testdata.pointOfSaleText).click();
  // 2. Search for plan
  await loginPage.planSearchInput(testdata.planSearchPlaceholder).fill(testdata.planNameSetup);
  // 3. Click on searched plan result
  await loginPage.searchedPlanResult(testdata.planNameSetup).click();
  // 4. Click add SVG button
  await loginPage.addSvgButton().click();
  // 5. Search for member in POS
  await loginPage.memberSearchInputPOS().click();
  await loginPage.memberSearchInputPOS().fill(data.randomFirstName);
  await loginPage.searchedPlanResult(data.randomFirstName).click();
  await loginPage.doneButton(testdata.doneButtonText).click();
  // 9. Verify member details text contains randomFirstName
  await expect(loginPage.memberDetailsText()).toContainText(data.randomFirstName);
  // 10. Continue and pay
  await loginPage.continueButton().click();
  await loginPage.cashPaymentButton(testdata.cashPaymentText).click();
  await expect(loginPage.transactionSuccessText(testdata.transactionSuccessText)).toBeVisible();
  await expect(loginPage.paymentSuccessText(testdata.paymentSuccessText)).toBeVisible();
  await loginPage.dismissButton().click();
  await page.waitForTimeout(2000);
  // 16. Go to Members Management and search
  await loginPage.membersManagement(testdata.membersManagementText).click();
  await loginPage.membersSearchInput().click();
  await loginPage.membersSearchInput().fill(data.randomFirstName);
  await loginPage.membersApplyButton().click();
  await page.waitForTimeout(2000);
  const rows = await loginPage.memberTableRows().count();
  expect(rows).toBe(1);
  await expect(loginPage.membersTableRow(data.randomFirstName)).toBeVisible();
  await expect(loginPage.memberTableCell(2)).toHaveText(data.randomFirstName + ' ' + testdata.lastName);
  await expect(loginPage.memberTableCell(6)).toHaveText(testdata.planNameSetup);
  // 25. Open member details
  await loginPage.membersTableRowCell(data.randomFirstName).click();
  await expect(loginPage.memberDetailsTitle(data.randomFirstName)).toBeVisible();
  // 27. Edit membership
  await loginPage.editMembershipIcon(testdata.planNameSetup).click();
  await expect(loginPage.editMembershipDetailsText()).toBeVisible();
  // 29. Verify member name div
  await expect(membersTab.memberNameTesterDiv(data.randomFirstName)).toBeVisible();
  // 30-33. Pause membership
  await loginPage.pauseText().click();
  await loginPage.daysDropdown().selectOption({ label: 'Days' });
  await loginPage.daysInput().fill(testdata.Pausedays);
  await loginPage.saveButton().click();
  await expect(loginPage.pausedStatus(testdata.planNameSetup)).toBeVisible();
  // 35. Search again and verify pause status
  await loginPage.membersManagement(testdata.membersManagementText).click();
  await loginPage.membersSearchInput().fill(data.randomFirstName);
  await loginPage.membersApplyButton().click();
  await page.waitForTimeout(2000);
  await expect(loginPage.pauseStatusInTable(data.randomFirstName)).toBeVisible();
  await loginPage.membersTableRowCell(data.randomFirstName).click();
  await expect(loginPage.memberDetailsTitle(data.randomFirstName)).toBeVisible();
  await loginPage.editMembershipIcon(testdata.planNameSetup).click();
  // 42. Verify member name div again
  await expect(membersTab.memberNameTesterDiv(data.randomFirstName)).toBeVisible();
  // 43. Click Resume
  await membersTab.resumeButton().click();
  // 44. Verify plan status is Active
  await expect(membersTab.planStatusActiveCell(testdata.planNameSetup)).toBeVisible();
});

test('AddMember to a Session Plan and Verify in Reports_Session and Reports_SessionSummary', async () => {
  const tempFile = path.join(__dirname, 'temp.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  // 1. Go to Point of Sale
  await loginPage.pointOfSaleButton(testdata.pointOfSaleText).click();
  // 2. Search for plan
  await loginPage.planSearchInput(testdata.planSearchPlaceholder).fill(testdata.SessionPlanNameSetup);
  // 3. Click on searched plan result
  await loginPage.searchedPlanResult(testdata.SessionPlanNameSetup).click();
  // 4. Click add SVG button
  await loginPage.addSvgButton().click();
  // 5. Click on member search input in POS
  await loginPage.memberSearchInputPOS().click();
  // 6. Fill member name
  await loginPage.memberSearchInputPOS().fill(data.randomFirstName);
  // 7. Click on searched member result
  await loginPage.searchedPlanResult(data.randomFirstName).click();
  // 8. Click Done
  await loginPage.doneButton(testdata.doneButtonText).click();
  // 9. Verify member details text contains randomFirstName
  await expect(loginPage.memberDetailsText()).toContainText(data.randomFirstName);
  // 10. Continue and pay
  await loginPage.continueButton().click();
  await loginPage.cashPaymentButton(testdata.cashPaymentText).click();
  await expect(loginPage.transactionSuccessText(testdata.transactionSuccessText)).toBeVisible();
  await expect(loginPage.paymentSuccessText(testdata.paymentSuccessText)).toBeVisible();
  await loginPage.dismissButton().click();
  await page.waitForTimeout(2000);
  // 16. Go to Members Management and search
  await loginPage.membersManagement(testdata.membersManagementText).click();
  await loginPage.membersSearchInput().click();
  await loginPage.membersSearchInput().fill(data.randomFirstName);
  await loginPage.membersApplyButton().click();
  await page.waitForTimeout(2000);
  // 21. Count rows and verify
  const rows = await loginPage.memberTableRows().count();
  expect(rows).toBe(1);
  // 22. Verify member row is visible
  await expect(loginPage.membersTableRow(data.randomFirstName)).toBeVisible();
  // 23. Verify member name in table
  await expect(loginPage.memberTableCell(2)).toHaveText(data.randomFirstName + ' ' + testdata.lastName);
  // 24. Verify plan name in table
  await expect(loginPage.memberTableCell(6)).toHaveText(testdata.SessionPlanNameSetup);
  // 25. Open member details
  await loginPage.membersTableRowCell(data.randomFirstName).click();
  // 26. Go to Reports tab
  await membersTab.reportsTab().click();
  // 27. Click on Session tab
  await membersTab.sessionTab().click();
  // 28. Search for member in session reports
  await membersTab.sessionSearchInput().fill(data.randomFirstName);
  // 29. Click Apply and wait
  await membersTab.sessionApplyButton().click();
  await page.waitForTimeout(2000);
  // 30. Verify session report row for member and plan
  await expect(membersTab.sessionReportRow(data.randomFirstName + ' ' + testdata.lastName, testdata.SessionPlanNameSetup, '0', '2')).toBeVisible();
  // 31. Go to Check-In/Check-Out
  await page.click('text=Check-In/Check-out');
  await loginPage.checkInOutSearchInput().click();
  await loginPage.checkInOutSearchInput().fill(data.randomFirstName);
  await expect(loginPage.searchedPlanResult(data.randomFirstName)).toBeVisible();
  await page.waitForTimeout(4000);
  // 33. Click check-in button
  await page.locator("//input[@class='checkinbutton']").click();
  // 34. Verify Sessions button and click
  await expect(membersTab.sessionsButton()).toBeVisible();
  await membersTab.sessionsButton().click();
  // 35. Verify sessions remaining is 2
  await expect(membersTab.sessionsRemainingSpan('2')).toBeVisible();
  // 36. Click on second member
  await membersTab.memberByIndex(2).click();
  // 37. Click Done and wait
  await membersTab.doneButton().click();
  await page.waitForTimeout(2000);
  // 38. Verify close icon is visible
  await expect(membersTab.closeIcon()).toBeVisible();
  // 39. Verify Sessions button and click
  await expect(membersTab.sessionsButton()).toBeVisible();
  await membersTab.sessionsButton().click();
  // 40. Verify sessions remaining is 2
  await expect(membersTab.sessionsRemainingSpan('2')).toBeVisible();
  // 41. Click on third member
  await membersTab.memberByIndex(3).click();
  // 42. Handle dialog for exceeding sharing limit
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('You can only add 0 more member(s). You have exceeded your sharing limit!');
    await dialog.accept();
  });
  //await page.click("//span[@class='ml20']/img[@alt='Delete']");
  await page.waitForTimeout(2000);
  // 43. Click Done and wait
  await membersTab.doneButton().click();
  await page.waitForTimeout(2000);
  // 44. Click close button
  await page.locator("//button[@class='ripple ripple-surface btn-close']").click();
  await page.waitForTimeout(2000);
  // 45. Click close icon and wait
  await membersTab.closeIcon().click();
  await page.waitForTimeout(2000);
  // 46. Click Check-In and wait
  await membersTab.checkInButton().click();
  await page.waitForTimeout(5000);
  // 47. Click check-out button
  await page.locator("//input[@class='checkinbuttonout']").click();
  // 48. Click Check-Out
  await membersTab.checkOutButton().click();
  // 49. Go to Reports tab
  await membersTab.reportsTab().click();
  // 50. Click on Session tab
  await membersTab.sessionTab().click();
  // 51. Search for member in session reports
  await membersTab.sessionSearchInput().fill(data.randomFirstName);
  // 52. Click Apply and wait
  await membersTab.sessionApplyButton().click();
  await page.waitForTimeout(2000);
  // 53. Verify session report row for member and plan (after check-in/out)
  await expect(membersTab.sessionReportRow(data.randomFirstName + ' ' + testdata.lastName, testdata.SessionPlanNameSetup, '1', '1')).toBeVisible();
  // 54. Go to Session Summary tab
  await membersTab.sessionSummaryTab().click();
  await page.waitForTimeout(4000);
  // 56. Get FinalSessionSummaryCount and verify
  let FinalSessionSummaryCount = 0;
  if (await membersTab.trainerSummaryDateCell(data.currentdate).isVisible()) {
     const sessionSummary = await membersTab.sessionSummaryDateCell(data.currentdate);
    if (await sessionSummary.isVisible()) {
      FinalSessionSummaryCount = parseInt(await sessionSummary.innerText(), 10);
    }
  }
  console.log('FinalSessionSummaryCount:', FinalSessionSummaryCount);
  expect(FinalSessionSummaryCount).toBe(data.SessionSummaryCount + 1);
});

test('DownloadExportSheet_Session', async ({  context }) => {
   const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
     await membersTab.reportsTab().click();
     await membersTab.sessionTab().click();
     await page.waitForTimeout(4000);
     const downloadDir = 'V:/EasyMembr_Downloads';
     const expectedFileName = 'sessionReportsData.xlsx';
     const [download] = await Promise.all([
    page.waitForEvent('download'),
    await page.locator("(//button[text()='Export'])[1]").click()
   ]);
    const filePath = path.join(downloadDir, expectedFileName);
     await download.saveAs(filePath);
     // 4. Read the file and validate Haritha test and ₹100
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
  expect(flatCells).toContain(`${data.randomFirstName} Tester`);
    expect(flatCells).toContain(data.currentdate);
    expect(flatCells).toContain(testdata.SessionPlanNameSetup);
  const matches = flatCells.filter(c => c === testdata.SessionPlanNameSetup);
  const matches1 = flatCells.filter(c => c === data.currentdate);
   const matches2 = flatCells.filter(c => c === `${data.randomFirstName} Tester`);
  console.log('Matching cells:', matches);
  console.log('Matching cells for current date:', matches1);
  console.log('Matching cells for member name:', matches2);
  // 5. Delete the file
  fs.unlinkSync(filePath);

})

test('DownloadExportSheet_SessionSummary', async ({  context }) => {
   const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
     await membersTab.reportsTab().click();
     await membersTab.sessionSummaryTab().click();
     await page.waitForTimeout(4000);
     const downloadDir = 'V:/EasyMembr_Downloads';
     const expectedFileName = 'sessionSummary.xlsx';
     const [download] = await Promise.all([
    page.waitForEvent('download'),
    await page.locator("(//button[text()='Export'])[1]").click()
   ]);
    const filePath = path.join(downloadDir, expectedFileName);
     await download.saveAs(filePath);
     // 4. Read the file and validate Haritha test and ₹100
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
    expect(flatCells).toContain(data.currentdate);
  const matches = flatCells.filter(c => c === data.currentdate);
  console.log('Matching cells:', matches);
  // 5. Delete the file
  fs.unlinkSync(filePath);

})

test('WhatsappMembersManagement_VerifyReports_WhatsappCampaignHistory', async () => {
   let campaignName: string = `${testdata.CampaignName}${Math.floor(Math.random() * 10000)}`;
   updateTempJson({ campaignName });
   console.log('Saved campaignName to temp.json');
  // 1. Go to Members Management
  await loginPage.membersManagement(testdata.membersManagementText).click();
  // 2. Click WhatsApp button
  await membersTab.whatsappButton().click();
  // 3. Enter Campaign Name
  await membersTab.campaignNameInput().click();
  await membersTab.campaignNameInput().fill(campaignName);
  // 4. Search by template name
  await membersTab.templateSearchInput().click();
  await membersTab.templateSearchInput().fill(testdata.TemplateName);
  // 5. Select Welcome checkbox
  await membersTab.welcomeTemplateCheckbox().check();
  // 6. Click Send Message
  await membersTab.sendMessageButton().click();
  // 7. Select ApplicationVariables dropdown as customvalue
  await membersTab.applicationVariablesDropdown().selectOption(testdata.ApplicationVaiable);
  // 8. Enter Custom Value
  await membersTab.customValueInput().click();
  await membersTab.customValueInput().fill(testdata.CustomValue);
  // 10. Click Send
  await membersTab.sendButton().click();
  // 11. Verify phone number visible
  await expect(membersTab.sentPhoneNumberSpan(`+91${testdata.CampaignUserPhoneNumber}`)).toBeVisible();
  // 12. Click second Send button
  await membersTab.sendButtonByIndex(2).click();
  // 13. Verify alert for success
  await expect(membersTab.messageSentSuccessAlert()).toBeVisible();
  // 14. Go to Reports
  await membersTab.reportsTab().click();
  // 15. Click WhatsApp Campaign History and wait
  await membersTab.whatsappCampaignHistoryTab().click();
  await page.waitForTimeout(5000);
  // 16. Search by Campaign Name
  await membersTab.campaignSearchInput().click();
  await membersTab.campaignSearchInput().fill(campaignName);
  // 17. Select Day dropdown as Today
  await membersTab.dayDropdown().selectOption('Today');
  // 18. Click Apply and wait
  await membersTab.applyButton().click();
  await page.waitForTimeout(2000);
  // 19. Assert only 1 row in table
  const rows = await membersTab.whatsappTableRows().count();
  expect(rows).toBe(1);
  // 20. Verify message content in table
  await expect(membersTab.whatsappTableMessageCell(campaignName, testdata.CampaignMessage)).toBeVisible();
});

test('DownloadExportSheet_WhatsappCampaignHistory', async ({  context }) => {
   const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
     await membersTab.reportsTab().click();
    await membersTab.whatsappCampaignHistoryTab().click();
     await page.waitForTimeout(4000);
     const downloadDir = 'V:/EasyMembr_Downloads';
     const expectedFileName = 'whatsApp_Campaign_Reports.xlsx';
     const [download] = await Promise.all([
    page.waitForEvent('download'),
    await page.locator("(//button[text()='Export'])[1]").click()
   ]);
    const filePath = path.join(downloadDir, expectedFileName);
     await download.saveAs(filePath);
     // 4. Read the file and validate Haritha test and ₹100
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
    expect(flatCells).toContain(data.currentdate);
    expect(flatCells).toContain(data.campaignName);
    const cleanedArray = flatCells.map(item => item.trim());
    expect(cleanedArray).toContain(testdata.CampaignMessage);
  const matches = flatCells.filter(c => c === data.currentdate);
  const matches1 = flatCells.filter(c => c === data.campaignName);
  const matches2 = cleanedArray.filter(c => c === testdata.CampaignMessage);
  console.log('Matching cells:', matches);
  console.log('Matching cells for campaignName:', matches1);
  console.log('Matching cells for message:', matches2);
  // 5. Delete the file
  fs.unlinkSync(filePath);

})



test('CreateMember_WavierForm', async () => {
    let WavierMemberFirstName: string = `${testdata.WavierMemberFirstName}${Array.from({length: 6}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}`;
    updateTempJson({ WavierMemberFirstName });
    console.log('Saved WavierMemberFirstName to temp.json');
  await businessPage.businessDetailsTab().click();
  await expect(businessPage.showQRCodeButton()).toBeVisible();
  await businessPage.showQRCodeButton().click();
  await expect(businessPage.copyLinkButton()).toBeVisible();
  await businessPage.copyLinkButton().click();
  await expect(businessPage.copyLinkAlert()).toBeVisible();
   await page.waitForTimeout(3000);
  await businessPage.closeButton().click();
  // 2. Simulate navigation to copied link (manual step: ctrl+V)
  // Get the copied link from clipboard and navigate to it
  // Request clipboard-read permission and get the copied link
  // Grant clipboard-read permission before accessing clipboard
    await page.once('dialog', async dialog => {
      await dialog.accept();
    });
  const copiedLink = await page.evaluate(async () => await navigator.clipboard.readText());
  console.log('Copied Link:', copiedLink);
  await page.goto(copiedLink);
  // 3-27. Fill waiver form fields and upload photo
  // Use page.locator for direct selectors, or add POM methods if needed
  await page.waitForTimeout(2000);
  await page.locator("(//input[@placeholder='First Name'])[1]").fill(WavierMemberFirstName);
  await page.locator("(//input[@placeholder='Last Name'])[1]").fill(testdata.WavierMemberLastName);
  await page.locator("(//input[@placeholder='First Name'])[2]").fill(testdata.WavierMemberFatherFirstName);
  await page.locator("(//input[@placeholder='Last Name'])[2]").fill(testdata.WavierMemberFatherLastName);
  await page.locator("//div[@class='form-outline datepicker']/input").click();
  await page.waitForTimeout(2000);
  await page.locator("//button[@class='datepicker-view-change-button']").click();
  await page.waitForTimeout(2000);
  await page.locator("//div[text()='1998']").click();
  await page.waitForTimeout(2000);
  await page.locator("//div[text()='Jan']").click();
  await page.waitForTimeout(2000);
  await page.locator("(//div[text()='1'])[1]").click();
  await page.locator("(//input[@class='PhoneInputInput'])[1]").fill(testdata.WavierMemberPhoneNumber);
  await page.locator("(//input[@placeholder='example@gmail.com'])[1]").fill(testdata.memberEmail);
  await page.locator("(//input[@placeholder='Address'])[1]").fill(testdata.WavierMemberAdress);
  await page.locator("(//input[@placeholder='Area'])[1]").fill(testdata.WavierMemberAdress);
  await page.locator("(//input[@placeholder='City'])[1]").fill(testdata.city);
  await page.locator("(//input[@placeholder='First Name'])[3]").fill(testdata.WavierMemberReferralFirstName);
  await page.locator("(//input[@placeholder='Last Name'])[3]").fill(testdata.WavierMemberReferralLastName);
  await page.locator("(//input[@class='PhoneInputInput'])[2]").fill(testdata.WavierMemberReferralPhoneNumber);
  await page.locator("//input[@placeholder='Relationship']").fill('Friend');
  await page.locator("//div[text()='Gym Membership Form']/..//input").click();
  await page.waitForTimeout(2000);
  // 20. Signature on canvas
  const canvas = await page.locator('canvas').first();
  await canvas.click({ position: { x: 50, y: 50 } });
  await canvas.hover();
  // 21. Verify Clear button
  await expect(page.locator("//button[text()='Clear']")).toBeVisible();
  // 22. Upload photo
  await page.locator("//span[@class='browse_btn']").setInputFiles(File);
  // 23. Verify Change Your Photo button
  await expect(page.locator("//button[text()='Change Your Photo']")).toBeVisible();
  // 24. Submit form
  await page.locator("//button[text()='Submit']").click();
  // 25. Verify success message
  await expect(page.locator("//h5[text()='Form is submitted successfully!!']")).toBeVisible();
  // 26. Verify Download button
  await expect(page.locator("//button[text()='Download']")).toBeVisible();
  await page.waitForTimeout(5000);
  // 27. Navigate back
  await page.goBack();
  // 28. Search for member in Members Management
  await loginPage.membersManagement(testdata.membersManagementText).click();
  await loginPage.memberSearchInputTable().click();
  await loginPage.memberSearchInputTable().fill(WavierMemberFirstName);
  await loginPage.applyButtonTable().click();
  await page.waitForTimeout(2000);
  const rows = await loginPage.memberTableRows().count();
  expect(rows).toBe(1);
  await expect(loginPage.memberTableCell(2)).toHaveText(`${WavierMemberFirstName} ${testdata.WavierMemberLastName}`);
  // 29. Verify Submitted status in table
  await expect(membersTab.waiverSubmittedStatusCell(`${WavierMemberFirstName} ${testdata.WavierMemberLastName}`)).toBeVisible();
  membersTab.waiverSubmittedStatusCell(`${WavierMemberFirstName} ${testdata.WavierMemberLastName}`).click();
  await page.waitForTimeout(3000);
  await expect(page.locator("//button[text()='Change Your Photo']")).toBeVisible();
  membersTab.cancelButton().click();
});

test('AfterCreatingMember_VerifyinWhatsappNotificationHistory_DownloadExportSheet', async () => {
  const tempFile = path.join(__dirname, 'temp.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  // 1. Go to Reports tab
  await membersTab.reportsTab().click();
  // 2. Click Whatsapp Notification Summary tab
  await membersTab.whatsappNotificationSummaryTab().click();
  // 3. Wait for table to load
  await page.waitForTimeout(4000);
   await membersTab.activitiesTodayDropdown_1().selectOption({ label: 'Today' });
  await loginPage.reportsApplyButton().click();
  await page.waitForTimeout(2000);
 // 4. Click MEMBER_ADDED_OWNER_ALERT row
  await membersTab.whatsappNotificationRow(data.currentdate, 'MEMBER_ADDED_OWNER_ALERT','1').click();
  // 5. Verify member name visible
  await expect(membersTab.whatsappNotificationMemberCell(`${data.WavierMemberFirstName} ${testdata.WavierMemberLastName}`)).toBeVisible();
  // 6. Click close button
  await membersTab.closeButtonIcon().click();
  // 7. Click MEMBER_ADDED_MEMBER_ALERT row
  await membersTab.whatsappNotificationRow(data.currentdate, 'MEMBER_ADDED_MEMBER_ALERT','1').click();
  // 8. Verify member name visible
  await expect(membersTab.whatsappNotificationMemberCell(`${data.WavierMemberFirstName} ${testdata.WavierMemberLastName}`)).toBeVisible();
  // 9. Click close button
  await membersTab.closeButtonIcon().click();
   const downloadDir = 'D:/EasyMembr_Downloads';
     const expectedFileName = 'wtsAppNotificationRpt.xlsx';
     const [download] = await Promise.all([
    page.waitForEvent('download'),
    await page.locator("(//button[text()='Export'])[1]").click()
   ]);
    const filePath = path.join(downloadDir, expectedFileName);
     await download.saveAs(filePath);
     // 4. Read the file and validate Haritha test and ₹100
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
    expect(flatCells).toContain(data.currentdate);
    expect(flatCells).toContain('MEMBER_ADDED_OWNER_ALERT');
  const matches = flatCells.filter(c => c === data.currentdate);
  const matches1 = flatCells.filter(c => c === 'MEMBER_ADDED_OWNER_ALERT');
  console.log('Matching cells:', matches);
  console.log('Matching cells for Alert:', matches1);
  // 5. Delete the file
  fs.unlinkSync(filePath);

});

test('AddMemberToRecuringPlan_VerifyCountinDashboardActiveMembers', async () => {
    // 1. Go to Dashboard and get initial active members count
    await membersTab.dashboardTab().click();
    await page.locator("//button[text()='Today']").click();
    await page.waitForTimeout(2000);
    const activeMembersButton = page.locator("(//h5[text()='Active Members']/../../div[2]//button)[1]");
    await expect(activeMembersButton).toBeVisible();
    const IntialActiveMembersCount = parseInt(await activeMembersButton.innerText(), 10);
    console.log('IntialActiveMembersCount:', IntialActiveMembersCount); 
    // 2. Add member to recurring plan
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await loginPage.pointOfSaleButton(testdata.pointOfSaleText).click();
    await loginPage.planSearchInput(testdata.planSearchPlaceholder).fill(testdata.Recurring_PlanSetup);
    await loginPage.searchedPlanResult(testdata.Recurring_PlanSetup).click();
    await loginPage.addSvgButton().click();
    await loginPage.memberSearchInputPOS().click();
    await loginPage.memberSearchInputPOS().fill(`${data.WavierMemberFirstName} ${testdata.WavierMemberLastName}`);
    await loginPage.searchedPlanResult(`${data.WavierMemberFirstName} ${testdata.WavierMemberLastName}`).click();
    await loginPage.doneButton(testdata.doneButtonText).click();
    await expect(loginPage.memberDetailsText()).toContainText(`${data.WavierMemberFirstName}`);
    await loginPage.continueButton().click();
    await loginPage.cashPaymentButton(testdata.cashPaymentText).click();
    await expect(loginPage.transactionSuccessText(testdata.transactionSuccessText)).toBeVisible();
    await expect(loginPage.paymentSuccessText(testdata.paymentSuccessText)).toBeVisible();
    await loginPage.dismissButton().click();
    await page.waitForTimeout(2000);
    await loginPage.membersManagement(testdata.membersManagementText).click();
    await loginPage.memberSearchInputTable().click();
    await loginPage.memberSearchInputTable().fill(`${data.WavierMemberFirstName} ${testdata.WavierMemberLastName}`);
    await loginPage.applyButtonTable().click();
    await page.waitForTimeout(2000);
    const rows = await loginPage.memberTableRows().count();
    expect(rows).toBe(1);
    await expect(loginPage.memberTableCell(2)).toHaveText(`${data.WavierMemberFirstName} ${testdata.WavierMemberLastName}`);
    await expect(loginPage.memberTableCell(6)).toHaveText(testdata.Recurring_PlanSetup);
    // 3. Go to Dashboard and get final active members count
     await membersTab.dashboardTab().click();
    await page.locator("//button[text()='Today']").click();
    await page.waitForTimeout(2000);
    const finalActiveMembersButton = page.locator("(//h5[text()='Active Members']/../../div[2]//button)[1]");
    await expect(finalActiveMembersButton).toBeVisible();
    const FinalActiveMembersCount = parseInt(await finalActiveMembersButton.innerText(), 10);
    console.log('FinalActiveMembersCount:', FinalActiveMembersCount);
    // 4. Assert the count increased by 1
    expect(FinalActiveMembersCount).toBe(IntialActiveMembersCount + 1);
    finalActiveMembersButton.click();
    await page.waitForTimeout(2000);
    await expect(page.locator("//div[@class='chip  mb-0'][text()='Active Members']")).toBeVisible();
    await expect(page.locator(`//table//td[text()='${data.WavierMemberFirstName} ${testdata.WavierMemberLastName}']`)).toBeVisible();
});

test('SuspendMember_VerifyinSMSHistory_DownloadExportSheet', async () => {
      const tempFile = path.join(__dirname, 'temp.json');
      const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
      await loginPage.dashboardText(" Dashboard").click();
      await loginPage.membersManagement(testdata.membersManagementText).click();
      await loginPage.memberSearchInputTable().click();
      await loginPage.memberSearchInputTable().fill(data.randomFirstName);
      await loginPage.applyButtonTable().click();
      await page.waitForTimeout(2000);
      const rows = await loginPage.memberTableRows().count();
      expect(rows).toBe(1);
      await expect(loginPage.memberTableCell(2)).toHaveText(data.randomFirstName + ' ' + testdata.lastName);
      await expect(loginPage.memberTableCell(6)).toHaveText(testdata.SessionPlanNameSetup);
      // 2. Click member row
      await membersTab.memberTableRowByName(data.randomFirstName + ' ' + testdata.lastName).click();
      // 3. Suspend member
      await expect(membersTab.memberNameHeaderHaritha(data.randomFirstName)).toBeVisible();
      await expect(membersTab.suspendButton()).toBeVisible();
      await membersTab.suspendButton().click();
      await expect(membersTab.memberSuspendedName(data.randomFirstName + ' ' + testdata.lastName)).toBeVisible();
      await membersTab.suspendReasonTextarea().fill(testdata.SuspendReason);
      await membersTab.suspendConfirmButton().click();
      await expect(membersTab.memberSuspendedAlert()).toBeVisible();
      // 5. Go to SMS History
      await membersTab.reportsTab().click();
      await membersTab.smsHistoryTab().click();
      await page.waitForTimeout(4000);
      // 6. Search in SMS history
      await membersTab.smsHistorySearchInput().fill(data.randomFirstName + ' ' + testdata.lastName);
      // 7. Apply and wait
      await loginPage.reportsApplyButton().click();
      await page.waitForTimeout(2000);
      // 8. Verify SMS suspended alert row
      await expect(membersTab.smsHistorySuspendedAlertCell(data.randomFirstName + ' ' + testdata.lastName, 'MEMBERSHIP_SUSPENDED_ALERT', data.currentdate)).toBeVisible();
       const downloadDir = 'D:/EasyMembr_Downloads';
     const expectedFileName = 'sms_Reports.xlsx';
     const [download] = await Promise.all([
    page.waitForEvent('download'),
    await page.locator("(//button[text()='Export'])[1]").click()
   ]);
    const filePath = path.join(downloadDir, expectedFileName);
     await download.saveAs(filePath);
     // 4. Read the file and validate Haritha test and ₹100
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
    expect(flatCells).toContain(data.currentdate);
    expect(flatCells.some(text => text.includes(data.randomFirstName + ' ' + testdata.lastName))).toBe(true);
    //expect(flatCells).toContain(data.randomFirstName + ' ' + testdata.lastName);
  const matches = flatCells.filter(c => c === data.currentdate);
  const matches1 = flatCells.some(text => text.includes(data.randomFirstName + ' ' + testdata.lastName))
  console.log('Matching cells:', matches);
  console.log('Matching cells for Member:', matches1);
  // 5. Delete the file
  fs.unlinkSync(filePath);

});

test('DeleteMember_MembersManagement',async ({  }) => {
   const tempFile = path.join(__dirname, 'temp.json');
   const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  await loginPage.membersManagementTab().click();
  await loginPage.membersSearchInput().fill(`${data.randomFirstName} ${testdata.lastName}`);
  await loginPage.membersApplyButton().click();
  await page.waitForTimeout(3000);
  await page.locator("//span[@class='ml20']/img[@alt='Delete']").scrollIntoViewIfNeeded();
  await page.click("//span[@class='ml20']/img[@alt='Delete']");
  await page.waitForTimeout(2000);
  await loginPage.dashboardTab().click();
  await loginPage.membersManagementTab().click();
  await loginPage.membersSearchInput().click();
  await loginPage.membersSearchInput().fill(`${data.randomFirstName} ${testdata.lastName}`);
  await loginPage.membersApplyButton().click();
  try {
    await expect(loginPage.noDataFoundText()).toBeVisible({ timeout: 3000 });
  } catch (error) {
     console.log('noDataFoundText not visible:', error);
     page.once('dialog', async dialog => {
    expect(dialog.message()).toBe("Are you sure want to delete this Member?");
    await dialog.accept();
    });
    await page.locator("//span[@class='ml20']/img[@alt='Delete']").scrollIntoViewIfNeeded();
    await page.click("//span[@class='ml20']/img[@alt='Delete']");
    await page.waitForTimeout(2000);
  }

  await loginPage.membersManagementTab().click();
  await loginPage.membersSearchInput().fill(`${data.WavierMemberFirstName} ${testdata.WavierMemberLastName}`);
  await loginPage.membersApplyButton().click();
  await page.waitForTimeout(3000);
  page.once('dialog', async dialog => {
  expect(dialog.message()).toBe("Are you sure want to delete this Member?");
  await dialog.accept();
  });
  await page.locator("//span[@class='ml20']/img[@alt='Delete']").scrollIntoViewIfNeeded();
  await page.click("//span[@class='ml20']/img[@alt='Delete']");
  await page.waitForTimeout(2000);
  await loginPage.dashboardTab().click();
  await loginPage.membersManagementTab().click();
  await loginPage.membersSearchInput().click();
  await loginPage.membersSearchInput().fill(`${data.WavierMemberFirstName} ${testdata.WavierMemberLastName}`);
  await loginPage.membersApplyButton().click();
  await expect(loginPage.noDataFoundText()).toBeVisible();
});


})

