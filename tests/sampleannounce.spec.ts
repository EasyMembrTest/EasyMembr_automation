import { test, expect,  Browser, Page } from "@playwright/test";
import { SampleTwoPage } from "../pageobjects/sampletwo";
import { ClassesPage } from '../pageobjects/ClassesPage';
import testdata from '../testdata.json';
import { LoginPage } from '../pageobjects/LoginPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';

test.describe("Sample Announcement Tests", () => {
 let browser: Browser;
  let page: Page;
  let classesPage: ClassesPage;
  let loginPage: LoginPage;
  let sampleTwoPage: SampleTwoPage;
    test.beforeAll(async ({ playwright }) => {
    browser = await playwright.chromium.launch({ headless: false });
    page = await browser.newPage();
    classesPage = new ClassesPage(page);
    loginPage = new LoginPage(page);
     sampleTwoPage = new SampleTwoPage(page);
    await loginPage.gotoClassLogin();
    await loginPage.classmemberEmailInput().fill(testdata.email);
    await loginPage.classmemberPasswordInput().fill(testdata.password);
    await loginPage.loginButton().click();
    await expect(classesPage.dashboardTab()).toBeVisible();
  });

//   test.beforeEach(async ({ page }) => {
//     sampleTwoPage = new SampleTwoPage(page);
//     // Navigate to the application base URL (adjust based on your config)
//     // await page.goto("/"); // Uncomment if needed
//   });

  test("Sample_announcement - Create and verify announcement", async ({  }) => {
    // Step 1: Click on BusinessInfo link
    await sampleTwoPage.clickBusinessInfoLink();
    await page.waitForTimeout(5000);

    // Step 2: Click on Create Announcement button
    await sampleTwoPage.clickCreateAnnouncementButton();
    await page.waitForTimeout(500);

    // Step 3: Enter announcement title
    await sampleTwoPage.enterAnnouncementTitle("Holiday");
    await page.waitForTimeout(300);

    // Step 4: Enter announcement content
    await sampleTwoPage.enterAnnouncementContent("Diwali");
    await page.waitForTimeout(300);

    // Step 5: Click on Select Icon button
    await sampleTwoPage.clickSelectIconButton();
    await page.waitForTimeout(500);

    // Step 6: Select the first icon
    await sampleTwoPage.selectFirstIcon();
    await page.waitForTimeout(300);

    // Step 7: Verify Change Icon button is visible
    await sampleTwoPage.verifyChangeIconButtonVisible();

    // Step 8: Set up dialog handler and post announcement
    const dialogPromise = sampleTwoPage.handleSuccessDialog();
    await sampleTwoPage.clickPostAnnouncementButton();
    await dialogPromise;
    await page.waitForTimeout(500);

    // Step 9: Verify announcement title is visible
    await sampleTwoPage.verifyAnnouncementTitleVisible();

    // Step 10: Click on notification icon
    await sampleTwoPage.clickNotificationIcon();
    await page.waitForTimeout(500);

    // Step 11: Verify notification heading is visible
    await sampleTwoPage.verifyNotificationHeadingVisible();
  });

  test("Sample_announcement - Complete flow using helper methods", async ({ page }) => {
    // Create announcement using helper method
    await sampleTwoPage.createAnnouncement("Holiday", "Diwali");

    // Post announcement and verify
    await sampleTwoPage.postAnnouncementAndVerify();
    await page.waitForTimeout(500);

    // Verify announcement in notifications
    await sampleTwoPage.verifyAnnouncementInNotifications();
  });
});
