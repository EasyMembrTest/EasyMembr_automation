import { test, expect ,Browser, Page} from '@playwright/test';
import { TemplatesPage } from '../pageobjects/TemplatesPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { LoginPage } from '../pageobjects/LoginPage';
import testdata from '../testdata.json';
import { MembersManagementTabPage } from '../pageobjects/MembersManagementTabPage';
import { StaffRolesAttendanceTab } from '../pageobjects/Staff_Roles_AttendanceTab'; 
import { CreatePlanPage } from '../pageobjects/CreatePlanPage';
import { SlotsPage } from '../pageobjects/SlotsPage';
import { AddOnsPage } from '../pageobjects/AddOnsPage';
import { TransactionsPage } from '../pageobjects/TransactionsPage';


test.describe('TemplatesValidations', () => {
     let browser: Browser;
     let page: Page;
     let loginPage: LoginPage;
     let templatesPage: TemplatesPage;
     let membersPage: MembersManagementTabPage;
     let staffTab: StaffRolesAttendanceTab;
     let planPage: CreatePlanPage;
     let slotsPage: SlotsPage;
     let addOnsPage: AddOnsPage; 
     let transactionsPage: TransactionsPage;

    test.beforeAll(async ({ playwright }) => {
      browser = await playwright.chromium.launch({ headless: false });
      page = await browser.newPage();
      loginPage = new LoginPage(page);
      templatesPage = new TemplatesPage(page);
      membersPage= new MembersManagementTabPage(page);
      staffTab= new StaffRolesAttendanceTab(page);
      planPage = new CreatePlanPage(page);
      slotsPage = new SlotsPage(page);
      addOnsPage = new AddOnsPage(page);
      transactionsPage = new TransactionsPage(page);
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

    test('Download SampleDataFormat Sheet in MembersManagement', async () => {
          await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
          await membersPage.membersManagementTab().click();
          await membersPage.importButton().click();
          await membersPage.DownloadFileValidation('Sample_Member_Data.xlsx', 'First Name');
          await templatesPage.closeButton().click();

     })

    test('Download SampleDataFormat Sheet in StaffManager', async () => {
        await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
        await staffTab.staffRolesAttendanceTab().click();
        await membersPage.importButton().click();
        await membersPage.DownloadFileValidation('Sample_Staff_Data.xlsx', 'Employee ID');
        await templatesPage.closeButton().click();

      })

    test('Download SampleDataFormat Sheet in Plans', async () => {
            await planPage.dashboardTab().click();
            await planPage.plansSlotsAddonsLink().click();
            await planPage.importButton().click();
            await membersPage.DownloadFileValidation('Sample_Plan_Data.xlsx', 'Plan Name');
            await templatesPage.closeButton().click();
       })

    test('Download SampleDataFormat Sheet in Slots', async () => {
           await slotsPage.plansSlotsAddonsLink().click();
           await slotsPage.slotsTabLink().click();
           await planPage.importButton().click();
           await membersPage.DownloadFileValidation('Sample_Slots.xlsx', 'Slot Name');
           await templatesPage.closeButton().click();
       })

    test('Download SampleDataFormat Sheet in ADDONS', async () => {
              await addOnsPage.clickDashboard();
               await addOnsPage.clickPlansSlotsAddonsAndWait();
               await addOnsPage.clickAddonsTab();
               await addOnsPage.clickImportButton();
               await membersPage.DownloadFileValidation('Sample_Addon_Data.xlsx', 'Add-on Name');
               await templatesPage.closeButton().click();
        })

    test('Download SampleDataFormat Sheet in Transactions', async () => {
           await addOnsPage.clickDashboard();
           await transactionsPage.gotoTransactions();
           await transactionsPage.clickImportButton();
           await membersPage.DownloadFileValidation('Transaction_Data.xlsx', 'Transaction ID');
           await templatesPage.closeButton().click();

         })
})