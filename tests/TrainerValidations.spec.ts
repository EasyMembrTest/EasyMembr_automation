import { test, expect, Browser, Page } from '@playwright/test';
import { ClassesPage } from '../pageobjects/ClassesPage';
import testdata from '../testdata.json';
import { LoginPage } from '../pageobjects/LoginPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';

test.describe('TrainerValidations', () => {
  let browser: Browser;
  let page: Page;
  let classesPage: ClassesPage;
  let loginPage: LoginPage;

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

  test('CreateTrainer_VerifyINCreateSchedule', async () => {
    await classesPage.trainersTab().click();
    await classesPage.searchUsersInput().fill(testdata.TrainerFirstName+testdata.TrainerLastName);
    await page.waitForTimeout(2000);
    if (await classesPage.noUsersFoundText().isVisible()) {
      console.log('No Existing Trainers to delete'+testdata.TrainerFirstName+testdata.TrainerLastName);
    } else {
      await classesPage.trainerDeleteIcon(testdata.TrainerFirstName+" "+testdata.TrainerLastName).click();
      await classesPage.deleteButton().click();
      await classesPage.dashboardTab().click();
      await classesPage.trainersTab().click();
      await classesPage.searchUsersInput().fill(testdata.TrainerFirstName+testdata.TrainerLastName);
      await page.waitForTimeout(2000);
      await expect(classesPage.noUsersFoundText()).toBeVisible();
    }
    await classesPage.trainersTab().click();
    await classesPage.searchUsersInput().fill(testdata.EditTrainerFirstName+testdata.EditTrainerLastName);
    await page.waitForTimeout(2000);
    if (await classesPage.noUsersFoundText().isVisible()) {
      console.log('No Existing Trainers to delete'+testdata.EditTrainerFirstName+testdata.EditTrainerLastName);
    } else {
      await classesPage.trainerDeleteIcon(testdata.EditTrainerFirstName+" "+testdata.EditTrainerLastName).click();
      await classesPage.deleteButton().click();
      await classesPage.dashboardTab().click();
      await classesPage.trainersTab().click();
      await classesPage.searchUsersInput().fill(testdata.EditTrainerFirstName+testdata.EditTrainerLastName);
      await page.waitForTimeout(2000);
      await expect(classesPage.noUsersFoundText()).toBeVisible();
    }
    await classesPage.addTrainerButton().click();
    await expect(classesPage.addNewTrainerHeader()).toBeVisible();
    await classesPage.trainerFirstNameInput().fill(testdata.TrainerFirstName);
    await classesPage.trainerLastNameInput().fill(testdata.TrainerLastName);
    await classesPage.trainerUsernameInput().fill(testdata.TrainerFirstName+testdata.TrainerLastName);
    await classesPage.trainerPasswordInput().fill(testdata.StaffPassword);
    await classesPage.trainerGenderSelect().selectOption({ label: 'Male' });
    await classesPage.trainerAgeInput().fill(testdata.age);
    await classesPage.trainerEmailInput().fill(testdata.TrainerFirstName+testdata.TrainerLastName+'@gmail.com');
    await classesPage.trainerPhoneInput().fill(testdata.TrainerNumber);
    await classesPage.trainerRoleSelect().selectOption({ label: 'Staff' });
    await classesPage.addTrainerSubmitButton().click();
    await classesPage.dashboardTab().click();
    await classesPage.trainersTab().click();
    await classesPage.searchUsersInput().fill(testdata.TrainerFirstName+testdata.TrainerLastName);
    await page.waitForTimeout(2000);
    await expect(classesPage.trainerCardHeader(testdata.TrainerFirstName+" "+testdata.TrainerLastName)).toBeVisible();
    await expect(classesPage.trainerCardEmail(testdata.TrainerFirstName+testdata.TrainerLastName+'@gmail.com')).toBeVisible();
    await expect(classesPage.trainerCardPhone('+91'+testdata.TrainerNumber)).toBeVisible();
    await expect(classesPage.trainerCardRole('staff')).toBeVisible();
    await classesPage.schedulesTab().click();
    await classesPage.addNewScheduleButton().click();
    await expect(classesPage.scheduleTrainerOption(testdata.TrainerFirstName+" "+testdata.TrainerLastName)).toBeVisible();
    await classesPage.closeButton().click();
  });

  test('EditTrainer_VerifyINCreateSchedule', async () => {
        await classesPage.trainersTab().click();
        await classesPage.searchUsersInput().fill(testdata.TrainerFirstName+testdata.TrainerLastName);
        await page.waitForTimeout(2000);
        await expect(classesPage.trainerCardHeader(testdata.TrainerFirstName+" "+testdata.TrainerLastName)).toBeVisible();
        await classesPage.TrainerEditButton(testdata.TrainerFirstName+" "+testdata.TrainerLastName).click();
        await expect(classesPage.updateTrainerHeader()).toBeVisible();
        await expect(classesPage.Trainer_FirstNameValueValidation(testdata.TrainerFirstName)).toBeVisible();
        await classesPage.trainerFirstNameInput().fill(' ');
        await classesPage.trainerFirstNameInput().fill(testdata.EditTrainerFirstName);
        await classesPage.trainerLastNameInput().fill(' ');
        await classesPage.trainerLastNameInput().fill(testdata.EditTrainerLastName);
        await classesPage.trainerUsernameInput().fill(' ');
        await classesPage.trainerUsernameInput().fill(testdata.EditTrainerFirstName+testdata.EditTrainerLastName);
        await classesPage.trainerPasswordInput().fill(' ');
        await classesPage.trainerPasswordInput().fill(testdata.EditStaffPassword);
        await classesPage.trainerGenderSelect().selectOption({ label: 'Female' });
        await classesPage.trainerAgeInput().fill(' ');
        await classesPage.trainerAgeInput().fill(testdata.EditedMemberAge);
        await classesPage.trainerEmailInput().fill(' ');
        await classesPage.trainerEmailInput().fill(testdata.EditTrainerFirstName+testdata.EditTrainerLastName+'@gmail.com');
        await classesPage.trainerPhoneInput().fill(' ');
        await classesPage.trainerPhoneInput().fill(testdata.EditTrainerNumber);
        await classesPage.trainerRoleSelect().selectOption({ label: 'Accountant' });
        await classesPage.updateButton().click();
        await classesPage.dashboardTab().click();
        await classesPage.trainersTab().click();
        await classesPage.searchUsersInput().fill(testdata.EditTrainerFirstName+testdata.EditTrainerLastName);
        await page.waitForTimeout(2000);
        await expect(classesPage.trainerCardHeader(testdata.EditTrainerFirstName+" "+testdata.EditTrainerLastName)).toBeVisible();
        await expect(classesPage.trainerCardEmail(testdata.EditTrainerFirstName+testdata.EditTrainerLastName+'@gmail.com')).toBeVisible();
        await expect(classesPage.trainerCardPhone('+91'+testdata.EditTrainerNumber)).toBeVisible();
        await expect(classesPage.trainerCardRole('accountant')).toBeVisible();
        await classesPage.schedulesTab().click();
        await classesPage.addNewScheduleButton().click();
        await expect(classesPage.scheduleTrainerOption(testdata.EditTrainerFirstName+" "+testdata.EditTrainerLastName)).toBeVisible();
        await classesPage.closeButton().click();

    })

  test('DeleteTrainer_VerifyINCreateSchedule', async () => {
      await classesPage.trainersTab().click();
      await classesPage.searchUsersInput().fill(testdata.EditTrainerFirstName+testdata.EditTrainerLastName);
      await page.waitForTimeout(2000);
      await classesPage.trainerDeleteIcon(testdata.EditTrainerFirstName+" "+testdata.EditTrainerLastName).click();
      await classesPage.deleteButton().click();
      await classesPage.dashboardTab().click();
      await classesPage.trainersTab().click();
      await classesPage.searchUsersInput().fill(testdata.EditTrainerFirstName+testdata.EditTrainerLastName);
      await page.waitForTimeout(2000);
      await expect(classesPage.noUsersFoundText()).toBeVisible();
      await classesPage.schedulesTab().click();
      await classesPage.addNewScheduleButton().click();
      await expect(classesPage.scheduleTrainerOption(testdata.EditTrainerFirstName+" "+testdata.EditTrainerLastName)).not.toBeVisible();
      await classesPage.closeButton().click();

     })
});
