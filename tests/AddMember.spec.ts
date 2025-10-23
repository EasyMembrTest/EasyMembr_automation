import { test, expect } from '@playwright/test';
import testdata from '../testdata.json';
import { LoginPage } from '../pageobjects/LoginPage';
import * as fs from 'fs';
import * as path from 'path';

let randomFirstName: string;
let checkinTime: string;
let StaffFirstName: string;

const tempFile = path.join(__dirname, 'temp1.json');

  function updateTempJson(newData: Record<string, any>) {
  let existing = {};
  if (fs.existsSync(tempFile)) {
    existing = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  }
  const merged = { ...existing, ...newData }; // merge old and new
  fs.writeFileSync(tempFile, JSON.stringify(merged), 'utf-8');
}




test('Login and Add Member', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
  await loginPage.membersManagement(testdata.membersManagementText).click();
  await expect(loginPage.addMemberButton(testdata.addMemberText)).toBeVisible();
  await loginPage.addMemberButton(testdata.addMemberText).click();
  randomFirstName = `${testdata.firstNamePrefix}${Math.floor(Math.random() * 10000)}`;
  StaffFirstName = `Staff${Array.from({length: 6}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}`;
  updateTempJson({ randomFirstName });
  updateTempJson({ StaffFirstName });
  console.log('Saved randomFirstName to temp1.json');
  console.log('Saved StaffFirstName to temp1.json');
  console.log('randomFirstName:', randomFirstName);
  await loginPage.firstNameInput().click();
  await loginPage.firstNameInput().fill(randomFirstName);
  await loginPage.lastNameInput().click();
  await loginPage.lastNameInput().fill(testdata.lastName);
  await loginPage.genderSelect().selectOption({ label: testdata.gender });
  await loginPage.ageInput().click();
  await loginPage.ageInput().fill(testdata.age);
  await loginPage.mobileInput().click();
  await loginPage.mobileInput().fill(testdata.mobile);
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
  await loginPage.referralSelect().selectOption({ label: testdata.referral });
  await loginPage.addButton(testdata.addButtonSelector).click();
  await loginPage.SuccessAlert(`Member Created Successfully (${randomFirstName} ${testdata.lastName})`);
  await loginPage.memberSearchInput(testdata.memberSearchPlaceholder).click();
  await loginPage.memberSearchInput(testdata.memberSearchPlaceholder).fill(randomFirstName);
  await loginPage.applyButton(testdata.applyButtonSelector).click();
  const memberRow = loginPage.memberTableRow(
    testdata.memberTableSelector,
    randomFirstName,
    testdata.gender,
    testdata.mobile,
    testdata.age
  );
  await expect(memberRow).toBeVisible();
});


test('AddPlanToMember_PointOfSale', async ({ page }) => {
  const tempFile = path.join(__dirname, 'temp1.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
  await loginPage.pointOfSaleButton(testdata.pointOfSaleText).click();
  await loginPage.planSearchInput(testdata.planSearchPlaceholder).fill(testdata.planNameSetup);
  await loginPage.searchedPlanResult(testdata.planNameSetup).click();
  await loginPage.addSvgButton().click();
  await loginPage.memberSearchInputPOS().click();
  await loginPage.memberSearchInputPOS().fill(data.randomFirstName);
  await loginPage.searchedPlanResult(data.randomFirstName).click();
  await loginPage.doneButton(testdata.doneButtonText).click();
  await expect(loginPage.memberDetailsText()).toContainText(data.randomFirstName);
  await loginPage.continueButton().click();
  await loginPage.cashPaymentButton(testdata.cashPaymentText).click();
  await expect(loginPage.transactionSuccessText(testdata.transactionSuccessText)).toBeVisible();
  await expect(loginPage.paymentSuccessText(testdata.paymentSuccessText)).toBeVisible();
  await loginPage.dismissButton().click();
  await page.waitForTimeout(2000);
  await loginPage.membersManagement(testdata.membersManagementText).click();
  await loginPage.memberSearchInputTable().click();
  await loginPage.memberSearchInputTable().fill(data.randomFirstName);
  await loginPage.applyButtonTable().click();
  await page.waitForTimeout(2000);
  const rows = await loginPage.memberTableRows().count();
  expect(rows).toBe(1);
  await expect(loginPage.memberTableCell(2)).toHaveText(data.randomFirstName + ' ' + testdata.lastName);
  await expect(loginPage.memberTableCell(3)).toContainText(testdata.mobile);
  await expect(loginPage.memberTableCell(4)).toHaveText(testdata.gender);
  await expect(loginPage.memberTableCell(5)).toHaveText(testdata.age);
  await expect(loginPage.memberTableCell(6)).toHaveText(testdata.planNameSetup);
  await expect(loginPage.memberTableCell(10)).toHaveText('New');
  await expect(loginPage.memberTableCell(12)).toHaveText('20 Day(s)');
  await expect(loginPage.memberTableCell(13)).toHaveText('Off');
  await expect(loginPage.memberTableCell(14)).toHaveText('Not Submitted');
  await expect(loginPage.memberTableCell(9)).toHaveText('Active');
  await expect(loginPage.memberTableCell(15)).toHaveText('Renew');
});


test('CheckIN_CheckOUT_Member', async ({ page }) => {
  const tempFile = path.join(__dirname, 'temp1.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
  await page.waitForTimeout(2000);
  await expect(loginPage.checkInOutButton()).toBeVisible();
  const checkinCountText = await loginPage.checkInOutButton().textContent();
  const initialCheckinCount = parseInt(checkinCountText || '0');
  console.log('initialCheckinCount (raw):', initialCheckinCount);
  await page.click('text=Check-In/Check-out');
  await loginPage.checkInOutSearchInput().click();
  await loginPage.checkInOutSearchInput().fill(data.randomFirstName);
  await page.waitForTimeout(2000);
  await expect(loginPage.searchedPlanResult(data.randomFirstName)).toBeVisible();
  await loginPage.checkInButton(data.randomFirstName).click();
 await loginPage.trainerSelect().selectOption({ label: 'shiva shiva' });
 const checkinTimeInput = await page.locator("//input[@class='form-control active timepicker-input']");
 checkinTime = (await checkinTimeInput.getAttribute('value')) ?? '';
  console.log('checkinTime (raw):', checkinTime);
  await loginPage.checkInConfirmButton().click();
  await expect(loginPage.checkOutButton(data.randomFirstName)).toBeVisible();
  await loginPage.dashboardText('Dashboard').click();
  await page.waitForTimeout(2000);
  const newCheckinCountText = await loginPage.checkInOutButton().textContent();
  const newCheckinCount = parseInt(newCheckinCountText || '0');
  console.log('newCheckinCount (raw):', newCheckinCount);
  expect(newCheckinCount).toBe(initialCheckinCount + 1);
  await loginPage.checkInOutButton().click();
  await loginPage.checkInOutSearchInput().click();
  await loginPage.checkInOutSearchInput().fill(data.randomFirstName);
  await page.waitForTimeout(2000);
  //await expect(loginPage.searchedPlanResult(data.randomFirstName)).toBeVisible();
  await expect(page.locator(`//span[@class='checkIn-Head'][contains(text(),'${data.randomFirstName}')]`)).toBeVisible();
  await loginPage.checkOutButton(data.randomFirstName).click();
  await loginPage.checkOutConfirmButton().click();
  await expect(loginPage.checkInButtonAfterOut(data.randomFirstName)).toBeVisible();
});

test('VerifyCheckIN_CheckOUTDetails_Reports', async ({ page }) => {
  const tempFile = path.join(__dirname, 'temp1.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await loginPage.reportsTab().click();
  await loginPage.checkInNavTab().click();
  await loginPage.reportsSearchInput().click();
  await loginPage.reportsSearchInput().fill(data.randomFirstName);
  await loginPage.reportsApplyButton().click();
  await expect(loginPage.reportsFirstRowUser(data.randomFirstName)).toBeVisible();
});

test('Verify_PauseMember', async ({ page }) => {
   const tempFile = path.join(__dirname, 'temp1.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();

  // 1. Click on Members Management
  await loginPage.membersManagement(testdata.membersManagementText).click();
  // 2. Search the user
  await loginPage.membersSearchInput().fill(data.randomFirstName);
  // 3. Click on Apply button
  await loginPage.membersApplyButton().click();
  // 4. Verify user is visible
  await expect(loginPage.membersTableRow(data.randomFirstName)).toBeVisible();
  // 5. Click on user row
  await loginPage.membersTableRowCell(data.randomFirstName).click();
  // 6. Verify user details title
  await expect(loginPage.memberDetailsTitle(data.randomFirstName)).toBeVisible();
  // 7. Click edit membership icon for plan 'raghu'
  await loginPage.editMembershipIcon(testdata.planNameSetup).click();
  // 8. Verify Edit Membership Details is visible
  await expect(loginPage.editMembershipDetailsText()).toBeVisible();
  // 9. Click Pause text
  await loginPage.pauseText().click();
  // 10. Select Days in dropdown
  await loginPage.daysDropdown().selectOption({ label: 'Days' });
  // 11. Enter value 2 in input
  await loginPage.daysInput().fill(testdata.Pausedays);
  // 12. Click Save button
  await loginPage.saveButton().click();
  // 13. Verify paused status for plan 'raghu'
  await expect(loginPage.pausedStatus(testdata.planNameSetup)).toBeVisible();
  // 14. Click on Members Management again
  await loginPage.membersManagement(testdata.membersManagementText).click();
  // 15. Search user again
  await loginPage.membersSearchInput().fill(data.randomFirstName);
  // 16. Click Apply button
  await loginPage.membersApplyButton().click();
  // 17. Verify pause status in table
  await expect(loginPage.pauseStatusInTable(data.randomFirstName)).toBeVisible();
});

test('CheckIn_PausedMember_VerifyActiveStatus', async ({ page }) => {
   const tempFile = path.join(__dirname, 'temp1.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();

  // 1. Click on Check-In/Check-Out
  await page.click('text=Check-In/Check-out');
  // 2. Search the user
  await loginPage.checkInOutSearchInput().fill(data.randomFirstName);
  // 3. Verify user is visible
  await expect(loginPage.searchedPlanResult(data.randomFirstName)).toBeVisible();
  // 4. Click Check-In button
  await loginPage.checkInButton(data.randomFirstName).click();
  // 5. Verify user text is visible
  await expect(loginPage.checkinTextVerification(data.randomFirstName)).toBeVisible();
  // 6. Verify danger text contains Plan Paused
  await expect(loginPage.dangerText()).toContainText('Plan Paused');
  // 7. Select Trainer
  await loginPage.trainerSelect().selectOption({ label: testdata.trainer });
  // 8. Click Check-In confirm button
  await loginPage.checkInConfirmButton().click();
  // 9. Verify Check-Out button is visible
  await expect(loginPage.checkOutButton(data.randomFirstName)).toBeVisible();
  // 10. Click Check-Out button
  await loginPage.checkOutButton(data.randomFirstName).click();
  // 11. Click Check-Out confirm button
  await loginPage.checkOutConfirmButton().click();
  // 12. Click on Members Management
  await loginPage.membersManagement(testdata.membersManagementText).click();
  // 13. Search user
  await loginPage.membersSearchInput().fill(data.randomFirstName);
  // 14. Click Apply button
  await loginPage.membersApplyButton().click();
  // 15. Verify Active status in table
  await expect(loginPage.activeStatusCell(data.randomFirstName)).toBeVisible();
});

test('CreateStaff_CheckInStaff_VerifyCountInDashboards', async ({ page }) => {
   const tempFile = path.join(__dirname, 'temp1.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();

  // 1. Click on Dashboard
  await page.click('//a[text()=" Dashboard"]');
  await page.waitForTimeout(2000);
  // 2. Get staff present count
  await expect(loginPage.dashboardStaffAttendanceButton()).toBeVisible();
  const staffpresentcountText = await loginPage.dashboardStaffAttendanceButton().textContent();
  const staffpresentcount = parseInt(staffpresentcountText || '0');
  console.log('Initial staffpresentcount (raw):', staffpresentcount);
  // 3. Click on Staff Roles & Attendance
  await loginPage.staffRolesAttendanceTab().click();
  // 4. Verify Add Staff and click
  await expect(loginPage.addStaffButton()).toBeVisible();
  await loginPage.addStaffButton().click();
  // 5. Enter phone number
  await loginPage.staffPhoneInput().click();
  await loginPage.staffPhoneInput().fill(testdata.mobile);
  // 6. Generate random staff first name
  console.log('StaffFirstName:', data.StaffFirstName);
  await loginPage.staffFirstNameInput().click();
  await loginPage.staffFirstNameInput().fill(data.StaffFirstName);
  // 7. Enter last name
    await loginPage.staffLastNameInput().click();
  await loginPage.staffLastNameInput().fill('User');
  // 8. Enter username
    await loginPage.staffUsernameInput().click();
  await loginPage.staffUsernameInput().fill(data.StaffFirstName);
  // 9. Enter password
   await loginPage.staffPasswordInput().click();
  await loginPage.staffPasswordInput().fill(testdata.StaffPassword);
  // 10. Select gender
  await loginPage.staffGenderSelect().selectOption({ label: testdata.gender });
  // 11. Enter age
    await loginPage.staffAgeInput().click();
  await loginPage.staffAgeInput().fill(testdata.age);
  // 12. Enter email
   await loginPage.staffEmailInput().click();
  await loginPage.staffEmailInput().fill(`${data.StaffFirstName}@mailinator.com`);
  // 13. Select role as Staff
  await loginPage.staffRoleSelect().selectOption({ label: 'Staff' });
  // 14. Click Add button
  await loginPage.staffAddButton().click();
  await loginPage.SuccessAlert(`Staff Created Successfully (${data.StaffFirstName} User)`);
  // 15. Search staff by email
   await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${data.StaffFirstName}@mailinator.com`);
  // 16. Verify staff table row count is 1
  const staffRows = await loginPage.staffTableRows().count();
  expect(staffRows).toBe(1);
  // 17. Verify staff name cell is visible
  await expect(loginPage.staffTableNameCell(`${data.StaffFirstName} User`)).toBeVisible();
  // 18. Verify Check-In button is visible
  await expect(loginPage.staffTableCheckInButton(`${data.StaffFirstName} User`)).toBeVisible();
  // 19. Click Check-In button
  await loginPage.staffTableCheckInButton(`${data.StaffFirstName} User`).click();
  // 20. Verify Check-Out button is visible
  await expect(loginPage.staffTableCheckOutButton(`${data.StaffFirstName} User`)).toBeVisible();
  // 21. Click on Dashboard
  await page.click('//a[text()=" Dashboard"]');
  await page.waitForTimeout(2000);
  // 22. Get new staff present count
  await expect(loginPage.dashboardStaffAttendanceButton()).toBeVisible();
  const newstaffpresentcountText = await loginPage.dashboardStaffAttendanceButton().textContent();
  const newstaffpresentcount = parseInt(newstaffpresentcountText || '0');
  console.log('After staffpresentcount (raw):', newstaffpresentcount);
  // 23. Assert staffpresentcount = newstaffpresentcount + 1
  expect(newstaffpresentcount).toBe(staffpresentcount + 1);
  // 24. Click staff attendance button
  await loginPage.dashboardStaffAttendanceButton().click();
  // 25. Search staff by email
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${data.StaffFirstName}@mailinator.com`);
  // 26. Verify Check-Out button is visible and click
  await expect(loginPage.staffTableCheckOutButton(`${data.StaffFirstName} User`)).toBeVisible();
  await loginPage.staffTableCheckOutButton(`${data.StaffFirstName} User`).click();
  // 27. Verify Check-In button is visible again
  await expect(loginPage.staffTableCheckInButton(`${data.StaffFirstName} User`)).toBeVisible();
});

test('VerifyStaffCheckOut_ActivitiesSection', async ({ page }) => {
   const tempFile = path.join(__dirname, 'temp1.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();

  // 1. Click on Activities
  await loginPage.activitiesTab().click();
  // 2. Enter StaffFirstName in Search Here...
  await loginPage.activitiesSearchInput().click();
  await loginPage.activitiesSearchInput().fill(data.StaffFirstName);
  // 3. Click on Apply button
  await loginPage.activitiesApplyButton().click();
  // 4. Verify the visibility of Staff Check-Out Successful text
  await expect(loginPage.staffCheckOutSuccessText(data.StaffFirstName)).toBeVisible();
});


test('PayHalfAmountOfPlan_VerifyDueAmountInTranscationSectionandDashboard_VerifyPlanRenewalsCountInDashboard', async ({ page }) => {
   const tempFile = path.join(__dirname, 'temp1.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await page.waitForTimeout(3000);
  const renewalsBtn = page.locator("//h5[@class='card-text clr-main text-bigger']/button");
  const extendedBtn = page.locator("//small[text()='Extended ']/..//button");
  await expect(renewalsBtn).toBeVisible();
  const InitialRenewalsCount = parseInt(await renewalsBtn.textContent() ?? '0', 10);
  await expect(extendedBtn).toBeVisible();
  const InitialExtendedCount = parseInt(await extendedBtn.textContent() ?? '0', 10);
  console.log('InitialRenewalsCount:', InitialRenewalsCount);
  console.log('InitialExtendedCount:', InitialExtendedCount);
  // 1. Verify payment received and pending buttons, get values
  await expect(loginPage.paymentReceivedButton(1)).toBeVisible();
  const paymentreceivedText = await loginPage.paymentReceivedButton(1).textContent();
  const paymentreceived = parseInt((paymentreceivedText?.split('.')[0].replace(/[^\d]/g, '') || '0'));
   console.log('Intial paymentreceived:', paymentreceived);
  await expect(loginPage.paymentReceivedButton(2)).toBeVisible();
  const paymentpendingText = await loginPage.paymentReceivedButton(2).textContent();
  const paymentpending = parseInt((paymentpendingText?.split('.')[0].replace(/[^\d]/g, '') || '0'));
    console.log('Intial paymentpending:', paymentpending);
  // 3. Click on Point of Sale
  await loginPage.pointOfSaleTab().click();
  // 4. Search plan 'shiva'
  await loginPage.planSearchInputPOS().fill('shiva');
  // 5. Click on search result 'shiva'
  await loginPage.planSearchResultPOS('shiva').click();
  // 6. Click add plan button
  await loginPage.addPlanButtonPOS().click();
  // 7. Enter randomFirstName in member search
  await loginPage.memberSearchInputPOS().fill(data.randomFirstName);
  // 8. Verify and click randomFirstName
  await expect(loginPage.memberSearchResultPOS(data.randomFirstName)).toBeVisible();
  await loginPage.memberSearchResultPOS(data.randomFirstName).click();
  // 9. Click Done button
  await loginPage.doneButtonPOS().click();
  // 10. Verify member details text contains randomFirstName
  await expect(loginPage.memberDetailsTextPOS()).toContainText(data.randomFirstName);
  // 11. Click continue button
  await loginPage.continueButtonPOS().click();
  // 12. Click on Multiple
  await loginPage.multiplePaymentText().click();
  await page.waitForTimeout(2000);
  // 13. Enter 500 in split input field
  await loginPage.splitInputField(1).click();
   await page.waitForTimeout(5000);
  await page.keyboard.type('500');
    await page.waitForTimeout(5000);
  // 14. Verify balance due amount is 500
  await expect(loginPage.balanceDueAmountText()).toHaveText('500');
  // 15. Click Done button
  await loginPage.doneButtonPayment().click();
  // 16. Verify transaction success alert
  await expect(loginPage.transactionSuccessAlert()).toBeVisible();
  // 17. Verify payment success alert
  await expect(loginPage.paymentSuccessAlert()).toBeVisible();
  // 18. Click dismiss button
  await loginPage.dismissButtonPayment().click();
  // 19. Click on Dashboard
  await loginPage.dashboardTab().click();
    await page.waitForTimeout(3000);
  // 20. Get new payment received and pending values
  await expect(loginPage.paymentReceivedButton(1)).toBeVisible();
  const newpaymentreceivedText = await loginPage.paymentReceivedButton(1).textContent();
  const newpaymentreceived = parseInt(newpaymentreceivedText?.split('.')[0].replace(/[^\d]/g, '') || '0');
      console.log('newpaymentreceived:', newpaymentreceived);
  await expect(loginPage.paymentReceivedButton(2)).toBeVisible();
  const newpaymentpendingText = await loginPage.paymentReceivedButton(2).textContent();
  const newpaymentpending = parseInt(newpaymentpendingText?.split('.')[0].replace(/[^\d]/g, '') || '0');
        console.log('newpaymentpending:', newpaymentpending);
  // 22. Assert newpaymentreceived = paymentreceived + 500
  expect(newpaymentreceived).toBe(paymentreceived + 500);
  // 23. Assert newpaymentpending = paymentpending + 500
  expect(newpaymentpending).toBe(paymentpending + 500);

  const renewalsBtnFinal = page.locator("//h5[@class='card-text clr-main text-bigger']/button");
  const extendedBtnFinal = page.locator("//small[text()='Extended ']/..//button");
  await expect(renewalsBtnFinal).toBeVisible();
  const FinalRenewalsCount = parseInt(await renewalsBtnFinal.textContent() ?? '0', 10);
  await expect(extendedBtnFinal).toBeVisible();
  const FinalExtendedCount = parseInt(await extendedBtnFinal.textContent() ?? '0', 10);
  console.log('FinalRenewalsCount:', FinalRenewalsCount);
  console.log('FinalExtendedCount:', FinalExtendedCount);
  // --- Assertions ---
  expect(FinalRenewalsCount).toBe(InitialRenewalsCount + 1);
  expect(FinalExtendedCount).toBe(InitialExtendedCount + 1);
  await page.locator("//small[text()='Extended ']/..//button").click();
  await page.waitForTimeout(2000);
  const rows = page.locator("//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr");
  await expect(rows).toHaveCount(FinalExtendedCount);
  const testUserCell = page.locator("//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[contains(text(),'" + data.randomFirstName + "')]");
  await expect(testUserCell).toBeVisible();
  // 24. Click on Transactions
  await loginPage.transactionsTab().click();
  // 25. Search randomFirstName in transactions
  await loginPage.transactionsSearchInput().click();
  await loginPage.transactionsSearchInput().fill(data.randomFirstName);
  // 26. Click Apply button
  await loginPage.transactionsApplyButton().click();
  // 27. Verify transaction table row for randomFirstName
  await expect(loginPage.transactionsTableRow(data.randomFirstName)).toBeVisible();
  // 28. Assert transaction table columns for randomFirstName
  await expect(loginPage.transactionsTableAssert(data.randomFirstName, 8, '₹1,000')).toBeVisible();
  await expect(loginPage.transactionsTableAssert(data.randomFirstName, 10, '₹500')).toBeVisible();
  await expect(loginPage.transactionsTableAssert(data.randomFirstName, 11, '₹500')).toBeVisible();
});



test('DeleteMember_Staff',async ({ page }) => {
   const tempFile = path.join(__dirname, 'temp1.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  //1. Click on Members Management
   console.log('randomFirstName:', data.randomFirstName);
  await loginPage.membersManagementTab().click();
  // 2. Search for member
  await loginPage.membersSearchInput().fill(data.randomFirstName);
  // 3. Click Apply button
  await loginPage.membersApplyButton().click();
  await page.waitForTimeout(3000);
  page.once('dialog', async dialog => {
  expect(dialog.message()).toBe("Are you sure want to delete this Member?");
  await dialog.accept();
  });
  await page.click("//span[@class='ml20']/img[@alt='Delete']");
  await loginPage.SuccessAlert(`Member deleted successfully`);
  await page.waitForTimeout(2000);
 // 6. Click on Dashboard
  await loginPage.dashboardTab().click();
  // 7. Click on Members Management again
  await loginPage.membersManagementTab().click();
  // 8. Search for member again
   await loginPage.membersSearchInput().click();
  await loginPage.membersSearchInput().fill(data.randomFirstName);
  // 9. Click Apply button
  await loginPage.membersApplyButton().click();
  // 10. Verify No Data Found
  await expect(loginPage.noDataFoundText()).toBeVisible();
  // 11. Click on Staff Roles & Attendance
  await loginPage.staffRolesAttendanceTab().click();
  // 12. Search for staff
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(data.StaffFirstName);
  // 13. Delete staff
  await expect(loginPage.staffDeleteIcon(data.StaffFirstName)).toBeVisible();
    page.once('dialog', async dialog => {
  expect(dialog.message()).toBe("Are you sure want to delete this Staff Member?");
  await dialog.accept();
 });
  await page.click("//button[@class='button-link ml20']/img[@alt='Delete']");
  await loginPage.SuccessAlert(`Staff Deleted Successfully!`);
  await page.waitForTimeout(2000);
  // 14. Handle Windows Alert OK
  // 15. Click on Dashboard
  await loginPage.dashboardTab().click();
  // 16. Click on Staff Roles & Attendance
  await loginPage.staffRolesAttendanceTab().click();
  // 17. Search for staff again
   await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(data.StaffFirstName);
  // 18. Verify No matching results found
  await expect(loginPage.noMatchingResultsText()).toBeVisible();
});


