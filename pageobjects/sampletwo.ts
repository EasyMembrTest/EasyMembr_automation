import { Page, expect } from "@playwright/test";

export class SampleTwoPage {
  private page: Page;
  private businessInfoLink = "//a[text()='BusinessInfo']";
  private createAnnouncementButton = "//button[text()='Create Announcement']";
  private announcementTitleInput = "//input[@id='announcementTitle']";
  private announcementEditorDiv = "//div[contains(@class,'ql-editor ql-blank')]";
  private selectIconButton = "//button[text()='Select Icon']";
  private firstIconOption = "((//div[@class='d-flex flex-wrap'])[1]/div)[1]";
  private changeIconButton = "//button[text()='Change Icon']";
  private postAnnouncementButton = "//button[text()='Post Announcement']";
  private announcementTitle = "//p[@class='bussiness-announcement-title'][text()='Holiday']";
  private notificationIcon = "//i[@class='fas fa-bullhorn m-0 notification-icon']";
  private notificationHeading = "//h5[text()='Holiday']";

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Click on BusinessInfo link
   */
  async clickBusinessInfoLink() {
    await this.page.click(this.businessInfoLink);
  }

  /**
   * Click on Create Announcement button
   */
  async clickCreateAnnouncementButton() {
    await this.page.click(this.createAnnouncementButton);
  }

  /**
   * Enter announcement title
   * @param title - Title to enter
   */
  async enterAnnouncementTitle(title: string) {
    await this.page.click(this.announcementTitleInput);
    await this.page.fill(this.announcementTitleInput, title);
  }

  /**
   * Enter announcement content in the editor
   * @param content - Content to enter
   */
  async enterAnnouncementContent(content: string) {
    await this.page.click(this.announcementEditorDiv);
    await this.page.fill(this.announcementEditorDiv, content);
  }

  /**
   * Click on Select Icon button
   */
  async clickSelectIconButton() {
    await this.page.click(this.selectIconButton);
  }

  /**
   * Select the first icon from the available options
   */
  async selectFirstIcon() {
    await this.page.click(this.firstIconOption);
  }

  /**
   * Verify the visibility of Change Icon button
   */
  async verifyChangeIconButtonVisible() {
    const changeIconBtn = this.page.locator(this.changeIconButton);
    await expect(changeIconBtn).toBeVisible();
  }

  /**
   * Handle the success dialog
   */
  async handleSuccessDialog() {
    return new Promise<void>((resolve) => {
      this.page.once("dialog", async (dialog) => {
        expect(dialog.message()).toBe("Announcement posted successfully!");
        await dialog.accept();
        resolve();
      });
    });
  }

  /**
   * Click on Post Announcement button
   */
  async clickPostAnnouncementButton() {
    await this.page.click(this.postAnnouncementButton);
  }

  /**
   * Verify the announcement title is visible
   */
  async verifyAnnouncementTitleVisible() {
    const announcementTitleElement = this.page.locator(this.announcementTitle);
    await expect(announcementTitleElement).toBeVisible();
  }

  /**
   * Click on notification icon
   */
  async clickNotificationIcon() {
    await this.page.click(this.notificationIcon);
  }

  /**
   * Verify the notification heading is visible
   */
  async verifyNotificationHeadingVisible() {
    const notificationHeadingElement = this.page.locator(this.notificationHeading);
    await expect(notificationHeadingElement).toBeVisible();
  }

  /**
   * Complete announcement creation flow
   * @param title - Announcement title
   * @param content - Announcement content
   */
  async createAnnouncement(title: string, content: string) {
    await this.clickBusinessInfoLink();
    await this.clickCreateAnnouncementButton();
    await this.enterAnnouncementTitle(title);
    await this.enterAnnouncementContent(content);
    await this.clickSelectIconButton();
    await this.selectFirstIcon();
    await this.verifyChangeIconButtonVisible();
  }

  /**
   * Post announcement and verify
   */
  async postAnnouncementAndVerify() {
    // Set up dialog handler before clicking post
    const dialogPromise = this.handleSuccessDialog();
    await this.clickPostAnnouncementButton();
    await dialogPromise;
  }

  /**
   * Verify announcement in notifications
   */
  async verifyAnnouncementInNotifications() {
    await this.verifyAnnouncementTitleVisible();
    await this.clickNotificationIcon();
    await this.verifyNotificationHeadingVisible();
  }
}
