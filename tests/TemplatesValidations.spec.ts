import { test, expect ,Browser, Page} from '@playwright/test';
import { TemplatesPage } from '../pageobjects/TemplatesPage';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { LoginPage } from '../pageobjects/LoginPage';
import testdata from '../testdata.json';

test.describe('TemplatesValidations', () => {
     let browser: Browser;
     let page: Page;
     let loginPage: LoginPage;
     let templatesPage: TemplatesPage;


    test.beforeAll(async ({ playwright }) => {
      browser = await playwright.chromium.launch({ headless: false });
      page = await browser.newPage();
      loginPage = new LoginPage(page);
      templatesPage = new TemplatesPage(page);
      await loginPage.gotoLogin();
      await loginPage.emailInput().fill(testdata.email);
      await loginPage.passwordInput().fill(testdata.password);
      await loginPage.loginButton().click();
      await expect(loginPage.dashboardText(testdata.dashboardText)).toBeVisible();
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

  
   test('Edit_Member_SMSTemplate_MEMBERSHIP_EXPIRY_ALERT', async () => {
      await templatesPage.templatesAndRemindersTab().click();
      await templatesPage.memberTab().click();
      if (await templatesPage.membershipExpiryAlertCheckIcon().isVisible()) {
        console.log('MEMBERSHIP_EXPIRY_ALERT is enabled, disabling it now.');
        await templatesPage.membershipExpiryAlertEditIcon().click();
        await templatesPage.smsTemplateSlider().click();
        await templatesPage.saveButton().click();
        await expect(templatesPage.membershipExpiryAlertCrossIcon()).toBeVisible();
      }
      console.log('MEMBERSHIP_EXPIRY_ALERT is disabled, enabling it now.');
      await templatesPage.membershipExpiryAlertEditIcon().click();
      await templatesPage.smsTemplateSlider().click();
      await templatesPage.previewButton().click();
      await templatesPage.previewInput().fill('Vamsi');
      await page.waitForTimeout(2000);
      const previewText = await templatesPage.previewText().innerText();
      expect(previewText).toContain('Vamsi');
      await templatesPage.closeButton().click();
      await templatesPage.saveButton().click();
      await expect(templatesPage.membershipExpiryAlertCheckIcon()).toBeVisible();

      if (await templatesPage.membershipExpiryAlertCheckIcon().isVisible()) {
        console.log('After Setup Completion - MEMBERSHIP_EXPIRY_ALERT is enabled, disabling it now.');
        await templatesPage.membershipExpiryAlertEditIcon().click();
        await templatesPage.smsTemplateSlider().click();
        await templatesPage.saveButton().click();
        await expect(templatesPage.membershipExpiryAlertCrossIcon()).toBeVisible();
      }
    });

    test('Edit_Member_WhatsappTemplate_MEMBERSHIP_EXPIRY_ALERT', async () => {
      await templatesPage.templatesAndRemindersTab().click();
      await templatesPage.memberTab().click();

      // Step 2: If enabled, disable first
      if (await templatesPage.membershipExpiryAlertCheckIconDuplicate().isVisible()) {
        console.log('MEMBERSHIP_EXPIRY_ALERT is enabled, disabling it now.');
        await templatesPage.membershipExpiryAlertEditIconDuplicate().click();
        await templatesPage.whatsappTemplateSlider().click();
        await templatesPage.saveButton().click();
        await expect(templatesPage.membershipExpiryAlertCrossIconDuplicate()).toBeVisible();
      }

      // Step 3: Enable WhatsApp template
      await templatesPage.membershipExpiryAlertEditIconDuplicate().click();
      await templatesPage.whatsappTemplateSliderDuplicate().click();

      // Step 4: If membership_expiry_alert_member radio is visible
      if (await templatesPage.templateRadioByValue('membership_expiry_alert_member').isVisible()) {
        console.log('membership_expiry_alert_member radio is visible, switching to expiring_soon now.');
        await templatesPage.templateRadioByValue('membership_expiry_alert_member').click();
        await templatesPage.templateSearchInput().click();
        await templatesPage.templateSearchInput().fill('expiring_soon');
        await templatesPage.templateSearchResult('expiring_soon').click();
        await expect(templatesPage.templateRadioByValue('expiring_soon')).toBeVisible();
        const text = await templatesPage.templateTextArea().inputValue();
        expect(text).not.toBe('');
         await templatesPage.businessNameSelect().selectOption({ label: "Bussiness Name" });
        await templatesPage.memberNameSelect().selectOption({ label: "Member Name" });
        await templatesPage.startDateSelect().selectOption({ label : "Start Date" });
        await templatesPage.saveButton().click();
        await expect(templatesPage.membershipExpiryAlertCheckIconDuplicate()).toBeVisible();
      }

      // Step 5: If expiring_soon radio is visible
      if (await templatesPage.templateRadioByValue('expiring_soon').isVisible()) {
         console.log('Expiring Soon radio is visible, switching to membership_expiry_alert_member now.');
        await templatesPage.templateRadioByValue('expiring_soon').click();
        await templatesPage.templateSearchInput().click();
        await templatesPage.templateSearchInput().fill('membership_expiry_alert_member');
        await templatesPage.templateSearchResult('membership_expiry_alert_member').click();
        await expect(templatesPage.templateRadioByValue('membership_expiry_alert_member')).toBeVisible();
        const text = await templatesPage.templateTextArea().inputValue();
        expect(text).not.toBe('');
       await templatesPage.businessNameSelect().selectOption({ label: "Bussiness Name" });
        await templatesPage.memberNameSelect().selectOption({ label: "Member Name" });
        await templatesPage.startDateSelect().selectOption({ label : "Start Date" });
        await templatesPage.saveButton().click();
        await expect(templatesPage.membershipExpiryAlertCheckIconDuplicate()).toBeVisible();
      }

      // Step 6: After setup, disable again
      if (await templatesPage.membershipExpiryAlertCheckIconDuplicate().isVisible()) {
        console.log('After Setup Completion - MEMBERSHIP_EXPIRY_ALERT is enabled, disabling it now.');
        await templatesPage.membershipExpiryAlertEditIconDuplicate().click();
        await templatesPage.whatsappTemplateSliderDuplicate().click();
        await templatesPage.saveButton().click();
        await expect(templatesPage.membershipExpiryAlertCrossIconDuplicate()).toBeVisible();
      }
    });

  test('Edit_Owner_SMSTemplate_MEMBERSHIP_SUSPENDED_OWNER_ALERT', async () => {
    await templatesPage.templatesAndRemindersTab().click();
    await templatesPage.ownerTab().click();

    // Step 3: If enabled, disable first
    if (await templatesPage.membershipSuspendedOwnerAlertCheckIcon().isVisible()) {
      console.log('MEMBERSHIP_SUSPENDED_OWNER_ALERT is enabled, disabling it now.');
      await templatesPage.membershipSuspendedOwnerAlertEditIcon().click();
      await templatesPage.smsTemplateSlider().click();
      await templatesPage.saveButton().click();
      await templatesPage.ownerTab().click();
      await expect(templatesPage.membershipSuspendedOwnerAlertCrossIcon()).toBeVisible();
    }

    // Step 4: Enable and preview
    await templatesPage.membershipSuspendedOwnerAlertEditIcon().click();
    await templatesPage.smsTemplateSlider().click();
    await templatesPage.previewButton().click();
    await templatesPage.previewInput().fill('Vamsi');
    await page.waitForTimeout(2000);
    const previewText = await templatesPage.previewText().innerText();
    expect(previewText).toContain('Vamsi');
    await templatesPage.closeButton().click();
    await templatesPage.saveButton().click();
    await templatesPage.ownerTab().click();
    await expect(templatesPage.membershipSuspendedOwnerAlertCheckIcon()).toBeVisible();

    // Step 5: If enabled, disable again
    if (await templatesPage.membershipSuspendedOwnerAlertCheckIcon().isVisible()) {
      console.log('After Setup Completion - MEMBERSHIP_SUSPENDED_OWNER_ALERT is enabled, disabling it now.');
      await templatesPage.membershipSuspendedOwnerAlertEditIcon().click();
      await templatesPage.smsTemplateSlider().click();
      await templatesPage.saveButton().click();
      await templatesPage.ownerTab().click();
      await expect(templatesPage.membershipSuspendedOwnerAlertCrossIcon()).toBeVisible();
    }
  });


  test('Edit_Owner_WhatsAppTemplate_MEMBERSHIP_SUSPENDED_OWNER_ALERT', async () => {
    await templatesPage.templatesAndRemindersTab().click();
    await templatesPage.ownerTab().click();

    // Step 3: If enabled, disable first
    if (await templatesPage.membershipSuspendedOwnerAlertCheckIconDuplicate().isVisible()) {
      console.log('MEMBERSHIP_SUSPENDED_OWNER_ALERT WhatsApp is enabled, disabling it now.');
      await templatesPage.membershipSuspendedOwnerAlertEditIconDuplicate().click();
      await templatesPage.whatsappTemplateSliderOwner().click();
      await templatesPage.saveButton().click();
      await templatesPage.ownerTab().click();
      await expect(templatesPage.membershipSuspendedOwnerAlertCrossIconDuplicate()).toBeVisible();
    }

    // Step 4: Enable WhatsApp template
    await templatesPage.membershipSuspendedOwnerAlertEditIconDuplicate().click();
    await templatesPage.whatsappTemplateSliderOwner().click();

    // Step 5: If membership_suspended_alert_owner radio is visible
    if (await templatesPage.templateRadioByValue('membership_suspended_alert_owner').isVisible()) {
       console.log('membership_suspended_alert_owner radio is visible, switching to membership_suspended_alert_member now.');
      await templatesPage.templateRadioByValue('membership_suspended_alert_owner').click();
      await templatesPage.templateSearchInput().click();
      await templatesPage.templateSearchInput().fill('membership_suspended_alert_member');
      await templatesPage.templateSearchResult('membership_suspended_alert_member').click();
      await expect(templatesPage.templateRadioByValue('membership_suspended_alert_member')).toBeVisible();
      const text = await templatesPage.templateTextArea().inputValue();
      expect(text).not.toBe('');
      await templatesPage.ownerMembershipNameSelect().selectOption({ label: 'Member Name' });
      await templatesPage.ownerStartDateSelect1().selectOption({ label: 'Membership Name' });
      await templatesPage.saveButton().click();
      await templatesPage.ownerTab().click();
      await expect(templatesPage.membershipSuspendedOwnerAlertCheckIconDuplicate()).toBeVisible();
    }

    // Step 6: If membership_suspended_alert_member radio is visible
    if (await templatesPage.templateRadioByValue('membership_suspended_alert_member').isVisible()) {
       console.log('membership_suspended_alert_member radio is visible, switching to membership_suspended_alert_owner now.');
      await templatesPage.templateRadioByValue('membership_suspended_alert_member').click();
      await templatesPage.templateSearchInput().click();
      await templatesPage.templateSearchInput().fill('membership_suspended_alert_owner');
      await templatesPage.templateSearchResult('membership_suspended_alert_owner').click();
      await expect(templatesPage.templateRadioByValue('membership_suspended_alert_owner')).toBeVisible();
      const text = await templatesPage.templateTextArea().inputValue();
      expect(text).not.toBe('');
      await templatesPage.ownerMembershipNameSelect().selectOption({ label: 'Membership Name' });
      await templatesPage.ownerStartDateSelect1().selectOption({ label: 'Start Date' });
      await templatesPage.ownerStartDateSelect2().selectOption({ label: 'Start Date' });
      await templatesPage.ownerMemberNameSelect().selectOption({ label: 'Member Name' });
      await templatesPage.ownerBusinessNameSelect().selectOption({ label: 'Bussiness Name' });
      await templatesPage.saveButton().click();
      await templatesPage.ownerTab().click();
      await expect(templatesPage.membershipSuspendedOwnerAlertCheckIconDuplicate()).toBeVisible();
    }

    // Step 7: If enabled, disable again
    if (await templatesPage.membershipSuspendedOwnerAlertCheckIconDuplicate().isVisible()) {
      console.log('After Setup Completion - MEMBERSHIP_SUSPENDED_OWNER_ALERT WhatsApp is enabled, disabling it now.');
      await templatesPage.membershipSuspendedOwnerAlertEditIconDuplicate().click();
      await templatesPage.whatsappTemplateSliderOwner().click();
      await templatesPage.saveButton().click();
      await templatesPage.ownerTab().click();
      await expect(templatesPage.membershipSuspendedOwnerAlertCrossIconDuplicate()).toBeVisible();
    }
  });

  test('Edit_MemberShip_Expiry_Notification_Frequency', async () => {
    await templatesPage.templatesAndRemindersTab().click();
    await templatesPage.notificationFrequencyTab().click();
    const freqInput = templatesPage.membershipExpiryRowInput();
    await freqInput.fill('');
     await page.waitForTimeout(3000);
    await freqInput.fill('0,1,2,3');
    await templatesPage.copyToAllButton().click();
    await expect(templatesPage.membershipExpiryThirdInput('0,1,2,3')).toBeVisible();
    await expect(templatesPage.membershipExpiryFourthInput('0,1,2,3')).toBeVisible();
    await templatesPage.saveButton().click();
    await expect(templatesPage.templateSavedAlert()).toBeVisible();
    await templatesPage.dashboardTab().click();
    await templatesPage.templatesAndRemindersTab().click();
    await templatesPage.notificationFrequencyTab().click();
    await expect(templatesPage.membershipExpiryThirdInput('0,1,2,3')).toBeVisible();

    await templatesPage.templatesAndRemindersTab().click();
    await templatesPage.notificationFrequencyTab().click();
    const freqInput1 = templatesPage.membershipExpiryRowInput();
    await freqInput1.fill('');
    await page.waitForTimeout(3000);
    await freqInput1.fill('4,5,6,7');
    await templatesPage.copyToAllButton().click();
    await expect(templatesPage.membershipExpiryThirdInput('4,5,6,7')).toBeVisible();
    await expect(templatesPage.membershipExpiryFourthInput('4,5,6,7')).toBeVisible();
    await templatesPage.saveButton().click();
    await expect(templatesPage.templateSavedAlert()).toBeVisible();
    await templatesPage.dashboardTab().click();
    await templatesPage.templatesAndRemindersTab().click();
    await templatesPage.notificationFrequencyTab().click();
    await expect(templatesPage.membershipExpiryThirdInput('4,5,6,7')).toBeVisible();
  });

  test('AddSMSGateWay_SMSSettings', async () => {
    await templatesPage.templatesAndRemindersTab().click();
    await templatesPage.smsSettingsTab().click();
    await templatesPage.smsAddButton(1).click();
    await templatesPage.smsGatewayNameInput().fill(testdata.SMS_Gateway);
    await templatesPage.smsSenderIdInput().fill(testdata.SMS_SenderID);
    await templatesPage.smsApiKeyTextarea().fill(testdata.SMS_APIKey);
    await templatesPage.smsAddButton(2).click();
    await expect(templatesPage.smsGatewayAddedAlert()).toBeVisible();
    await expect(templatesPage.smsGatewayRow(testdata.SMS_Gateway, testdata.SMS_APIKey, testdata.SMS_SenderID, 'Disable')).toBeVisible();
  });
  
  test('EditSMSGateWay_SMSSettings', async () => {
    await templatesPage.templatesAndRemindersTab().click();
    await templatesPage.smsSettingsTab().click();
    await templatesPage.smsGatewayRow(testdata.SMS_Gateway, testdata.SMS_APIKey, testdata.SMS_SenderID, 'Disable').click();
    await expect(templatesPage.smsEditGatewayHeader()).toBeVisible();
    await templatesPage.smsGatewayNameInput().fill('');
    await templatesPage.smsGatewayNameInput().fill(testdata.EditedSMS_Gateway);
    await templatesPage.smsSenderIdInput().fill('');
    await templatesPage.smsSenderIdInput().fill(testdata.EditedSMS_SenderID);
    await templatesPage.smsApiKeyTextarea().fill('');
    await templatesPage.smsApiKeyTextarea().fill(testdata.EditedSMS_APIKey);
    await templatesPage.smsPrimarySlider().click();
    await templatesPage.smsSaveButton().click();
    await expect(templatesPage.smsGatewayAddedAlert()).toBeVisible();
    await expect(templatesPage.smsGatewayRow(testdata.EditedSMS_Gateway, testdata.EditedSMS_APIKey, testdata.EditedSMS_SenderID, 'Enable')).toBeVisible();
  });

  test('DeleteSMSGateWay_SMSSettings', async () => {
    await templatesPage.templatesAndRemindersTab().click();
    await templatesPage.smsSettingsTab().click();
    // Click the row for the enabled gateway
    await templatesPage.smsGatewayRow(testdata.EditedSMS_Gateway, testdata.EditedSMS_APIKey, testdata.EditedSMS_SenderID, 'Enable').click();
    await templatesPage.smsResetButton().click();
    await expect(templatesPage.smsResetAlert()).toBeVisible();
    await expect(templatesPage.smsApiKeyTextareaByValue(testdata.SMS_APIKey)).toBeVisible();
    await templatesPage.smsCloseButton().click();
    await page.waitForTimeout(2000);
    // Click delete icon
    await templatesPage.smsDeleteIcon(testdata.EditedSMS_Gateway, testdata.EditedSMS_APIKey, testdata.EditedSMS_SenderID).click();
    await expect(templatesPage.smsDeleteConfirmText()).toBeVisible();
    await templatesPage.smsDeleteButton().click();
    await expect(templatesPage.smsGatewayRowInvisibility(testdata.EditedSMS_Gateway, testdata.EditedSMS_APIKey, testdata.EditedSMS_SenderID)).not.toBeVisible();
    // Disable and re-enable
    await templatesPage.smsDisableIcon().click();
    await templatesPage.smsPrimarySlider().click();
    await templatesPage.smsSaveButton().click();
    await expect(templatesPage.smsGatewayAddedAlert()).toBeVisible();
    await expect(templatesPage.smsEnableIcon()).toBeVisible();
  });

  test('AddWhatsAppGateWay_WhatsAPPSettings', async () => {
    await templatesPage.templatesAndRemindersTab().click();
    await templatesPage.whatsappSettingsTab().click();
    await templatesPage.smsAddButton(2).click();
    await expect(templatesPage.whatsappAddGatewayHeader()).toBeVisible();
    await templatesPage.smsGatewayNameInput().fill(testdata.WhatsAPP_Gateway);
    await templatesPage.whatsappApiKeyTextarea().fill(testdata.WhatsAPP_APIKey);
    await templatesPage.whatsappSenderIdTextarea().fill(testdata.WhatsAPP_SenderID);
    await templatesPage.smsAddButton(3).click();
    await expect(templatesPage.smsGatewayAddedAlert()).toBeVisible();
    await expect(templatesPage.whatsappGatewayRow(testdata.WhatsAPP_Gateway, 'Bearer', testdata.WhatsAPP_SenderID)).toBeVisible();
  });

  test('EditWhatsAppGateWay_WhatsAPPSettings', async () => {
  await templatesPage.templatesAndRemindersTab().click();
  await templatesPage.whatsappSettingsTab().click();
  await templatesPage.whatsappGatewayRow(testdata.WhatsAPP_Gateway, 'Bearer', testdata.WhatsAPP_SenderID).click();
  await expect(templatesPage.whatsappEditGatewayHeader()).toBeVisible();
  await templatesPage.smsGatewayNameInput().fill(testdata.Edited_WhatsAPP_Gateway);
  const isPrimaryChecked = await templatesPage.primaryCheckbox().isChecked();
  if (isPrimaryChecked) {
    console.log('Gateway is already primary.');
    await templatesPage.smsSaveButton().click();
    await expect(templatesPage.smsGatewayAddedAlert()).toBeVisible();
    await expect(templatesPage.whatsappGatewayAddedIcon(testdata.Edited_WhatsAPP_Gateway, 'Bearer', testdata.WhatsAPP_SenderID)).toBeVisible();
  } else {
    console.log('Gateway is not primary. Making it primary now.');
    await templatesPage.primarySpan().click();
    await templatesPage.smsSaveButton().click();
    await expect(templatesPage.smsGatewayAddedAlert()).toBeVisible();
    await expect(templatesPage.whatsappGatewayAddedIcon(testdata.Edited_WhatsAPP_Gateway, 'Bearer', testdata.WhatsAPP_SenderID)).toBeVisible();
  }
});
  
  test('EditWhatsAppGateWay_SameAPIKey_VerifyErrorAlert', async () => {
  await templatesPage.templatesAndRemindersTab().click();
  await templatesPage.whatsappSettingsTab().click();
  await expect(templatesPage.whatsappGatewayAddedIcon(testdata.Edited_WhatsAPP_Gateway, 'Bearer', testdata.WhatsAPP_SenderID)).toBeVisible();
  await templatesPage.whatsappGatewayAddedIcon(testdata.Edited_WhatsAPP_Gateway, 'Bearer', testdata.WhatsAPP_SenderID).click();
  await expect(templatesPage.whatsappEditGatewayHeader()).toBeVisible();
  await templatesPage.smsGatewayNameInput().fill(testdata.Edited_WhatsAPP_Gateway);
  await templatesPage.whatsappApiKeyTextarea().fill(testdata.Edited_WhatsAPP_APIKey);
  await templatesPage.whatsappSenderIdTextarea().fill(testdata.Edited_WhatsAPP_SenderID);
  await templatesPage.smsSaveButton().click();
  await expect(templatesPage.whatsappGatewayError()).toBeVisible();
  await templatesPage.smsResetButton().click();
  await expect(templatesPage.smsResetAlert()).toBeVisible();
  await expect(templatesPage.smsApiKeyTextareaByValue(testdata.WhatsAPP_SenderID)).toBeVisible();
  await templatesPage.closeButton().click();
});
  
  test('DeleteWhatsAppGateWay_WhatsAPPSettings', async () => {
  await templatesPage.templatesAndRemindersTab().click();
  await templatesPage.whatsappSettingsTab().click();
  await expect(templatesPage.whatsappGatewayAddedIcon(testdata.Edited_WhatsAPP_Gateway, 'Bearer', testdata.WhatsAPP_SenderID)).toBeVisible();
  await templatesPage.whatsappDeleteIcon(testdata.Edited_WhatsAPP_Gateway, 'Bearer', testdata.WhatsAPP_SenderID).click();
  await expect(templatesPage.whatsappDeleteConfirmText()).toBeVisible();
  await templatesPage.smsDeleteButton().click();
  await expect(templatesPage.whatsappGatewayRowInvisibility(testdata.Edited_WhatsAPP_Gateway, 'Bearer', testdata.WhatsAPP_SenderID)).not.toBeVisible();
});
  
  });




