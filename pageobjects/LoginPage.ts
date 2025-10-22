import { Page, Locator, expect } from '@playwright/test';
import testdata from '../testdata.json';

export class LoginPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async gotoLogin() {
    await this.page.goto('https://zencruz.com/login');
  }

  emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  dashboardText(text: string): Locator {
    return this.page.getByText(text);
  }

  membersManagement(text: string): Locator {
    return this.page.getByText(text);
  }

  addMemberButton(text: string): Locator {
    return this.page.getByText(text);
  }

  firstNameInput(): Locator {
    return this.page.getByPlaceholder('First Name');
  }

  lastNameInput(): Locator {
    return this.page.getByPlaceholder('Last Name');
  }

  genderSelect(): Locator {
    return this.page.locator('select[name="gender"]');
  }

  ageInput(): Locator {
    return this.page.locator('//label[text()="Age"]/..//input');
  }

  mobileInput(): Locator {
    return this.page.getByPlaceholder('Enter phone number');
  }

  memberEmailInput(): Locator {
    return this.page.getByPlaceholder('Your E-mail Id');
  }

  bloodGroupSelect(): Locator {
    return this.page.locator('//label[text()="Blood Group"]/..//select');
  }

  heightInput(): Locator {
    return this.page.locator('//label[text()="Height"]/..//input');
  }

  weightInput(): Locator {
    return this.page.locator('//label[text()="Weight"]/..//input');
  }

  cityInput(): Locator {
    return this.page.getByPlaceholder('Your City');
  }

  countryInput(): Locator {
    return this.page.getByPlaceholder('Your Country');
  }

  addressInput(): Locator {
    return this.page.getByPlaceholder('Your Address');
  }

  referralSelect(): Locator {
    return this.page.locator('select[name="referral"]');
  }

  addButton(selector: string): Locator {
    return this.page.locator(selector);
  }

  memberSearchInput(placeholder: string): Locator {
    return this.page.getByPlaceholder(placeholder);
  }

  applyButton(selector: string): Locator {
    return this.page.locator(selector);
  }

  memberTableRow(tableSelector: string, firstName: string, gender: string, mobile: string, age: string): Locator {
    let row = this.page.locator(tableSelector, { has: this.page.getByText(firstName) });
    row = row.filter({ has: this.page.getByText(gender) });
    row = row.filter({ has: this.page.getByText(mobile) });
    row = row.filter({ has: this.page.getByText(age) });
    row = row.filter({ has: this.page.getByText('Active') });
    return row;
  }

  // Point of Sale
  pointOfSaleButton(text: string): Locator {
    return this.page.getByText(text);
  }

  planSearchInput(placeholder: string): Locator {
    return this.page.getByPlaceholder(placeholder);
  }

  searchedPlanResult(text: string): Locator {
    return this.page.getByText(text);
  }

  addSvgButton(): Locator {
    return this.page.locator('//button[@class="mt-2 p-0 button-link"]');
  }



  doneButton(text: string): Locator {
    return this.page.getByText(text);
  }

  memberDetailsText(): Locator {
    return this.page.locator('(//strong[text()="Member(s) Details:"]/..//p)[1]');
  }

  continueButton(): Locator {
    return this.page.locator('button[type="submit"].btn.btn-primary.ms-2.w-50.text-nowrap');
  }

  cashPaymentButton(text: string): Locator {
    return this.page.getByText(text);
  }

  transactionSuccessText(text: string): Locator {
    return this.page.getByText(text);
  }

  paymentSuccessText(text: string): Locator {
    return this.page.getByText(text);
  }

  dismissButton(): Locator {
    return this.page.locator('(//button[@class="btn-close"])[2]');
  }

  memberSearchInputTable(): Locator {
    return this.page.getByPlaceholder('search here...');
  }

  applyButtonTable(): Locator {
    return this.page.locator('//button[@class="me-2 btn btn-primary"][text()="Apply"]');
  }

  memberTableRows(): Locator {
    return this.page.locator('//table[@class="table table-hover table-sm"]/tbody/tr');
  }

  memberTableCell(cellIndex: number): Locator {
    return this.page.locator(`//table[@class="table table-hover table-sm"]/tbody/tr/td[${cellIndex}]`);
  }

  // Check-In/Check-Out
  checkInOutButton(): Locator {
    return this.page.locator("((//h5[@class='card-title '])[1]/../..//button[@class='button-link link-color'])[1]");
  }

  checkInOutSearchInput(): Locator {
    return this.page.getByPlaceholder('Search by Member Name');
  }

  checkInButton(firstName: string): Locator {
    return this.page.locator(`//span[contains(text(),'${firstName}')]/../../..//input[@value='Check-In']`);
  }

  trainerSelect(): Locator {
    return this.page.locator('//span[text()="Trainer: "]/..//select');
  }

  checkInConfirmButton(): Locator {
    return this.page.locator('//button[text()="Check-In"]');
  }

  checkOutButton(firstName: string): Locator {
    return this.page.locator(`//span[contains(text(),'${firstName}')]/../../..//input[@value='Check-Out']`);
  }

  checkOutConfirmButton(): Locator {
    return this.page.locator('//button[text()="Check-Out"]');
  }

  checkInButtonAfterOut(firstName: string): Locator {
    return this.page.locator(`//span[contains(text(),'${firstName}')]/../../..//input[@value='Check-In']`);
  }

  // Reports
  reportsTab(): Locator {
    return this.page.getByText('Reports');
  }

  checkInNavTab(): Locator {
    return this.page.locator("//li[@class='nav-item']/a[text()='Check-In']");
  }

  reportsSearchInput(): Locator {
    return this.page.getByPlaceholder('Search by Name');
  }

  reportsApplyButton(): Locator {
    return this.page.locator("//button[text()='Apply']");
  }

  reportsFirstRowUser(userName: string): Locator {
    return this.page.locator(`//div[@class='datatable reports']//tbody/tr[1]/td[contains(text(),'${userName}')]`);
  }

  membersSearchInput(): Locator {
    return this.page.getByPlaceholder('search here...');
  }

  membersApplyButton(): Locator {
    return this.page.locator("//button[text()='Apply']");
  }

  membersTableRow(userName: string): Locator {
    return this.page.locator(`//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[contains(text(),'${userName}')]`);
  }

  membersTableRowCell(userName: string): Locator {
    return this.page.locator(`//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[contains(text(),'${userName}')]`);
  }

  memberDetailsTitle(userName: string): Locator {
    return this.page.locator(`//h4[@class='m-2 ms-4 title'][text()='${userName}']`);
  }

  editMembershipIcon(planName: string): Locator {
    return this.page.locator(`//div[contains(@class,'datatable sno plansTable')]//tbody/tr/td[text()='${planName}']/../td/i[@class='fas fa-edit']`);
  }

  editMembershipDetailsText(): Locator {
    return this.page.getByText('Edit Membership Details');
  }

  pauseText(): Locator {
    return this.page.getByText('Pause');
  }

  daysDropdown(): Locator {
    return this.page.locator("//select[@id='emailReminder']");
  }

  daysInput(): Locator {
    return this.page.locator("//input[@type='number']");
  }

  saveButton(): Locator {
    return this.page.getByText('Save');
  }

  pausedStatus(planName: string): Locator {
    return this.page.locator(`//div[contains(@class,'datatable sno plansTable')]//tbody/tr/td[text()='${planName}']/../td/div[text()='paused']`);
  }

  pauseStatusInTable(userName: string): Locator {
    return this.page.locator(`//div[contains(@class,'datatable cursorPointer mmManager_Table')]//tbody/tr/td[contains(text(),'${userName}')]/../td/div[text()='pause']`);
  }

  dangerText(): Locator {
    return this.page.locator("//span[@class='text-danger mt-3']");
  }

  activeStatusCell(userName: string): Locator {
    return this.page.locator(`//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[contains(text(),'${userName}')]/../td[9]/div[text()='Active']`);
  }

    checkinTextVerification(text: string): Locator {
    return this.page.locator(`//div[@class='view-name m-0 checkIn-Head'][contains(text(),'${text}')]`);
  }

  // Staff Attendance
  dashboardStaffAttendanceButton(): Locator {
    return this.page.locator("(//h5[contains(text(),'Staff Attendance')]/../..//small)[1]/..//button[@class='button-link link-color']");
  }

  staffRolesAttendanceTab(): Locator {
    return this.page.getByText('Staff Roles & Attendance');
  }

  addStaffButton(): Locator {
    return this.page.getByText('Add Staff');
  }

  staffPhoneInput(): Locator {
    return this.page.getByPlaceholder('Enter phone number');
  }

  staffFirstNameInput(): Locator {
    return this.page.locator("//div[@class='col-sm-12 col-md-4 pt-4']//label[contains(text(),'First Name')]/following-sibling::input");
  }

  staffLastNameInput(): Locator {
    return this.page.locator("//div[@class='col-sm-12 col-md-4 pt-4']//label[contains(text(),'Last Name')]/following-sibling::input");
  }

  staffUsernameInput(): Locator {
    return this.page.locator('//input[@name="username"]');
  }

  staffPasswordInput(): Locator {
    return this.page.locator('//input[@type="password"]');
  }

  staffGenderSelect(): Locator {
    return this.page.locator('select[name="gender"]');
  }

  staffAgeInput(): Locator {
    return this.page.locator("//div[@class='col-sm-12 col-md-4 pt-4']//label[contains(text(),'Age')]/following-sibling::input");
  }

  staffEmailInput(): Locator {
    return this.page.locator('input[name="Email"]');
  }

  staffRoleSelect(): Locator {
    return this.page.locator('select[name="role"]');
  }

  staffAddButton(): Locator {
    return this.page.locator('//button[text()="Add"]');
  }

  staffSearchInput(): Locator {
    return this.page.getByPlaceholder('search by member');
  }

  staffTableRows(): Locator {
    return this.page.locator('//div[@class="datatable sno staffDatatable"]//tbody/tr');
  }

  staffTableNameCell(staffName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']`);
  }

  staffTableCheckInButton(staffName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td//button[text()='Check-In']`);
  }

  staffTableCheckOutButton(staffName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td//button[text()='Check-Out']`);
  }

  // Activities
  activitiesTab(): Locator {
    return this.page.locator("//a[@id='logEvent']");
  }

  activitiesSearchInput(): Locator {
    return this.page.getByPlaceholder('Search Here...');
  }

  activitiesApplyButton(): Locator {
    return this.page.locator("//button[text()='Apply']");
  }

  staffCheckOutSuccessText(staffName: string): Locator {
    return this.page.getByText(`Staff Check-Out Successful (${staffName} User)`);
  }

  paymentReceivedButton(index: number): Locator {
    return this.page.locator(`(//img[@class='paymt-rec'])[${index}]/..//button`);
  }

  pointOfSaleTab(): Locator {
    return this.page.getByText('Point of Sale');
  }

  planSearchInputPOS(): Locator {
    return this.page.getByPlaceholder('Search Plan/Addon');
  }

  planSearchResultPOS(planName: string): Locator {
    //return this.page.getByText(planName);
    return this.page.locator(`//div[text()='${planName}']`);
  }

  addPlanButtonPOS(): Locator {
    return this.page.locator('//button[@class="mt-2 p-0 button-link"]');
  }

  memberSearchInputPOS(): Locator {
    return this.page.locator('//input[@placeholder="Search"]');
  }

  memberSearchResultPOS(memberName: string): Locator {
    return this.page.getByText(memberName);
  }

  doneButtonPOS(): Locator {
    return this.page.getByText('Done');
  }

  memberDetailsTextPOS(): Locator {
    return this.page.locator('(//strong[text()="Member(s) Details:"]/..//p)[1]');
  }

  continueButtonPOS(): Locator {
    return this.page.locator('button[type="submit"].btn.btn-primary.ms-2.w-50.text-nowrap');
  }

  multiplePaymentText(): Locator {
    return this.page.getByText('Multiple');
  }

  splitInputField(index: number): Locator {
    return this.page.locator(`(//input[@class='splitinput w-50'])[${index}]`);
  }

  balanceDueAmountText(): Locator {
    return this.page.locator('(//span[text()=" Balance due amount"]/..//span)[2]');
  }

  doneButtonPayment(): Locator {
    return this.page.getByText('Done');
  }

  transactionSuccessAlert(): Locator {
    return this.page.getByText('Transaction created successfully');
  }

  paymentSuccessAlert(): Locator {
    return this.page.getByText('Payment Successful');
  }

  dismissButtonPayment(): Locator {
    return this.page.locator('(//button[@class="btn-close"])[2]');
  }

  dashboardTab(): Locator {
    return this.page.getByText('Dashboard');
  }

  transactionsTab(): Locator {
    return this.page.getByText('Transactions');
  }

  transactionsSearchInput(): Locator {
    return this.page.locator('(//input[@placeholder="search here..."])[1]');
  }

  transactionsApplyButton(): Locator {
    return this.page.locator('//button[text()="Apply"]');
  }

  transactionsTableRow(memberName: string): Locator {
    return this.page.locator(`//div[@class='TransactionsTable sno']//tbody/tr[1]/td[contains(text(),'${memberName}')]/../td/div[text()='shiva']/../../td[8]`);
  }

  transactionsTableAssert(memberName: string, col: number, expected: string): Locator {
    return this.page.locator(`//div[@class='TransactionsTable sno']//tbody/tr[1]/td[contains(text(),'${memberName}')]/../td/div[text()='shiva']/../../td[${col}][text()='${expected}']`);
  }

  membersManagementTab(): Locator {
    return this.page.locator("//a[text()=' Members Management']");
  }

  memberDeleteIcon(userName: string): Locator {
    return this.page.locator(`//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[contains(text(),'${userName}')]/../td[16]/span[2]/img`);
  }

  noDataFoundText(): Locator {
    return this.page.locator("//p[text()=' No Data Found']");
  }

 

  staffDeleteIcon(staffName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[contains(text(),'${staffName}')]/../td[7]//button[2]/img`);
  }

  noMatchingResultsText(): Locator {
    return this.page.locator("//td[text()='No matching results found']");
  }

   async DeleteExistingMember(name: string,page: Page,number:string) {
       await this.membersManagementTab().click();
       await this.membersSearchInput().fill(name);
       await this.membersApplyButton().click();
       await page.waitForTimeout(3000);
       const row=this.page.locator(`//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='${name}']/../td[text()='${number}']/../td[16]/span[2]/img`);
       if(await row.isVisible()){
        console.log("Member is present, so deleting the member");
          page.once('dialog', async dialog => {
            expect(dialog.message()).toBe("Are you sure want to delete this Member?");
            await dialog.accept();
            });
            await page.click("//span[@class='ml20']/img[@alt='Delete']");
            await page.waitForTimeout(2000);
       }

   }

    async gotoClassLogin() {
    await this.page.goto('https://zencruz.com/classlogin');
  }

    classmemberEmailInput(): Locator {
    return this.page.locator("//input[@class='form-control form-control-lg'][@type='email']");
  }

   classmemberPasswordInput(): Locator {
    return this.page.locator("//input[@class='form-control form-control-lg'][@type='password']");
  }

   async SuccessAlert(AlertText:string) {
    await expect(this.page.getByText(AlertText)).toBeVisible();
  }

  
}
