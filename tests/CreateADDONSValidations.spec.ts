import { test, expect, Browser, Page } from '@playwright/test';
import { AddOnsPage } from '../pageobjects/AddOnsPage';
import testdata from '../testdata.json';
import { captureAndAttachScreenshot } from '../utils/screenshotHelper';
import { MembersManagementTabPage } from '../pageobjects/MembersManagementTabPage';
import { LoginPage } from '../pageobjects/LoginPage';

const filePath = 'V:/EasyMembr_TestData/CreateMemberForAddOnSetup.xlsx';

test.describe('CreateADDONSValidations', () => {
      let browser: Browser;
      let page: Page;
      let addOnsPage: AddOnsPage;
      let membersPage: MembersManagementTabPage;
      let loginPage: LoginPage;

 test.beforeAll(async ({ playwright }) => {
    browser = await playwright.chromium.launch({ headless: false });
    page = await browser.newPage();
    addOnsPage = new AddOnsPage(page);
    membersPage = new MembersManagementTabPage(page);
    loginPage = new LoginPage(page);
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

test('CreateAddONS_VerifyInPOS_AddMemberToAddONSByMultiplePayments_DiscountValidation_EditBillingDetails_VerifyInMemberManagement_Member_ADDONSSection', async ({  }) => {
  //Creating a User Shiva shiva through ImportSheet For Setup
  await addOnsPage.DeleteExistingAddONS(testdata.AddOnName, page);
  await loginPage.DeleteExistingMember(testdata.MemberForAddOnSetup, page, '+919876543211');
  await membersPage.membersManagementTab().click();
  await membersPage.importButton().click();
  await membersPage.fileInput().setInputFiles(filePath);
  await expect(membersPage.uploadedFileText('CreateMemberForAddOnSetup.xlsx')).toBeVisible();
  await membersPage.uploadButton().click();
  await expect(membersPage.memberImportedAlert()).toBeVisible();
  // 1. Click Dashboard
  await addOnsPage.clickDashboard();
  // 2. Click Plans, Slots & Addons and wait
  await addOnsPage.clickPlansSlotsAddonsAndWait();
  // 3. Click Addons tab
  await addOnsPage.clickAddonsTab();
  // 4. Click Create Addons
  await addOnsPage.clickCreateAddons();
  // 5. Enter product name
  await addOnsPage.enterProductName(testdata.AddOnName);
  // 6. Enter price
  await addOnsPage.enterPrice(testdata.AddonPrice);
  // 7. Uncheck IncludeTax
  await addOnsPage.uncheckIncludeTax();
  // 8. Enter description
  await addOnsPage.enterDescription(testdata.AddonDescription);
  // 9. Click Save
  await addOnsPage.clickSave();
  // 10. Verify Addon saved alert
  await addOnsPage.verifyAddonSavedAlert();
  // 11. Click Dashboard (duplicate)
  await addOnsPage.clickDashboardAgain();
  // 12. Click Plans, Slots & Addons and wait (duplicate)
  await addOnsPage.clickPlansSlotsAddonsAndWaitAgain();
  // 13. Click Addons tab (duplicate)
  await addOnsPage.clickAddonsTabAgain();
  // 14. Search Addons
  await addOnsPage.searchAddons(testdata.AddOnName);
  // 15. Verify Addons table row count
  const rows = await addOnsPage.getAddonsTableRows();
  expect(await rows.count()).toBe(1);
  // 16. Verify Addons table row by name, price, tax
  await addOnsPage.verifyAddonsTableRow(testdata.AddOnName, '₹' + testdata.AddonPrice, 'Excluded');
  // 17. Click Point of Sale
  await addOnsPage.clickPointOfSale();
  // 18. Verify and click Search Plan/Addon input
  await addOnsPage.clickSearchPlanAddonInput();
  // 19. Search for Addon in POS
  await addOnsPage.searchAddonInPOS(testdata.AddOnName);
  // 20. Click Addon in POS
  await addOnsPage.clickAddonInPOS(testdata.AddOnName);
  // 21. Click Members Add button
  await addOnsPage.clickMembersAddButton();
  // 22. Search for member
  await addOnsPage.searchMember(testdata.MemberForAddOnSetup);
  // 23. Click member by name
  await addOnsPage.clickMemberByName(testdata.MemberFirstNameForAddOnSetup);
  // 24. Click Done button
  await addOnsPage.clickDoneButton();
  // 25. Verify the visibility of price element
  await addOnsPage.verifyPriceVisibility(testdata.AddonPrice);
  // 26. Click and enter value in number input
  await addOnsPage.enterNumberInput(testdata.AddOnDiscount);
  // 27. Verify the visibility of calculated value
  await addOnsPage.verifyCalculatedValue('1000.00');

  // 28. Verify the visibility of input with member name
  await addOnsPage.verifyMemberInputValue(testdata.MemberForAddOnSetup);
  // 29. Click EDIT button
  await addOnsPage.clickEditButton();
  // 30. Verify the visibility of li with member name
  await addOnsPage.verifyMemberListItem(testdata.MemberForAddOnSetup);
  // 31. Click Add Name from the system and wait
  await addOnsPage.clickAddNameFromSystem();
  // 32. Click FirstMember in List
  await addOnsPage.clickFirstMemberInList();
  // 32. Get text from FirstMember in List and store in variable
  const FirstMemberName = await addOnsPage.getFirstMemberName();
  console.log('SecondMemberName:', FirstMemberName);
  // 33. Click Done Button (reuse clickDoneButton)
  await addOnsPage.clickDoneButton();
  // 34. Verify the visibility of li containing FirstMemberName
  await addOnsPage.verifyMemberListItemContains(`${FirstMemberName}`);
  // 35. Click Add New Billing Name
  await addOnsPage.clickAddNewBillingName();
  // 36. Enter billing name
  await addOnsPage.enterBillingName(testdata.BillingName);
  // 37. Enter billing mobile
  await addOnsPage.enterBillingMobile(testdata.BillingMobileNumber);
  // 38. Enter billing email
  await addOnsPage.enterBillingEmail(testdata.BillingEmail);
  // 39. Click Save
  await addOnsPage.clickSaveButton();
  // 40. Verify visibility of billing name, mobile, email inputs
  await addOnsPage.verifyBillingInputs(testdata.BillingName, testdata.BillingMobileNumber, testdata.BillingEmail);

  // 41. Click Continue button
  await addOnsPage.clickContinueButton();
  // 42. Click Multiple and wait
  await addOnsPage.clickMultipleAndWait();
  // 43. Scroll, click first split input, type amount, get balance amount
  const balanceamount = await addOnsPage.enterFirstSplitAmountAndGetBalance(testdata.price);
  console.log('Balance Amount:', balanceamount);
  // 44. Scroll, click second split input, type balance amount
  await addOnsPage.enterSecondSplitAmount(balanceamount);
  // 45. Click Done
  await addOnsPage.clickDonePaymentButton();
  // 46. Verify Transaction created successfully alert
  await addOnsPage.verifyTransactionCreatedAlert();
  // 47. Verify Payment Successful
  await addOnsPage.verifyPaymentSuccessful();
  // 48. Select shiva shiva in dropdown
  await addOnsPage.selectTrainer(testdata.trainer);
  // 49. Click Check-In and wait
  await addOnsPage.clickCheckInAndWait();
  // 50. Verify Check-Out and click
  await addOnsPage.verifyAndClickCheckOut();
  // 51. Click close button
  await addOnsPage.clickSecondCloseButton();

  // 52. Click Members Management
  await addOnsPage.clickMembersManagement();
  // 53. Search for member
  await addOnsPage.searchMemberInManagement(testdata.MemberForAddOnSetup);
  // 54. Click Apply button
  await addOnsPage.clickApplyButton();
  // 55. Verify and click member row with AddOn
  await addOnsPage.verifyAndClickMemberAddOnRow(testdata.MemberForAddOnSetup, testdata.AddOnName);
  // 56. Click Addons tab in member and verify row count
  await addOnsPage.clickMemberAddonsTabAndVerifyRowCount(1);
  // 57. Verify Addons row by name in member
  await addOnsPage.verifyMemberAddonsRowByName(testdata.AddOnName);
  
});

test('CreateAddONSWithDisabled_ImportSheet_VerifyInvisibilityINPOS', async ({  }) => {
  const filePath = 'V:/EasyMembr_TestData/Sample_Addon_Data.xlsx';
  // 1. Dashboard
  await addOnsPage.clickDashboard();
  // 2. Plans, Slots & Addons
  await addOnsPage.clickPlansSlotsAddonsAndWait();
  // 3. Addons tab
  await addOnsPage.clickAddonsTab();
  // 4. Click Import
  await addOnsPage.clickImportButton();
  // 5. Upload file
  await addOnsPage.uploadAddOnsFile(filePath);
  // 6. Verify file name
  await addOnsPage.verifyUploadedFileVisible('Sample_Addon_Data.xlsx');
  // 7. Click Upload
  await addOnsPage.clickUploadButton();
  // 8. Verify Addon(s) Imported successfully!
  await addOnsPage.verifyAddonsImportedAlert();
  // 9. Dashboard
  await addOnsPage.clickDashboard();
  // 10. Plans, Slots & Addons again
  await addOnsPage.clickPlansSlotsAddonsAndWaitAgain();
  // 11. Addons tab again
  await addOnsPage.clickAddonsTabAgain();
  // 12. Search for Gloves
  await addOnsPage.searchAddons(testdata.ImportAddOnName);
  // 13. Verify table row count
  const rows = await addOnsPage.getAddonsTableRows();
  expect(await rows.count()).toBe(1);
  // 14. Verify Addons table row by all columns
  await addOnsPage.verifyAddonsTableRowAll(testdata.ImportAddOnName, '₹500', 'Included', 'Disabled');
  // 15. Go to POS
  await addOnsPage.clickPointOfSale();
  // 16. Search for AddOn in POS
  await addOnsPage.searchAddonInPOS(testdata.ImportAddOnName);
  // 17. Verify invisibility in POS
  await addOnsPage.verifyAddonNotVisibleInPOS(testdata.ImportAddOnName);
 
});

test('VerifyFilterDropDown', async ({  }) => {
  // 1. Dashboard
  await addOnsPage.clickDashboard();
  // 2. Plans, Slots & Addons
  await addOnsPage.clickPlansSlotsAddonsAndWait();
  // 3. Addons tab
  await addOnsPage.clickAddonsTab();
  // 4. Select Disable in FilterDropdown and wait
  await addOnsPage.selectDisableInFilterDropdownAndWait();
  // 5. Get status list and assert
  const statusList = await addOnsPage.getAddOnsStatusList();
  if (statusList.includes('Enabled')) {
    throw new Error('Status list contains Enabled: ' + statusList.join(', '));
  }
  console.log('Status list:', statusList);
  // 6. Verify Disabled status for Gloves
  await addOnsPage.verifyDisabledStatusForGloves(testdata.ImportAddOnName);
 
});

test('EditAddONS_VerifyVisibilityINPOS', async ({  }) => {
  // 1. Dashboard
  await addOnsPage.clickDashboard();
  // 2. Plans, Slots & Addons
  await addOnsPage.clickPlansSlotsAddonsAndWait();
  // 3. Addons tab
  await addOnsPage.clickAddonsTab();
  // 4. Search for imported AddOn and wait 3s
  await addOnsPage.searchAddons(testdata.ImportAddOnName);
  await page.waitForTimeout(3000);
  // 5. Verify table row count
  const rows = await addOnsPage.getAddonsTableRows();
  expect(await rows.count()).toBe(1);
  // 6. Verify Addons table row by all columns
  await addOnsPage.verifyAddonsTableRowAll(testdata.ImportAddOnName, '₹500', 'Included', 'Disabled');
  // 7. Click Edit button for Disabled Gloves
  await addOnsPage.clickEditButtonForDisabledGloves();
  // 8. Verify and clear AddOn name input
  await addOnsPage.verifyAndEditAddOnNameInput( testdata.EditImportAddOnName);
  // 9. Select Monthly in Validity dropdown
  await addOnsPage.selectValidityDropdown('Monthly');
  // 10. Edit price input
  await addOnsPage.editPriceInput('1000');
  // 11. Click Enable/Disable Addon slider
  await addOnsPage.clickEnableDisableSlider();
  // 12. Verify and clear AddOn description textarea
  await addOnsPage.verifyAndEditAddOnDescriptionTextarea(testdata.ImportAddOnNameDescription,testdata.EditImportAddOnNameDescription);
  // 14. Click Save
  await addOnsPage.clickSave();
  // 15. Verify Addon saved alert
  await addOnsPage.verifyAddonSavedAlert();
  // 16. Dashboard
  await addOnsPage.clickDashboard();
  // 17. Plans, Slots & Addons again
  await addOnsPage.clickPlansSlotsAddonsAndWaitAgain();
  // 18. Addons tab again
  await addOnsPage.clickAddonsTabAgain();
  // Search for Gloves and verify no results
  await addOnsPage.searchAddons(testdata.ImportAddOnName);
  await addOnsPage.verifyNoMatchingResults();
  // Dashboard and Addons again
  await addOnsPage.clickDashboard();
  await addOnsPage.clickPlansSlotsAddonsAndWaitAgain();
  await addOnsPage.clickAddonsTabAgain();
  // 19. Search for Preworkout
  await addOnsPage.searchAddons(testdata.EditImportAddOnName);
  // 20. Verify table row count
  const rows2 = await addOnsPage.getAddonsTableRows();
  expect(await rows2.count()).toBe(1);
  // 21. Verify Addons table row by all columns
  await addOnsPage.verifyAddonsTableRowAll(testdata.EditImportAddOnName, '₹1000', 'Included', 'Enabled');
  // 22. Go to POS
  await addOnsPage.clickPointOfSale();
  // 23. Search for AddOn in POS
  await addOnsPage.searchAddonInPOS(testdata.EditImportAddOnName);
  // 24. Verify Preworkout is visible in POS
  await addOnsPage.verifyAddonVisibleInPOS(testdata.EditImportAddOnName);
});

test('DeleteAddONS', async ({  }) => {
  // 1. Dashboard
  await addOnsPage.clickDashboard();
  // 2. Plans, Slots & Addons
  await addOnsPage.clickPlansSlotsAddonsAndWait();
  // 3. Addons tab again
  await addOnsPage.clickAddonsTabAgain();
  // 4. Search for Preworkout and wait 3 seconds
  await addOnsPage.searchAddons(testdata.EditImportAddOnName);
  await page.waitForTimeout(3000);
  // 5. Verify table row count
  const rows = await addOnsPage.getAddonsTableRows();
  expect(await rows.count()).toBe(1);
  // 6. Accept delete dialog
  await addOnsPage.acceptDeleteAddonDialog('Are you sure want to delete this Addon?');
  // 7. Click Delete button for Enabled Preworkout
  await addOnsPage.clickDeleteButtonForEnabledAddOn(testdata.EditImportAddOnName);
  // 8. Verify Addon deleted successfully alert
  await addOnsPage.verifyAddonDeletedAlert();
  // 9. Dashboard
  await addOnsPage.clickDashboard();
  // 10. Plans, Slots & Addons
  await addOnsPage.clickPlansSlotsAddonsAndWait();
  // 11. Addons tab again
  await addOnsPage.clickAddonsTabAgain();
  // 12. Search for Preworkout and wait 3 seconds
  await addOnsPage.searchAddons(testdata.EditImportAddOnName);
  await page.waitForTimeout(3000);
  // 13. Verify no matching results
  await addOnsPage.verifyNoMatchingResults();
});

test('DownloadExportSheet_Transactions', async ({}) => {
  const downloadDir = 'V:/EasyMembr_Downloads';
  const expectedFileName = 'Transactions_Data.xlsx';
  const expectedFilePath = `${downloadDir}/${expectedFileName}`;
  const fs = require('fs');
  if (fs.existsSync(expectedFilePath)) {
    console.log('File already exists. Deleting:', expectedFilePath);
    fs.unlinkSync(expectedFilePath);
  }
  // 1. Click Transactions
  await addOnsPage.clickTransactions();
  // 2. Select Today in dropdown and wait 2 seconds
  await addOnsPage.selectTodayInDropdownAndWait();
  // 3. Set up download listener and click Export
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    addOnsPage.clickExportButton()
  ]);
  // 4. Save download to expected path
  await download.saveAs(expectedFilePath);
  // 5. Read the file and validate contents
  const xlsx = require('xlsx');
  const workbook = xlsx.readFile(expectedFilePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
  // Exclude header row
  const rows = data.slice(1);
  const match = rows.find((row: any) =>
    row.join(' ').includes('Shiva Shiva') &&
    row.join(' ').includes('Protein') &&
    row.join(' ').includes('2280')
  );
  console.log('Matching row:', match);
  expect(match).toBeTruthy();
  // 6. Delete the file

  if (fs.existsSync(expectedFilePath)) {
    console.log('AfterSetupDeleting:', expectedFilePath);
    fs.unlinkSync(expectedFilePath);
  }
});

test('DeleteAddONS_DeleteMember_AfterSetup', async ({  }) => {
  await addOnsPage.DeleteExistingAddONS(testdata.AddOnName, page);
  await loginPage.membersManagementTab().click();
  await loginPage.membersSearchInput().fill(`${testdata.MemberForAddOnSetup}`);
  await loginPage.membersApplyButton().click();
  await page.waitForTimeout(3000);
  page.once('dialog', async dialog => {
  expect(dialog.message()).toBe("Are you sure want to delete this Member?");
  await dialog.accept();
  });
  await page.click("//span[@class='ml20']/img[@alt='Delete']");
  await page.waitForTimeout(2000);
   
})


})

