import { test, expect, Browser, Page } from '@playwright/test';
import { ClassesPage } from '../pageobjects/ClassesPage';
import testdata from '../testdata.json';
import { LoginPage } from '../pageobjects/LoginPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import * as fs from 'fs';
import * as path from 'path';

const tempFile = path.join(__dirname, 'temp.json');

test.describe('ClassValidations', () => {
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

  test('CreateClass_WithDiscount_VerifyDashboardCount_VerifyINCreateSchedule', async () => {
    let className: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
    updateTempJson({ className });
    console.log('Saved className to temp.json', className);
    await classesPage.dashboardTab().click();
    await page.waitForTimeout(2000);
    const initialCountText = await classesPage.dashboardClassCount().innerText();
    const InitialClassCount = parseInt(initialCountText);
    console.log('Initial Class Count:', InitialClassCount);
    await classesPage.classesTab().click();
    await classesPage.addNewClassButton().click();
    await expect(classesPage.addClassHeader()).toBeVisible();
    await classesPage.classNameInput().click();
    await classesPage.classNameInput().fill(className);
    await classesPage.classDurationInput().click();
    await classesPage.classDurationInput().fill(testdata.ClassDuration);
    await classesPage.classSlotsInput().click();
    await classesPage.classSlotsInput().fill(testdata.ClassMemberCapacity);
    await classesPage.classPriceInput().click();
    await classesPage.classPriceInput().fill(testdata.ClassPrice);
    await classesPage.categorySelect().selectOption({ label: testdata.ClassCategory });
    await classesPage.customPlanSelector().click();
    await classesPage.raghuCheckbox().scrollIntoViewIfNeeded();
    await classesPage.raghuCheckbox().click();
    await classesPage.discountInput().click();
    await page.waitForTimeout(2000);
    await classesPage.discountInput().fill(testdata.ClassDiscount);
    await expect(classesPage.removeButton()).toBeVisible();
    await expect(classesPage.selectedSpan()).toBeVisible();
    await classesPage.descriptionEditor().click();
    await classesPage.descriptionEditor().fill(testdata.ClassDescription);
    await classesPage.saveClassButton().click();
    await classesPage.searchClassInput().click();
    await classesPage.searchClassInput().fill(className);
    await classesPage.beginnerSelect().selectOption({ label: testdata.ClassLevel });
    await classesPage.automationSelect().selectOption({ label: testdata.ClassCategory });
    await classesPage.applyButton().click();
     await page.waitForTimeout(3000);
    const cardCount = await classesPage.cardBodies().count();
    expect(cardCount).toBe(1);
    await expect(classesPage.classHeader(className)).toBeVisible();
    await expect(classesPage.classDurationText(testdata.ClassDuration)).toBeVisible();
    await expect(classesPage.classCategoryText(testdata.ClassCategory)).toBeVisible();
    await expect(classesPage.classSlotsText(testdata.ClassMemberCapacity)).toBeVisible();
    await expect(classesPage.classPriceText(testdata.ClassPrice)).toBeVisible();
    await expect(classesPage.raghuDiscountText()).toBeVisible();
    await expect(classesPage.danceText()).toBeVisible();
    await expect(classesPage.beginnerBadge()).toBeVisible();
    await classesPage.dashboardTab().click();
    await page.waitForTimeout(2000);
    const finalCountText = await classesPage.dashboardClassCount().innerText();
    const FinalClassCount = parseInt(finalCountText);
    console.log('Final Class Count:', FinalClassCount);
    expect(FinalClassCount).toBe(InitialClassCount + 1);
    await classesPage.schedulesTab().click();
    await classesPage.addNewScheduleButton().click();
    await expect(classesPage.scheduleClassOption(className)).toBeVisible();
    await classesPage.closeButton().click();
  });

  test('CreateClass_WithOutDiscount_VerifyINCreateSchedule', async () => {
    let className2: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
    updateTempJson({ className2 });
    console.log('Saved className2 to temp.json:', className2);
    await classesPage.dashboardTab().click();
    await classesPage.classesTab().click();
    await classesPage.addNewClassButton().click();
    await expect(classesPage.addClassHeader()).toBeVisible();
    await classesPage.classNameInput().click();
    await classesPage.classNameInput().fill(className2);
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
    await classesPage.searchClassInput().click();
    await classesPage.searchClassInput().fill(className2);
    await classesPage.beginnerSelect().selectOption({ label: testdata.ClassLevel });
    await classesPage.automationSelect().selectOption({ label: testdata.ClassCategory });
    await classesPage.applyButton().click();
     await page.waitForTimeout(3000);
    const cardCount = await classesPage.cardBodies().count();
    expect(cardCount).toBe(1);
    await expect(classesPage.classHeader(className2)).toBeVisible();
    await expect(classesPage.classDurationText(testdata.ClassDuration)).toBeVisible();
    await expect(classesPage.classCategoryText(testdata.ClassCategory)).toBeVisible();
    await expect(classesPage.classSlotsText(testdata.ClassMemberCapacity)).toBeVisible();
    await expect(classesPage.classPriceText(testdata.ClassPrice)).toBeVisible();
    await expect(page.locator("//div[text()='--']")).toBeVisible();
    await expect(classesPage.danceText()).toBeVisible();
    await expect(classesPage.beginnerBadge()).toBeVisible();
    await classesPage.schedulesTab().click();
    await classesPage.addNewScheduleButton().click();
    await expect(classesPage.scheduleClassOption(className2)).toBeVisible();
    await classesPage.closeButton().click();
  });

   test('EditClass_VerifyINCreateSchedule', async () => {
    let EditClassName: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
    updateTempJson({ EditClassName });
    console.log('Saved EditClassName to temp.json:', EditClassName);
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await classesPage.dashboardTab().click();
    await classesPage.classesTab().click();
    await classesPage.classEditButton(data.className).click();
    await expect(page.locator("//h5[text()='Update Class']")).toBeVisible();
    await expect(page.locator(`//input[@name='name'][@value='${data.className}']`)).toBeVisible();
    await classesPage.classNameInput().click();
    await classesPage.classNameInput().fill(' ')
    await classesPage.classNameInput().fill(EditClassName);
    await classesPage.classDurationInput().click();
    await classesPage.classDurationInput().fill(' ');
    await classesPage.classDurationInput().fill(testdata.EditClassDuration);
    await classesPage.classSlotsInput().click();
    await classesPage.classSlotsInput().fill(' ');
    await classesPage.classSlotsInput().fill(testdata.EditClassMemberCapacity);
    await classesPage.classPriceInput().click();
     await classesPage.classPriceInput().fill(' ');
    await classesPage.classPriceInput().fill(testdata.EditClassPrice);
    await classesPage.categorySelect().selectOption({ label: testdata.EditClassCategory });
    await classesPage.selectLevel().selectOption({ label: testdata.EditClassLevel });
    await classesPage.removeButton().click();
    await classesPage.descriptionEditor().click();
     await classesPage.descriptionEditor().fill(' ');
    await classesPage.descriptionEditor().fill(testdata.EditClassDescription);
    await classesPage.updateButton().click();
    await classesPage.searchClassInput().click();
    await classesPage.searchClassInput().fill(EditClassName);
    await classesPage.beginnerSelect().selectOption({ label: testdata.EditClassLevel });
    await classesPage.automationSelect().selectOption({ label: testdata.EditClassCategory });
    await classesPage.applyButton().click();
     await page.waitForTimeout(3000);
    const cardCount = await classesPage.cardBodies().count();
    expect(cardCount).toBe(1);
    await expect(classesPage.classHeader(EditClassName)).toBeVisible();
    await expect(classesPage.classDurationText(testdata.EditClassDuration)).toBeVisible();
    await expect(classesPage.classCategoryText(testdata.EditClassCategory)).toBeVisible();
    await expect(classesPage.classSlotsText(testdata.EditClassMemberCapacity)).toBeVisible();
    await expect(classesPage.classPriceText(testdata.EditClassPrice)).toBeVisible();
    await expect(page.locator("//div[text()='--']")).toBeVisible();
    await expect(classesPage.comedyText()).toBeVisible();
    await expect(classesPage.IntermediateBadge()).toBeVisible();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await classesPage.schedulesTab().click();
    await page.waitForTimeout(3000);
    await classesPage.addNewScheduleButton().click();
    await expect(classesPage.scheduleClassOption(EditClassName)).toBeVisible();
    await classesPage.closeButton().click();
    await classesPage.filterclass().click();
    await classesPage.filterSearch().click();
    await classesPage.filterSearch().fill(EditClassName);
    await page.waitForTimeout(2000);
    await expect(classesPage.optionVisible(EditClassName)).toBeVisible();
  });

   test('DeleteClass_VerifyDashboardCount', async () => {
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await classesPage.dashboardTab().click();
    await classesPage.classesTab().click();
    await classesPage.classDeleteButton(data.className2).click();
    await expect(classesPage.deleteClassCategoryHeader()).toBeVisible();
    await classesPage.Modal_DeleteButton().click();
    await classesPage.searchClassInput().click();
    await classesPage.searchClassInput().fill(data.className2);
    await classesPage.applyButton().click();
    await page.waitForTimeout(3000);
    await expect(page.locator("//div[text()='No Class Found']")).toBeVisible();
    await classesPage.dashboardTab().click();
    await classesPage.classesTab().click();
    await classesPage.classDeleteButton(data.EditClassName).click();
    await expect(classesPage.deleteClassCategoryHeader()).toBeVisible();
    await classesPage.Modal_DeleteButton().click();
    await classesPage.searchClassInput().click();
    await classesPage.searchClassInput().fill(data.EditClassName);
    await classesPage.applyButton().click();
    await page.waitForTimeout(3000);
    await expect(page.locator("//div[text()='No Class Found']")).toBeVisible();
  });

});
