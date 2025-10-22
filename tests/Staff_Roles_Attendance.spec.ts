import { test, expect } from '@playwright/test';
import { StaffRolesAttendanceTab } from '../pageobjects/Staff_Roles_AttendanceTab';
import { LoginPage } from '../pageobjects/LoginPage';
import { MembersManagementTabPage } from '../pageobjects/MembersManagementTabPage';
import testdata from '../testdata.json';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

let AdminStaffFirstName: string;
let AccountantStaffFirstName: string;
let EditAdminStaffFirstName: string;


const filePath = 'D:/EasyMembr_TestData/Sample_Staff_Data.xlsx';

const tempFile = path.join(__dirname, 'temp.json');

  function updateTempJson(newData: Record<string, any>) {
  let existing = {};
  if (fs.existsSync(tempFile)) {
    existing = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  }
  const merged = { ...existing, ...newData }; // merge old and new
  fs.writeFileSync(tempFile, JSON.stringify(merged), 'utf-8');
}




test('CreateStaffAsAdmin_VerifyCreatedStaff_WhileCheckIN_TrainerDropDown', async ({ page }) => {
  AdminStaffFirstName = `adminStaff${Array.from({length: 6}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}`;
  AccountantStaffFirstName = `accountantStaff${Array.from({length: 6}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}`;
  EditAdminStaffFirstName = `editStaff${Array.from({length: 6}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}`;
  updateTempJson({ AdminStaffFirstName });
  updateTempJson({ AccountantStaffFirstName });
  updateTempJson({ EditAdminStaffFirstName });
  console.log(`Saved AdminStaffFirstName to temp.json: ${AdminStaffFirstName}`);
  console.log(`Saved AccountantStaffFirstName to temp.json: ${AccountantStaffFirstName}`);
  console.log(`Saved EditAdminStaffFirstName to temp.json: ${EditAdminStaffFirstName}`);
  const staffTab = new StaffRolesAttendanceTab(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Staff Roles & Attendance
  await staffTab.staffRolesAttendanceTab().click();
  // 2. Click Add Staff
  await staffTab.addStaffButton().click();
  // 3. Fill staff details
  await loginPage.staffPhoneInput().click();
  await loginPage.staffPhoneInput().fill(testdata.mobile);
  console.log('AdminStaffFirstName:', AdminStaffFirstName);
  await loginPage.staffFirstNameInput().click();
  await loginPage.staffFirstNameInput().fill(AdminStaffFirstName);
  await loginPage.staffLastNameInput().click();
  await loginPage.staffLastNameInput().fill('User');
  await loginPage.staffUsernameInput().click();
  await loginPage.staffUsernameInput().fill(AdminStaffFirstName);
  await loginPage.staffPasswordInput().click();
  await loginPage.staffPasswordInput().fill(testdata.StaffPassword);
  await loginPage.staffGenderSelect().selectOption({ label: testdata.gender });
  await loginPage.staffAgeInput().click();
  await loginPage.staffAgeInput().fill(testdata.age);
  await loginPage.staffEmailInput().click();
  await loginPage.staffEmailInput().fill(`${AdminStaffFirstName}@mailinator.com`);
  await loginPage.staffRoleSelect().selectOption({ label: 'Admin' });
  await loginPage.staffAddButton().click();
  // 15. Search staff by email
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${AdminStaffFirstName}@mailinator.com`);
  // 16. Verify staff table row count is 1
  const staffRows = await loginPage.staffTableRows().count();
  expect(staffRows).toBe(1);
  // 17. Verify staff name cell is visible
  await expect(loginPage.staffTableNameCell(`${AdminStaffFirstName} User`)).toBeVisible();
  // 4. Verify custom staff row
  await expect(staffTab.staffTableRow(`${AdminStaffFirstName} User`, testdata.mobile, `${AdminStaffFirstName}@mailinator.com`)).toBeVisible();
  await expect(staffTab.staffTableRow_AdminDelete(`${AdminStaffFirstName} User`, testdata.mobile, `${AdminStaffFirstName}@mailinator.com`)).not.toBeVisible();
  // 5. Click on Check-In/Check-Out
  await staffTab.checkInOutTab().click();
  // 6. Click check-in button
  await staffTab.checkInButton().click();
  // 7. Select staff in trainer dropdown
  await staffTab.trainerSelect().selectOption({ label: `${AdminStaffFirstName} User` });
});


test('CreateStaffAsAccountant_VerifyCreatedStaff_WhileCheckIN_TrainerDropDown', async ({ page }) => {
  const tempFile = path.join(__dirname, 'temp.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const staffTab = new StaffRolesAttendanceTab(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Staff Roles & Attendance
  await staffTab.staffRolesAttendanceTab().click();
  // 2. Click Add Staff
  await staffTab.addStaffButton().click();
  // 3. Fill staff details
  await loginPage.staffPhoneInput().click();
  await loginPage.staffPhoneInput().fill(testdata.mobile);
  console.log('AccountantStaffFirstName:', data.AccountantStaffFirstName);
  await loginPage.staffFirstNameInput().click();
  await loginPage.staffFirstNameInput().fill(data.AccountantStaffFirstName);
  await loginPage.staffLastNameInput().click();
  await loginPage.staffLastNameInput().fill('User');
  await loginPage.staffUsernameInput().click();
  await loginPage.staffUsernameInput().fill(data.AccountantStaffFirstName);
  await loginPage.staffPasswordInput().click();
  await loginPage.staffPasswordInput().fill(testdata.StaffPassword);
  await loginPage.staffGenderSelect().selectOption({ label: testdata.gender });
  await loginPage.staffAgeInput().click();
  await loginPage.staffAgeInput().fill(testdata.age);
  await loginPage.staffEmailInput().click();
  await loginPage.staffEmailInput().fill(`${data.AccountantStaffFirstName}@mailinator.com`);
  await loginPage.staffRoleSelect().selectOption({ label: 'Accountant' });
  await loginPage.staffAddButton().click();
  // 15. Search staff by email
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${data.AccountantStaffFirstName}@mailinator.com`);
  // 16. Verify staff table row count is 1
  const staffRows = await loginPage.staffTableRows().count();
  expect(staffRows).toBe(1);
  // 17. Verify staff name cell is visible
  await expect(loginPage.staffTableNameCell(`${data.AccountantStaffFirstName} User`)).toBeVisible();
  // 4. Verify custom staff row
  await expect(staffTab.staffTableRow_Accountant(`${data.AccountantStaffFirstName} User`, testdata.mobile, `${data.AccountantStaffFirstName}@mailinator.com`)).toBeVisible();
  // 5. Click on Check-In/Check-Out
  await staffTab.checkInOutTab().click();
  // 6. Click check-in button
  await staffTab.checkInButton().click();
  // 7. Select staff in trainer dropdown
  await staffTab.trainerSelect().selectOption({ label: `${data.AccountantStaffFirstName} User` });
});

test('EditStaffInfo__VerifyEditedStaff_WhileCheckIN_TrainerDropDown', async ({ page }) => {
  const tempFile = path.join(__dirname, 'temp.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const staffTab = new StaffRolesAttendanceTab(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Staff Roles & Attendance
  await staffTab.staffRolesAttendanceTab().click();
  // 2. Search staff by email
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${data.AdminStaffFirstName}@mailinator.com`);
  const staffRows = await loginPage.staffTableRows().count();
  expect(staffRows).toBe(1);
  // 3. Verify accountant staff row
  await expect(staffTab.staffTableRow_Admin1(`${data.AdminStaffFirstName} User`, testdata.mobile, `${data.AdminStaffFirstName}@mailinator.com`)).toBeVisible();
  // 4. Verify admin staff row and click edit
  const accountantRow = staffTab.staffTableRow_Admin1(`${data.AdminStaffFirstName} User`, testdata.mobile, `${data.AdminStaffFirstName}@mailinator.com`);
  await expect(accountantRow).toBeVisible();
  await accountantRow.click();
  // 5. Edit staff info
  await loginPage.staffPhoneInput().click();
  await loginPage.staffPhoneInput().clear();
  await loginPage.staffPhoneInput().fill(testdata.AccountantStaffMobile);
  console.log('EditAdminStaffFirstName:', data.EditAdminStaffFirstName);
  await loginPage.staffFirstNameInput().click();
  await loginPage.staffFirstNameInput().clear();
  await loginPage.staffFirstNameInput().fill(data.EditAdminStaffFirstName);
  await loginPage.staffLastNameInput().click();
  await loginPage.staffLastNameInput().clear();
  await loginPage.staffLastNameInput().fill('User');
  await loginPage.staffUsernameInput().click();
  await loginPage.staffUsernameInput().clear();
  await loginPage.staffUsernameInput().fill(data.EditAdminStaffFirstName);
  await loginPage.staffPasswordInput().click();
  await loginPage.staffPasswordInput().clear();
  await loginPage.staffPasswordInput().fill(testdata.EditAccountantStaffPassword);
  await loginPage.staffGenderSelect().selectOption({ label: 'Female' });
  await loginPage.staffAgeInput().click();
  await loginPage.staffAgeInput().clear();
  await loginPage.staffAgeInput().fill(testdata.age);
  await loginPage.staffEmailInput().click();
  await loginPage.staffEmailInput().clear();
  await loginPage.staffEmailInput().fill(`${data.EditAdminStaffFirstName}@mailinator.com`);
  await loginPage.staffRoleSelect().selectOption({ label: 'Accountant' });
  await loginPage.saveButton().click();
  // 15. Search edited staff by email
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${data.EditAdminStaffFirstName}@mailinator.com`);
  const editedStaffRows = await loginPage.staffTableRows().count();
  expect(editedStaffRows).toBe(1);
  await expect(loginPage.staffTableNameCell(`${data.EditAdminStaffFirstName} User`)).toBeVisible();
  // 6. Verify edited admin staff row
  await expect(staffTab.staffTableRow_Accountant(`${data.EditAdminStaffFirstName} User`, testdata.AccountantStaffMobilewithoutcode, `${data.EditAdminStaffFirstName}@mailinator.com`)).toBeVisible();
  // 7. Click on Check-In/Check-Out
  await staffTab.checkInOutTab().click();
  // 8. Click check-in button
  await staffTab.checkInButton().click();
  // 9. Select edited staff in trainer dropdown
  await staffTab.trainerSelect().selectOption({ label: `${data.EditAdminStaffFirstName} User` });
});

test('CheckInStaff_VerifyAttendance', async ({ page }) => {
   const tempFile = path.join(__dirname, 'temp.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const staffTab = new StaffRolesAttendanceTab(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Staff Roles & Attendance
  await staffTab.staffRolesAttendanceTab().click();
  // 2. Search edited staff by email
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${data.EditAdminStaffFirstName}@mailinator.com`);
  const staffRows = await loginPage.staffTableRows().count();
  expect(staffRows).toBe(1);
  // 3. View Attendance for edited staff
  await expect(staffTab.staffViewAttendanceButton(`${data.EditAdminStaffFirstName} User`)).toBeVisible();
  await staffTab.staffViewAttendanceButton(`${data.EditAdminStaffFirstName} User`).click();
  // 4. Staff Information header
  await expect(staffTab.staffInfoHeader()).toBeVisible();
  // 5. Staff check-in head
  await expect(staffTab.staffCheckInHead(`${data.EditAdminStaffFirstName} User`)).toBeVisible();
  // 6. Attendance table cells should be invisible
  await expect(staffTab.staffAttendanceTableCells()).not.toBeVisible();
  // 7. Close attendance modal
  await staffTab.staffAttendanceCloseButton().click();
  await page.waitForTimeout(2000);
  // 8. Check-In for edited staff
  await expect(staffTab.staffCheckInButton(`${data.EditAdminStaffFirstName} User`)).toBeVisible();
  await staffTab.staffCheckInButton(`${data.EditAdminStaffFirstName} User`).click();
  await page.waitForTimeout(5000);
  // 9. Check-Out for edited staff
  await expect(staffTab.staffCheckOutButton(`${data.EditAdminStaffFirstName} User`)).toBeVisible();
  await staffTab.staffCheckOutButton(`${data.EditAdminStaffFirstName} User`).click();
  await page.waitForTimeout(2000);
  // 10. View Attendance for edited staff
  await expect(staffTab.staffViewAttendanceButton(`${data.EditAdminStaffFirstName} User`)).toBeVisible();
  await staffTab.staffViewAttendanceButton(`${data.EditAdminStaffFirstName} User`).click();
  // 11. Staff Information header
  await expect(staffTab.staffInfoHeader()).toBeVisible();
  // 12. Staff check-in head
  await expect(staffTab.staffCheckInHead(`${data.EditAdminStaffFirstName} User`)).toBeVisible();
  // 13. Attendance table cells should be visible
  await expect(staffTab.staffAttendanceTableCells()).toBeVisible();
});

  test('CreateStaff_ImportSheet', async ({ page }) => {
    const membersPage = new MembersManagementTabPage(page);
    const loginPage = new LoginPage(page);
    const staffTab = new StaffRolesAttendanceTab(page);
    await loginPage.gotoLogin();
    await loginPage.emailInput().fill(testdata.email);
    await loginPage.passwordInput().fill(testdata.password);
    await loginPage.loginButton().click();
    await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
    // 1. Go to Staff Roles & Attendance
    await staffTab.staffRolesAttendanceTab().click();
    // 2. Import staff sheet
    await membersPage.importButton().click();
    await membersPage.fileInput().setInputFiles(filePath);
    await expect(membersPage.uploadedFileText('Sample_Staff_Data.xlsx')).toBeVisible();
    await membersPage.uploadButton().click();
    // 3. Verify alert for staff import success
    await expect(staffTab.staffImportSuccessAlert()).toBeVisible();
    // 4. Search for staff by email
    await loginPage.staffSearchInput().click();
    await loginPage.staffSearchInput().fill(testdata.ImportStaffEmail);
    const staffRows = await loginPage.staffTableRows().count();
    expect(staffRows).toBe(1);
    // 5. Verify staff row details
    await expect(staffTab.staffTableRowDetails(testdata.ImportStaffName, testdata.ImportStaffMobile,testdata.ImportStaffEmail)).toBeVisible();
  });

test('DeleteStaff', async ({ page }) => {
  const tempFile = path.join(__dirname, 'temp.json');
  const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
  const staffTab = new StaffRolesAttendanceTab(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  
  await staffTab.staffRolesAttendanceTab().click();
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${data.EditAdminStaffFirstName}@mailinator.com`);
  await expect(staffTab.staffDeleteIcon(`${data.EditAdminStaffFirstName} User`)).toBeVisible();
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe("Are you sure want to delete this Staff Member?");
    await dialog.accept();
  });
  await staffTab.staffDeleteIcon(`${data.EditAdminStaffFirstName} User`).click();
  await page.waitForTimeout(2000);
  await loginPage.dashboardTab().click();
  await loginPage.staffRolesAttendanceTab().click();
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${data.EditAdminStaffFirstName}@mailinator.com`);
  await expect(loginPage.noMatchingResultsText()).toBeVisible();

  
  await staffTab.staffRolesAttendanceTab().click();
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${data.AccountantStaffFirstName}@mailinator.com`);
  await expect(staffTab.staffDeleteIcon(`${data.AccountantStaffFirstName} User`)).toBeVisible();
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe("Are you sure want to delete this Staff Member?");
    await dialog.accept();
  });
  await staffTab.staffDeleteIcon(`${data.AccountantStaffFirstName} User`).click();
  await page.waitForTimeout(2000);

  await loginPage.dashboardTab().click();
  await loginPage.staffRolesAttendanceTab().click();
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(`${data.AccountantStaffFirstName}@mailinator.com`);
  await expect(loginPage.noMatchingResultsText()).toBeVisible();


  await staffTab.staffRolesAttendanceTab().click();
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(testdata.ImportStaffEmail);
  await expect(staffTab.staffDeleteIcon(testdata.ImportStaffEmail)).toBeVisible();
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe("Are you sure want to delete this Staff Member?");
    await dialog.accept();
  });
  await staffTab.staffDeleteIcon(testdata.ImportStaffEmail).click();
  await page.waitForTimeout(2000);
  await loginPage.dashboardTab().click();
  await loginPage.staffRolesAttendanceTab().click();
  await loginPage.staffSearchInput().click();
  await loginPage.staffSearchInput().fill(testdata.ImportStaffEmail);
  await expect(loginPage.noMatchingResultsText()).toBeVisible();
});
