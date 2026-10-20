import { expect, test } from '@playwright/test';
import { Given, When, Then } from '../fixtures/fixtures';

When('user navigates to "Danh sách chính quyền địa phương" page', async ({ app }) => {
  await app.localGovernmentListPage.navigateFromMenu();
});

When('user navigates to the "Danh sách chính quyền địa phương" page', async ({ app }) => {
  await app.localGovernmentListPage.navigateFromMenu();
});

When('user vào màn danh sách chính quyền địa phương', async ({ app }) => {
  await app.localGovernmentListPage.open();
});

When('user searches for local government {string}', async ({ app }, keyword: string) => {
  await app.localGovernmentListPage.searchLocalGovernment(keyword);
  await app.unitPage.selectUnit(keyword)
});

When('user tìm kiếm địa phương {string}', async ({ app }, keyword: string) => {
  await app.localGovernmentListPage.searchLocalGovernment(keyword);
});

When('user clicks view detail icon for local government {string}', async ({ app }, localName: string) => {
  await app.localGovernmentListPage.clickDetailIcon(localName);
});

When('user bấm vào xem chi tiết {string}', async ({ app }, localName: string) => {
  await app.localGovernmentListPage.clickDetailIcon(localName);
});

When('user bấm vào xem chi tiết của {string}', async ({ app }, localName: string) => {
  await app.localGovernmentListPage.clickDetailIcon(localName);
});

When('user clicks the element {string}', async ({ page }, xpathOrSelector: string) => {
  const locator = page.locator(xpathOrSelector);
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  await locator.click();
  await page.waitForLoadState('domcontentloaded');
});

When('user bấm vào {string} để xem', async ({ page }, xpathOrSelector: string) => {
  const locator = page.locator(xpathOrSelector);
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  await locator.click();
  await page.waitForLoadState('domcontentloaded');
});

When('user search địa phương {string}', async ({ app }, keyword: string) => {
  await app.localGovernmentListPage.searchLocalGovernment(keyword);
});

Then('user should see the local government detail information', async ({ page }) => {
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toBeVisible();
});


When('user clicks category {string} in detail page', async ({ app }, categoryName: string) => {
  await app.localGovernmentProfilePage.selectCategory(categoryName);
});

When('user chọn danh mục {string} ở màn hình chi tiết', async ({ app }, categoryName: string) => {
  await app.localGovernmentProfilePage.selectCategory(categoryName);
});

// 1. Bước kiểm tra theo GIỚI TÍNH (Dropdown Giới tính: Nữ / Nam)
Then('user counts delegates with gender {string} for local government {string}', async ({ app }, gender: string, localName: string) => {
  test.setTimeout(600_000); // 10 phút chỉ riêng cho test case duyệt đại biểu này
  await app.localGovernmentProfilePage.countDelegatesByGender(gender, localName);
});

Then('user đếm số lượng đại biểu có giới tính {string} của {string}', async ({ app }, gender: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByGender(gender, localName);
});

// 2. Bước kiểm tra theo CHECKBOX (như "Là Đảng viên", "Dân tộc thiểu số", "Vị trí kiêm nhiệm",...)
Then('user counts delegates with checkbox {string} on {string} for local government {string}', async ({ app }, checkboxLabel: string, categoryName: string, localName: string) => {
  test.setTimeout(600_000); // 10 phút chỉ riêng cho test case duyệt đại biểu này
  await app.localGovernmentProfilePage.countDelegatesByCheckbox(checkboxLabel, localName, categoryName);
});

// 3. Bước thống kê theo DROPDOWN động (có hiển thị %)
Then('user counts delegates by dropdown {string} for local government {string}', async ({ app }, fieldName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByDropdown(fieldName, localName, 'ĐẠI BIỂU HĐND', true);
});

Then('user thống kê đại biểu theo dropdown {string} của {string}', async ({ app }, fieldName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByDropdown(fieldName, localName, 'ĐẠI BIỂU HĐND', true);
});

// 4. Bước thống kê theo DROPDOWN động - KHÔNG hiển thị % (chỉ đếm số lượng)
Then('user counts delegates by dropdown {string} without percentage for local government {string}', async ({ app }, fieldName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByDropdown(fieldName, localName, 'ĐẠI BIỂU HĐND', false);
});

// Bước thống kê DROPDOWN theo THÔN/TỔ DÂN PHỐ (Dành riêng cho màn hình có thôn như NKCT - thiếu thôn sẽ fail)
Then('user counts delegates by dropdown {string} in village {string} without percentage on {string} for local government {string}', async ({ app }, fieldName: string, villageName: string, categoryName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByDropdownInVillage(fieldName, villageName, localName, categoryName, false);
});

Then('user counts delegates by dropdown {string} in village {string} without percentage for local government {string}', async ({ app }, fieldName: string, villageName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByDropdownInVillage(fieldName, villageName, localName, 'Người hoạt động không chuyên trách ở thôn, tổ dân phố', false);
});

Then('user counts delegates by dropdown {string} in village {string} on {string} for local government {string}', async ({ app }, fieldName: string, villageName: string, categoryName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByDropdownInVillage(fieldName, villageName, localName, categoryName, true);
});

Then('user counts delegates by dropdown {string} in village {string} for local government {string}', async ({ app }, fieldName: string, villageName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByDropdownInVillage(fieldName, villageName, localName, 'Người hoạt động không chuyên trách ở thôn, tổ dân phố', true);
});

// Bước thống kê dùng chung theo ĐIỀU KIỆN (tự động nhận diện Giới tính / Dropdown / Checkbox)
Then('user counts delegates with {string} for local government {string}', async ({ app }, condition: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByCondition(condition, localName);
});

Then('user counts delegates with condition {string} on {string} for local government {string}', async ({ app }, condition: string, categoryName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByCondition(condition, localName, categoryName);
});

Then('user counts delegates with condition {string} at village {string} on {string} for local government {string}', async ({ app }, condition: string, villageName: string, categoryName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByVillageAndCondition(villageName, condition, localName, categoryName);
});

Then('user counts delegates with condition {string} in village {string} on {string} for local government {string}', async ({ app }, condition: string, villageName: string, categoryName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByVillageAndCondition(villageName, condition, localName, categoryName);
});

Then('user đếm số lượng đại biểu với điều kiện {string} của {string}', async ({ app }, condition: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByCondition(condition, localName);
});

Then('user counts delegates in village {string} with {string} for local government {string}', async ({ app }, villageName: string, condition: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByVillageAndCondition(villageName, condition, localName);
});

Then('user counts delegates with village {string} and condition {string} on {string} for local government {string}', async ({ app }, villageName: string, condition: string, categoryName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByVillageAndCondition(villageName, condition, localName, categoryName);
});

Then('user đếm số lượng người không chuyên trách thôn {string} có {string} của {string}', async ({ app }, villageName: string, condition: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByVillageAndCondition(villageName, condition, localName);
});

// 5. Bước thống kê theo NHÓM TUỔI (< 35 / 35-50 / > 50)
Then('user counts delegates by age group for local government {string}', async ({ app }, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByAgeGroup(localName);
});

Then('user thống kê đại biểu theo độ tuổi của {string}', async ({ app }, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByAgeGroup(localName);
});

// Bước thống kê ĐỘ TUỔI theo THÔN/TỔ DÂN PHỐ (Dành riêng cho màn hình có thôn như NKCT - thiếu thôn sẽ fail)
Then('user counts delegates by age group in village {string} on {string} for local government {string}', async ({ app }, villageName: string, categoryName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByAgeGroupInVillage(villageName, localName, categoryName);
});

Then('user counts delegates by age group in village {string} for local government {string}', async ({ app }, villageName: string, localName: string) => {
  test.setTimeout(600_000);
  await app.localGovernmentProfilePage.countDelegatesByAgeGroupInVillage(villageName, localName, 'Người hoạt động không chuyên trách ở thôn, tổ dân phố');
});

// 6. Bước thống kê CHỨC DANH / CHỨC VỤ trực tiếp từ bảng (không mở popup)
Then('user counts roles from table for local government {string}', async ({ app }, localName: string) => {
  test.setTimeout(120_000);
  await app.localGovernmentProfilePage.countRolesFromTable(localName);
});

Then('user counts roles from table in category {string} for local government {string}', async ({ app }, categoryName: string, localName: string) => {
  test.setTimeout(120_000);
  await app.localGovernmentProfilePage.countRolesFromTable(localName, categoryName);
});

Then('user đếm số chức danh từ bảng của {string}', async ({ app }, localName: string) => {
  test.setTimeout(120_000);
  await app.localGovernmentProfilePage.countRolesFromTable(localName);
});



