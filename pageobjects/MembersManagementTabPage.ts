import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

export class MembersManagementTabPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  membersManagementTab(): Locator {
    return this.page.locator("//a[text()=' Members Management']");
  }

  importButton(): Locator {
    return this.page.locator('(//button[@type="submit"][text()="Import"])[1]');
  }

  fileInput(): Locator {
    return this.page.locator('input[type="file"]');
  }

  uploadedFileText(fileName: string): Locator {
    return this.page.getByText(fileName);
  }

  uploadButton(): Locator {
    return this.page.locator('//button[text()="Upload"]');
  }

  memberImportedAlert(): Locator {
    return this.page.getByText('Member(s) Imported Sucessfully');
  }

  businessDetailsTab(): Locator {
    return this.page.locator("//a[text()=' Business Details']");
  }

  searchInput(): Locator {
    return this.page.getByPlaceholder('search here...');
  }

  applyButton(): Locator {
    return this.page.locator('//button[text()="Apply"]');
  }

  memberRow(): Locator {
    return this.page.locator("//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='Honey Automation']/../td[text()='Male']/../td[text()='25']/../td[6][text()='No Plan Associated']/../td[text()='09/12/2025']/../td/div[text()='Active']");
  }

  memberNameHeader(): Locator {
    return this.page.locator('//h6[text()="Honey"]');
  }

  memberPhone(): Locator {
    return this.page.locator('//p[text()="+919876543210"]');
  }

  memberEmail(): Locator {
    return this.page.locator('//p[text()="honey@gmail.com"]');
  }

  memberHeight(): Locator {
    return this.page.locator('//p[text()="185"]');
  }

  memberBloodGroup(): Locator {
    return this.page.locator('//p[text()="O+"]');
  }

  memberAddress(): Locator {
    return this.page.locator('//p[text()="1-9-7, Hitechcity"]');
  }

  memberCountry(): Locator {
    return this.page.locator('//p[text()="India"]');
  }

  memberCity(): Locator {
    return this.page.locator('//p[text()="Hyderabad"]');
  }

  noMatchingResultsPlanTable(): Locator {
    return this.page.locator("//div[contains(@class,'datatable sno plansTable')]//tbody/tr/td[text()='No matching results found']");
  }

  editButton(): Locator {
    return this.page.locator("//i[@class='far fa-edit']");
  }

  firstNameInput(): Locator {
    return this.page.locator("//input[@placeholder='First Name']");
  }

  lastNameInput(): Locator {
    return this.page.locator("//input[@placeholder='Last Name']");
  }

  genderSelect(): Locator {
    return this.page.locator("//select[@id='gender']");
  }

  ageInput(index: number): Locator {
    return this.page.locator(`(//input[@name='Age'])[${index}]`);
  }

  phoneInput(): Locator {
    return this.page.locator("//input[@placeholder='Enter phone number']");
  }

  emailInput(): Locator {
    return this.page.locator("//input[@placeholder='Your E-mail Id']");
  }

  bloodGroupSelect(): Locator {
    return this.page.locator("//label[text()='Blood Group']/..//select");
  }

  heightInput(): Locator {
    return this.page.locator("(//input[@name='Age'])[2]");
  }

  weightInput(): Locator {
    return this.page.locator("(//input[@type='number'])[3]");
  }

  cityInput(): Locator {
    return this.page.locator("//input[@placeholder='Your City']");
  }

  countryInput(): Locator {
    return this.page.locator("//input[@placeholder='Your Country']");
  }

  addressTextarea(): Locator {
    return this.page.locator("//textarea[@placeholder='Your Address']");
  }

  saveButton(): Locator {
    return this.page.getByText('Save');
  }

  dndLabel(): Locator {
    return this.page.locator("//label[text()='DND: ']/..//span");
  }

  updatedMemberRow(): Locator {
    return this.page.locator("//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='Haritha test']/../td[text()='Female']/../td[text()='27']/../td[6][text()='No Plan Associated']/../td[text()='09/12/2025']/../td/div[text()='Active']/../../td[text()='On']");
  }

  updatedMemberNameHeader(): Locator {
    return this.page.locator('//h6[text()="Haritha"]');
  }

  updatedMemberPhone(): Locator {
    return this.page.locator('//p[text()="+919874563212"]');
  }

  updatedMemberEmail(): Locator {
    return this.page.locator('//p[text()="haritha@gmail.com"]');
  }

  updatedMemberHeight(): Locator {
    return this.page.locator('//p[text()="190"]');
  }

  updatedMemberBloodGroup(): Locator {
    return this.page.locator('//p[text()="B+"]');
  }

  updatedMemberAddress(): Locator {
    return this.page.locator('//p[text()="RKBeach"]');
  }

  updatedMemberCountry(): Locator {
    return this.page.locator('//p[text()="US"]');
  }

  updatedMemberCity(): Locator {
    return this.page.locator('//p[text()="Vizag"]');
  }

  exportButton(): Locator {
    return this.page.getByText('Export');
  }

  memberTableRowByName(name: string): Locator {
    return this.page.locator(`//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='${name}']`);
  }

  // --- Methods for CheckIn_InActiveMember_VerifyMembership_OverdueCount_Dashboard ---
  pointOfSaleTab(): Locator {
    return this.page.locator("//a[text()=' Point of Sale']");
  }

  planSearchInput(): Locator {
    return this.page.locator('//input[@placeholder="Search Plan/Addon"]');
  }

  planSearchResult(planName: string): Locator {
    return this.page.locator(`//div[text()='${planName}']`);
  }

  addMemberButton(): Locator {
    return this.page.locator('//button[@class="mt-2 p-0 button-link"]');
  }

  memberSearchInputPOS(): Locator {
    return this.page.locator('//input[@placeholder="Search"]');
  }

  memberSearchResultPOS(memberName: string): Locator {
    return this.page.locator(`//div[text()='${memberName}']`);
  }

  doneButton(): Locator {
    return this.page.locator('//button[text()="Done"]');
  }

  memberDetailsText(): Locator {
    return this.page.locator('(//strong[text()="Member(s) Details:"]/..//p)[1]');
  }

  firstDatePickerInput(): Locator {
    return this.page.locator('(//div[@class="react-datepicker__input-container"])[1]/input');
  }

  previousDatePickerNav(): Locator {
    return this.page.locator('//button[@class="react-datepicker__navigation react-datepicker__navigation--previous"]');
  }

  datePickerDay(day: string): Locator {
    return this.page.locator(`//div[text()='${day}']`);
  }

  datePickerTime(time: string): Locator {
    return this.page.locator(`//li[text()='${time}']`);
  }

  secondDatePickerInput(): Locator {
    return this.page.locator('(//div[@class="react-datepicker__input-container"])[2]/input');
  }

  continueButton(): Locator {
    return this.page.locator('button[type="submit"].btn.btn-primary.ms-2.w-50.text-nowrap');
  }

  cashButton(): Locator {
    return this.page.locator('//div[text()="Cash"]');
  }

  transactionSuccessAlert(): Locator {
    return this.page.locator('text=Transaction created successfully');
  }

  paymentSuccessAlert(): Locator {
    return this.page.locator('text=Payment Successful');
  }

  dismissButton(): Locator {
    return this.page.locator('(//button[@class="btn-close"])[2]');
  }

  dashboardTab(): Locator {
    return this.page.locator('//a[text()=" Dashboard"]');
  }

  todayButton(): Locator {
    return this.page.locator('//button[text()="Today"]');
  }

  overdueFemaleButton(): Locator {
    return this.page.locator('//h5[text()="Overdue CheckIn(s)"]/../..//small[text()="Female "]/..//button');
  }

  checkInOutTab(): Locator {
    return this.page.locator('//a[text()=" Check-In/Check-Out"]');
  }

  inactiveMembersTab(): Locator {
    return this.page.locator('//a[text()="Inactive Members"]');
  }

  searchByMemberNameInput(): Locator {
    return this.page.locator('input[placeholder="Search by Member Name"]');
  }

  expiredLabel(): Locator {
    return this.page.locator('//span[@class="text-danger"][text()="Expired"]');
  }

  expiredCheckinInput(): Locator {
    return this.page.locator('//input[@class="ExpiredCheckin"]');
  }

  memberNameDiv(memberName: string): Locator {
    return this.page.locator(`//div[text()='${memberName}']`);
  }

  checkInButton(): Locator {
    return this.page.locator('//button[text()="Check-In"]');
  }

  checkOutInput(): Locator {
    return this.page.locator('//input[@value="Check-Out"]');
  }

  checkOutButton(): Locator {
    return this.page.locator('//button[text()="Check-Out"]');
  }

  overdueInactiveRow(memberName: string): Locator {
    return this.page.locator(`//div[@class='datatable SuscriptionHistoryDataTable']//tbody/tr/td[text()='${memberName}']/../td[text()='Inactive']`);
  }

  closeButton(): Locator {
    return this.page.locator('//button[text()="Close"]');
  }

  closeButtonIcon(): Locator {
    return this.page.locator('//button[@class="ripple ripple-surface btn-close"]');
  }

  // --- Methods for InActiveMember_To_ActiveMember_VerifyPlansTab_VerifyPaymentsTab_VerifyAttendanceTab_AddRefund_VerifyRefundHistoryInTransaction_RefundTab ---
  memberTableRowInactiveRenew(): Locator {
    return this.page.locator("//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='Haritha test']/../td[text()='Female']/../td[text()='27']/../td[6][text()='haritha']/../td/div[text()='Inactive']/../../td[text()='On']/../td/div/span[text()='Renew']");
  }
  memberTableRowActiveRenew(): Locator {
    return this.page.locator("//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='Haritha test']/../td[text()='Female']/../td[text()='27']/../td[6][text()='haritha']/../td/div[text()='Active']/../../td[text()='On']");
  }
  memberNameHeaderHaritha(memberName: string): Locator {
    return this.page.locator(`//h6[text()="${memberName}"]`);
  }
  plansTableRowActive(Planname: string): Locator {
    return this.page.locator(`//div[contains(@class,'datatable sno plansTable')]//tbody//tr[1]/td[text()='${Planname}']/../td/div[text()='Active']`);
  }
  plansTableRowInactive(Planname: string): Locator {
    return this.page.locator(`//div[contains(@class,'datatable sno plansTable')]//tbody//tr[2]/td[text()='${Planname}']/../td/div[text()='Inactive']`);
  }
  paymentsTransactionsTab(): Locator {
    return this.page.locator("//a[text()='Payments/Transactions']");
  }
  paymentsTableRows(): Locator {
    return this.page.locator("//div[contains(@class,'datatable sno pymentsTable')]//tbody/tr");
  }
  paymentsTableRowCash(): Locator {
    return this.page.locator("//div[contains(@class,'datatable sno pymentsTable')]//tbody/tr[1]/td[text()='Cash']/../td[text()='₹500'][1]");
  }
  paymentsTableRowTokenButton(): Locator {
    return this.page.locator("//div[contains(@class,'datatable sno pymentsTable')]//tbody/tr[1]/td[2]/button");
  }
  transactionDetailsHeader(): Locator {
    return this.page.locator("//h5[text()='Transaction Details']");
  }
  transactionDetailsMemberName(): Locator {
    return this.page.locator("//div[text()='Haritha test']");
  }
  refundAmountLabel(): Locator {
    return this.page.locator("//p[text()='Refund Amount']");
  }
  refundAmountInput(): Locator {
    return this.page.locator("//input[@placeholder='0/-']");
  }
  refundReasonTextarea(): Locator {
    return this.page.locator("//textarea[@placeholder='Enter reason for refund']");
  }
  refundButton(): Locator {
    return this.page.locator("//button[text()='Refund']");
  }
  attendanceTab(): Locator {
    return this.page.locator("//a[text()='Attendance']");
  }
  attendanceNoMatchingResults(): Locator {
    return this.page.locator("//div[@class='datatable sno']//tbody/tr/td[text()='No matching results found']");
  }
  transactionsTab(): Locator {
    return this.page.locator("//a[text()=' Transactions']");
  }
  refundTab(): Locator {
    return this.page.locator("//a[text()='Refund']");
  }
  refundsTableRow(): Locator {
    return this.page.locator("//div[@class='datatable refundsDataTable ']//tbody/tr[1]/td[text()='haritha']/../td[text()='₹100']/../td/div[text()='testautomation']");
  }

  refundTab_Search(): Locator {
    return this.page.locator("(//div[@class='refundsTable search']//input)[1]");
  }

  // --- Methods for DownloadExportSheet_RefundHistory ---
  refundExportButton(): Locator {
    return this.page.locator('//button[text()="Export"]');
  }

  // --- Methods for SuspendMember_VerifyStatusInCheckIN_CheckOutTab ---
  memberTableRowActive(): Locator {
    return this.page.locator("//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='Haritha test']/../td[text()='Female']/../td[text()='27']/../td[6][text()='haritha']/../td/div[text()='Active']/../../td[text()='On']");
  }
 
  suspendButton(): Locator {
    return this.page.locator('//button[text()="suspend"]');
  }
  memberSuspendedName(memberName: string): Locator {
    return this.page.locator(`//b[text()="${memberName}"]`);
  }
  suspendReasonTextarea(): Locator {
    return this.page.locator('//textarea[@id="textAreaExample"]');
  }
  suspendConfirmButton(): Locator {
    return this.page.locator('//button[text()="Suspend"]');
  }
  memberSuspendedAlert(): Locator {
    return this.page.getByText('Member Suspended');
  }
  activateButton(): Locator {
    return this.page.locator('//button[text()="Activate"]');
  }
 
  checkInHeadSuspendedLabel(): Locator {
    return this.page.locator('//span[@class="checkIn-Head"][text()="Haritha test"]/../..//label[text()="Member Suspended"]');
  }

  // --- Methods for Activate_SuspendMember_VerifyStatusInMemberManagement ---
  memberTableRowSuspend(): Locator {
    return this.page.locator("//div[@class='datatable cursorPointer mmManager_Table']//tbody/tr/td[text()='Haritha test']/../td[text()='Female']/../td[text()='27']/../td[6][text()='haritha']/../td/div[text()='suspend']/../../td[text()='On']");
  }
 
  activateButtonSecond(): Locator {
    return this.page.locator('(//button[text()="Activate"])[2]');
  }

  // --- AddMember_WhileAssigningPlan custom methods ---
  addNewMemberButton(): Locator {
    return this.page.locator("//button[text()='Add New Member']");
  }

  memberSearchInput(): Locator {
    return this.page.locator("//input[@placeholder='Search Member']");
  }

  memberChip(name: string): Locator {
    return this.page.locator(`//div[@class='chip'][text()='${name}']`);
  }

  memberFullNameInput(first: string, last: string): Locator {
    return this.page.locator(`//input[@value='${first} ${last}']`);
  }

  addressInput(): Locator {
    return this.page.locator("//p[text()='Address']/..//input");
  }

  expiringThisWeekTab(): Locator {
    return this.page.locator("//a[text()='Expiring This Week']");
  }

  paginationArrow(): Locator {
    return this.page.locator("(//span[@class='select-arrow '])[1]");
  }

  selectAllOption(): Locator {
    return this.page.locator("//span[@class='select-option-text'][text()='All']");
  }

  nameHeader(): Locator {
    return this.page.locator("(//th[@class='fixed-cell'])[1]");
  }

  memberPlanRow(fullName: string, planName: string): Locator {
    console.log(`//td[text()='${fullName}']/../td[text()='${planName}']`);
    return this.page.locator(`//td[text()='${fullName}']/../td[text()='${planName}']`);
  }
 

  // --- Custom methods for Trainer Summary and Log Time scenario ---
  reportsTab(): Locator {
    return this.page.locator("//a[text()=' Reports']");
  }

  trainerSummaryTab(): Locator {
    return this.page.locator("//a[text()='Trainer Summary']");
  }

  trainerSummaryDateCell(date: string): Locator {
    return this.page.locator(`//td[text()='${date}']`);
  }

  async trainerSummaryCheckinButton(date: string): Promise<Locator> {
    // Dynamically get the size of td elements in the row for the given date and use it in the locator
    const size = await this.page.locator(`//td[text()='${date}']/../td`).count();
    return this.page.locator(`//td[text()='${date}']/../td[${size}]/button`);
  }

  activitiesTab(): Locator {
    return this.page.locator("//a[text()=' Activities']");
  }

  activitiesTodayDropdown(): Locator {
    return this.page.locator("//select[@id='shr']");
  }

    activitiesTodayDropdown_1(): Locator {
    return this.page.locator("(//select[@id='shr'])[2]");
  }

  activitiesLogTimeSuccessCell(fullName: string): Locator {
    return this.page.locator(`//td[contains(text(),'Member Log Time Successfull (${fullName})')]`);
  }

  logTimeButtonForMember(fullName: string): Locator {
    return this.page.locator(`//div[text()='${fullName}']/../../../../..//button[text()='Log Time']`);
  }

  logTimeIcon(): Locator {
    return this.page.locator("//span[@data-mdb-target='#logtime']");
  }

   paymentSummaryTab(): Locator {
    return this.page.locator("//a[text()='Payment Summary']");
  }

  async paymentSummaryDateCell(date: string): Promise<Locator> {
     const size = await this.page.locator(`//td[text()='${date}']/../td`).count();
    return this.page.locator(`//td[text()='${date}']/../td[${size}]/button`);
  }

   planSummaryTab(): Locator {
    return this.page.locator("//a[text()='Plan Summary']");
  }

  async planSummaryFilterDropdown(planName: string) {
    await this.page.locator("//span[text()='All Plans/Addons']").first().click();  
    await this.page.locator(`//label[text()='${planName} (Plan)']/../input`).click();
    await this.page.locator("//label[text()=' Measure: ']").click();
    await this.page.waitForTimeout(2000);
    await this.page.locator("//button[text()='Apply']").click();
    await this.page.waitForTimeout(2000);
  }

    async planSummaryDateCell(date: string): Promise<Locator> {
      // Dynamically get the size of td elements in the row for the given date and use it in the locator
    const size = await this.page.locator(`//td[text()='${date}']/../td`).count();
    return this.page.locator(`//td[text()='${date}']/../td[${size}]/button`);
  }

    CheckINSummaryTab(): Locator {
    return this.page.locator("//a[text()='Check-In']");
  }

  // --- Custom methods for ResumePausedMember scenario ---
  resumeButton(): Locator {
    return this.page.locator("//button[text()='Resume']");
  }

  planStatusActiveCell(planName: string): Locator {
    return this.page.locator(`//div[contains(@class,'datatable sno plansTable')]//tbody/tr/td[text()='${planName}']/../td/div[text()='Active']`);
  }

  memberNameTesterDiv(fullName: string): Locator {
    return this.page.locator(`//div[text()='${fullName} Tester']`);
  }

  sessionSummaryTab(): Locator {
    return this.page.locator("//a[text()='Session Summary']");
  }

    async sessionSummaryDateCell(date: string): Promise<Locator> {
       // Dynamically get the size of td elements in the row for the given date and use it in the locator
    const size =  await this.page.locator(`//td[text()='${date}']/../td`).count();
    return this.page.locator(`//td[text()='${date}']/../td[${size}]/button`);
  }
    // --- Methods for Session Plan and Reports_Session/SessionSummary ---
    sessionTab(): Locator {
      return this.page.locator("//a[text()='Session']");
    }

    sessionSearchInput(): Locator {
      return this.page.locator("//input[@placeholder='search here...']");
    }

    sessionApplyButton(): Locator {
      return this.page.locator("//button[text()='Apply']");
    }

    sessionReportRow(fullName: string, planName: string, attended: string, remaining: string): Locator {
      // Matches row with member full name, plan, attended, remaining
      return this.page.locator(`//div[@class='summeryReportsDatatable']//tbody/tr/td[text()='${fullName}']/../td[6][text()='${attended}']/../td[7][text()='${remaining}']`);
    }



    sessionsButton(): Locator {
      return this.page.locator("//button[text()=' Sessions']");
    }

    sessionsRemainingSpan(count: string): Locator {
      return this.page.locator(`//span[text()='Session(s) Remaining: ']/span[text()='${count}']`);
    }

    memberByIndex(index: number): Locator {
      return this.page.locator(`(//a[@class='ml20 pd_0'])[${index}]`);
    }


    closeIcon(): Locator {
      return this.page.locator("//i[@class='fa fa-times text-danger']");
    }


  // --- WhatsApp Campaign and Report Methods ---
  whatsappButton(): Locator {
    return this.page.locator("//button[contains(@class,'whatsapp')]");
  }
  campaignNameInput(): Locator {
    return this.page.locator("input[placeholder='Enter here']");
  }
  templateSearchInput(): Locator {
    return this.page.locator("input[placeholder='Search by template name']");
  }
  welcomeTemplateCheckbox(): Locator {
    return this.page.locator("//label[text()='welcome']/../input");
  }
  sendMessageButton(): Locator {
    return this.page.locator("//button[text()='Send Message']");
  }
  applicationVariablesDropdown(): Locator {
    return this.page.locator("select.form-select.p-1.px-2");
  }
  customValueInput(): Locator {
    return this.page.locator("input[placeholder='Enter custom value']");
  }
  sendButton(): Locator {
    return this.page.locator("//button[text()='Send']").first();
  }
  sendButtonByIndex(index: number): Locator {
    return this.page.locator(`(//button[text()='Send'])[${index}]`);
  }
  sentPhoneNumberSpan(phone: string): Locator {
    return this.page.locator(`//span[text()='${phone}']`);
  }
  messageSentSuccessAlert(): Locator {
    return this.page.locator("//div[contains(text(),'Message sent successfully!')]");
  }
  whatsappCampaignHistoryTab(): Locator {
    return this.page.locator("//a[text()='WhatsApp Campaign History']");
  }
  campaignSearchInput(): Locator {
    return this.page.locator("input[placeholder='Search by Campaign Name']");
  }
  dayDropdown(): Locator {
    return this.page.locator("select[name='shrs']");
  }
  whatsappTableRows(): Locator {
    return this.page.locator("//div[@class='datatable whatsapptable']//tbody/tr");
  }
  whatsappTableMessageCell(campaign: string, message: string): Locator {
    return this.page.locator(`//div[@class='datatable whatsapptable']//tbody/tr/td[2][text()='${campaign}']/../td/div[text()='${message}']`);
  }
    // --- Whatsapp Notification History methods ---
    whatsappNotificationSummaryTab(): Locator {
      return this.page.locator("//a[text()='WhatsApp Notification History']");
    }
    whatsappNotificationRow(date: string, type: string,index : string): Locator {
      return this.page.locator(`(//div[@class='datatable whatsapptable']//tbody/tr/td[text()='${date}']/../td[text()='${type}']/../td[5])[${index}]`);
    }

    
    whatsappNotificationMemberCell(memberName: string): Locator {
      return this.page.locator(`//div[@class='datatable whatsapptable']//tbody/tr/td[text()='${memberName}']`);
    }
      // --- SMS History methods ---
      smsHistoryTab(): Locator {
        return this.page.locator("//a[text()='SMS History']");
      }
      smsHistorySearchInput(): Locator {
        return this.page.locator("//input[@placeholder='search here...']");
      }
      smsHistorySuspendedAlertCell(fullName: string, alertType: string, date: string): Locator {
        return this.page.locator(`//div[@class='datatable sno SMSHistortDataTable']//tbody/tr/td[contains(text(),'${fullName}')]/../td[text()='${alertType}']/../td/span[text()='${date}']`);
      }
    // --- Waiver Form and QR/Link methods ---
    showQRCodeButton(): Locator {
      return this.page.locator("//button[contains(@class,'show-qr') or text()='Show QR Code']");
    }
    copyLinkButton(): Locator {
      return this.page.locator("//button[contains(@class,'copy-link') or text()='Copy Link']");
    }
    copyLinkAlert(): Locator {
      return this.page.locator("//div[contains(text(),'Link copied') or contains(text(),'Copied to clipboard')]");
    }
    waiverSubmittedStatusCell(fullName: string): Locator {
      return this.page.locator(`//table[@class='table table-hover table-sm']/tbody/tr/td[text()='${fullName}']/../td[14]//div[text()='Submitted']/../../../td[16]/span[1]`);
    }

    cancelButton(): Locator {
      return this.page.locator("//button[text()='Cancel']");
    }

      WhatsappNotificationSummaryTab(): Locator {
    return this.page.locator("//a[text()='WhatsApp Notification History']");
  }

   SMSHistoryTab(): Locator {
    return this.page.locator("//a[text()='SMS History']");
  }

  DownloadButton(): Locator {
    return this.page.locator("//button[text()='Download']");
  }

  async DownloadFileValidation(fileName: string, expectedText: string) {
    const downloadDir = 'D:/EasyMembr_Downloads';
    const filePath = path.join(downloadDir, fileName);

    // Delete the file if it exists before starting
    if (fs.existsSync(filePath)) {
      console.log('Deleting existing file:', filePath);
      fs.unlinkSync(filePath);
    }

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.DownloadButton().click()
    ]);
    // Save the downloaded file
    await download.saveAs(filePath);
    console.log('File downloaded to:', filePath);
    const workbook = XLSX.readFile(filePath);       // read the xlsx
    const firstSheetName = workbook.SheetNames[0];  // pick first sheet
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // array of rows

    // Now assert cell content:
    const flatCells = jsonData.flat().map(cell => cell?.toString() ?? '');
    console.log('All cells in the sheet:', flatCells);
    expect(flatCells).toContain(expectedText);
    const matches = flatCells.filter(c => c === expectedText);
    console.log('Matching cells:', matches);
    // Delete the file
    fs.unlinkSync(filePath);
  }
}
