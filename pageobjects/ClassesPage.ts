import { Page, Locator, expect } from '@playwright/test';

export class ClassesPage {

     readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  availableSessionsTab(): Locator {
    return this.page.locator("//span[text()='Available Sessions']");
  }
  classTypeSelect(): Locator {
    return this.page.locator("//select[@name='classType']");
  }
  trainerSelect(): Locator {
    return this.page.locator("//select[@name='trainer']");
  }
  timeSelect(): Locator {
    return this.page.locator("//select[@name='time']");
  }
  durationSelect(): Locator {
    return this.page.locator("//select[@name='duration']");
  }
  applyButton(): Locator {
    return this.page.locator("//button[text()='Apply']");
  }
  sessionCardHeader(sessionName: string): Locator {
    return this.page.locator(`//div[@class='session-card']//h3[text()='${sessionName}']`);
  }
    clearButton(): Locator {
      return this.page.locator("//button[text()='Clear']");
    }
  membershipPlansTab(): Locator {
    return this.page.locator("//span[text()='Membership Plans']");
  }
  noAvailableSessionsText(): Locator {
    return this.page.locator("//p[text()='No available sessions found']");
  }
  planNameHeader(planName: string): Locator {
    return this.page.locator(`//h4[@class='plan-name'][text()='${planName}']`);
  }
  addToCartButton(planName: string): Locator {
    return this.page.locator(`//h4[@class='plan-name'][text()='${planName}']/../..//span[text()='  Add to Cart']`);
  }
  addedToCartSpan(): Locator {
    return this.page.locator("//span[text()='Added to Cart']");
  }
  cartIcon(): Locator {
    return this.page.locator("//div[@class='cart-icon-container me-3']");
  }
  removeFromCartButton(planName: string): Locator {
    return this.page.locator(`//h4[@class='plan-name'][text()='${planName}']/../..//span[text()='  Remove']`);
  }
 

  businessInfoTab(): Locator {
    return this.page.locator("//a[text()='BusinessInfo']");
  }
  createAnnouncementButton(): Locator {
    return this.page.locator("//button[text()='Create Announcement']");
  }
  announcementTitleInput(): Locator {
    return this.page.locator("//input[@id='announcementTitle']");
  }
  announcementDescriptionEditor(): Locator {
    return this.page.locator("//div[contains(@class,'ql-editor ql-blank')]");
  }
  selectIconButton(): Locator {
    return this.page.locator("//button[text()='Select Icon']");
  }
  firstIcon(): Locator {
    return this.page.locator("((//div[@class='d-flex flex-wrap'])[1]/div)[1]");
  }
  changeIconButton(): Locator {
    return this.page.locator("//button[text()='Change Icon']");
  }
  postAnnouncementButton(): Locator {
    return this.page.locator("//button[text()='Post Announcement']");
  }
  announcementTitleText(title: string): Locator {
    return this.page.locator(`//p[@class='bussiness-announcement-title'][text()='${title}']`);
  }
  notificationIcon(): Locator {
    return this.page.locator("//i[@class='fas fa-bullhorn m-0 notification-icon']");
  }
  announcementHeader(title: string): Locator {
    return this.page.locator(`//h5[text()='${title}']`);
  }

 
  scheduleSessionHeader(sessionName: string): Locator {
    return this.page.locator(`//h6[text()='${sessionName}']`);
  }
  sessionTypeCell(type: string): Locator {
    return this.page.locator(`//td[text()='${type}']`);
  }
  noMembershipDiscountsText(): Locator {
    return this.page.locator("//p[text()='No Membership Discounts available']");
  }
  sessionDanceText(): Locator {
    return this.page.locator("//p[text()='Dance']");
  }
  sessionCountCell(count: string, total: string): Locator {
    return this.page.locator(`//td[@class='text-success'][text()='${count}'][text()='/'][text()='${total}']`);
  }
  copyLinkIcon(): Locator {
    return this.page.locator("//i[@class='fa-regular fa-copy ']");
  }
  linkCopiedAlert(): Locator {
    return this.page.locator("//div[contains(@class,'alert') and contains(text(),'Link copied to clipboard!')]");
  }
  bookNowButton(): Locator {
    return this.page.locator("(//div[text()='Book Now'])[1]");
  }
  registerHereLink(): Locator {
    return this.page.locator("//a[text()='Register here']");
  }
  memberFirstNameInput(index: number): Locator {
    return this.page.locator(`(//input[@placeholder='First Name'])[${index}]`);
  }
  memberLastNameInput(index: number): Locator {
    return this.page.locator(`(//input[@placeholder='Last Name'])[${index}]`);
  }
  memberPhoneInput(index: number): Locator {
    return this.page.locator(`(//input[@placeholder='Enter phone number'])[${index}]`);
  }
  memberCheckbox(): Locator {
    return this.page.locator("//input[@type='checkbox']");
  }
  signatureCanvas(): Locator {
    return this.page.locator('canvas').first();
  }
  submitButton(): Locator {
    return this.page.locator("//button[text()='Submit']");
  }
  memberNameSpan(first: string, last: string): Locator {
    return this.page.locator(`//span[text()='${first}'][text()='${last}']`);
  }
  infoCardSessionHeader(sessionName: string): Locator {
    return this.page.locator(`//div[@class='info-card dashboard-upcoming-card']//h5[text()='${sessionName}']`);
  }
  infoCardBookNow(sessionName: string): Locator {
    return this.page.locator(`//div[@class='info-card dashboard-upcoming-card']//h5[text()='${sessionName}']/../..//span[text()=' Book Now']`);
  }
  bookClassHeader(): Locator {
    return this.page.locator("//h5[text()='Book a Class']");
  }
  bookedClassInfo(first: string, last: string, phone: string): Locator {
    return this.page.locator(`//div[text()='${first} ${last}, +91${phone}']`);
  }
  confirmButton(): Locator {
    return this.page.locator("//button[text()='Confirm']");
  }
  bookedMemberStrong(first: string, last: string): Locator {
    return this.page.locator(`//strong[text()='${first} ${last}']`);
  }
  payButton(): Locator {
    return this.page.locator("//button[text()='Book']");
  }
  mobileNumberInput(): Locator {
    return this.page.locator("//input[@placeholder='Mobile number']");
  }
  netbankingOption(): Locator {
    return this.page.locator("//div[@data-value='netbanking']");
  }
  bankOfBarodaOption(): Locator {
    return this.page.locator("(//span[text()='Bank of Baroda - Retail Banking'])[1]");
  }
  paymentSuccessDiv(): Locator {
    return this.page.locator("//div[@class='success']");
  }
  bookingSuccessText(): Locator {
    return this.page.locator("//p[text()='Your class has been booked successfully.']");
  }
  homeButton(): Locator {
    return this.page.locator("//button[text()='Home']");
  }
  transactionsTab(): Locator {
    return this.page.locator("//span[text()='Transactions']");
  }
  sessionsTransactionsTab(): Locator {
    return this.page.locator("//span[text()=' Sessions Transactions']");
  }
  sessionTransactionRow(sessionName: string): Locator {
    return this.page.locator(`//tbody[@class='datatable-body']/tr/td[text()='${sessionName}']`);
  }
  logoutTab(): Locator {
    return this.page.locator("//span[text()='Logout']");
  }
  classTransactionTab(): Locator {
    return this.page.locator("//a[text()='Class Transaction']");
  }
  todaySelect(): Locator {
    return this.page.locator("//select[@id='shr']");
  }
  transactionMemberDiv(first: string, last: string,schedulename: string): Locator {
    return this.page.locator(`//div[text()='${first} ${last}']/../../td[text()='${schedulename}']`);
  }

 
  dashboardScheduleCount(): Locator {
    return this.page.locator("(//h5[@class='clr-main'])[1]");
  }
  scheduleClassSelect(): Locator {
    return this.page.locator("//select[@name='classid']");
  }
  scheduleTrainerSelect(): Locator {
    return this.page.locator("//select[@name='trainerid']");
  }
  datepickerInputContainer(): Locator {
    return this.page.locator("(//div[@class='react-datepicker__input-container'])");
  }
  datepickerNextDay(): Locator {
    return this.page.locator("(//div[@aria-current='date']/following::div)[1]");
  }
  scheduleTimeInput(): Locator {
    return this.page.locator("//div[@class='form-outline timepicker']/input");
  }
  scheduleLocationInput(): Locator {
    return this.page.locator("//input[@name='location']");
  }
  cancellationPolicySelect(): Locator {
    return this.page.locator("//select[@name='cancellationpolicyid']");
  }
  visibleDaysBeforeInput(): Locator {
    return this.page.locator("//input[@id='visibledaysbeforeInput']");
  }
  scheduleFutureCell(className: string, time: string): Locator {
    return this.page.locator(`(//td[contains(@class,'future fc-daygrid-day')])[1]//strong[text()='${className}']/../../p[text()='${time}']`);
  }
  // Trash icon for a scheduled event row (h6 header with title attribute 'Trash')
  scheduleTrashIcon(scheduleName: string): Locator {
    return this.page.locator(`//h6[text()='${scheduleName}']/..//i[@title='Trash']`);
  }
  cardTab(): Locator {
    return this.page.locator("//a[text()='Card']");
  }
  cardSearchInput(): Locator {
    return this.page.locator("//input[@placeholder='Search']");
  }
  cardStatusSelect(): Locator {
    return this.page.locator("//select[@class='form-select']");
  }
  cardClassHeader(className: string): Locator {
    return this.page.locator(`//h5[text()='${className}']`);
  }
  cardClassTime(time: string): Locator {
    return this.page.locator(`(//p[text()='${time}'])[2]`);
  }
  cardClassLocation(location: string): Locator {
    return this.page.locator(`(//p[text()='${location}'])`);
  }

 
  activitiesTab(): Locator {
    return this.page.locator("//a[text()=' Activities']");
  }
  activitiesDateSelect(): Locator {
    return this.page.locator("//select[@id='shr']");
  }
  cancellationPolicyDeletedLog(policyName: string): Locator {
    return this.page.locator(`//td[text()='Cancellation policy deleted sucessfully(${policyName})']`);
  }



  cancellationPolicyTab(): Locator {
    return this.page.locator("//a[text()='Cancelation Policy']");
  }
  createPolicyButton(): Locator {
    return this.page.locator("//button[text()='Create Policy']");
  }
  cancellationPolicyHeader(): Locator {
    return this.page.locator("//h5[text()='Cancellation Policy']");
  }
  fullNameInput(): Locator {
    return this.page.locator("//input[@placeholder='Enter Full Name']");
  }
  addRowIcon(): Locator {
    return this.page.locator("//i[@class='fas fa-plus']");
  }
  numberInput(index: number): Locator {
    return this.page.locator(`(//input[@type='number'])[${index}]`);
  }
  policyCheckbox(index: number): Locator {
    return this.page.locator(`(//div[@class='mb- d-flex align-items-center'])[${index}]//input[@class='form-check-input']`);
  }
  descriptionInput(): Locator {
    return this.page.locator("//div[@data-placeholder='Description']");
  }
  savePolicyButton(): Locator {
    return this.page.locator("//button[text()='Save']");
  }
  policySearchInput(): Locator {
    return this.page.locator("(//div[@class='mt-3 CancelationPolicydatatable']//input)[1]");
  }
  policyTableRows(): Locator {
    return this.page.locator("//div[@class='mt-3 CancelationPolicydatatable']//tbody/tr");
  }
  policyRow(name: string): Locator {
    return this.page.locator(`//div[@class='mt-3 CancelationPolicydatatable']//tbody/tr/td[text()='${name}']`);
  }
  policyRowDetails(name: string, description: string): Locator {
    return this.page.locator(`//div[@class='mt-3 CancelationPolicydatatable']//tbody/tr/td[text()='${name}']/../td//p[text()='${description}']/../../../td/ul/li[text()='1'][text()='90']/../li[2][text()='2'][text()='50']`);
  }

  

  trainersTab(): Locator {
    return this.page.locator("//a[text()='Trainers']");
  }
  searchUsersInput(): Locator {
    return this.page.locator("//input[@placeholder='Search Users...']");
  }
  noUsersFoundText(): Locator {
    return this.page.locator("//p[text()='No users found.']");
  }
  trainerDeleteIcon(name: string): Locator {
    return this.page.locator(`//h5[text()='${name}']/..//i[@class='fa fa-trash fs-6']`);
  }
  deleteButton(): Locator {
    return this.page.locator("//button[text()='Delete']");
  }

  Modal_DeleteButton(): Locator {
    return this.page.locator("//div[@class='modal-footer pe-2 pb-2']//button[text()='Delete']");
  }
  addTrainerButton(): Locator {
    return this.page.locator("//button[text()='Add Trainer']");
  }
  addNewTrainerHeader(): Locator {
    return this.page.locator("//h5[text()='Add New Trainer']");
  }
  trainerFirstNameInput(): Locator {
    return this.page.locator("//input[@name='firstname']");
  }
  trainerLastNameInput(): Locator {
    return this.page.locator("//input[@name='lastname']");
  }
  trainerUsernameInput(): Locator {
    return this.page.locator("//input[@name='username']");
  }
  trainerPasswordInput(): Locator {
    return this.page.locator("//input[@name='password1']");
  }
  trainerGenderSelect(): Locator {
    return this.page.locator("//select[@name='gender']");
  }
  trainerAgeInput(): Locator {
    return this.page.locator("//input[@name='age']");
  }
  trainerEmailInput(): Locator {
    return this.page.locator("//input[@name='email']");
  }
  trainerPhoneInput(): Locator {
    return this.page.locator("//input[@class='PhoneInputInput']");
  }
  trainerRoleSelect(): Locator {
    return this.page.locator("//select[@class='form-select']");
  }
  addTrainerSubmitButton(): Locator {
    return this.page.locator("//button[text()='Add']");
  }
  trainerCardHeader(name: string): Locator {
    return this.page.locator(`//h5[text()='${name}']`);
  }
  trainerCardEmail(email: string): Locator {
    return this.page.locator(`//p[text()='${email}']`);
  }
  trainerCardPhone(phone: string): Locator {
    return this.page.locator(`//p[text()='${phone}']`);
  }
  trainerCardRole(role: string): Locator {
    return this.page.locator(`//p[text()='${role}']`);
  }


  classesTab(): Locator {
    return this.page.locator("//a[text()='Classes']");
  }
  classCategoriesTab(): Locator {
    return this.page.locator("//a[text()='Class Categories']");
  }
  addNewCategoryButton(): Locator {
    return this.page.locator("//button[text()='Add New Category']");
  }
  createClassCategoryHeader(): Locator {
    return this.page.locator("//h5[text()='Create Class Category']");
  }
  categoryNameInput(): Locator {
    return this.page.locator("//label[text()='Category Name']/../input");
  }
  createCategoryButton(): Locator {
    return this.page.locator("//button[text()='Create']");
  }
  trainerSummaryFirstInput(): Locator {
    return this.page.locator("(//div[contains(@class,'trainerSummeryDataTable')]//input)[1]");
  }
  categoryRow(name: string): Locator {
    return this.page.locator(`//tbody[@class='datatable-body']/tr[1]/td[text()='${name}']`);
  }
  dashboardTab(): Locator {
    return this.page.locator("//a[text()='Dashboard']");
  }
  addNewClassButton(): Locator {
    return this.page.locator("//button[text()='Add New Class']");
  }
  categoryOptionInAddClass(name: string): Locator {
    return this.page.locator(`(//select[@name='category'])[2]/option[@value='${name}']/..`);
  }
  closeButton(): Locator {
    return this.page.locator("//button[@class='ripple ripple-surface btn-close']");
  }
      categoryEditIcon(name: string): Locator {
    return this.page.locator(`//tbody[@class='datatable-body']/tr[1]/td[text()='${name}']/../td[3]/span[1]/i[@class='fas fa-edit fs-6 ps-2']`);
  }

     categoryDeleteIcon(name: string): Locator {
    return this.page.locator(`//tbody[@class='datatable-body']/tr[1]/td[text()='${name}']/../td[3]/span[2]/i[@class='fas fa-trash fs-6 ps-2']`);
  }

    deleteClassCategoryHeader(): Locator {
    return this.page.locator("//h5[text()='Confirm Deletion']");
  }


    NoresultsFound(): Locator {
    return this.page.locator("//td[text()='No matching results found']");
  }

   dashboardClassCount(): Locator {
    return this.page.locator("(//h2[@class='clr-main'])[1]");
  }
  addClassHeader(): Locator {
    return this.page.locator("//h5[text()='Add Class']");
  }
  classNameInput(): Locator {
    return this.page.locator("//input[@name='name']");
  }
  classDurationInput(): Locator {
    return this.page.locator("//input[@name='duration']");
  }
  classSlotsInput(): Locator {
    return this.page.locator("//input[@name='slots']");
  }
  classPriceInput(): Locator {
    return this.page.locator("//input[@name='price']");
  }
  categorySelect(): Locator {
    return this.page.locator("(//select[@name='category'])[2]");
  }
  customPlanSelector(): Locator {
    return this.page.locator("//div[@class='custom-plan-selector']/div");
  }
  raghuCheckbox(): Locator {
    return this.page.locator("//label[text()='raghu']/../input");
  }
  discountInput(): Locator {
    return this.page.locator("//input[@placeholder='Discount']");
  }
  removeButton(): Locator {
    return this.page.locator("//button[text()='Remove']");
  }
  selectedSpan(): Locator {
    return this.page.locator("//span[text()='1 selected']");
  }
  descriptionEditor(): Locator {
    return this.page.locator("//div[contains(@class,'ql-editor')]");
  }
  saveClassButton(): Locator {
    return this.page.locator("//button[text()='Save']");
  }
  searchClassInput(): Locator {
    return this.page.locator("//input[@placeholder='Search by Class Name']");
  }
  beginnerSelect(): Locator {
    return this.page.locator("(//select[@class='form-select form-select-sm'])[1]");
  }
  automationSelect(): Locator {
    return this.page.locator("(//select[@class='form-select form-select-sm'])[2]");
  }
  cardBodies(): Locator {
    return this.page.locator("//div[@class='card-body']");
  }
  classHeader(name: string): Locator {
    return this.page.locator(`//h5[text()='${name}']`);
  }
  classDurationText(duration: string): Locator {
    return this.page.locator(`//p[text()='${duration}']`);
  }
  classCategoryText(category: string): Locator {
    return this.page.locator(`//p[text()='${category}']`);
  }
  classSlotsText(slots: string): Locator {
    return this.page.locator(`//p[text()='${slots}']`);
  }
  classPriceText(price: string): Locator {
    return this.page.locator(`//p[text()='${price}']`);
  }
  raghuDiscountText(): Locator {
    return this.page.locator("//div[text()='raghu'][text()='50']");
  }
  danceText(): Locator {
    return this.page.locator("//p[text()='Dance']");
  }
  beginnerBadge(): Locator {
    return this.page.locator("//span[@class='badge badge-primary ms-2'][text()='Beginner']");
  }
  schedulesTab(): Locator {
    return this.page.locator("//a[text()='Schedules']");
  }
  addNewScheduleButton(): Locator {
    return this.page.locator("//button[text()='Add New Schedule']");
  }
  scheduleClassOption(name: string): Locator {
    return this.page.locator(`//select[@name='classid']/option[text()='${name}']/..`);
  }

  classEditButton(name: string): Locator {
    return this.page.locator(`//h5[text()='${name}']/../..//button[text()='Edit']`);
  }

  selectLevel(): Locator{
    return this.page.locator("(//select[@class='form-select'])[2]");
  }

  updateButton(): Locator {
    return this.page.locator("//button[text()='Update']");
  }

    IntermediateBadge(): Locator {
    return this.page.locator("//span[@class='badge badge-primary ms-2'][text()='Intermediate']");
  }

  comedyText(): Locator {
    return this.page.locator("//p[text()='Comedy']");
  }

  classDeleteButton(name: string): Locator {
    return this.page.locator(`//h5[text()='${name}']/../..//button[text()='Delete']`);
  }

    scheduleTrainerOption(name: string): Locator {
    return this.page.locator(`//select[@name='trainerid']/option[text()='${name}']/..`);
  }


    TrainerEditButton(name: string): Locator {
    return this.page.locator(`//h5[text()='${name}']/..//i[@class='fa fa-edit fs-6']`);
  }

   updateTrainerHeader(): Locator {
    return this.page.locator("//h5[text()='Update Trainer']");
  }

   Trainer_FirstNameValueValidation(name: string): Locator {
    return this.page.locator(`//input[@name='firstname'][@value='${name}']`);
  }

    schedulePolicyOption(name: string): Locator {
    return this.page.locator(`//select[@name='cancellationpolicyid']/option[text()='${name}']/..`);
  }

  policyEditButton(name: string,description: string): Locator {
    return this.page.locator(`//div[@class='mt-3 CancelationPolicydatatable']//tbody/tr/td[text()='${name}']/../td//p[text()='${description}']/../../../td//i[@class='fa fa-edit me-3 fs-6']`);
  }

   editpolicyRowDetails(name: string, description: string): Locator {
    return this.page.locator(`//div[@class='mt-3 CancelationPolicydatatable']//tbody/tr/td[text()='${name}']/../td//p[text()='${description}']/../../../td/ul/li[text()='1'][text()='70']/../li[2][text()='2'][text()='50']`);
  }

    policyDeleteButton(name: string,description: string): Locator {
    return this.page.locator(`//div[@class='mt-3 CancelationPolicydatatable']//tbody/tr/td[text()='${name}']/../td//p[text()='${description}']/../../../td//i[@class='fa fa-trash fs-6']`);
  }

  deleteConfirmationText(): Locator {
    return this.page.locator("//h5[text()='Confirm Deletion']");
  }

  // Button in the delete confirmation modal to delete only this event
  deleteOnlyThisEventButton(): Locator {
    return this.page.locator("//button[text()='Delete Only This Event']");
  }

  // Returns a locator for a strong element with the schedule name
  scheduledStrong(name: string): Locator {
    return this.page.locator(`//strong[text()='${name}']`);
  }

  // One-time toggle span
  oneTimeToggleSpan(): Locator {
    return this.page.locator("//input[@name='onetime']/..//span");
  }

  // Recurrence select (e.g., Weekly)
  recurrenceSelect(): Locator {
    return this.page.locator("//select[@name='recurrence']");
  }

  // Recurrence day toggles (e.g., Mon, Tue)
  recurrenceDay(day: string): Locator {
    return this.page.locator(`//div[text()='${day}']`);
  }

  // Generic edit icon for a schedule; if scheduleName provided, scope to that schedule
  scheduleEditIcon(scheduleName?: string): Locator {
    if (scheduleName) {
      return this.page.locator(`//h6[text()='${scheduleName}']/..//i[@title='Edit']`);
    }
    return this.page.locator("//i[@title='Edit']");
  }

  // Click the div following the aria-selected element (used in some pickers)
  ariaSelectedNextDiv(): Locator {
    return this.page.locator("//div[@aria-selected='true']/following::div[1]");
  }

  // Toggle span for private flag
  isPrivateToggleSpan(): Locator {
    return this.page.locator("//input[@name='isprivate']/../span");
  }

  // Nth future schedule cell (index starts at 1)
  scheduleFutureCellNth( className: string, time: string): Locator {
    return this.page.locator(`(//td[contains(@class,'future fc-daygrid-day')])//strong[text()='${className}']/../../p[text()='${time}']`);
  }

  noCancellationPolicyText(): Locator {
    return this.page.locator("//p[text()='No cancellation policy available']");
  }

  filterclass(): Locator {
    return this.page.locator("(//input[@class='form-control select-input'])[1]");
  }

  filterSearch(): Locator {   
    return this.page.locator("//input[@placeholder='Search...']");
  }

   optionVisible(optionText: string): Locator {   
    return this.page.locator(`(//span[@class='select-option-text'])[2][text()='${optionText}']`);
  }

  ModulesTab(): Locator {   
    return this.page.locator(`//button[text()='Modules']`);
  }

    easyMember(): Locator {   
    return this.page.locator(`//a[text()='EasyMembr']`);
  }

  easyMember_Dashboard(): Locator {   
    return this.page.locator(`//a[text()=' Dashboard']`);  
}

  easyBook(): Locator {   
    return this.page.locator(`//a[text()='EasyBook']`);
  }

   dashboardBookingCount(): Locator {
    return this.page.locator("(//h2[@class='clr-main'])[2]");
  }

   dashboardPaymentreceivedCount(): Locator {
    return this.page.locator("(//h2[@class='clr-main'])[3]");
  }

  
}
