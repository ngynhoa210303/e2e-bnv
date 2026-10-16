import { expect } from '@playwright/test';
import { When, Then } from "../../../fixtures/fixtures";

When('user selects module {string}', async ({ app }, moduleName: string) => {
    await app.unitPage.unitForm.getSelectByLabel(moduleName).click();
    await app.unitPage.unitForm.txt_searchItemInDropdown.fill("Tổ chức , Bộ máy");
    await app.unitPage.unitForm.page.waitForTimeout(100);
    await app.unitPage.addUnitPopup.chooseItem("Tổ chức , Bộ máy");
});

Then('the user verifies the role unit level dropdown contains the following options:', async ({ app }, dataTable) => {
    // 1. Click vào trường Mã cấp đơn vị để mở dropdown
    await app.unitPage.unitForm.getSelectByLabel("Mã cấp đơn vị").click();
    await app.unitPage.page.waitForTimeout(300);

    // 2. Lấy danh sách tên truyền vào từ list (dataTable)
    const expectedLevels = dataTable.hashes().map((row: any) => Object.values(row)[0] as string);

    // 3. Khởi tạo mảng lưu lỗi
    const missingLevels: string[] = [];
    const duplicateLevels: string[] = [];

    // 4. For loop truyền vào tên kiểm tra li[span='tên'] hiển thị
    for (const level of expectedLevels) {
        console.log("Đang kiểm tra level: ", level);
        const optionLocator = app.unitPage.page.locator(`//li[span='${level.trim()}']`);

        // Đợi một khoảng ngắn xem element có xuất hiện không (tránh chờ default 30s)
        try {
            await optionLocator.first().waitFor({ state: 'attached', timeout: 500 });
        } catch (e) {
            // Không tìm thấy sau 500ms
        }

        const count = await optionLocator.count();
        if (count === 0) {
            missingLevels.push(level);
        } else if (count > 1) {
            duplicateLevels.push(`${level} (x${count})`);
        } else {
            // Nếu có đúng 1 element, scroll tới và check visible (soft check)
            await optionLocator.scrollIntoViewIfNeeded();
            const isVisible = await optionLocator.isVisible();
            if (!isVisible) {
                missingLevels.push(level);
            }
        }
    }

    // 5. Tổng hợp báo cáo và quăng lỗi nếu có
    if (missingLevels.length > 0 || duplicateLevels.length > 0) {
        const errorMessages = [];
        if (missingLevels.length > 0) {
            errorMessages.push(`❌ THIẾU các cấp đơn vị (${missingLevels.length}):\n  - ${missingLevels.join('\n  - ')}`);
        }
        if (duplicateLevels.length > 0) {
            errorMessages.push(`⚠️ TRÙNG LẶP các cấp đơn vị (${duplicateLevels.length}):\n  - ${duplicateLevels.join('\n  - ')}`);
        }

        throw new Error(`\n\n========== BÁO CÁO KIỂM TRA CẤP ĐƠN VỊ ==========\n\n${errorMessages.join('\n\n')}\n\n====================================================\n`);
    }
});