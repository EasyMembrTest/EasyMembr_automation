import { test, expect, Browser, Page } from '@playwright/test';
import { ClassesPage } from '../pageobjects/ClassesPage';
import testdata from '../testdata.json';
import { LoginPage } from '../pageobjects/LoginPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import * as fs from 'fs';
import * as path from 'path';
const { chromium } = require('@playwright/test');


const tempFile = path.join(__dirname, 'temp.json');

test.describe('ScheduleValidations', () => {
  let browser: Browser;
  let page: Page;
  let classesPage: ClassesPage;
  let loginPage: LoginPage;

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
    classesPage = new ClassesPage(page);
    loginPage = new LoginPage(page);
    await loginPage.gotoClassLogin();
    await loginPage.classmemberEmailInput().fill(testdata.email);
    await loginPage.classmemberPasswordInput().fill(testdata.password);
    await loginPage.loginButton().click();
    await expect(classesPage.dashboardTab()).toBeVisible();
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

  test('CreateScheduleOneTime_VerifyDashboardCount', async () => {
    let ScheduleClassNameSetup: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
    updateTempJson({ ScheduleClassNameSetup });
    console.log('Saved ScheduleClassNameSetup to temp.json:', ScheduleClassNameSetup);
    await classesPage.dashboardTab().click();
    await classesPage.classesTab().click();
    await classesPage.addNewClassButton().click();
    await expect(classesPage.addClassHeader()).toBeVisible();
    await classesPage.classNameInput().click();
    await classesPage.classNameInput().fill(ScheduleClassNameSetup);
    await classesPage.classDurationInput().click();
    await classesPage.classDurationInput().fill(testdata.ClassDuration);
    await classesPage.classSlotsInput().click();
    await classesPage.classSlotsInput().fill(testdata.ClassMemberCapacity);
    await classesPage.classPriceInput().click();
    await classesPage.classPriceInput().fill(testdata.ClassPrice);
    await classesPage.categorySelect().selectOption({ label: testdata.ClassCategory });
    await classesPage.descriptionEditor().click();
    await classesPage.descriptionEditor().fill(testdata.ClassDescription);
    await classesPage.saveClassButton().click();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await classesPage.dashboardTab().click();
    await page.waitForTimeout(3000);
    const initialCountText = await classesPage.dashboardScheduleCount().innerText();
    const InitialTotalScheduleCount = parseInt(initialCountText);
    await classesPage.schedulesTab().click();
    await classesPage.addNewScheduleButton().click();
    await classesPage.scheduleClassSelect().selectOption({ label: ScheduleClassNameSetup });
    await classesPage.scheduleTrainerSelect().selectOption({ label: testdata.trainer });
    await classesPage.datepickerInputContainer().click();
    await page.waitForTimeout(2000);
    await classesPage.datepickerNextDay().click();
    await classesPage.scheduleTimeInput().fill('06:30 AM');
    await classesPage.scheduleLocationInput().fill('Hyderabad');
    await classesPage.cancellationPolicySelect().selectOption({ index: 1 });
    await classesPage.visibleDaysBeforeInput().fill('2');
    await classesPage.saveClassButton().click();
    await expect(classesPage.scheduleFutureCell(ScheduleClassNameSetup, '06:30 AM')).toBeVisible();
    await classesPage.dashboardTab().click();
    await page.waitForTimeout(3000);
    const finalCountText = await classesPage.dashboardScheduleCount().innerText();
    const FinalTotalScheduleCount = parseInt(finalCountText);
    console.log("InitialTotalScheduleCount: " + InitialTotalScheduleCount);
    console.log("FinalTotalScheduleCount: " + FinalTotalScheduleCount);
    expect(FinalTotalScheduleCount).toBe(InitialTotalScheduleCount + 1);
    await classesPage.schedulesTab().click();
    await classesPage.cardTab().click();
    await classesPage.cardSearchInput().fill(ScheduleClassNameSetup);
    await classesPage.cardStatusSelect().selectOption({ label: 'Active' });
    await classesPage.applyButton().click();
    await page.waitForTimeout(2000);
    await expect(classesPage.cardClassHeader(ScheduleClassNameSetup)).toBeVisible();
    await expect(classesPage.cardClassTime('06:30 AM')).toBeVisible();
    await expect(classesPage.cardClassLocation('Hyderabad')).toBeVisible();
  });

  test('CopytheSessionFromCalendar_LoginMemberBoard_BookSession_VerifyMemberBoardTransactions_VerifyEasyBookClassTransaction_CreateAnnouncement_VerifyMemberBoard_CheckFiltersAvailableSessions_VerifyAddToCartInMembershipPlans_MemberBoard', async () => {
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await classesPage.dashboardTab().click();
    await page.waitForTimeout(3000);
    const initialBookingCountText = await classesPage.dashboardBookingCount().innerText();
    const InitialTotalBookingCount = parseInt(initialBookingCountText);
    const initialPaymentCountText = await classesPage.dashboardPaymentreceivedCount().innerText();
    const InitialTotalPaymentCount = parseInt(initialPaymentCountText);
    //Create Announcement and Verify in Member Board
    await classesPage.businessInfoTab().click();
    await classesPage.createAnnouncementButton().click();
    let announcement: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
    await classesPage.announcementTitleInput().fill(announcement);
    await classesPage.announcementDescriptionEditor().fill('Diwali');
    await classesPage.selectIconButton().click();
    await classesPage.firstIcon().click();
    await expect(classesPage.changeIconButton()).toBeVisible();
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Announcement posted successfully!');
      await dialog.accept();
    });
    await classesPage.postAnnouncementButton().click();
    await expect(classesPage.announcementTitleText(announcement)).toBeVisible();
    // 1. Open schedules and click session
    await classesPage.dashboardTab().click();
    await classesPage.schedulesTab().click();
    await classesPage.scheduleFutureCell(data.ScheduleClassNameSetup, '06:30 AM').click();
    await expect(classesPage.scheduleSessionHeader(data.ScheduleClassNameSetup)).toBeVisible();
    await expect(classesPage.sessionTypeCell('Pubilc')).toBeVisible();
    await expect(classesPage.noMembershipDiscountsText()).toBeVisible();
    await expect(classesPage.sessionDanceText()).toBeVisible();
    await expect(classesPage.sessionCountCell('0', '2')).toBeVisible();
    await classesPage.copyLinkIcon().click();
    await expect(classesPage.linkCopiedAlert()).toBeVisible();
    await page.locator("//button[@class='ripple ripple-surface btn btn-secondary']").click();

    // 2. Launch new browser, paste link, verify session details, book
    const clipboardy = await import('clipboardy');
    const newBrowser = await chromium.launch({ headless: false });
    const newPage = await newBrowser.newPage();
    const copiedUrl = await clipboardy.default.read(); 
   console.log('URL from clipboard:', copiedUrl);
    await newPage.goto(copiedUrl);
    await newPage.waitForTimeout(5000);
    // Verify session details on new page
    const newClassesPage = new ClassesPage(newPage);
   
    // Book session as member
    await newClassesPage.bookNowButton().click();
    await newClassesPage.registerHereLink().click();
    await newClassesPage.memberFirstNameInput(1).fill('vamsi');
    await newClassesPage.memberLastNameInput(1).fill('reddy');
    await newClassesPage.memberFirstNameInput(2).fill('shiva');
    await newClassesPage.memberLastNameInput(2).fill('lucky');
    await newClassesPage.memberPhoneInput(1).fill('9874562138');
    await newClassesPage.memberCheckbox().click();
    await newPage.waitForTimeout(2000);
    const canvasNew = await newClassesPage.signatureCanvas();
    await canvasNew.click({ position: { x: 50, y: 50 } });
    await canvasNew.hover();
    await expect(newClassesPage.clearButton()).toBeVisible();
    await newClassesPage.submitButton().click();
    await expect(newClassesPage.memberNameSpan('vamsi', 'reddy')).toBeVisible();
    await expect(newClassesPage.infoCardSessionHeader(data.ScheduleClassNameSetup)).toBeVisible();
    await newClassesPage.infoCardBookNow(data.ScheduleClassNameSetup).click();
    await newPage.waitForTimeout(2000);
    await expect(newClassesPage.bookClassHeader()).toBeVisible();
    await expect(newClassesPage.bookedClassInfo('vamsi', 'reddy', '9874562138')).toBeVisible();
    await newClassesPage.bookedClassInfo('vamsi', 'reddy', '9874562138').click();
    await newClassesPage.confirmButton().click();
    await expect(newClassesPage.bookedMemberStrong('vamsi', 'reddy')).toBeVisible();
    await newClassesPage.payButton().click();
  //   await newPage.waitForTimeout(4000);
  //   const razorpayFrame = await newPage.frameLocator('iframe[src*="razorpay.com"]');
  //   await razorpayFrame.fill('//input[@placeholder="Mobile number"]', '9874562138');
  //   await razorpayFrame.click('//div[@data-value="netbanking"]');
  //   await razorpayFrame.click('(//span[text()="Bank of Baroda - Retail Banking"])[1]');
  //   const [popup] = await Promise.all([
  //    newClassesPage.page.context().waitForEvent('page'), // waits for popup
  //    await razorpayFrame.click('(//span[text()="Bank of Baroda - Retail Banking"])[1]'), // triggers popup open
  //  ]);
  //   await popup.waitForLoadState();
  //   await newPage.waitForTimeout(3000);
  //   await expect(newClassesPage.paymentSuccessDiv()).toBeVisible({ timeout: 120000 });
  //   await newClassesPage.paymentSuccessDiv().click();
    await expect(newClassesPage.bookingSuccessText()).toBeVisible({ timeout: 120000 });
    await newClassesPage.homeButton().click();
    await newClassesPage.transactionsTab().click();
    await newClassesPage.sessionsTransactionsTab().click();
    await expect(newClassesPage.sessionTransactionRow(data.ScheduleClassNameSetup)).toBeVisible();

    //Verify Announcement in Member Board
    await newClassesPage.notificationIcon().click();
    await expect(newClassesPage.announcementHeader(announcement)).toBeVisible();

     // Go to Available Sessions tab
    await newClassesPage.availableSessionsTab().click();
    await expect(newClassesPage.availableSessionsTab()).toBeVisible();
    await newClassesPage.classTypeSelect().selectOption({ label: data.ScheduleClassNameSetup });
    await newClassesPage.trainerSelect().selectOption({ label: testdata.trainer });
    await newClassesPage.timeSelect().selectOption({ label: 'AM' });
    await newClassesPage.durationSelect().selectOption({ label: '30m' });
    await newClassesPage.applyButton().click();
    await page.waitForTimeout(2000);
    await expect(newClassesPage.sessionCardHeader(data.ScheduleClassNameSetup)).toBeVisible();
    await newClassesPage.clearButton().click();
    await newClassesPage.membershipPlansTab().click();
    await newClassesPage.availableSessionsTab().click();
    await newClassesPage.classTypeSelect().selectOption({ label: data.ScheduleClassNameSetup });
    await newClassesPage.timeSelect().selectOption({ label: 'PM' });
    await newClassesPage.applyButton().click();
    await page.waitForTimeout(2000);
    await expect(newClassesPage.noAvailableSessionsText()).toBeVisible();
    await newClassesPage.membershipPlansTab().click();
    await expect(newClassesPage.planNameHeader(testdata.planNameSetup)).toBeVisible();
    await expect(newClassesPage.planNameHeader(testdata.planNameSetup1)).not.toBeVisible();
    await newClassesPage.addToCartButton(testdata.planNameSetup).click();
    await expect(newClassesPage.addedToCartSpan()).toBeVisible();
    await newClassesPage.cartIcon().click();
    await newClassesPage.removeFromCartButton(testdata.planNameSetup).click();

    await newClassesPage.logoutTab().click();

    await newBrowser.close();
   

    // 3. Verify transaction in main browser
    await classesPage.classTransactionTab().click();
    await classesPage.todaySelect().selectOption({ label: 'Today' });
    await classesPage.applyButton().click();
    await expect(classesPage.transactionMemberDiv('vamsi', 'reddy', data.ScheduleClassNameSetup)).toBeVisible();
    await classesPage.schedulesTab().click();
    await classesPage.scheduleFutureCell(data.ScheduleClassNameSetup, '06:30 AM').click();
    await expect(classesPage.scheduleSessionHeader(data.ScheduleClassNameSetup)).toBeVisible();
    await expect(classesPage.sessionCountCell('1', '2')).toBeVisible();
    await page.locator("//button[@class='ripple ripple-surface btn btn-secondary']").click();

    await classesPage.dashboardTab().click();
    await page.waitForTimeout(3000);
    const FinalBookingCountText = await classesPage.dashboardBookingCount().innerText();
    const FinalTotalBookingCount = parseInt(FinalBookingCountText);
    console.log("InitialTotalBookingCount: " + InitialTotalBookingCount);
    console.log("FinalTotalBookingCount: " + FinalTotalBookingCount);
    expect(FinalTotalBookingCount).toBe(InitialTotalBookingCount + 1);
    const FinalPaymentCountText = await classesPage.dashboardPaymentreceivedCount().innerText();
    const FinalTotalPaymentCount = parseInt(FinalPaymentCountText);
    console.log("InitialTotalPaymentCount: " + InitialTotalPaymentCount);
    console.log("FinalTotalPaymentCount: " + FinalTotalPaymentCount);
    expect(FinalTotalPaymentCount).toBe(InitialTotalPaymentCount + 1000);
  });

  test('VerifyBookedSession_EasybookActivitiesLogEvents', async () => {
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await classesPage.activitiesTab().click();
    await classesPage.activitiesDateSelect().selectOption({ label: 'Today' });
    await classesPage.applyButton().click();
    await page.waitForTimeout(2000);
    await expect(page.locator("//td[text()='Class (" + data.ScheduleClassNameSetup + ") booked by (vamsi reddy)']")).toBeVisible();

  })

  test('DeleteMember', async () => {
      await classesPage.ModulesTab().click();
      await classesPage.easyMember().click();
      await loginPage.membersManagementTab().click();
      await loginPage.membersSearchInput().fill(`vamsi reddy`);
      await loginPage.membersApplyButton().click();
      await page.waitForTimeout(3000);
      page.once('dialog', async dialog => {
      expect(dialog.message()).toBe("Are you sure want to delete this Member?");
      await dialog.accept();
     });
      await page.click("//span[@class='ml20']/img[@alt='Delete']");
      await loginPage.SuccessAlert("Member deleted successfully");
      await classesPage.easyMember_Dashboard().click();
      await classesPage.ModulesTab().click();
      await classesPage.easyBook().click();
  })

  test('DeleteSchedule', async () => {
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await page.setViewportSize({ width: 1920, height: 1080 });
    await classesPage.dashboardTab().click();
    await classesPage.schedulesTab().click();
    await classesPage.scheduleFutureCell(data.ScheduleClassNameSetup, '06:30 AM').click();
    await expect(classesPage.scheduleSessionHeader(data.ScheduleClassNameSetup)).toBeVisible();
    await classesPage.scheduleTrashIcon(data.ScheduleClassNameSetup).click();
    await classesPage.deleteOnlyThisEventButton().click();
    await classesPage.dashboardTab().click();
    await classesPage.schedulesTab().click();
    await expect(classesPage.scheduleFutureCell(data.ScheduleClassNameSetup, '06:30 AM')).not.toBeVisible();
  });

  test('CreateScheduleRecurrence', async () => {
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await page.setViewportSize({ width: 1920, height: 1080 });
    await classesPage.schedulesTab().click();
    await expect(classesPage.scheduledStrong(data.ScheduleClassNameSetup)).not.toBeVisible();
    await classesPage.addNewScheduleButton().click();
    await classesPage.scheduleClassSelect().selectOption({ label: data.ScheduleClassNameSetup });
    await classesPage.scheduleTrainerSelect().selectOption({ label: testdata.trainer });
    await classesPage.datepickerInputContainer().click();
    await page.waitForTimeout(2000);
    await classesPage.datepickerNextDay().click();
    await classesPage.scheduleTimeInput().fill('06:30 AM');
    await classesPage.scheduleLocationInput().fill('Hyderabad');
    await classesPage.cancellationPolicySelect().selectOption({ index: 1 });
    await classesPage.visibleDaysBeforeInput().fill('2');
    await classesPage.oneTimeToggleSpan().click();
    await classesPage.recurrenceSelect().selectOption({ label: 'Weekly' });
    await classesPage.recurrenceDay('Mon').click();
    await classesPage.saveClassButton().click();
    await page.waitForTimeout(2000);
    const occurrences = await page.locator(`//strong[text()='${data.ScheduleClassNameSetup}']`).count();
    expect(occurrences).toBeGreaterThan(1);
  });


  test('DeleteRecurrenceSchedule', async () => {
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await page.setViewportSize({ width: 1920, height: 1080 });
    await classesPage.schedulesTab().click();
    await page.locator(`(//strong[text()='${data.ScheduleClassNameSetup}'])[1]`).click();
    await classesPage.scheduleTrashIcon(data.ScheduleClassNameSetup).click();
    await page.locator("//button[text()='Delete All Recurring Events']").click();
    await classesPage.dashboardTab().click();
    await classesPage.schedulesTab().click();
    await expect(page.locator(`//strong[text()='${data.ScheduleClassNameSetup}']`)).not.toBeVisible();

  })

  test('Create_Edit_ScheduleOneTime', async () => {
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    const ScheduleClassNameSetup = data.ScheduleClassNameSetup;
    // 1. Create a one-time schedule
    await classesPage.schedulesTab().click();
    await classesPage.addNewScheduleButton().click();
    await classesPage.scheduleClassSelect().selectOption({ label: ScheduleClassNameSetup });
    await classesPage.scheduleTrainerSelect().selectOption({ label: testdata.trainer });
    await classesPage.datepickerInputContainer().click();
    await page.waitForTimeout(2000);
    await classesPage.datepickerNextDay().click();
    await classesPage.scheduleTimeInput().fill('06:30 AM');
    await classesPage.scheduleLocationInput().fill('Hyderabad');
    await classesPage.cancellationPolicySelect().selectOption({ index: 1 });
    await classesPage.visibleDaysBeforeInput().fill('2');
    await classesPage.saveClassButton().click();
    await expect(classesPage.scheduleFutureCell(ScheduleClassNameSetup, '06:30 AM')).toBeVisible();

    // 2. Open and edit the created schedule
    await classesPage.scheduleFutureCell(ScheduleClassNameSetup, '06:30 AM').click();
    await classesPage.scheduleEditIcon(ScheduleClassNameSetup).click();
    // change trainer
    await classesPage.scheduleTrainerSelect().selectOption({ label: 'manikamta manikamta' });
    await classesPage.datepickerInputContainer().click();
    await page.waitForTimeout(2000);
    // interact with aria-selected following div
    await classesPage.ariaSelectedNextDiv().click();
    await classesPage.scheduleTimeInput().fill(' ')
    await classesPage.scheduleTimeInput().fill('07:30 AM');
    await classesPage.scheduleLocationInput().fill('Palakol');
    await classesPage.cancellationPolicySelect().selectOption({ index: 0 });
    await classesPage.visibleDaysBeforeInput().fill('3');
    // toggle private
    await classesPage.isPrivateToggleSpan().click();
    // click Update
    await classesPage.updateButton().click();
    await page.waitForTimeout(2000);
    // close any modal
    await page.locator("//button[@class='ripple ripple-surface btn btn-secondary']").click();

    // 7. original time should not be visible
    await expect(classesPage.scheduleFutureCell(ScheduleClassNameSetup, '06:30 AM')).not.toBeVisible();

    // 8. Verify new occurrence in second future cell
    await expect(classesPage.scheduleFutureCellNth(ScheduleClassNameSetup, '07:30 AM')).toBeVisible();

    // 9. Click the new occurrence
    await classesPage.scheduleFutureCellNth(ScheduleClassNameSetup, '07:30 AM').click();

    // 10-11. Validate session details
    await expect(classesPage.scheduleSessionHeader(ScheduleClassNameSetup)).toBeVisible();
    await expect(classesPage.sessionTypeCell('Private')).toBeVisible();
    await expect(classesPage.noMembershipDiscountsText()).toBeVisible();
    await expect(classesPage.sessionTypeCell('manikamta manikamta')).toBeVisible();
    await expect(classesPage.sessionTypeCell('07:30 AM – 08:00 AM')).toBeVisible();

    // 12. Verify no cancellation policy text
    await expect(classesPage.noCancellationPolicyText()).toBeVisible();

    await page.locator("//button[@class='ripple ripple-surface btn btn-secondary']").click();

    // 13. Verify card view
    await classesPage.schedulesTab().click();
    await classesPage.cardTab().click();
    await classesPage.cardSearchInput().fill(ScheduleClassNameSetup);
    await classesPage.cardStatusSelect().selectOption({ label: 'Active' });
    await classesPage.applyButton().click();
    await page.waitForTimeout(2000);
    await expect(classesPage.cardClassHeader(ScheduleClassNameSetup)).toBeVisible();
    await expect(classesPage.cardClassTime('07:30 AM')).toBeVisible();
    await expect(classesPage.cardClassLocation('Palakol')).toBeVisible();
  });

   test('Delete_ScheduleOneTime', async () => {
     const tempFile = path.join(__dirname, 'temp.json');
     const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
     await classesPage.dashboardTab().click();
     await classesPage.schedulesTab().click();
     await classesPage.cardTab().click();
     await classesPage.cardSearchInput().fill(data.ScheduleClassNameSetup);
     await classesPage.cardStatusSelect().selectOption({ label: 'Active' });
     await classesPage.applyButton().click();
     await page.waitForTimeout(2000);
     await expect(classesPage.cardClassHeader(data.ScheduleClassNameSetup)).toBeVisible();
     await expect(classesPage.cardClassTime('07:30 AM')).toBeVisible();
     await expect(classesPage.cardClassLocation('Palakol')).toBeVisible();
     await expect(classesPage.cardClassLocation('manikamta manikamta')).toBeVisible();
     await page.locator(`//h5[text()='${data.ScheduleClassNameSetup}']/../../..//button[text()='Delete']`).click();
     await classesPage.deleteOnlyThisEventButton().click();
     await classesPage.dashboardTab().click();
     await classesPage.schedulesTab().click();
     await expect(classesPage.scheduleFutureCellNth(data.ScheduleClassNameSetup, '07:30 AM')).not.toBeVisible();
   });

   test('DeleteClass_AfterSetUp', async () => {
             const tempFile = path.join(__dirname, 'temp.json');
             const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
             await classesPage.dashboardTab().click();
             await classesPage.classesTab().click();
             await classesPage.classDeleteButton(data.ScheduleClassNameSetup).click();
             await expect(classesPage.deleteClassCategoryHeader()).toBeVisible();
             await classesPage.Modal_DeleteButton().click();
             await classesPage.searchClassInput().click();
             await classesPage.searchClassInput().fill(data.ScheduleClassNameSetup);
             await classesPage.applyButton().click();
             await page.waitForTimeout(3000);
             await expect(page.locator("//div[text()='No Class Found']")).toBeVisible();
   })

 
});
