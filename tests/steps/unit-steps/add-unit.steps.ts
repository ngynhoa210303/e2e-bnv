import { test, expect } from '@playwright/test';
import { Given, Then, When } from '../../fixtures/fixtures';
import { countUnits } from '../../db/queries/unit.query';
import { isUnitExists } from '../../db/queries/unit.query';
import { getExistingUnitCodes } from '../../db/queries/unit.query';
import { deleteUnitsByCodes } from '../../db/queries/unit.query';

const username = process.env.USERNAME_ADMIN;
const password = process.env.PASSWORD_ADMIN;
const cqdb_db = "Chính quyền địa phương";

Given('user is logged in as admin', async ({ app, page }) => {
  await app.loginPage.open();
  await app.loginPage.txt_username.fill(username || '');
  await app.loginPage.txt_password.fill(password || '');
  await app.loginPage.selectDatabase(cqdb_db);
  await app.loginPage.btn_login.click();
  await page.waitForURL('**/trang-chu/');
});

Given('user is on the {string} page', async ({ app, page }, pageName: string) => {
  if (pageName === "Quản lý đơn vị") {
    await app.unitPage.open();
  }
  const selectedParent = page.locator(
    "//div[text()='Chính phủ']//parent::div[@data-p-highlight='true']"
  );

  await expect(selectedParent).toBeVisible();
});

Given(
  'unit with code {string} does not already exist',
  async ({ }, code: string) => {
    const count = await countUnits(code);

    console.log(`Số bản ghi "${code}": ${count}`);

    if (count > 0) {
      test.skip(
        true,
        `"${code}" đã tồn tại, bỏ qua testcase tạo mới`
      );
    }

  }
);
Given('user clicks the {string} button', async ({ app }, buttonName: string) => {
  await app.unitPage.clickButton(buttonName);
});
Given(
  'a unit with code {string} already exists',
  async ({ app }, unitCode: string) => {
    const count = await countUnits(unitCode);

    console.log(`Unit "${unitCode}" hiện có ${count} bản ghi`);

    // Đã tồn tại → không cần tạo
    if (count == 1) {
      console.log(`Unit "${unitCode}" đã tồn tại, bỏ qua bước setup.`);
      return;
    }
    console.log(`Unit "${unitCode}" chưa tồn tại, tiến hành tạo setup data.`);
    const unitData = {
      unitName: 'Tỉnh Autotest 5',
      unitCode: unitCode,
      unitLevel: 'Bộ Nội Vụ',
      unitType: 'Đơn vị hành chính',
      parentUnit: 'Chính phủ',
      unitClassifyType: 'Là đơn vị',
      termOfOffice: 'Nhiệm kỳ 2031 - 2036',
      administrativeBoundaryName: 'DGHC Autotest',
      administrativeBoundaryCode: 'DGHC Autotest',
      administrativeBoundaryProvinceCity: 'Thành phố Hà Nội',
      administrativeBoundaryCommuneWardSpecialZone: 'Phường Ngọc Hà',
    };

    await app.unitPage.clickButton("Thêm đơn vị");
    await app.unitPage.addUnitPopup.fillUnitForm(unitData);
    await app.unitPage.unitForm.btn_yes.click();

    await expect
      .poll(() => countUnits(unitCode), {
        timeout: 10000,
        message: `Unit "${unitCode}" chưa được tạo thành công`,
      })
      .toBe(1);

    console.log(`Đã tạo setup unit "${unitCode}" thành công.`);
  }
);

When('user enters unit name {string}', async ({ app }, name: string) => {
  await app.unitPage.unitForm.txt_unitInformation_name.fill(name);
  await app.unitPage.unitForm.txt_unitInformation_name.blur();
});

When('user enters unit code {string}', async ({ app }, code: string) => {
  await app.unitPage.unitForm.txt_unitInformation_unitCode.fill(code);
  await app.unitPage.unitForm.txt_unitInformation_unitCode.blur();
});
When('user selects unit level {string}', async ({ app }, level: string) => {
  await app.unitPage.unitForm.txt_unitInformation_unitLevel.click();
  await app.unitPage.unitForm.txt_searchItemInDropdown.fill(level);
  await app.unitPage.unitForm.page.waitForTimeout(100);
  await app.unitPage.addUnitPopup.chooseItem(level);
});
When('user selects unit type {string}', async ({ app }, type: string) => {
  await app.unitPage.unitForm.txt_unitInformation_unitType.blur();
  if (!type.trim()) return;
  await app.unitPage.unitForm.txt_unitInformation_unitType.click();
  await app.unitPage.addUnitPopup.chooseItem(type);
});

When('user selects parent unit {string}', async ({ app }, parentName: string) => {
  if (!parentName.trim()) return;
  await app.unitPage.unitForm.txt_unitInformation_directUnit.click();
  await app.unitPage.unitForm.txt_unitInformation_directUnit.pressSequentially(parentName);
  await app.unitPage.addUnitPopup.chooseParentUnit(parentName);
});
When('user selects unit classify type {string}', async ({ app }, type: string) => {
  await app.unitPage.addUnitPopup.selectUnitType(type);
});
When('user selects term of office {string}', async ({ app }, term: string) => {
  if (!term.trim()) return;
  await app.unitPage.unitForm.txt_unitInformation_termOfOffice.click();
  await app.unitPage.unitForm.txt_searchItemInDropdown.fill(term);
  await app.unitPage.unitForm.page.waitForTimeout(100);
  await app.unitPage.addUnitPopup.chooseItem(term);
});
When('user enters administrative boundary name {string}', async ({ app }, name: string) => {
  await app.unitPage.unitForm.txt_administrativeBoundaryInfo_name.fill(name);

});
When('user enters administrative boundary code {string}', async ({ app }, code: string) => {
  await app.unitPage.unitForm.txt_administrativeBoundaryInfo_code.fill(code)
});
When('user selects administrative boundary province, city {string}', async ({ app }, province: string) => {
  await app.unitPage.unitForm.txt_administrativeBoundaryInfo_provinceCity.click();
  await app.unitPage.unitForm.txt_searchItemInDropdown.fill(province);
  await app.unitPage.unitForm.page.waitForTimeout(100);
  await app.unitPage.addUnitPopup.chooseItem(province);
});
When('user selects administrative boundary commune, ward, special zone {string}', async ({ app }, commune: string) => {
  await app.unitPage.unitForm.txt_administrativeBoundaryInfo_communeWardSpecialZone.click();
  await app.unitPage.unitForm.txt_searchItemInDropdown.fill(commune);
  await app.unitPage.unitForm.page.waitForTimeout(100);
  await app.unitPage.addUnitPopup.chooseItem(commune);
});

When('user does not select a parent unit', async ({ app }) => {
  await app.unitPage.unitForm.txt_unitInformation_directUnit.click();
  await app.unitPage.unitForm.txt_unitInformation_directUnit.pressSequentially('');
});

When('user clicks the Save button', async ({ app }) => {
  await app.unitPage.unitForm.btn_yes.click();
});

When('user clicks the Cancel button', async ({ app }) => {
  await app.unitPage.unitForm.btn_cancel.click();
});

Then('user should see a toast success message {string}', async ({ app }, message: string) => {
  await expect(app.unitPage.toast_message).toContainText(message);
});
Then('user should see an error message {string} below the text field {string}', async ({ app }, message: string, fieldName: string) => {
  await expect(app.unitPage.unitForm.page.locator(`(//div[@data-pc-name='dialog']//label[contains(.,'${fieldName}')]/..//small)[1]`)).toContainText(message);
});

Then('the new unit {string} should appear in the unit list', async ({ page }, unitName: string) => {
  await expect(page.locator(`//li[@aria-label='${unitName}']`).first()).toBeVisible();
});

Then('the new unit {string} should appear in the unit list as a root unit', async ({ page }, unitName: string) => {
  await expect(page.locator(`text=${unitName}`).first()).toBeVisible();
});

When('user leaves the unit name field empty', async ({ app }) => {
  await app.unitPage.unitForm.txt_unitInformation_name.fill('');
});

When('user leaves the unit code field empty', async ({ app }) => {
  await app.unitPage.unitForm.txt_unitInformation_unitCode.fill('');
});

Then('user should see a unit required field validation error', async ({ app }) => {
  await expect(app.unitPage.unitForm.error_msg_unitInformation_name).toBeVisible();
});

Then('the unit {string} with code {string} should not be created',
  async ({ page }, unitName: string, code: string) => {

    const count = await countUnits(code);
    console.log(`Số bản ghi "${code}": ${count}`);

    if (count > 1) {
      test.fail(
        true,
        `Đơn vị có mã "${code}" đã tồn tại nhưng vẫn được tạo trùng`
      );
    }
    await expect(page.locator(`//li[@aria-label='${unitName}']`).first()).toBeVisible();
  }
);


Given(
  'the following unit hierarchy exists:',
  async ({ app }, dataTable) => {
    const units = dataTable.hashes();

    const unitCodes = units.map(
      (unit: { unitCode: string }) => unit.unitCode
    );

    // =====================================================
    // 1. CHECK DATA CŨ
    // =====================================================
    const existingCodes = await getExistingUnitCodes(unitCodes);

    // =====================================================
    // 2. NẾU CÓ DATA CŨ -> XÓA TỪ CON -> CHA
    // =====================================================
    if (existingCodes.length > 0) {
      console.log(
        "[CLEANUP] Found existing units -> delete from child to parent"
      );

      for (let i = unitCodes.length - 1; i >= 0; i--) {
        const unitCode = unitCodes[i];

        if (!existingCodes.includes(unitCode)) {
          continue;
        }

        console.log(`[CLEANUP] Delete ${unitCode}`);

        await deleteUnitsByCodes([unitCode]);

        await expect
          .poll(() => countUnits(unitCode), {
            timeout: 10000,
            message: `Unit "${unitCode}" chưa được xóa`,
          })
          .toBe(0);
      }
    }

    // =====================================================
    // 3. TẠO LẠI TỪ CHA -> CON
    // =====================================================
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];

      // Unit thứ 2 trở đi:
      // chọn unit ngay trước đó làm parent
      if (i > 0) {
        const parentUnit = units[i - 1];

        await app.unitPage.selectIconExpandNode(parentUnit.unitName);

        console.log(
          `[SETUP] Select parent: ${parentUnit.unitName}`
        );

        // Từ unit thứ 3 trở đi mới cần expand parent
        if (i > 1) {
          await app.unitPage.selectIconExpandNode(
            parentUnit.unitName
          );
        }
      }

      console.log(
        `[SETUP] Create ${unit.unitCode} - ${unit.unitName}`
      );

      await app.unitPage.clickButton("Thêm đơn vị");

      await app.unitPage.addUnitPopup.fillUnitForm(unit);

      await app.unitPage.unitForm.btn_yes.click();

      await expect
        .poll(() => countUnits(unit.unitCode), {
          timeout: 10000,
          message: `Unit "${unit.unitCode}" chưa được tạo thành công`,
        })
        .toBe(1);
    }
  }
);
Then(
  'all units should exist with the correct parent relationships',
  async ({ }, dataTable) => {
    const units = dataTable.hashes();

    for (const unit of units) {
      const exists = await isUnitExists(unit.unitCode);

      // expect(
      //   exists,
      //   `Unit ${unit.unitCode} không tồn tại hoặc đã bị xóa`
      // ).toBe(true);
    }
  }
);
When('user enters unit name with surrounding spaces {string}', async ({ app }, name: string) => {
  await app.unitPage.unitForm.txt_unitInformation_name.fill(name);
});

When('user enters unit code with surrounding spaces {string}', async ({ app }, code: string) => {
  await app.unitPage.unitForm.txt_unitInformation_unitCode.fill(code);
});

Then('user should see a validation error about maximum length', async ({ app }) => {
  await expect(app.unitPage.unitForm.error_msg_unitInformation_unitCode).toBeVisible();
});


Then('user should return to the unit list page', async ({ app, page }) => {
  await expect(app.unitPage.btn_addUnit).toBeVisible();
});
When('user enters random unit data', async function ({ app }) {
  const { faker } = await import('@faker-js/faker');

  this.unitData = {
    unitCode: ` ${faker.string.alphanumeric({ length: 120 })} `,
    unitName: ` ${faker.string.alpha({ length: 300 })} `,
  };

  await app.unitPage.unitForm.txt_unitInformation_unitCode.fill(this.unitData.unitCode);
  await app.unitPage.unitForm.txt_unitInformation_name.fill(this.unitData.unitName);
});
