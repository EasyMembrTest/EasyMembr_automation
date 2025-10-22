import { Page, Locator } from '@playwright/test';

export class BussinessInfoPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  businessInfoTab(): Locator {
    return this.page.locator("//a[text()='BusinessInfo']");
  }

  // Privacy policy edit icon next to the label
  privacyPolicyEditIcon(): Locator {
    return this.page.locator("//label[text()='Privacy Policy:']/..//i[@class='fas fa-edit']");
  }

  // Policy title input
  policyTitleInput(): Locator {
    return this.page.locator("//input[@placeholder='Enter policy title']");
  }

  // Rich text editor container
  policyEditor(): Locator {
    return this.page.locator("//div[@class='ql-editor']");
  }

  // Save button in the policy modal/page
  saveButton(): Locator {
    return this.page.locator("//button[text()='Save']");
  }

  // Label for a saved policy title
  policyTitleLabel(title: string): Locator {
    return this.page.locator(`//label[text()='${title}']`);
  }

  // Paragraph under Privacy Policy displaying content
  policyParagraph(text: string): Locator {
    return this.page.locator(`//label[text()='Privacy Policy:']/../..//label[@title='${text}']`);
  }


  TermsConditionsEditIcon(): Locator {
    return this.page.locator("//label[text()='Terms and Conditions']/..//i[@class='fas fa-edit']");
  }

    TermsTitleInput(): Locator {
    return this.page.locator("//input[@placeholder='Enter title']");
  }

  // Class Business Settings edit icon
  classBusinessSettingsEditIcon(): Locator {
    return this.page.locator("//label[text()=' Class Business Settings ']/..//i[@class='fas fa-edit']");
  }

  // Waiver form success check icon
  waiverFormCheckIcon(): Locator {
    return this.page.locator("//label[text()=' Wavier Form :  ']/..//i[@class='fas fa-check-circle me-2 text-success']");
  }

  // Slider toggle (generic)
  sliderRound(): Locator {
    return this.page.locator("//span[@class='slider round']");
  }

    PaymentMode( text:string): Locator {
    return this.page.locator(`//span[text()='${text}']`);
  }

  UserClassBookingURLSettingsEditIcon(): Locator {
    return this.page.locator("//label[text()='User Class Booking URL']/..//i[@class='fas fa-edit']");
  }

  onlineclick(){
    return this.page.locator("//input[@value='online']")
  }
}
