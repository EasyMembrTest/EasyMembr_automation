import { test, expect,  Browser, Page } from '@playwright/test';
import { ManageAccount } from '../pageobjects/ManageAccount';
import { CreatePlanPage } from '../pageobjects/CreatePlanPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import testdata from '../testdata.json';
import { pl } from 'date-fns/locale';

test.describe('ManageAccountValidations', () => {
    let browser: Browser;
    let page: Page;
    let manageaccountpage: ManageAccount;
    let planPage: CreatePlanPage;

    test.beforeAll(async ({ playwright }) => {
    browser = await playwright.chromium.launch({ headless: false });
    page = await browser.newPage();
    manageaccountpage = new ManageAccount(page);
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

  test('EditProfileSettings', async () => {
    await manageaccountpage.gotoManageAccount();
    await manageaccountpage.clickEditProfileSettings();
    await manageaccountpage.fillFirstName(testdata.ProfileSettingsFirstName);
    await manageaccountpage.fillLastName(testdata.ProfileSettingsLastName);
    await manageaccountpage.fillAge(testdata.ProfileSettingsAge);
    await manageaccountpage.fillMobileNumber(testdata.ProfileSettingsMobile);
    await manageaccountpage.clickSave();
    await manageaccountpage.expectProfileSavedAlert();
    await manageaccountpage.gotoDashboard();
    await manageaccountpage.gotoManageAccount();
    await manageaccountpage.assertProfileLabels({
      firstName: testdata.ProfileSettingsFirstName,
      lastName: testdata.ProfileSettingsLastName,
      age: testdata.ProfileSettingsAge,
      gender: testdata.ProfileSettingsGender,
      mobile: testdata.ProfileSettingsMobile,
    });
    await manageaccountpage.assertFullNameParagraph(testdata.ProfileSettingsFirstName, testdata.ProfileSettingsLastName);
  });

  test('ViewSubscriptionHistory_DownloadHistory', async () => {
    const downloadDir = 'D:/EasyMembr_Downloads';
    const expectedFileName = 'subscriptionPlans.xlsx';
     const expectedFilePath = `${downloadDir}/${expectedFileName}`;
    // 1. Click on "Manage Account"
    await manageaccountpage.gotoManageAccount();
    // 2. Click on Subscription
    await manageaccountpage.clickSubscriptionTab();
    // 3. Get PlanName
    const planName = (await manageaccountpage.getPlanName())?.trim();
    console.log(`Plan Name: ${planName}`);
    // 4. Get Duration
    let duration = (await manageaccountpage.getDuration())?.trim();
    // Convert "24 Month(s)" to "24 months"
    if (duration) {
      duration = duration.replace(/Month\(s\)/i, 'months').replace(/\s+/, ' ');
    }
    console.log(`Duration: ${duration}`);
    // 5. Click on View History
    await manageaccountpage.clickViewHistory();
    // 6. Verify history row
    await manageaccountpage.expectHistoryRow(`${planName}`,`${duration}`);
    // 7. Set download path, delete file if exists, click download
    const filePath = await manageaccountpage.setDownloadPathAndDeleteIfExists(downloadDir, expectedFileName);
     const [download] = await Promise.all([
    page.waitForEvent('download'),
    manageaccountpage.clickDownloadButton()
    ]);
      await download.saveAs(expectedFilePath);
    // Wait for file to be downloaded
    await new Promise(resolve => setTimeout(resolve, 4000));
    // 8. Read file and validate
    await manageaccountpage.validateDownloadedFile(filePath,`${planName}`,`${duration}`);
    // 9. Delete file
    await manageaccountpage.deleteDownloadedFile(filePath);
     await manageaccountpage.closeButton();
  });
/*
    test('VerifyAlertWhileAddingGYM', async () => {
    // 1. Click on "Manage Account"
    await manageaccountpage.gotoManageAccount();
    // 2. Click on Gyms tab
    await manageaccountpage.clickGymsTab();
    // 3. Click Add gyms button
    await manageaccountpage.clickAddGymsButton();
    // 4. Fill Business Name
    await manageaccountpage.fillBusinessName('FitnessCenter');
    // 5. Fill Email
    await manageaccountpage.fillGymEmail('automation@gmail.com');
    // 6. Fill Phone
    await manageaccountpage.fillGymPhone('9873214569');
    // 7. Select Country
    await manageaccountpage.selectCountry('India');
    // 8. Select State
    await manageaccountpage.selectState('Andhra Pradesh');
    // 9. Fill City
    await manageaccountpage.fillGymCity('Bhimavaram');
    // 10. Fill First Name
    await manageaccountpage.fillGymFirstName('Vamsi');
    // 11. Fill Last Name
    await manageaccountpage.fillGymLastName('automation');
    // 12. Fill Address
    await manageaccountpage.fillGymAddress('1-37');
    // 13. Click Save
    await manageaccountpage.clickSaveGym();
    // 14. Verify alert
    await manageaccountpage.expectGymAlert();
    await manageaccountpage.closeButton();
  });
*/
  test('ProfileSettings_AfterSetup', async () => {
    await manageaccountpage.gotoDashboard();
    await manageaccountpage.gotoManageAccount();
    await manageaccountpage.clickEditProfileSettings();
    await manageaccountpage.fillFirstName(testdata.OriginalProfileSettingsFirstName);
    await manageaccountpage.fillLastName(testdata.OriginalProfileSettingsLastName);
    await manageaccountpage.fillAge(testdata.OriginalProfileSettingsAge);
    await manageaccountpage.fillMobileNumber(testdata.OriginalProfileSettingsMobile);
    await manageaccountpage.clickSave();
    await manageaccountpage.expectProfileSavedAlert();
    await manageaccountpage.gotoDashboard();
    await manageaccountpage.gotoManageAccount();
    await manageaccountpage.assertProfileLabels({
      firstName: testdata.OriginalProfileSettingsFirstName,
      lastName: testdata.OriginalProfileSettingsLastName,
      age: testdata.OriginalProfileSettingsAge,
      gender: testdata.ProfileSettingsGender,
      mobile: testdata.OriginalProfileSettingsMobile,
    });
    await manageaccountpage.assertFullNameParagraph(testdata.OriginalProfileSettingsFirstName, testdata.OriginalProfileSettingsLastName);
  });

});
