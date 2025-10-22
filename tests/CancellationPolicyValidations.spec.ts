import { test, expect, Browser, Page } from '@playwright/test';
import { ClassesPage } from '../pageobjects/ClassesPage';
import testdata from '../testdata.json';
import { LoginPage } from '../pageobjects/LoginPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import * as fs from 'fs';
import * as path from 'path';
import { waitForDebugger } from 'inspector';

const tempFile = path.join(__dirname, 'temp.json');

test.describe('CancellationPolicyValidations', () => {
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

  test('CreateCancellationPolicy_VerifyINCreateSchedule', async () => {
    let policyname: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
    updateTempJson({ policyname });
    console.log('Saved policyname to temp.json: ' + policyname);
    await classesPage.cancellationPolicyTab().click();
    await classesPage.createPolicyButton().click();
    await expect(classesPage.cancellationPolicyHeader()).toBeVisible();
    await classesPage.fullNameInput().fill(policyname);
    await classesPage.addRowIcon().click();
    await classesPage.numberInput(1).fill('1');
    await classesPage.numberInput(2).fill('90');
    await classesPage.numberInput(3).fill('2');
    await classesPage.numberInput(4).fill('50');
    await classesPage.policyCheckbox(1).click();
    await classesPage.policyCheckbox(2).click();
    await classesPage.descriptionInput().fill(testdata.CancellationPolicyDescription);
    await classesPage.savePolicyButton().click();
    await classesPage.policySearchInput().fill(policyname);
    const rowCount = await classesPage.policyTableRows().count();
    expect(rowCount).toBe(1);
    await expect(classesPage.policyRow(policyname)).toBeVisible();
    await expect(classesPage.policyRowDetails(policyname,testdata.CancellationPolicyDescription)).toBeVisible();
    await classesPage.schedulesTab().click();
    await classesPage.addNewScheduleButton().click();
    await expect(classesPage.schedulePolicyOption(policyname)).toBeVisible();
    await classesPage.closeButton().click();
  });

  test('EditCancellationPolicy_VerifyINCreateSchedule', async () => {
    let Editpolicyname: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
    updateTempJson({ Editpolicyname });
    console.log('Saved Editpolicyname to temp.json: ' + Editpolicyname);
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await classesPage.cancellationPolicyTab().click();
    await classesPage.policySearchInput().fill(data.policyname);
    const rowCount = await classesPage.policyTableRows().count();
    expect(rowCount).toBe(1);
    await expect(classesPage.policyRow(data.policyname)).toBeVisible();
    await classesPage.policyEditButton(data.policyname,testdata.CancellationPolicyDescription).click();
    await expect(page.locator(`//input[@placeholder='Enter Full Name'][@value='${data.policyname}']`)).toBeVisible();
    await classesPage.fullNameInput().fill(' ');
    await classesPage.fullNameInput().fill(Editpolicyname);
    await classesPage.numberInput(1).fill(' ')
    await classesPage.numberInput(1).fill('1');
    await classesPage.numberInput(2).fill(' ');
    await classesPage.numberInput(2).fill('70');
    await classesPage.descriptionInput().fill(' ');
    await classesPage.descriptionInput().fill(testdata.EditCancellationPolicyDescription);
    await classesPage.savePolicyButton().click();
    await classesPage.dashboardTab().click();
    await classesPage.cancellationPolicyTab().click();
    await classesPage.policySearchInput().fill(Editpolicyname);
    const rowCount1 = await classesPage.policyTableRows().count();
    expect(rowCount1).toBe(1);
    await expect(classesPage.policyRow(Editpolicyname)).toBeVisible();
    await expect(classesPage.editpolicyRowDetails(Editpolicyname,testdata.EditCancellationPolicyDescription)).toBeVisible();
    await classesPage.schedulesTab().click();
    await classesPage.addNewScheduleButton().click();
    await expect(classesPage.schedulePolicyOption(Editpolicyname)).toBeVisible();
    await classesPage.closeButton().click();
  })

  test('DeleteCancellationPolicy_VerifyRemoval', async () => {
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await classesPage.dashboardTab().click();
    await classesPage.cancellationPolicyTab().click();
    await classesPage.policySearchInput().fill(data.Editpolicyname);
    const rowCount1 = await classesPage.policyTableRows().count();
    expect(rowCount1).toBe(1);
    await expect(classesPage.policyRow(data.Editpolicyname)).toBeVisible();
    await expect(classesPage.editpolicyRowDetails(data.Editpolicyname,testdata.EditCancellationPolicyDescription)).toBeVisible();
    await classesPage.policyDeleteButton(data.Editpolicyname,testdata.EditCancellationPolicyDescription).click();
    await expect(classesPage.deleteConfirmationText()).toBeVisible();
    await classesPage.deleteButton().click(); 
    await classesPage.dashboardTab().click();
    await classesPage.cancellationPolicyTab().click();
    await classesPage.policySearchInput().fill(data.Editpolicyname);
    await classesPage.NoresultsFound().isVisible();
    await classesPage.schedulesTab().click();
    await classesPage.addNewScheduleButton().click();
    await expect(classesPage.schedulePolicyOption(data.Editpolicyname)).not.toBeVisible();
    await classesPage.closeButton().click();
  });

  test('Verify_LogsEvents_Activities', async () => {
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await classesPage.activitiesTab().click();
    await classesPage.activitiesDateSelect().selectOption({ label: 'Today' });
    await classesPage.applyButton().click();
    await page.waitForTimeout(2000);
    await expect(classesPage.cancellationPolicyDeletedLog(data.Editpolicyname)).toBeVisible();
  });
});
