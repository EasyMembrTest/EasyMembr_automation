import { test, expect, Browser, Page } from '@playwright/test';
import { MembersFiltersPage } from '../pageobjects/MembersFiltersPage';
import { LoginPage } from '../pageobjects/LoginPage';
import testdata from '../testdata.json';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';

test.describe('ApplyFilters_MemberManagement', () => {
  let browser: Browser;
  let page: Page;
  let filtersPage: MembersFiltersPage;
   let loginPage: LoginPage;
  

  test.beforeAll(async ({ playwright }) => {
    browser = await playwright.chromium.launch({ headless: false });
    page = await browser.newPage();
    filtersPage = new MembersFiltersPage(page);
     loginPage = new LoginPage(page);
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

  test('ApplyFilters_MemberManagement', async () => {
    await filtersPage.clickMembersManagement();
    await filtersPage.clickAllPlansAddons();
    await filtersPage.scrollToAndSelectAutomationPlan();
    await filtersPage.selectMembershipTypePlans();
    await filtersPage.selectPlanTypeOneTime();
    await filtersPage.selectGenderMale();
    await filtersPage.selectStatusActive();
    await filtersPage.selectTransactionTypeNew();
    // Date picker 1: 2025-09-17 to 2026-09-16
    await filtersPage.openFirstDatePicker();
    await filtersPage.goToMonth('September 2025', 'Previous', '2025');
    await filtersPage.selectDateByAriaLabel('Choose Wednesday, September 17th, 2025');
    await filtersPage.goToMonth('September 2026', 'Next', '2026');
    await filtersPage.selectDateByAriaLabel('Choose Wednesday, September 16th, 2026');
    // Date picker 2: 2025-09-16 to 2025-09-17 (twice)
    await filtersPage.openSecondDatePicker();
    await filtersPage.goToMonth('September 2025', 'Previous', '2025');
    await filtersPage.selectDateByAriaLabel('Choose Tuesday, September 16th, 2025');
    await filtersPage.goToMonth('September 2025', 'Next', '2025');
    await filtersPage.selectDateByAriaLabel('Choose Wednesday, September 17th, 2025');
    await filtersPage.openThirdDatePicker();
    await filtersPage.goToMonth('September 2025', 'Previous', '2025');
    await filtersPage.selectDateByAriaLabel('Choose Tuesday, September 16th, 2025');
    await filtersPage.goToMonth('September 2025', 'Next', '2025');
    await filtersPage.selectDateByAriaLabel('Choose Wednesday, September 17th, 2025');
    await filtersPage.enterAgeRange('20', '25');
    await filtersPage.clickApplyButton();
    await filtersPage.verifyFilteredMemberRow();
  });
});
