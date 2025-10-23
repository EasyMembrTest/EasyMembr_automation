import { test, expect } from '@playwright/test';
import { BussinessDetailsTabPage } from '../pageobjects/BussinessDetailsTabPage';
import testdata from '../testdata.json';
import { LoginPage } from '../pageobjects/LoginPage';
import { ManageAccount } from '../pageobjects/ManageAccount';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';

let businessName: string;
let giftCards: string;


test.beforeAll(() => {
       businessName =`${testdata.businessName}${Array.from({length: 6}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}`;
       giftCards= `${testdata.giftCards}${Array.from({length: 6}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}`;
    });

test.afterEach(async ({page}, testInfo) =>{
    // Wait 1 second to ensure screenshots are captured before next test or browser close
    await page.waitForTimeout(1000);
    if (testInfo.status === 'failed') {
      await captureAndAttachScreenshot(page, testInfo, `${testInfo.title}-failed`);
    } else if (testInfo.status === 'passed') {
      await captureAndAttachScreenshot(page, testInfo, `${testInfo.title}-passed`);
    }
  });


 
test('EditBussinessDetails', async ({ page }) => {
  const businessPage = new BussinessDetailsTabPage(page);
    const loginPage = new LoginPage(page);
    const ManageAccountPage = new ManageAccount(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Business Details tab
  await businessPage.businessDetailsTab().click();
  // 2. Click on edit icon
  await businessPage.editBusinessDetailsIcon().click();
  // 3. Edit Business Name
    await businessPage.businessNameInput().click();
  await businessPage.businessNameInput().fill('');
  await businessPage.businessNameInput().fill(businessName);
   console.log('businessName:', businessName);
  // 4. Edit First Name
  await businessPage.firstNameInput().click();
  await businessPage.firstNameInput().fill('');
  await businessPage.firstNameInput().fill(testdata.firstName);
  // 5. Edit Last Name
   await businessPage.lastNameInput().click();
  await businessPage.lastNameInput().fill('');
  await businessPage.lastNameInput().fill(testdata.bussinessLastName);
  // 6. Select State
  await businessPage.stateSelect().selectOption({ label: testdata.state });
  // 7. Edit Business Email
  await businessPage.businessEmailInput().click();
  await businessPage.businessEmailInput().fill('');
  await businessPage.businessEmailInput().fill(testdata.businessEmail);
  // 8. Edit Phone
    await businessPage.phoneInput().click();
  await businessPage.phoneInput().fill('');
  await businessPage.phoneInput().fill(testdata.phone);
  // 9. Edit City
    await businessPage.cityInput().click();
  await businessPage.cityInput().fill('');
  await businessPage.cityInput().fill(testdata.bussinessCity);
  // 10. Edit Shortcode
    await businessPage.shortcodeInput().click();
  await businessPage.shortcodeInput().fill('');
  await businessPage.shortcodeInput().fill(testdata.shortcode);
  // 11. Select Date Format
  await businessPage.dateFormatSelect().selectOption({ label: testdata.dateFormat });
  // 12. Edit Members Capacity
  await businessPage.membersCapacityInput().click();
  await businessPage.membersCapacityInput().fill('');
  await businessPage.membersCapacityInput().fill(testdata.membersCapacity);
  // 13. Edit Address
    await businessPage.addressInput().click();
  await businessPage.addressInput().fill('');
  await businessPage.addressInput().fill(testdata.bussinessAddress);
  // 14. Edit Number
   await businessPage.numberInput().click();
  await businessPage.numberInput().fill('');
  await businessPage.numberInput().fill(testdata.number);
  // 15. Click Save
  await businessPage.saveButton().click();
  await loginPage.SuccessAlert(`Business Info (EasyMember) updated successfully`)
  //await expect(businessPage.profileSavedAlert()).toBeVisible();
  // 16. Click Dashboard
  await businessPage.dashboardTab().click();
  // 17. Click Business Details tab again
  await businessPage.businessDetailsTab().click();
  // 18-28. Assertions for all fields
  await expect(businessPage.businessDetailsLabel(businessName)).toBeVisible();
  await expect(businessPage.businessDetailsLabel(testdata.firstName)).toBeVisible();
  await expect(businessPage.businessDetailsLabel(testdata.bussinessLastName)).toBeVisible();
  await expect(businessPage.businessDetailsLabel(testdata.businessEmail)).toBeVisible();
  await expect(businessPage.businessDetailsLabel(testdata.phoneLabel)).toBeVisible();
  await expect(businessPage.cityLabel()).toBeVisible();
  await expect(businessPage.stateLabel()).toBeVisible();
  await expect(businessPage.businessDetailsLabel(testdata.shortcode)).toBeVisible();
  await expect(businessPage.dateFormatLabel()).toBeVisible();
  await expect(businessPage.membersCapacityLabel()).toBeVisible();
  await expect(businessPage.numberLabel()).toBeVisible();
  await ManageAccountPage.gotoManageAccount();
  await ManageAccountPage.clickGymsTab();
  await expect(businessPage.businessDetailsLabel(businessName)).toBeVisible();
  await expect(businessPage.businessDetailsLabel(testdata.firstName)).toBeVisible();
  await expect(businessPage.businessDetailsLabel(testdata.bussinessLastName)).toBeVisible();
  await expect(businessPage.businessDetailsLabel(testdata.businessEmail)).toBeVisible();
  await expect(businessPage.businessDetailsLabel(testdata.phoneLabel)).toBeVisible();
  await expect(businessPage.cityLabel()).toBeVisible();
  await expect(businessPage.stateLabel()).toBeVisible();
  await expect(businessPage.bussinessAddressLabel(testdata.bussinessAddress)).toBeVisible();
});


test.afterAll(async ({ browser }) => {
    // Revert business details to original values after test
    const page = await browser.newPage();
    const businessPage = new BussinessDetailsTabPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.emailInput().fill(testdata.email);
    await loginPage.passwordInput().fill(testdata.password);
    await loginPage.loginButton().click();
    await businessPage.businessDetailsTab().click();
    await businessPage.editBusinessDetailsIcon().click();
    await businessPage.businessNameInput().click();
    await businessPage.businessNameInput().fill('');
    await businessPage.businessNameInput().fill(testdata.businessName1);
    console.log('businessName1:', testdata.businessName1);
    await businessPage.firstNameInput().click();
    await businessPage.firstNameInput().fill('');
    await businessPage.firstNameInput().fill(testdata.firstName1);
    await businessPage.lastNameInput().click();
    await businessPage.lastNameInput().fill('');
    await businessPage.lastNameInput().fill(testdata.bussinessLastName1);
    await businessPage.stateSelect().selectOption({ label: testdata.state1 });
    await businessPage.businessEmailInput().click();
    await businessPage.businessEmailInput().fill('');
    await businessPage.businessEmailInput().fill(testdata.businessEmail1);
    await businessPage.phoneInput().click();
    await businessPage.phoneInput().fill('');
    await businessPage.phoneInput().fill(testdata.phone1);
    await businessPage.cityInput().click();
    await businessPage.cityInput().fill('');
    await businessPage.cityInput().fill(testdata.bussinessCity1);
    await businessPage.shortcodeInput().click();
    await businessPage.shortcodeInput().fill('');
    await businessPage.shortcodeInput().fill(testdata.shortcode1);
    await businessPage.dateFormatSelect().selectOption({ label: testdata.dateFormat1 });
    await businessPage.membersCapacityInput().click();
    await businessPage.membersCapacityInput().fill('');
    await businessPage.membersCapacityInput().fill(testdata.membersCapacity1);
    await businessPage.addressInput().click();
    await businessPage.addressInput().fill('');
    await businessPage.addressInput().fill(testdata.bussinessAddress1);
    await businessPage.numberInput().click();
    await businessPage.numberInput().fill('');
    await businessPage.numberInput().fill(testdata.number1);
    await businessPage.saveButton().click();
      await businessPage.dashboardTab().click();
       await businessPage.businessDetailsTab().click();
         await expect(businessPage.businessDetailsLabel(testdata.businessName1)).toBeVisible();
    await page.close();
});


test('EditPaymentDetails', async ({ page }) => {
  const businessPage = new BussinessDetailsTabPage(page);
   const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Business Details tab
  await businessPage.businessDetailsTab().click();
  // 2. Click on Payment Methods edit icon
  await businessPage.paymentMethodsEditIcon().click();
  // 8. Click Add New Payment Method icon
  await businessPage.addNewPaymentMethodIcon().click();
  // 9. Enter GiftCards in payment methods input
   await businessPage.paymentMethodsInput().click();
  await businessPage.paymentMethodsInput().fill(giftCards);
  // 10. Click GiftCards checkbox
  await page.locator(`//input[@value="${giftCards}"]/../..//button/img/../../..//input[@type="checkbox"]`).click();
  // 11. Click Save button
  await businessPage.saveButtonPayment().click();
  // 12. Verify Profile saved successfully alert
  await expect(businessPage.profileSavedAlert()).toBeVisible();
  // 13. Verify GiftCards label is visible
  await expect(page.locator(`//label[text()='${giftCards}']`)).toBeVisible();
  // 14. Click Point of Sale tab
  await businessPage.pointOfSaleTab().click();
  // 15. Search Raghu in Search Plan/Addon
  await businessPage.planSearchInputPOS().fill(testdata.planNameSetup);
  // 16. Click on search result Raghu
  await businessPage.planSearchResultPOS(testdata.planNameSetup).click();
  // 17. Click add plan button
  await businessPage.addPlanButtonPOS().click();
  // 18. Click first user card
  await businessPage.firstUserCard().click();
  // 19. Click Done button
  await businessPage.doneButtonPOS().click();
  // 20. Click Continue button
  await businessPage.continueButtonPOS().click();
  // 21. Verify Payment Information is visible
  await expect(businessPage.paymentInformationText()).toBeVisible();
  // 22. Verify GiftCards is visible
  await expect(page.locator(`//div[text()='${giftCards}']`)).toBeVisible();
  // 23. Click dismiss button
  await page.waitForTimeout(5000);
  await businessPage.dismissButtonPayment().click();
   await page.locator('//a[text()=" Plans, Slots & Addons"]').click();
  await businessPage.businessDetailsTab().click();
  await page.waitForTimeout(5000);
   await businessPage.paymentMethodsEditIcon().click();
    console.log('Deleting a GiftCard:', giftCards);
    await page.locator(`//input[@value="${giftCards}"]/../..//button/img`).click();
    await businessPage.saveButtonPayment().click();
      await expect(businessPage.profileSavedAlert()).toBeVisible();
      await expect(page.locator(`//label[text()='${giftCards}']/..`)).not.toBeVisible();
      

});

test('EditTaxSettings', async ({ page }) => {
  const businessPage = new BussinessDetailsTabPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();

  // 1. Click on Business Details tab
  await businessPage.businessDetailsTab().click();
  // 2. Click on Tax Settings edit icon
  await businessPage.taxSettingsEditIcon().click();
  // 3. Click on Add Tax Settings icon
  await businessPage.addTaxSettingsIcon().click();
  // 4. Get size of tax name inputs
  const nameInputs = await businessPage.taxNameInputs().elementHandles();
  const valueInputs = await businessPage.taxValueInputs().elementHandles();
  const checkboxes = await businessPage.taxCheckboxes().elementHandles();
  const size = nameInputs.length;
  // 5. Click last tax name input and enter GST
  await nameInputs[size-1].click();
  await nameInputs[size-1].fill('GST');
  // 6. Enter 30 in last tax value input
  await valueInputs[size-1].click();
  await valueInputs[size-1].fill(testdata.GSTAmount);
  // 7. Click last checkbox
  await checkboxes[size-1].click();
  // 8. Click Save button
  await businessPage.saveButtonTax().click();
  // 9. Verify Profile saved successfully alert
  await expect(businessPage.profileSavedAlert()).toBeVisible();
  // 10. Verify tax value span 30 is visible
  await expect(businessPage.taxValueSpan(testdata.GSTAmount)).toBeVisible();
  // 11. Click on Point of Sale tab
  await businessPage.pointOfSaleTab().click();
  // 12. Search Raghu in Search Plan/Addon
  await businessPage.planSearchInputPOS().fill('Raghu');
  // 13. Click on search result Raghu
  await businessPage.planSearchResultPOS('Raghu').click();
  // 14. Verify tax value span 30 is visible
  await expect(page.locator(`//span[text()='${testdata.GSTAmount}']`)).toBeVisible();
  // 15. Click on Business Details tab
  await businessPage.businessDetailsTab().click();
  // 16. Click on Tax Settings edit icon
  await businessPage.taxSettingsEditIcon().click();
  // 17. Click on tax delete button for value 30
  await businessPage.taxDeleteButton(testdata.GSTAmount).click();
  // 18. Click Save button
  await businessPage.saveButtonTax().click();
  // 19. Verify Profile saved successfully alert
  await expect(businessPage.profileSavedAlert()).toBeVisible();
  // 20. Click on Plans, Slots & Addons tab
  await page.click('//a[text()=" Plans, Slots & Addons"]');
  // 21. Click on Business Details tab
  await businessPage.businessDetailsTab().click();
  await page.waitForTimeout(5000);
  // 22. Verify tax value span 30 is not visible
  await expect(businessPage.taxValueSpan(testdata.GSTAmount)).not.toBeVisible();
});


test('EditDigitalWaiver', async ({ page }) => {
  const businessPage = new BussinessDetailsTabPage(page);
   const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
  // 1. Click on Business Details tab
  await businessPage.businessDetailsTab().click();
  // 2. Click on Digital Waiver edit icon
  await businessPage.digitalWaiverEditIcon().click();
  // 3. Verify Digital Waiver Form is visible
  await page.waitForTimeout(2000);
  await expect(businessPage.digitalWaiverForm()).toBeVisible();
  // 4. Edit Title
  await businessPage.digitalWaiverTitleInput().fill('');
  await businessPage.digitalWaiverTitleInput().fill(testdata.DigitalWaiver);
  // 5. Edit Consent checkbox text
  await businessPage.digitalWaiverConsentTextarea().fill('');
  await businessPage.digitalWaiverConsentTextarea().fill(testdata.WaiverText);
  // 6. Edit Terms in editor
  await businessPage.digitalWaiverTermsEditor().fill('');
  //await businessPage.digitalWaiverTermsEditor().fill('Need to Accept Terms');
  await page.locator('//div[@class="ql-editor ql-blank"]').fill(testdata.AgreementText);
  // 7. Click Mandatory Radio Button
  await businessPage.mandatoryRadioButton().click();
  // 8. Click Save button
  await businessPage.saveButtonDigitalWaiver().click();
  await loginPage.SuccessAlert(`waiver settings updated sucessfully `);
  //await expect(businessPage.profileSavedAlert()).toBeVisible();
  // 9. Click Dashboard
  await businessPage.dashboardTab().click();
  // 10. Click Business Details tab again
  await businessPage.businessDetailsTab().click();
  // 11. Assert Title label is visible
  await expect(businessPage.digitalWaiverTitleLabel(testdata.DigitalWaiver)).toBeVisible();
  // 12. Assert Consent label is visible
  await expect(businessPage.digitalWaiverConsentLabel(testdata.WaiverText)).toBeVisible();
  // 13. Assert Terms label is visible
  await expect(businessPage.digitalWaiverTermsLabel(testdata.AgreementText)).toBeVisible();
  // 14. Assert Mandatory span is visible
  await expect(businessPage.mandatorySpan()).toBeVisible();
  // 15. Show QR Code and verify
  await expect(businessPage.showQRCodeButton()).toBeVisible();
  await businessPage.showQRCodeButton().click();
  await expect(businessPage.qrCodeTitle(testdata.DigitalWaiver)).toBeVisible();
  await expect(businessPage.qrCodeSVG()).toBeVisible();
  await page.waitForLoadState('networkidle');
  // 18. Copy Link and verify alert
  console.log(`waiting time: ${new Date().toLocaleTimeString()}`);
  await page.waitForTimeout(10000)
  console.log(`waiting time: ${new Date().toLocaleTimeString()}`);
  await businessPage.showQRCodeButton().click();
  await expect(businessPage.copyLinkButton()).toBeVisible({ timeout: 20000 });
  await businessPage.copyLinkButton().scrollIntoViewIfNeeded();
  await businessPage.copyLinkButton().click({force: true});
  await expect(businessPage.copyLinkAlert()).toBeVisible();
  // 19. Regenerate Link and verify
  await expect(businessPage.regenerateLinkButton()).toBeVisible({ timeout: 20000 });
  await businessPage.regenerateLinkButton().click({force: true});
  await expect(businessPage.regeneratingStrong()).toBeVisible({timeout: 20000});
  // 20. Click second Regenerate Link button
  await page.locator('(//button[text()="Regenerate Link"])[2]').click({force: true});
  // 21. Click Close button
  await page.waitForTimeout(3000);
  await businessPage.closeButton().click({force: true});
  //Edit to original
  await businessPage.businessDetailsTab().click();
  await businessPage.digitalWaiverEditIcon().click();
   await expect(businessPage.digitalWaiverForm()).toBeVisible();
  await businessPage.digitalWaiverTitleInput().fill('');
  await businessPage.digitalWaiverTitleInput().fill(testdata.OriginalDigitalWaiver);
  await businessPage.digitalWaiverConsentTextarea().fill('');
  await businessPage.digitalWaiverConsentTextarea().fill(testdata.OriginalWaiverText);
  await businessPage.digitalWaiverTermsEditor().fill('');
  await page.locator('//div[@class="ql-editor ql-blank"]').fill(testdata.OriginalAgreementText);
  await businessPage.optionalRadioButton().click();
  await businessPage.saveButtonDigitalWaiver().click();
  await businessPage.dashboardTab().click();
  await businessPage.businessDetailsTab().click();
  await expect(businessPage.digitalWaiverTitleLabel(testdata.OriginalDigitalWaiver)).toBeVisible();
});


test('EditBussinessHours', async ({ page }) => {
  const businessPage = new BussinessDetailsTabPage(page);
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.emailInput().fill(testdata.email);
  await loginPage.passwordInput().fill(testdata.password);
  await loginPage.loginButton().click();
  await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
  // 1. Click on Business Details tab
  await businessPage.businessDetailsTab().click();
  // 2. Click on Business Hours edit icon
  await businessPage.businessHoursEditIcon().click();
  // 3. Verify Business Hours form is visible
  await expect(businessPage.businessHoursForm()).toBeVisible();
  // 4. Select 7 AM in first slot
  await businessPage.slotSelect(1).selectOption({ label: '7 AM' });
  // 5. Select 9 AM in second slot
  await businessPage.slotSelect(2).selectOption({ label: '9 AM' });
  // 6. Click plus icon
  await expect(businessPage.plusIcon()).toBeVisible();
  await businessPage.plusIcon().click();
  // 7. Verify second Sunday business details data is visible
  await expect(businessPage.sundayBusinessDetailsData(2)).toBeVisible();
  // 8. Select 1 PM in new Sunday slot
  await businessPage.sundayBusinessDetailsSelect(2, 1).selectOption({ label: '1 PM' });
  // 9. Select 5 PM in new Sunday slot
  await businessPage.sundayBusinessDetailsSelect(2, 2).selectOption({ label: '5 PM' });
  // 10. Click Monday slider
  await expect(businessPage.mondaySlider()).toBeVisible();
  await businessPage.mondaySlider().click();
  // 11. Click Save button
  await businessPage.saveButtonBusinessHours().click();
  // 12. Verify Profile saved successfully alert
  await expect(businessPage.profileSavedAlert()).toBeVisible();
  // 13. Click Dashboard
  await businessPage.dashboardTab().click();
  // 14. Click Business Details tab
  await businessPage.businessDetailsTab().click();
  // 15. Verify Sunday label 1 is 7 AM
  await expect(businessPage.sundayLabel(1, '7 AM')).toBeVisible();
  // 16. Verify Sunday label 2 is 5 PM
  await expect(businessPage.sundayLabel(2, '5 PM')).toBeVisible();
  // 17. Verify Monday label is not visible
  await expect(businessPage.mondayLabel()).not.toBeVisible();

  // Back to Original Settings
  // 18. Click Business Hours edit icon
  await businessPage.businessHoursEditIcon().click();
  // 19. Delete second Sunday slot
  await expect(businessPage.sundayBusinessDetailsDeleteButton(2)).toBeVisible();
  await businessPage.sundayBusinessDetailsDeleteButton(2).click();
  // 20. Wait 2 seconds
  await page.waitForTimeout(2000);
  // 21. Verify delete button is not visible
  await expect(businessPage.sundayBusinessDetailsDeleteButton(2)).not.toBeVisible();
  // 22. Click Monday slider
  await expect(businessPage.mondaySlider()).toBeVisible();
  await businessPage.mondaySlider().click();
  // 23. Select 1 AM in first slot
  await businessPage.slotSelect(1).selectOption({ label: '1 AM' });
  // 24. Select 3 AM in second slot
  await businessPage.slotSelect(2).selectOption({ label: '3 AM' });
  // 25. Wait 5 seconds
  await page.waitForTimeout(5000);
  // 26. Click Save button
  await businessPage.saveButtonBusinessHours().click();
  // 27. Verify Profile saved successfully alert
  await expect(businessPage.profileSavedAlert()).toBeVisible();
  // 28. Click Dashboard
  await businessPage.dashboardTab().click();
  // 29. Click Business Details tab
  await businessPage.businessDetailsTab().click();
  await page.waitForTimeout(5000);
  // 30. Verify Sunday label 1 is 1 AM
  await businessPage.sundayLabel(1, '1 AM').scrollIntoViewIfNeeded();
  await expect(businessPage.sundayLabel(1, '1 AM')).toBeVisible();
  // 31. Verify Sunday label 1 is 3 AM
  await expect(businessPage.sundayLabel(1, '3 AM')).toBeVisible();
  // 32. Verify Monday label is visible
  await expect(businessPage.mondayLabel()).toBeVisible();
});

