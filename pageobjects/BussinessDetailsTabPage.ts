import { Page, Locator, expect } from '@playwright/test';
import { testdata } from '../tests/testdata.ts';


export class BussinessDetailsTabPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  businessDetailsTab(): Locator {
    return this.page.locator("//a[text()=' Business Details']");
  }

  editBusinessDetailsIcon(): Locator {
    return this.page.locator("//label[text()='Business Details ']/..//i[@class='fas fa-edit']");
  }

  businessNameInput(): Locator {
    return this.page.locator('input[placeholder="Busniess Name"]');
  }

  firstNameInput(): Locator {
    return this.page.locator('input[placeholder="First Name"]');
  }

  lastNameInput(): Locator {
    return this.page.locator('input[placeholder="Last Name"]');
  }

  stateSelect(): Locator {
    return this.page.locator('(//label[text()="State:"])[2]/..//select');
  }

  businessEmailInput(): Locator {
    return this.page.locator('input#business_email');
  }

  phoneInput(): Locator {
    return this.page.locator('input.PhoneInputInput');
  }

  cityInput(): Locator {
    return this.page.locator('input#city');
  }

  shortcodeInput(): Locator {
    return this.page.locator('input[name="shortcode"]');
  }

  dateFormatSelect(): Locator {
    return this.page.locator('(//label[text()="Preferred Date Format:"])[2]/..//select');
  }

  membersCapacityInput(): Locator {
    return this.page.locator('input#members_capacity');
  }

  addressInput(): Locator {
    return this.page.locator('input#address');
  }

  numberInput(): Locator {
    return this.page.locator('input[type="number"]');
  }

  saveButton(): Locator {
    return this.page.locator('//button[text()="Save"]');
  }

  dashboardTab(): Locator {
    return this.page.locator("//a[text()=' Dashboard']");
  }

  businessDetailsLabel(text: string): Locator {
    return this.page.locator(`//label[text()='${text}']`);
  }

  cityLabel(): Locator {
    return this.page.locator(`(//label[text()="${testdata.bussinessCity}"])[1]`);
  }

  stateLabel(): Locator {
    return this.page.locator(`//label[text()="${testdata.state}"]`);
  }

  dateFormatLabel(): Locator {
    return this.page.locator(`//label[text()="${testdata.dateFormat}"]`);
  }

  membersCapacityLabel(): Locator {
    return this.page.locator(`//label[text()="${testdata.membersCapacity}"]`);
  }

  numberLabel(): Locator {
    return this.page.locator(`//label[text()="${testdata.number}"]`);
  }

  paymentMethodsEditIcon(): Locator {
    return this.page.locator("//label[text()='Payment Methods']/..//i[@class='fas fa-edit']");
  }

  giftCardsButtonImg(): Locator {
    return this.page.locator("//input[@value='GiftCards']/../..//button/img");
  }

  saveButtonPayment(): Locator {
    return this.page.locator('(//button[text()="Save"])[1]');
  }

  profileSavedAlert(): Locator {
    return this.page.getByText('Profile saved successfully');
  }

  addNewPaymentMethodIcon(): Locator {
    return this.page.locator("//label[text()='Add New Payment Method']/..//i");
  }

  paymentMethodsInput(): Locator {
   return this.page.locator('(//input[@class="payment_methods_input me-3"])[last()]');
  }

  giftCardsCheckbox(): Locator {
    return this.page.locator('//input[@value="GiftCards"]/../..//button/img/../../..//input[@type="checkbox"]');
  }

  giftCardsLabel(): Locator {
    return this.page.locator('//label[text()="GiftCards"]');
  }

  pointOfSaleTab(): Locator {
    return this.page.locator("//a[text()=' Point of Sale']");
  }

  planSearchInputPOS(): Locator {
    return this.page.getByPlaceholder('Search Plan/Addon');
  }

  planSearchResultPOS(planName: string): Locator {
    return this.page.getByText(planName);
  }

  addPlanButtonPOS(): Locator {
    return this.page.locator('//button[@class="mt-2 p-0 button-link"]');
  }

  firstUserCard(): Locator {
    return this.page.locator('(//div[@class="row usercar-prev"])[1]');
  }

  doneButtonPOS(): Locator {
    return this.page.getByText('Done');
  }

  continueButtonPOS(): Locator {
    return this.page.locator('button[type="submit"].btn.btn-primary.ms-2.w-50.text-nowrap');
  }

  paymentInformationText(): Locator {
    return this.page.getByText('Payment Information');
  }

  dismissButtonPayment(): Locator {
    return this.page.locator('(//button[@class="btn-close"])');
  }

  
  giftCardsLabel_1(): Locator {
    return this.page.locator('//div[text()="GiftCards"]');
  }

  taxSettingsEditIcon(): Locator {
    return this.page.locator("//label[text()='Tax Settings']/..//i[@class='fas fa-edit']");
  }

  addTaxSettingsIcon(): Locator {
    return this.page.locator("//label[text()='Add Tax Settings']/..//i");
  }

  taxNameInputs(): Locator {
    return this.page.locator('//input[@class="payment_methods_input me-2"]');
  }

  taxValueInputs(): Locator {
    return this.page.locator('//input[@class="payment_methods_input "]');
  }

  taxCheckboxes(): Locator {
    return this.page.locator('//input[@class="payment_methods_input "]/../..//input[@type="checkbox"]');
  }

  saveButtonTax(): Locator {
    return this.page.locator('(//button[text()="Save"])[1]');
  }

  taxValueSpan(value: string): Locator {
    return this.page.locator(`//span[@class='payment-span chip']/..//span[text()='${value}']`);
  }

  taxDeleteButton(value: string): Locator {
    return this.page.locator(`//input[@value='${value}']/../..//button/img`);
  }

  digitalWaiverEditIcon(): Locator {
    return this.page.locator("//label[text()=' Digital Waiver ']/..//i[@class='fas fa-edit']");
  }

  digitalWaiverForm(): Locator {
    return this.page.getByText('Digital Waiver Form');
  }

  digitalWaiverTitleInput(): Locator {
    return this.page.locator("//label[text()='Title: ']/..//input");
  }

  digitalWaiverConsentTextarea(): Locator {
    return this.page.locator("//label[text()='Consent checkbox text']/..//textarea");
  }

  digitalWaiverTermsEditor(): Locator {
    return this.page.locator("//div[@class='ql-editor']/p");
  }

  mandatoryRadioButton(): Locator {
    return this.page.locator("(//label[text()='Email']/..//input)[1]");
  }

  optionalRadioButton(): Locator {
    return this.page.locator("(//label[text()='Email']/..//input)[2]");
  }

  saveButtonDigitalWaiver(): Locator {
    return this.page.getByText('Save');
  }

  digitalWaiverTitleLabel(text: string): Locator {
    return this.page.locator(`//label[text()='${text}']`);
  }

  digitalWaiverConsentLabel(text: string): Locator {
    return this.page.locator(`//div[text()='${text}']`);
  }

  digitalWaiverTermsLabel(text: string): Locator {
    return this.page.locator(`//p[text()='${text}']`);
  }

  mandatorySpan(): Locator {
    return this.page.locator("//span[text()='Email: ']/../span[text()='Mandatory']");
  }

  showQRCodeButton(): Locator {
    return this.page.getByText(' Show QR Code');
  }

  qrCodeTitle(text: string): Locator {
    return this.page.locator(`//h5[text()='${text}']`);
  }

  qrCodeSVG(): Locator {
    return this.page.locator('svg[role="img"][viewBox="0 0 29 29"]');
  }

  copyLinkButton(): Locator {
    return this.page.locator("//button[text()='Copy Link']")
  }

  copyLinkAlert(): Locator {
    return this.page.getByText('Link copied to clipboard!');
  }

  regenerateLinkButton(): Locator {
    return this.page.getByText('Regenerate Link');
  }

  regeneratingStrong(): Locator {
    return this.page.locator('//strong[text()="Regenerating"]');
  }

  closeButton(): Locator {
    return this.page.locator('//button[text()="Close"]');
  }

  businessHoursEditIcon(): Locator {
    return this.page.locator("//label[text()='Business Hours ']/..//i[@class='fas fa-edit']");
  }

  businessHoursForm(): Locator {
    return this.page.locator("//h5[text()='Business Hours']");
  }

  slotSelect(index: number): Locator {
    return this.page.locator(`(//select[@class='slotdrop mx-1'])[${index}]`);
  }

  plusIcon(): Locator {
    return this.page.locator('(//i[@class="fas fa-plus"])[1]/..');
  }

  sundayBusinessDetailsData(index: number): Locator {
    return this.page.locator(`(//label[text()='Sunday']/../..//li[@class='Business_Details_data'])[${index}]`);
  }

  sundayBusinessDetailsSelect(parentIndex: number, selectIndex: number): Locator {
    return this.page.locator(`((//label[text()='Sunday']/../..//li[@class='Business_Details_data'])[${parentIndex}]//select)[${selectIndex}]`);
  }

  mondaySlider(): Locator {
    return this.page.locator("//label[text()='Monday']/..//span[@class='slider round']");
  }

  sundayLabel(index: number, text: string): Locator {
    return this.page.locator(`(//label[text()='Sunday:']/..//span/label)[${index}][text()='${text}']`);
  }

  mondayLabel(): Locator {
    return this.page.locator("//label[text()='Monday:']");
  }

  sundayBusinessDetailsDeleteButton(parentIndex: number): Locator {
    return this.page.locator(`(//label[text()='Sunday']/../..//li[@class='Business_Details_data'])[${parentIndex}]//button`);
  }

  saveButtonBusinessHours(): Locator {
    return this.page.getByText('Save');
  }

  profileSavedAlertBusinessHours(): Locator {
    return this.page.getByText('Business hours saved successfully');
  }

  businessHoursLabel(day: string, index: number, text: string): Locator {
    return this.page.locator(`(//label[text()='${day}']/..//span/label)[${index}][text()='${text}']`);
  }

   bussinessAddressLabel(text: string): Locator {
    return this.page.locator(`//label[text()='Business Address:']/../label[2][text()='${text}']`);
  }
}
