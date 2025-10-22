import { test, expect, Browser, Page } from '@playwright/test';
import { ClassesPage } from '../pageobjects/ClassesPage';
import testdata from '../testdata.json';
import { LoginPage } from '../pageobjects/LoginPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import * as fs from 'fs';
import * as path from 'path';

const tempFile = path.join(__dirname, 'temp.json');

test.describe('ClassCategoryValidations', () => {
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

  test('Create_ClassCategory_Verify_In_AddNewClass', async () => {
     let classcategoryName: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
     updateTempJson({ classcategoryName });
     console.log('Saved classcategoryName to temp.json');
    await classesPage.classesTab().click();
    await classesPage.classCategoriesTab().click();
    await classesPage.addNewCategoryButton().click();
    await expect(classesPage.createClassCategoryHeader()).toBeVisible();
    await classesPage.categoryNameInput().click();
    await classesPage.categoryNameInput().fill(classcategoryName);
    await classesPage.createCategoryButton().click();
    await classesPage.trainerSummaryFirstInput().click();
    await classesPage.trainerSummaryFirstInput().fill(classcategoryName);
    await expect(classesPage.categoryRow(classcategoryName)).toBeVisible();
    await classesPage.dashboardTab().click();
    await classesPage.classesTab().click();
    await classesPage.addNewClassButton().click();
    await expect(classesPage.categoryOptionInAddClass(classcategoryName)).toBeVisible();
    await classesPage.closeButton().click();
  });

  test('Edit_ClassCategory_Verify_In_AddNewClass', async () => {
    let classcategoryName: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
    let EditclasscategoryName: string = 'edit' + classcategoryName;
    console.log('Generated classcategoryName:', classcategoryName);
    console.log('Generated EditclasscategoryName:', EditclasscategoryName);
    updateTempJson({ EditclasscategoryName });
    console.log('Saved EditclasscategoryName to temp.json');
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await classesPage.dashboardTab().click();
    await classesPage.classesTab().click();
    await classesPage.classCategoriesTab().click();
    await classesPage.trainerSummaryFirstInput().click();
    await classesPage.trainerSummaryFirstInput().fill(data.classcategoryName);
    await expect(classesPage.categoryRow(data.classcategoryName)).toBeVisible();
    await classesPage.categoryEditIcon(data.classcategoryName).click();
    await classesPage.categoryNameInput().click();
    await classesPage.categoryNameInput().fill(' ');
    await classesPage.categoryNameInput().fill(EditclasscategoryName);
    await classesPage.createCategoryButton().click();
    await classesPage.trainerSummaryFirstInput().click();
    await classesPage.trainerSummaryFirstInput().fill(EditclasscategoryName);
    await expect(classesPage.categoryRow(EditclasscategoryName)).toBeVisible();
    await classesPage.dashboardTab().click();
    await classesPage.classesTab().click();
    await classesPage.addNewClassButton().click();
    await expect(classesPage.categoryOptionInAddClass(EditclasscategoryName)).toBeVisible();
    await classesPage.closeButton().click();
  });

  test('Delete_ClassCategory_Verify_Removal', async () => {
    const tempFile = path.join(__dirname, 'temp.json');
    const data = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    await classesPage.dashboardTab().click();
    await classesPage.classesTab().click();
    await classesPage.classCategoriesTab().click();
    await classesPage.trainerSummaryFirstInput().click();
    await classesPage.trainerSummaryFirstInput().fill(data.EditclasscategoryName);
    await expect(classesPage.categoryRow(data.EditclasscategoryName)).toBeVisible();
    await classesPage.categoryDeleteIcon(data.EditclasscategoryName).click();
    await expect(classesPage.deleteClassCategoryHeader()).toBeVisible();
    await classesPage.Modal_DeleteButton().click();
    await classesPage.trainerSummaryFirstInput().click();
    await classesPage.trainerSummaryFirstInput().fill(data.EditclasscategoryName);
    await expect(classesPage.NoresultsFound()).toBeVisible();
    await classesPage.dashboardTab().click();
    await classesPage.classesTab().click();
    await classesPage.addNewClassButton().click();
    await expect(classesPage.categoryOptionInAddClass(data.EditclasscategoryName)).not.toBeVisible();
    await classesPage.closeButton().click();
  });

});
