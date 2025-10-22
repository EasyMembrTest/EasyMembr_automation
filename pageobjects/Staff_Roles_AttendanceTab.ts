import { Page, Locator } from '@playwright/test';

export class StaffRolesAttendanceTab {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  staffRolesAttendanceTab(): Locator {
    return this.page.locator("//a[text()=' Staff Roles & Attendance']");
  }

  addStaffButton(): Locator {
    return this.page.locator("//span[text()='Add Staff']");
  }

  staffTableRow(staffName: string, mobile: string, email: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td[text()='+91${mobile}']/../td[text()='${email}']/../td/label[text()='admin']`);
  }

  checkInOutTab(): Locator {
    return this.page.locator("//a[text()=' Check-In/Check-Out']");
  }

  checkInButton(): Locator {
    return this.page.locator('(//input[@class="checkinbutton"])[1]');
  }

  trainerSelect(): Locator {
    return this.page.locator("//span[text()='Trainer: ']/..//select");
  }

  // --- Methods for EditStaffInfo__VerifyEditedStaff_WhileCheckIN_TrainerDropDown ---
  staffTableRow_Accountant(staffName: string, mobile: string, email: string): Locator {
    return this.page.locator(`(//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td[text()='+91${mobile}']/../td[text()='${email}']/../td/label[text()='accountant']/../../td/button/img)[1][@alt='Edit']`);
  }
  staffTableRow_Admin(staffName: string, mobile: string, email: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td[text()='+91${mobile}']/../td[text()='${email}']/../td/label[text()='admin']`);
  }

   staffTableRow_Admin1(staffName: string, mobile: string, email: string): Locator {
    return this.page.locator(`(//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td[text()='+91${mobile}']/../td[text()='${email}']/../td/label[text()='admin']/../../td/button/img)[1][@alt='Edit']`);
  }

   staffTableRow_AdminDelete(staffName: string, mobile: string, email: string): Locator {
    return this.page.locator(`(//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td[text()='+91${mobile}']/../td[text()='${email}']/../td/label[text()='admin']/../../td/button/img)[2][@alt='Delete']`);
  }

  // --- Methods for CheckInStaff_VerifyAttendance ---
  staffViewAttendanceButton(staffName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td//button[text()='View Attendance']`);
  }
  staffInfoHeader(): Locator {
    return this.page.locator("//h5[text()='Staff Information']");
  }
  staffCheckInHead(staffName: string): Locator {
    return this.page.locator(`//span[@class='checkIn-Head'][text()='${staffName}']`);
  }
  staffAttendanceTableCells(): Locator {
    return this.page.locator("(//div[@class='FixedtableHeader table-flow sno']//tbody/tr/td)[2]");
  }
  staffAttendanceCloseButton(): Locator {
    return this.page.locator('//button[@class="btn-close"]');
  }
  staffCheckInButton(staffName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td//button[text()='Check-In']`);
  }
  staffCheckOutButton(staffName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td//button[text()='Check-Out']`);
  }

  // --- Methods for DeleteStaff ---
  staffDeleteIcon(staffName: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td//button/img[@alt='Delete']`);
  }
  // --- Custom methods for staff import verification ---
  staffImportSuccessAlert(): Locator {
    return this.page.locator("//div[contains(text(),'Staff(s) Imported Successfully!')]");
  }

  staffTableRowDetails(staffName: string, mobile: string, email: string): Locator {
    return this.page.locator(`//div[@class='datatable sno staffDatatable']//tbody/tr/td[text()='${staffName}']/../td[text()='+91${mobile}']/../td[text()='${email}']/../td/label[text()='staff']`);
  }
}
