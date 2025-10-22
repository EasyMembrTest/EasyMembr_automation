import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { TransactionsPage } from '../pageobjects/TransactionsPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { CreatePlanPage } from '../pageobjects/CreatePlanPage';
import testdata from '../testdata.json';

const filePath = 'D:/EasyMembr_TestData/Transaction_Data.xlsx';

test.describe('TransactionsValidations', () => {
  let browser: Browser;
  let page: Page;
  let transactionsPage: TransactionsPage;
   let planPage: CreatePlanPage;

  test.beforeAll(async ({ playwright }) => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    transactionsPage = new TransactionsPage(page);
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

  test('CreateTransaction_ImportSheet', async () => {
    // 1-4: Search member and verify no data
    await transactionsPage.gotoMembersManagement();
    await transactionsPage.searchMember(testdata.TransactionMemberName);
    await transactionsPage.clickApplyButton();
    await transactionsPage.expectNoDataFound();
    // 5-7: Go to Transactions and import file
    await transactionsPage.gotoTransactions();
    await transactionsPage.clickImportButton();
    await transactionsPage.uploadFile(filePath);
    await transactionsPage.clickUploadButton();
    await transactionsPage.expectImportSuccess();
    await transactionsPage.closeAlertIfVisible();
    // 13-17: Search transaction and verify
    await transactionsPage.searchTransaction(testdata.TransactionMemberName);
    await transactionsPage.clickApplyButton();
    await transactionsPage.expectTransactionRowCount(1);
    await transactionsPage.expectTransactionRowVisible(testdata.TransactionMemberName, testdata.TransactionAmount_1, testdata.planNameSetup, testdata.TransactionDate);
    await transactionsPage.expectTotalAmount(testdata.TransactionAmount);
    // 18-19: Clear and verify more than 1 row
    await transactionsPage.clickClearButton();
    await transactionsPage.expectTransactionRowCountGreaterThan(1);
    // 20-23: Go to Members Management and verify member row
    await transactionsPage.gotoMembersManagement();
    await transactionsPage.searchMember(testdata.TransactionMemberName);
    await transactionsPage.clickApplyButton();
    await transactionsPage.expectMemberRowVisible(testdata.TransactionMemberName, testdata.TransactionMemberMobileNo, testdata.planNameSetup, testdata.TransactionDate);
    // 24-27: Go to Transactions, search, delete transaction
    await transactionsPage.gotoTransactions();
    await transactionsPage.searchTransaction(testdata.TransactionMemberName);
    await transactionsPage.clickApplyButton();
    await transactionsPage.deleteTransaction(testdata.TransactionMemberName, testdata.TransactionAmount_1, testdata.planNameSetup, testdata.TransactionDate);
    await transactionsPage.expectNoDataFoundTransaction();
    await transactionsPage.expectTotalAmountZero();
    await transactionsPage.clickClearButton();
    await transactionsPage.gotoMembersManagement();
    await transactionsPage.searchMember(testdata.TransactionMemberName);
    await transactionsPage.clickApplyButton();
    await page.waitForTimeout(3000);
    await transactionsPage.deleteMember(testdata.TransactionMemberName, testdata.TransactionMemberMobileNo);
    await transactionsPage.gotoDashboard();
    await transactionsPage.gotoMembersManagement();
    await transactionsPage.searchMember(testdata.TransactionMemberName);
    await transactionsPage.clickApplyButton();
    await page.waitForTimeout(3000);
    await transactionsPage.expectNoDataFound();
  });
});
