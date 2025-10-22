import { test, expect } from '@playwright/test';
import { MembersManagementTabPage } from '../pageobjects/MembersManagementTabPage';
import { LoginPage } from '../pageobjects/LoginPage';
import testdata from '../testdata.json';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

const filePath = 'D:/EasyMembr_TestData/CreateMember.xlsx';



test('CreateMember_ImportSheet', async ({ page }) => {
  const membersPage = new MembersManagementTabPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
  // 1. Click on Members Management tab
  await membersPage.membersManagementTab().click();
  // 2. Click Import button
  await membersPage.importButton().click();
  // 3. Upload file
  await membersPage.fileInput().setInputFiles(filePath);
  // 4. Verify file name is visible
  await expect(membersPage.uploadedFileText('CreateMember.xlsx')).toBeVisible();
  // 5. Click Upload button
  await membersPage.uploadButton().click();
  // 6. Verify Member(s) Imported Sucessfully alert
  await expect(membersPage.memberImportedAlert()).toBeVisible();
  // 7. Click Business Details tab
  await membersPage.businessDetailsTab().click();
  // 8. Click Members Management tab again
  await membersPage.membersManagementTab().click();
  // 9. Search honey automation
  await membersPage.searchInput().fill(testdata.ImportSheet_Member_FirstName);
  // 10. Click Apply button
  await membersPage.applyButton().click();
  // 11. Verify member row and click
  await expect(membersPage.memberRow()).toBeVisible();
  await membersPage.memberRow().click();
  // 12. Verify member name header
  await expect(membersPage.memberNameHeader()).toBeVisible();
  // 13. Verify member phone and email
  await expect(membersPage.memberPhone()).toBeVisible();
  await expect(membersPage.memberEmail()).toBeVisible();
  // 14. Verify member height
  await expect(membersPage.memberHeight()).toBeVisible();
  // 15. Verify blood group and address
  await expect(membersPage.memberBloodGroup()).toBeVisible();
  await expect(membersPage.memberAddress()).toBeVisible();
  // 16. Verify country
  await expect(membersPage.memberCountry()).toBeVisible();
  // 17. Verify city
  await expect(membersPage.memberCity()).toBeVisible();
  // 18. Verify no matching results in plan table
  await expect(membersPage.noMatchingResultsPlanTable()).toBeVisible();
});

test('EditMember_MembersManagement', async ({ page }) => {
  const membersPage = new MembersManagementTabPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
  // 1. Click on Members Management tab
  await membersPage.membersManagementTab().click();
  // 2. Search honey automation
  await membersPage.searchInput().fill(testdata.ImportSheet_Member_FirstName);
  // 3. Click Apply button
  await membersPage.applyButton().click();
  // 4. Verify member row and click
  await expect(membersPage.memberRow()).toBeVisible();
  await membersPage.memberRow().click();
  // 5. Click Edit button
  await membersPage.editButton().click();
  // 6. Verify Honey value is visible
  await expect(membersPage.firstNameInput()).toHaveValue(testdata.ImportSheet_Member_name);
  // 7. Edit First Name
  await membersPage.firstNameInput().fill(testdata.EditedMemberFirstName);
  // 8. Edit Last Name
  await membersPage.lastNameInput().fill(testdata.EditedMemberLastName);
  // 9. Select Female in gender
  await membersPage.genderSelect().selectOption({ label: 'Female' });
  // 10. Edit Age
  await membersPage.ageInput(1).fill(testdata.EditedMemberAge);
  // 11. Edit phone number
  await membersPage.phoneInput().fill(testdata.EditedMemberMobile);
  // 12. Edit email
  await membersPage.emailInput().fill(testdata.EditedMemberEmail);
  // 13. Select blood group B+
  await membersPage.bloodGroupSelect().selectOption({ label: testdata.EditedMemberBloodGroup });
  // 14. Edit Height
  await membersPage.heightInput().fill(testdata.EditedMemberHeight);
  // 15. Edit Weight
  await membersPage.weightInput().fill(testdata.EditedMemberWeight);
  // 16. Edit City
  await membersPage.cityInput().fill(testdata.EditedMemberCity);
  // 17. Edit Country
  await membersPage.countryInput().fill(testdata.EditedMemberCountry);
  // 18. Edit Address
  await membersPage.addressTextarea().fill(testdata.EditedMemberAddress);
  // 19. Click Save button
  await membersPage.saveButton().click();
  // 20. Click DND label
  await expect(membersPage.dndLabel()).toBeVisible();
  await membersPage.dndLabel().click();
  // 21. Click Dashboard
  await page.click('//a[text()=" Dashboard"]');
  // 22. Click Members Management tab
  await membersPage.membersManagementTab().click();
  // 23. Search honey automation
  await membersPage.searchInput().fill(testdata.EditedMemberFirstName);
  // 24. Click Apply button
  await membersPage.applyButton().click();
  // 25. Verify updated member row and click
  await expect(membersPage.updatedMemberRow()).toBeVisible();
  await membersPage.updatedMemberRow().click();
  // 26. Verify updated member name header
  await expect(membersPage.updatedMemberNameHeader()).toBeVisible();
  // 27. Verify updated member phone and email
  await expect(membersPage.updatedMemberPhone()).toBeVisible();
  await expect(membersPage.updatedMemberEmail()).toBeVisible();
  // 28. Verify updated member height
  await expect(membersPage.updatedMemberHeight()).toBeVisible();
  // 29. Verify updated blood group and address
  await expect(membersPage.updatedMemberBloodGroup()).toBeVisible();
  await expect(membersPage.updatedMemberAddress()).toBeVisible();
  // 30. Verify updated country
  await expect(membersPage.updatedMemberCountry()).toBeVisible();
  // 31. Verify updated city
  await expect(membersPage.updatedMemberCity()).toBeVisible();
});



test('DownloadExportSheet_MembersManagement', async ({ page, context }) => {
  const membersPage = new MembersManagementTabPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
  const downloadDir = 'D:/EasyMembr_Downloads';
  const expectedFileName = 'MemberTableData.xlsx';

  // 1. Click on Members Management tab
  await membersPage.membersManagementTab().click();
  // 2. Click Export button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    membersPage.exportButton().click()
  ]);
  // 3. Save the downloaded file
  const filePath = path.join(downloadDir, expectedFileName);
  await download.saveAs(filePath);
  // 4. Read the file and validate Haritha test is present in Name column
 const workbook = XLSX.readFile(filePath);       // read the xlsx
  const firstSheetName = workbook.SheetNames[0];  // pick first sheet
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // array of rows

  // Now assert cell content:
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
  //console.log('Excel cells:', flatCells);
  expect(flatCells).toContain(testdata.EditedMemberName);
  const matches = flatCells.filter(c => c === testdata.EditedMemberName);
  console.log('Matching cells:', matches);
  // 5. Delete the file
  fs.unlinkSync(filePath);
});



test('CheckIn_InActiveMember_VerifyMembership_OverdueCount_Dashboard', async ({ page }) => {
  const membersPage = new MembersManagementTabPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Members Management
  await membersPage.membersManagementTab().click();
  // 2. Click on Point of Sale
  await membersPage.pointOfSaleTab().click();
  // 3. Search haritha in Search Plan/Addon
  await membersPage.planSearchInput().fill(testdata.planNameSetup1);
  // 4. Click on Searched result haritha
  await membersPage.planSearchResult(testdata.planNameSetup1).click();
  // 5. Click on addmember button
  await membersPage.addMemberButton().click();
  // 6. Search Haritha test in member search
  await membersPage.memberSearchInputPOS().click();
  await membersPage.memberSearchInputPOS().fill(testdata.EditedMemberFirstName + ' ' + testdata.EditedMemberLastName);
  // 7. Click on Searched result Haritha test
  await page.waitForTimeout(2000);
  await page.locator('//h6[text()="' + testdata.EditedMemberFirstName + '"]').click();
  // 8. Click on Done button
  await membersPage.doneButton().click();
  // 9. Verify member details text contains Haritha test
  await expect(membersPage.memberDetailsText()).toContainText(testdata.EditedMemberFirstName + ' ' + testdata.EditedMemberLastName);

  // 10. Click on first datepicker input and wait
  await membersPage.firstDatePickerInput().click();
  await page.waitForTimeout(2000);
  // 11. Click previous navigation and wait
  await membersPage.previousDatePickerNav().click();
  await page.waitForTimeout(2000);
  // 12. Select date 14 and time 14:00
  await membersPage.datePickerDay(testdata.datepickerDate).click();
  await page.waitForTimeout(2000);
  await membersPage.datePickerTime(testdata.datePickerTime).click();
  // 13. Click on second datepicker input and wait
  await membersPage.secondDatePickerInput().click();
  await page.waitForTimeout(2000);
  // 14. Click previous navigation and wait
  await membersPage.previousDatePickerNav().click();
  await page.waitForTimeout(2000);
  // 15. Select date 14 and wait
  await membersPage.datePickerDay(testdata.datepickerDate).click();
  await page.waitForTimeout(2000);
  // 16. Click Continue button
  await membersPage.continueButton().click();
  // 17. Click Cash button
  await membersPage.cashButton().click();
  // 18. Verify Transaction created successfully alert
  await expect(membersPage.transactionSuccessAlert()).toBeVisible();
  // 19. Verify Payment Successful
  await expect(membersPage.paymentSuccessAlert()).toBeVisible();
  // 20. Click dismiss button and wait
  await membersPage.dismissButton().click();
  await page.waitForTimeout(2000);
  // 21. Click on Dashboard
  await membersPage.dashboardTab().click();
  // 22. Click Today button
  await membersPage.todayButton().click();
   await page.waitForTimeout(5000);
  // 23. Get InitialOverDueCheckInCount
  const overdueBtn = membersPage.overdueFemaleButton();
  await expect(overdueBtn).toBeVisible();
  const InitialOverDueCheckInCount = parseInt(await overdueBtn.textContent() || '0');
  // 24. Click on Check-In/Check-Out
  await membersPage.checkInOutTab().click();
  // 25. Click on Inactive Members
  await membersPage.inactiveMembersTab().click();
  // 26. Search by Member Name and enter Haritha test
  await membersPage.searchByMemberNameInput().click();
  await membersPage.searchByMemberNameInput().fill(testdata.EditedMemberFirstName + ' ' + testdata.EditedMemberLastName);
  // 27. Verify Expired label
  await page.waitForTimeout(2000);
  await expect(membersPage.expiredLabel()).toBeVisible();
  // 28. Click ExpiredCheckin input
  await membersPage.expiredCheckinInput().click();
  // 29. Verify Haritha test is visible
  await expect(membersPage.memberNameDiv(testdata.EditedMemberFirstName + ' ' + testdata.EditedMemberLastName)).toBeVisible();
  // 30. Click Check-In button
  await membersPage.checkInButton().click();
  // 31. Click Check-Out input
  await membersPage.checkOutInput().click();
  // 32. Click Check-Out button
  await membersPage.checkOutButton().click();
  // 33. Click Dashboard
  await membersPage.dashboardTab().click();
  // 34. Click Today button
  await membersPage.todayButton().click();
  await page.waitForTimeout(5000);
  // 35. Get FinalOverDueCheckInCount
  const overdueBtnFinal = membersPage.overdueFemaleButton();
  await expect(overdueBtnFinal).toBeVisible();
  const FinalOverDueCheckInCount = parseInt(await overdueBtnFinal.textContent() || '0');
    console.log('InitialOverDueCheckInCount:', InitialOverDueCheckInCount);
  console.log('FinalOverDueCheckInCount:', FinalOverDueCheckInCount);
  // 36. Assert FinalOverDueCheckInCount = InitialOverDueCheckInCount + 1
  expect(FinalOverDueCheckInCount).toBe(InitialOverDueCheckInCount + 1);
  // 37. Click Overdue button and verify Haritha test is Inactive
  await overdueBtnFinal.click();
  await expect(membersPage.overdueInactiveRow(testdata.EditedMemberFirstName + ' ' + testdata.EditedMemberLastName)).toBeVisible();
  // 38. Click Close button
  await membersPage.closeButton().click();
});



test('InActiveMember_To_ActiveMember_VerifyPlansTab_VerifyPaymentsTab_VerifyAttendanceTab_AddRefund_VerifyRefundHistoryInTransaction_RefundTab', async ({ page }) => {
  const membersPage = new MembersManagementTabPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Members Management
  await membersPage.membersManagementTab().click();
  // 2. Search Haritha test
  await membersPage.searchInput().fill(testdata.EditedMemberFirstName + ' ' + testdata.EditedMemberLastName);
  // 3. Click Apply
  await membersPage.applyButton().click();
  // 4. Verify Inactive Renew row
  await expect(membersPage.memberTableRowInactiveRenew()).toBeVisible();
  await membersPage.memberTableRowInactiveRenew().click();
  // 5. Continue
  await membersPage.continueButton().click();
  // 6. Cash
  await membersPage.cashButton().click();
  // 7. Transaction created successfully
  await expect(membersPage.transactionSuccessAlert()).toBeVisible();
  // 8. Payment Successful
  await expect(membersPage.paymentSuccessAlert()).toBeVisible();
  // 9. Dismiss
  await membersPage.dismissButton().click();
  // 10. Wait
  await page.waitForTimeout(2000);
  // 11. Dashboard
  await membersPage.dashboardTab().click();
  // 12. Members Management
  await membersPage.membersManagementTab().click();
  // 13. Search Haritha test
  await membersPage.searchInput().fill(testdata.EditedMemberFirstName + ' ' + testdata.EditedMemberLastName);
  // 14. Click Apply
  await membersPage.applyButton().click();
  // 15. Verify Active Renew row and click
  const renewBtn = membersPage.memberTableRowActiveRenew();
  await expect(renewBtn).toBeVisible();
  await renewBtn.click();
  // 16. Verify Haritha header
  await expect(membersPage.memberNameHeaderHaritha(testdata.EditedMemberFirstName)).toBeVisible();
  // 17. Verify plansTableRowActive
  await expect(membersPage.plansTableRowActive(testdata.planNameSetup1)).toBeVisible();
  // 18. Verify plansTableRowInactive
  await expect(membersPage.plansTableRowInactive(testdata.planNameSetup1)).toBeVisible();
  // 19. Payments/Transactions tab
  await expect(membersPage.paymentsTransactionsTab()).toBeVisible();
  await membersPage.paymentsTransactionsTab().click();
  // 20. Payments table rows count
  const paymentRows = await membersPage.paymentsTableRows().count();
  expect(paymentRows).toBe(2);
  // 21. Verify Cash row
  await expect(membersPage.paymentsTableRowCash()).toBeVisible();
  // 22. Token button click and wait
  await expect(membersPage.paymentsTableRowTokenButton()).toBeVisible();
  await membersPage.paymentsTableRowTokenButton().click();
  await page.waitForTimeout(2000);
  // 23. Transaction Details header
  await expect(membersPage.transactionDetailsHeader()).toBeVisible();
  // 24. Transaction Details member name
  await expect(membersPage.transactionDetailsMemberName()).toBeVisible();
  // 25. Refund Amount label
  await expect(membersPage.refundAmountLabel()).toBeVisible();
  await membersPage.refundAmountLabel().click();
  await page.waitForTimeout(2000);
  // 26. RefundAmount field
  await membersPage.refundAmountInput().fill('');
  await membersPage.refundAmountInput().fill(testdata.RefundAmount);
  // 27. Refund reason textarea
  await membersPage.refundReasonTextarea().fill('');
  await membersPage.refundReasonTextarea().fill(testdata.RefundReason);
  // 28. Refund button
  await membersPage.refundButton().click();
  // 29. Attendance tab
  await expect(membersPage.attendanceTab()).toBeVisible();
  await membersPage.attendanceTab().click();
  // 30. Attendance no matching results should be invisible
  await expect(membersPage.attendanceNoMatchingResults()).not.toBeVisible();
  // 31. Transactions tab and Refund tab
  await expect(membersPage.transactionsTab()).toBeVisible();
  await membersPage.transactionsTab().click();
  await expect(membersPage.refundTab()).toBeVisible();
  await membersPage.refundTab().click();
  // 32. Refunds table row
   await membersPage.refundTab_Search().fill('');
  await membersPage.refundTab_Search().fill(testdata.EditedMemberFirstName + ' ' + testdata.EditedMemberLastName);
  await expect(membersPage.refundsTableRow()).toBeVisible();
});


test('DownloadExportSheet_RefundHistory', async ({ page, context }) => {
  const membersPage = new MembersManagementTabPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Transactions tab and Refund tab
  await membersPage.transactionsTab().click();
  await expect(membersPage.refundTab()).toBeVisible();
  await membersPage.refundTab().click();
  await page.waitForTimeout(2000);
  // 2. Click Export button and handle download
  const downloadDir = 'D:/EasyMembr_Downloads';
  const expectedFileName = 'Refund_data.xlsx';
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    membersPage.refundExportButton().click()
  ]);
  // 3. Save the downloaded file
  const filePath = path.join(downloadDir, expectedFileName);
  await download.saveAs(filePath);
  // 4. Read the file and validate Haritha test and ₹100
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
  expect(flatCells).toContain(testdata.EditedMemberName);
  expect(flatCells).toContain('₹' + testdata.RefundAmount);
  const matches = flatCells.filter(c => c === testdata.EditedMemberName);
  console.log('Matching cells:', matches);
  // 5. Delete the file
  fs.unlinkSync(filePath);
});



test('SuspendMember_VerifyStatusInCheckIN_CheckOutTab', async ({ page }) => {
  const membersPage = new MembersManagementTabPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Members Management
  await membersPage.membersManagementTab().click();
  // 2. Search Haritha test
  await membersPage.searchInput().fill(testdata.EditedMemberName);
  // 3. Click Apply
  await membersPage.applyButton().click();
  // 4. Verify Active row and click
  const activeRow = membersPage.memberTableRowActive();
  await expect(activeRow).toBeVisible();
  await activeRow.click();
  // 5. Verify Haritha header
  await expect(membersPage.memberNameHeaderHaritha(testdata.EditedMemberFirstName)).toBeVisible();
  // 6. Verify suspend button and click
  await expect(membersPage.suspendButton()).toBeVisible();
  await membersPage.suspendButton().click();
  // 7. Verify Haritha test name
  await expect(membersPage.memberSuspendedName(testdata.EditedMemberName)).toBeVisible();
  // 8. Enter reason
  await membersPage.suspendReasonTextarea().fill(testdata.SuspendReason);
  // 9. Click Suspend
  await membersPage.suspendConfirmButton().click();
  // 10. Verify Member Suspended alert
  await expect(membersPage.memberSuspendedAlert()).toBeVisible();
  // 11. Verify Activate button
  await expect(membersPage.activateButton()).toBeVisible();
  // 12. Click Check-In/Check-Out tab
  await membersPage.checkInOutTab().click();
  // 13. Search by Member Name
   await membersPage.searchByMemberNameInput().click();
  await membersPage.searchByMemberNameInput().fill(testdata.EditedMemberName);
  // 14. Verify Member Suspended label in Check-In/Check-Out
  await expect(membersPage.checkInHeadSuspendedLabel()).toBeVisible();
});

test('Activate_SuspendMember_VerifyStatusInMemberManagement', async ({ page }) => {
  const membersPage = new MembersManagementTabPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Members Management
  await membersPage.membersManagementTab().click();
  // 2. Search Haritha test
  await membersPage.searchInput().fill(testdata.EditedMemberName);
  // 3. Click Apply
  await membersPage.applyButton().click();
  // 4. Verify Suspend row and click
  const suspendRow = membersPage.memberTableRowSuspend();
  await expect(suspendRow).toBeVisible();
  await suspendRow.click();
  // 5. Verify Haritha header
  await expect(membersPage.memberNameHeaderHaritha(testdata.EditedMemberFirstName)).toBeVisible();
  // 6. Verify Activate button and click
  await expect(membersPage.activateButton()).toBeVisible();
  await membersPage.activateButton().click();
  // 7. Verify Haritha test name
  await expect(membersPage.memberSuspendedName(testdata.EditedMemberName)).toBeVisible();
  // 8. Click second Activate button
  await membersPage.activateButtonSecond().click();
  // 9. Verify suspend button
  await expect(membersPage.suspendButton()).toBeVisible();
  // 10. Verify Activate button is not visible
  await expect(membersPage.activateButton()).not.toBeVisible();
  // 11. Click Members Management
  await membersPage.membersManagementTab().click();
  // 12. Search Haritha test
  await membersPage.searchInput().fill(testdata.EditedMemberName);
  // 13. Click Apply
  await membersPage.applyButton().click();
  // 14. Verify Active row and click
  const activeRow = membersPage.memberTableRowActive();
  await expect(activeRow).toBeVisible();
  await activeRow.click();
  await page.waitForTimeout(2000);
});


test('DeleteMember_MembersManagement',async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await loginPage.membersManagementTab().click();
  await loginPage.membersSearchInput().fill(`${testdata.EditedMemberFirstName} ${testdata.EditedMemberLastName}`);
  await loginPage.membersApplyButton().click();
  await page.waitForTimeout(3000);
  page.once('dialog', async dialog => {
  expect(dialog.message()).toBe("Are you sure want to delete this Member?");
  await dialog.accept();
  });
  await page.click("//span[@class='ml20']/img[@alt='Delete']");
  await page.waitForTimeout(2000);
  await loginPage.dashboardTab().click();
  await loginPage.membersManagementTab().click();
  await loginPage.membersSearchInput().click();
  await loginPage.membersSearchInput().fill(`${testdata.EditedMemberFirstName} ${testdata.EditedMemberLastName}`);
  await loginPage.membersApplyButton().click();
  await expect(loginPage.noDataFoundText()).toBeVisible();
});

