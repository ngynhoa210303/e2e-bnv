import { expect } from '@playwright/test';
import { Then, When } from '../../fixtures/fixtures';
import { countUnits } from '../../db/queries/unit.query';
let searchKeyword = '';

When('user enters {string} in the search box', async ({ app }, keyword: string) => {
  searchKeyword = keyword;
  await app.unitPage.txt_searchUnit.fill(keyword);
  await app.unitPage.page.keyboard.press('Enter');
});

Then('the search results should contain the searched unit', async ({ app }) => {
  const unitNode = app.unitPage.page.locator(`//div[contains(@class,'font-14-400') and normalize-space()='${searchKeyword}']`);
  await expect(unitNode).toBeVisible();
});

let searchUnitData: any = null;

Then('Setup data for search test case', async ({ app }, dataTable: any) => {
  const count = await countUnits(searchUnitData.unitCode);
  console.log(`Unit "${searchUnitData.unitCode}" hiện có ${count} bản ghi`);
  if (count == 1) {
    console.log(`Unit "${searchUnitData.unitCode}" đã tồn tại, bỏ qua bước setup.`);
    await app.unitPage.open();
    await app.unitPage.page.reload();
    const selectedParent = app.unitPage.page.locator(
      "//div[text()='Chính phủ']//parent::div[@data-p-highlight='true']"
    );
    await expect(selectedParent).toBeVisible();
    return;
  }
  const rows = dataTable.hashes();
  if (rows.length > 0) {
    searchUnitData = rows[0];
    const unitData = {
      unitCode: searchUnitData.unitCode,
      unitName: searchUnitData.unitName,
      unitLevel: searchUnitData.unitLevel,
      unitType: searchUnitData.unitType,
      parentUnit: searchUnitData.parentUnit,
      unitClassifyType: searchUnitData.unitClassifyType,
      termOfOffice: searchUnitData.termOfOffice,
      administrativeBoundaryName: searchUnitData.administrativeBoundaryName,
      administrativeBoundaryCode: searchUnitData.administrativeBoundaryCode,
      administrativeBoundaryProvinceCity: searchUnitData.administrativeBoundaryProvinceCity,
      administrativeBoundaryCommuneWardSpecialZone: searchUnitData.administrativeBoundaryCommuneWardSpecialZone
    };
    await app.unitPage.clickButton("Thêm đơn vị");
    await app.unitPage.addUnitPopup.fillUnitForm(unitData);
    await app.unitPage.unitForm.btn_yes.click();
  }
});

When('user enters the setup unit name in the search box', async ({ app }) => {
  await app.unitPage.txt_searchUnit.fill(searchUnitData.unitName);
  await app.unitPage.page.keyboard.press('Enter');
});

When('user enters the setup unit code in the search box', async ({ app }) => {
  await app.unitPage.txt_searchUnit.fill(searchUnitData.unitCode);
  await app.unitPage.page.keyboard.press('Enter');
});

Then('the search results should contain the setup unit', async ({ app }) => {
  const unitNode = app.unitPage.page.locator(`//div[contains(@class,'font-14-400') and normalize-space()='${searchUnitData.unitName}']`);
  await expect(unitNode).toBeVisible();
});

When('user clears the search box', async ({ app }) => {
  await app.unitPage.txt_searchUnit.fill('');
  await app.unitPage.page.keyboard.press('Enter');
});

Then('the search results should be empty', async ({ app }) => {
  // Assuming a "No data" message or no items with the unit class
  const emptyMessage = app.unitPage.page.locator(`text=Không có dữ liệu`); // Adjust this selector to the actual "no results" message if different
  await expect(emptyMessage).toBeVisible();
});

Then('the search results should display the entire unit tree', async ({ app }) => {
  // Assuming "Chính phủ" or some root unit is visible when the full tree is shown
  const rootNode = app.unitPage.page.locator(`//div[contains(@class,'font-14-400') and normalize-space()='Chính phủ']`);
  await expect(rootNode).toBeVisible();
});
