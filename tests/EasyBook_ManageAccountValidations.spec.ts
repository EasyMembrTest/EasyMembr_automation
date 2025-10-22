import { test, expect,  Browser, Page } from '@playwright/test';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { ManageAccount } from '../pageobjects/ManageAccount';
import testdata from '../testdata.json';
import { LoginPage } from '../pageobjects/LoginPage';
import { ClassesPage } from '../pageobjects/ClassesPage';

test.describe('EasyBook_ManageAccountValidations', () => {
    let browser: Browser;
    let page: Page;
    let manageaccountpage: ManageAccount;
    let classesPage: ClassesPage;
    let loginPage: LoginPage;

      test.beforeAll(async ({ playwright }) => {
    browser = await playwright.chromium.launch({ headless: false });
    page = await browser.newPage();
    manageaccountpage = new ManageAccount(page);
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

    test('EditProfileSettings', async () => {
    await manageaccountpage.gotoManageAccount_1();
    await manageaccountpage.clickEditProfileSettings();
    await manageaccountpage.fillFirstName(testdata.ProfileSettingsFirstName);
    await manageaccountpage.fillLastName(testdata.ProfileSettingsLastName);
    await manageaccountpage.fillAge(testdata.ProfileSettingsAge);
    await manageaccountpage.fillMobileNumber(testdata.ProfileSettingsMobile);
    await manageaccountpage.clickSave();
    await manageaccountpage.expectProfileSavedAlert();
    await classesPage.dashboardTab().click();
    await manageaccountpage.gotoManageAccount_1();
    await manageaccountpage.assertProfileLabels({
      firstName: testdata.ProfileSettingsFirstName,
      lastName: testdata.ProfileSettingsLastName,
      age: testdata.ProfileSettingsAge,
      gender: testdata.ProfileSettingsGender,
      mobile: testdata.ProfileSettingsMobile,
    });
    await manageaccountpage.assertFullNameParagraph(testdata.ProfileSettingsFirstName, testdata.ProfileSettingsLastName);
  });

    test('ProfileSettings_AfterSetup', async () => {
    await classesPage.dashboardTab().click();
    await manageaccountpage.gotoManageAccount_1();
    await manageaccountpage.clickEditProfileSettings();
    await manageaccountpage.fillFirstName(testdata.OriginalProfileSettingsFirstName);
    await manageaccountpage.fillLastName(testdata.OriginalProfileSettingsLastName);
    await manageaccountpage.fillAge(testdata.OriginalProfileSettingsAge);
    await manageaccountpage.fillMobileNumber(testdata.OriginalProfileSettingsMobile);
    await manageaccountpage.clickSave();
    await manageaccountpage.expectProfileSavedAlert();
    await classesPage.dashboardTab().click();
    await manageaccountpage.gotoManageAccount_1();
    await manageaccountpage.assertProfileLabels({
      firstName: testdata.OriginalProfileSettingsFirstName,
      lastName: testdata.OriginalProfileSettingsLastName,
      age: testdata.OriginalProfileSettingsAge,
      gender: testdata.ProfileSettingsGender,
      mobile: testdata.OriginalProfileSettingsMobile,
    });
    await manageaccountpage.assertFullNameParagraph(testdata.OriginalProfileSettingsFirstName, testdata.OriginalProfileSettingsLastName);
  });

    test('ViewSubscriptionHistory_DownloadHistory', async () => {
    const downloadDir = 'D:/EasyMembr_Downloads';
    const expectedFileName = 'subscriptionPlans.xlsx';
    const expectedFilePath = `${downloadDir}/${expectedFileName}`;
    await manageaccountpage.gotoManageAccount_1();
    await manageaccountpage.clickSubscriptionTab();
    await page.waitForTimeout(2000); 
    const planName = (await manageaccountpage.getPlanName_1())?.trim();
    console.log(`Plan Name: ${planName}`);
    let duration = (await manageaccountpage.getDuration_1())?.trim();
    if (duration) {
      duration = duration.replace(/Month\(s\)/i, 'months').replace(/\s+/, ' ');
    }
    console.log(`Duration: ${duration}`);
    await manageaccountpage.clickViewHistory();
    await manageaccountpage.expectHistoryRow(`${planName}`,`${duration}`);
    const filePath = await manageaccountpage.setDownloadPathAndDeleteIfExists(downloadDir, expectedFileName);
     const [download] = await Promise.all([
    page.waitForEvent('download'),
    manageaccountpage.clickDownloadButton_1()
    ]);
    await download.saveAs(expectedFilePath);
    await new Promise(resolve => setTimeout(resolve, 4000));
    await manageaccountpage.validateDownloadedFile(filePath,`${planName}`,`${duration}`);
    await manageaccountpage.deleteDownloadedFile(filePath);
    await manageaccountpage.closeButton();
  });


})