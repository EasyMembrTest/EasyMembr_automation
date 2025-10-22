import { test, expect, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { BussinessInfoPage } from '../pageobjects/BussinessInfoPage';
import testdata from '../testdata.json';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { ClassesPage } from '../pageobjects/ClassesPage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let bussinessInfoPage: BussinessInfoPage;
let classesPage: ClassesPage;

test.describe('BussinessInfoValidations', () => {
  test.beforeAll(async ({ playwright }) => {
    browser = await playwright.chromium.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    bussinessInfoPage = new BussinessInfoPage(page);
    classesPage = new ClassesPage(page);

    await loginPage.gotoClassLogin();
    await loginPage.classmemberEmailInput().fill(testdata.email);
    await loginPage.classmemberPasswordInput().fill(testdata.password);
    await loginPage.loginButton().click();
    await expect(bussinessInfoPage.businessInfoTab()).toBeVisible();
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

  test('BussinessInfo_PrivacyPolicy', async () => {
    const privacyTitle = 'Sample Privacy Policy for QA Testing'+Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
    let privacyBody: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
    await bussinessInfoPage.businessInfoTab().click();
    await bussinessInfoPage.privacyPolicyEditIcon().click();
    await bussinessInfoPage.policyTitleInput().click();
    await bussinessInfoPage.policyTitleInput().fill('');
    await bussinessInfoPage.policyTitleInput().fill(privacyTitle);
    await bussinessInfoPage.policyEditor().click();
    await bussinessInfoPage.policyEditor().fill('');
    await bussinessInfoPage.policyEditor().fill(privacyBody);
    await bussinessInfoPage.saveButton().click();
    await expect(bussinessInfoPage.policyTitleLabel(privacyTitle)).toBeVisible();
    await expect(bussinessInfoPage.policyParagraph(privacyBody)).toBeVisible();
  });

  test('BussinessInfo_TermsConditions', async () => {
   const TermsTitle='Terms and Conditions_'+Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
   await bussinessInfoPage.businessInfoTab().click();
   await bussinessInfoPage.TermsConditionsEditIcon().click();
   await bussinessInfoPage.TermsTitleInput().click();
   await bussinessInfoPage.TermsTitleInput().fill('');
   await bussinessInfoPage.TermsTitleInput().fill(TermsTitle);
   await bussinessInfoPage.saveButton().click();
   await expect(bussinessInfoPage.policyTitleLabel(TermsTitle)).toBeVisible();
     
  })

  test('BussinessInfo_ClassBussinessSettings', async () => {
    await bussinessInfoPage.businessInfoTab().click();
    const waiverVisible = await bussinessInfoPage.waiverFormCheckIcon().isVisible().catch(() => false);
    if (waiverVisible) {
      // If visible, toggle off then back on
      await bussinessInfoPage.classBusinessSettingsEditIcon().click();
      await bussinessInfoPage.sliderRound().click();
      await bussinessInfoPage.saveButton().click();
      await expect(bussinessInfoPage.waiverFormCheckIcon()).not.toBeVisible();

      await bussinessInfoPage.classBusinessSettingsEditIcon().click();
      await bussinessInfoPage.sliderRound().click();
      await bussinessInfoPage.saveButton().click();
      await expect(bussinessInfoPage.waiverFormCheckIcon()).toBeVisible();
    } else {
      // If not visible, toggle on
      await bussinessInfoPage.classBusinessSettingsEditIcon().click();
      await bussinessInfoPage.sliderRound().click();
      await bussinessInfoPage.saveButton().click();
      await expect(bussinessInfoPage.waiverFormCheckIcon()).toBeVisible();
    }
  });

   
});
