import { Page, Locator, expect } from '@playwright/test';

export class TemplatesPage {

  
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  whatsappGatewayError(): Locator {
    return this.page.locator("//div[contains(text(),'Please Enter valid Gateway')]");
  }

    whatsappDeleteIcon(name: string, apiKeyPart: string, url: string): Locator {
    return this.page.locator(`//div[@class='datatable datatable-hover Transaction__table sno']//tbody/tr/td[text()='${name}']/../td[contains(text(),'${apiKeyPart}')]/../td[text()='${url}']/../td[6]//i[2]`);
  }
  whatsappDeleteConfirmText(): Locator {
    return this.page.locator("//strong[text()='Are you sure you want to delete this whatsApp Gateway??']");
  }
  whatsappGatewayRowInvisibility(name: string, apiKeyPart: string, url: string): Locator {
    return this.page.locator(`//div[@class='datatable datatable-hover Transaction__table sno']//tbody/tr/td[text()='${name}']/../td[contains(text(),'${apiKeyPart}')]/../td[text()='${url}']/../td[6]//i[2]`);
  }

    whatsappEditGatewayHeader(): Locator {
      return this.page.locator("//h5[text()=' Edit WhatsApp Gateway']");
    }
    primaryCheckbox(): Locator {
      return this.page.locator("//label[text()='Primary:']/..//input");
    }
    primarySpan(): Locator {
      return this.page.locator("//label[text()='Primary:']/..//input/..//span");
    }
    whatsappGatewayAddedIcon(name: string, apiKeyPart: string, url: string): Locator {
      return this.page.locator(`//div[@class='datatable datatable-hover Transaction__table sno']//tbody/tr/td[text()='${name}']/../td[contains(text(),'${apiKeyPart}')]/../td[text()='${url}']/../td[text()='Enable']/../td[6]//i[1]`);
    }

  smsResetButton(): Locator {
    return this.page.locator("//button[text()='Reset']");
  }
  smsResetAlert(): Locator {
    return this.page.locator("//div[contains(@class,'alert') and contains(.,'Reset Done successfully')]");
  }
  smsApiKeyTextareaByValue(value: string): Locator {
    return this.page.locator(`//textarea[text()='${value}']`);
  }
  smsCloseButton(): Locator {
    return this.page.locator("//button[text()='Close']");
  }
  smsDeleteIcon(name: string, apiKey: string, senderId: string): Locator {
    return this.page.locator(`//div[@class='datatable datatable-hover sno Transaction__table']//tbody/tr/td[text()='${name}']/../td[text()='${apiKey}']/../td[text()='${senderId}']/../td[text()='Enable']/../td[7]/div/i[2]`);
  }
  smsDeleteConfirmText(): Locator {
    return this.page.locator("//strong[text()='Are you sure you want to delete this SMS Gateway??']");
  }

   WhatsAPPDeleteConfirmText(): Locator {
    return this.page.locator("//strong[text()='Are you sure you want to delete this whatsApp Gateway??']");
  }
  smsDeleteButton(): Locator {
    return this.page.locator("//button[text()='Delete']");
  }
  smsGatewayRowInvisibility(name: string, apiKey: string, senderId: string): Locator {
    return this.page.locator(`//div[@class='datatable datatable-hover sno Transaction__table']//tbody/tr/td[text()='${name}']/../td[text()='${apiKey}']/../td[text()='${senderId}']/../td[text()='Enable']`);
  }
  smsDisableIcon(): Locator {
    return this.page.locator("//div[@class='datatable datatable-hover sno Transaction__table']//tbody/tr/td[text()='Disable']/../td[7]/div/i[1]");
  }
  smsEnableIcon(): Locator {
    return this.page.locator("//div[@class='datatable datatable-hover sno Transaction__table']//tbody/tr/td[text()='Enable']/../td[7]/div/i[1]");
  }

  // --- OWNER Tab and MEMBERSHIP_SUSPENDED_OWNER_ALERT Methods (with duplicates) ---
  ownerTab(): Locator {
    return this.page.locator("//a[text()='Owner']");
  }

  membershipSuspendedOwnerAlertCheckIcon(): Locator {
    return this.page.locator("//td[text()='MEMBERSHIP_SUSPENDED_OWNER_ALERT']/../td[2]//i[@class='fas fa-check text-success fs-5']");
  }

    // --- WhatsApp OWNER Alert Duplicates ---
    membershipSuspendedOwnerAlertCheckIconDuplicate(): Locator {
      return this.page.locator("//td[text()='MEMBERSHIP_SUSPENDED_OWNER_ALERT']/../td[3]//i[@class='fas fa-check text-success fs-5']");
    }
    membershipSuspendedOwnerAlertCrossIconDuplicate(): Locator {
      return this.page.locator("//td[text()='MEMBERSHIP_SUSPENDED_OWNER_ALERT']/../td[3]//i[@class='fas fa-times text-danger fs-5']");
    }
    membershipSuspendedOwnerAlertEditIconDuplicate(): Locator {
      return this.page.locator("(//td[text()='MEMBERSHIP_SUSPENDED_OWNER_ALERT']/..//../../../td[5]//i[@class='fas fa-edit fs-5'])[1]");
    }
    whatsappTemplateSliderOwner(): Locator {
      return this.page.locator("//h6[text()='WhatsApp Template']/..//span[@class='slider round']");
    }
   
    templateRadioByValue(value: string): Locator {
      return this.page.locator(`//input[@value='${value}']`);
    }
    templateSearchInput(): Locator {
      return this.page.locator("//input[@placeholder='Search...']");
    }
    templateSearchResult(text: string): Locator {
      return this.page.locator(`//span[text()='${text}']`);
    }
    templateTextArea(): Locator {
      return this.page.locator("(//textarea)[2]");
    }
    // For WhatsApp OWNER selects (5 selects)
    ownerMembershipNameSelect(): Locator {
      return this.page.locator("((//div[@class='card p-3 border border-1 border-secondary mt-4 shadow-0'])[2]//select)[1]");
    }
    ownerStartDateSelect1(): Locator {
      return this.page.locator("((//div[@class='card p-3 border border-1 border-secondary mt-4 shadow-0'])[2]//select)[2]");
    }
    ownerStartDateSelect2(): Locator {
      return this.page.locator("((//div[@class='card p-3 border border-1 border-secondary mt-4 shadow-0'])[2]//select)[3]");
    }
    ownerMemberNameSelect(): Locator {
      return this.page.locator("((//div[@class='card p-3 border border-1 border-secondary mt-4 shadow-0'])[2]//select)[4]");
    }
    ownerBusinessNameSelect(): Locator {
      return this.page.locator("((//div[@class='card p-3 border border-1 border-secondary mt-4 shadow-0'])[2]//select)[5]");
    }
  
  membershipSuspendedOwnerAlertEditIcon(): Locator {
    return this.page.locator("(//td[text()='MEMBERSHIP_SUSPENDED_OWNER_ALERT']/..//../../../td[5]//i[@class='fas fa-edit fs-5'])[1]");
  }
 
  membershipSuspendedOwnerAlertCrossIcon(): Locator {
    return this.page.locator("//td[text()='MEMBERSHIP_SUSPENDED_OWNER_ALERT']/../td[2]//i[@class='fas fa-times text-danger fs-5']");
  }


  templatesAndRemindersTab(): Locator {
    return this.page.locator("//a[text()=' Templates & Reminders ']");
  }

  memberTab(): Locator {
    return this.page.locator("//a[text()='Member']");
  }

  membershipExpiryAlertRow(): Locator {
    return this.page.locator("//td[text()='MEMBERSHIP_EXPIRY_ALERT']");
  }

  membershipExpiryAlertCheckIcon(): Locator {
    return this.page.locator("(//td[text()='MEMBERSHIP_EXPIRY_ALERT']/..//i[@class='fas fa-check text-success fs-5'])[1]");
  }

  membershipExpiryAlertEditIcon(): Locator {
    return this.page.locator("(//td[text()='MEMBERSHIP_EXPIRY_ALERT']/..//../../../td[5]//i[@class='fas fa-edit fs-5'])[1]");
  }

  smsTemplateSlider(): Locator {
    return this.page.locator("//h6[text()='SMS Template']/..//span[@class='slider round']");
  }

  saveButton(): Locator {
    return this.page.locator("//button[text()='Save']");
  }

  membershipExpiryAlertCrossIcon(): Locator {
    return this.page.locator("(//td[text()='MEMBERSHIP_EXPIRY_ALERT']/..//i[@class='fas fa-times text-danger fs-5'])[1]");
  }

  previewButton(): Locator {
    return this.page.locator("//button[text()='Preview']");
  }

  previewInput(): Locator {
    return this.page.locator("(//input[@placeholder='Enter value'])[1]");
  }

  previewText(): Locator {
    return this.page.locator("//p[@class='p-3 mb-0']");
  }

  closeButton(): Locator {
    return this.page.locator("//button[@class='ripple ripple-surface btn-close']");
  }

    // --- Notification Frequency Methods ---
    notificationFrequencyTab(): Locator {
      return this.page.locator("//a[text()='Notification Frequency']");
    }
    membershipExpiryRowInput(): Locator {
      return this.page.locator("//div[@class='notificationFrequencyDatatable']//tbody/tr/td[text()='Membership Expiry']/../td[2]//input");
    }
    copyToAllButton(): Locator {
      return this.page.locator("//div[@class='notificationFrequencyDatatable']//tbody/tr/td[text()='Membership Expiry']/../td[2]//button[text()='Copy to All']");
    }
    membershipExpiryThirdInput(number: string): Locator {
      return this.page.locator(`//div[@class='notificationFrequencyDatatable']//tbody/tr/td[text()='Membership Expiry']/../td[3]//input[@value='${number}']`);
    }
    membershipExpiryFourthInput(number: string): Locator {
      return this.page.locator(`//div[@class='notificationFrequencyDatatable']//tbody/tr/td[text()='Membership Expiry']/../td[4]//input[@value='${number}']`);
    }
    templateSavedAlert(): Locator {
      return this.page.locator("//div[contains(@class,'alert') and contains(.,'Template saved successfully')]");
    }
    dashboardTab(): Locator {
      return this.page.locator("//a[text()=' Dashboard']");
    }

      // --- SMS Settings Methods ---
      smsSettingsTab(): Locator {
        return this.page.locator("//a[text()='SMS Settings']");
      }
      smsAddButton(index = 1): Locator {
        return this.page.locator(`(//button[text()='Add'])[${index}]`);
      }
      smsGatewayNameInput(): Locator {
        return this.page.locator("//input[@placeholder='Name']");
      }
      smsSenderIdInput(): Locator {
        return this.page.locator("//input[@placeholder='Sender ID']");
      }
      smsApiKeyTextarea(): Locator {
        return this.page.locator("//textarea[@id='textAreaExample']");
      }
      smsGatewayAddedAlert(): Locator {
        return this.page.locator("//div[contains(@class,'alert') and contains(.,'Gateway added successfully')]");
      }
      smsGatewayRow(name: string, apiKey: string, senderId: string, status: string): Locator {
        return this.page.locator(`//div[@class='datatable datatable-hover sno Transaction__table']//tbody/tr/td[text()='${name}']/../td[text()='${apiKey}']/../td[text()='${senderId}']/../td[text()='${status}']/../td[7]/div/i[1]`);
      }
  // --- WhatsApp Template Methods (with duplicates as requested) ---
  whatsappTemplateSlider(): Locator {
    return this.page.locator("//h6[text()='WhatsApp Template']/..//span[@class='slider round']");
  }
  whatsappTemplateSliderDuplicate(): Locator {
    return this.page.locator("//h6[text()='WhatsApp Template']/..//span[@class='slider round']");
  }
  membershipExpiryAlertEditIconDuplicate(): Locator {
    return this.page.locator("(//td[text()='MEMBERSHIP_EXPIRY_ALERT']/..//../../../td[5]//i[@class='fas fa-edit fs-5'])[1]");
  }
  membershipExpiryAlertCheckIconDuplicate(): Locator {
    return this.page.locator("//td[text()='MEMBERSHIP_EXPIRY_ALERT']/../td[3]//i[@class='fas fa-check text-success fs-5']");
  }
  membershipExpiryAlertCrossIconDuplicate(): Locator {
    return this.page.locator("//td[text()='MEMBERSHIP_EXPIRY_ALERT']/../td[3]//i[@class='fas fa-times text-danger fs-5']");
  }
  businessNameSelect(): Locator {
    return this.page.locator("((//div[@class='card p-3 border border-1 border-secondary mt-4 shadow-0'])[2]//select)[1]");
  }
  memberNameSelect(): Locator {
    return this.page.locator("((//div[@class='card p-3 border border-1 border-secondary mt-4 shadow-0'])[2]//select)[2]");
  }
  startDateSelect(): Locator {
    return this.page.locator("((//div[@class='card p-3 border border-1 border-secondary mt-4 shadow-0'])[2]//select)[3]");
  }

  smsEditGatewayHeader(): Locator {
    return this.page.locator("//h5[text()=' Edit SMS Gateway']");
  }

  smsPrimarySlider(): Locator {
    return this.page.locator("//span[@class='slider round']");
  }

  smsSaveButton(): Locator {
    return this.page.locator("(//button[text()='Save'])[1]");
  }

    whatsappSettingsTab(): Locator {
    return this.page.locator("//a[text()='Whatsapp Settings']");
  }
  whatsappApiKeyTextarea(): Locator {
    return this.page.locator("(//textarea[@id='textAreaExample'])[1]");
  }
  whatsappSenderIdTextarea(): Locator {
    return this.page.locator("(//textarea[@id='textAreaExample'])[2]");
  }
  whatsappGatewayRow(name: string, apiKeyPart: string, url: string): Locator {
    return this.page.locator(`//div[@class='datatable datatable-hover Transaction__table sno']//tbody/tr/td[text()='${name}']/../td[contains(text(),'${apiKeyPart}')]/../td[text()='${url}']/../td[6]//i[1]`);
  }
  whatsappAddGatewayHeader(): Locator {
    return this.page.locator("//h5[text()=' Add WhatsApp Gateway']");
  }
}
