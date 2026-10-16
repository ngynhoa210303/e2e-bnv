import { expect } from '@playwright/test';
import { Then, When } from '../../../fixtures/fixtures';

// Biến toàn cục để gom lỗi qua nhiều lần gọi step (Bộ ngành + Địa phương)
const allMissingLevels: string[] = [];
const allDuplicateLevels: string[] = [];

Then('the user verifies the unit level dropdown contains the following options:', async ({ app }, dataTable) => {
    // Lấy danh sách các cấp từ data table
    const expectedLevels = dataTable.hashes().map((row: any) => Object.values(row)[0] as string);

    for (let i = 0; i < expectedLevels.length; i++) {
        const level = expectedLevels[i];

        // 1. Mở dropdown "Cấp đơn vị" (chỉ mở ở lần lặp đầu tiên)
        if (i === 0) {
            await app.unitPage.unitForm.txt_unitInformation_unitLevel.click();
            await app.unitPage.page.waitForTimeout(200);
        }

        // 2. Nhập vào ô tìm kiếm của dropdown để lọc
        await app.unitPage.unitForm.txt_searchItemInDropdown.fill(level);
        await app.unitPage.page.waitForTimeout(1000);

        // 3. Đếm số lượng tuỳ chọn đang hiển thị (tránh lỗi strict mode)
        const options = app.unitPage.page.locator(`//li[@role='option' and normalize-space(@aria-label)='${level.trim()}']`);
        const count = await options.count();
        let visibleCount = 0;

        for (let j = 0; j < count; j++) {
            if (await options.nth(j).isVisible()) {
                visibleCount++;
            }
        }

        // Debug: nếu không tìm thấy, log tất cả option đang hiển thị để so sánh
        if (count === 0) {
            const allVisible = app.unitPage.page.locator(`//li[@role='option']`);
            const allCount = await allVisible.count();
            const labels: string[] = [];
            for (let k = 0; k < Math.min(allCount, 5); k++) {
                const lbl = await allVisible.nth(k).getAttribute('aria-label');
                if (lbl) labels.push(lbl);
            }
            console.log(`[DEBUG] Không tìm thấy "${level}". Các option hiện tại: ${JSON.stringify(labels)}`);
        }

        // Ghi nhận lỗi nếu k có hoặc duplicate (KHÔNG throw, chỉ gom lại)
        if (visibleCount === 0) {
            allMissingLevels.push(level);
        } else if (visibleCount > 1) {
            allDuplicateLevels.push(`${level} (x${visibleCount})`);
        }
    }

    // Đóng dropdown sau khi kiểm tra xong
    await app.unitPage.page.keyboard.press('Escape');
    await app.unitPage.page.waitForTimeout(200);
});

Then('the unit level verification report should pass', async () => {
    // Tổng hợp báo cáo từ tất cả các lần gọi step trước
    const errorMessages: string[] = [];

    if (allMissingLevels.length > 0) {
        errorMessages.push(`❌ Các cấp đơn vị KHÔNG TỒN TẠI (${allMissingLevels.length}):\n  - ${allMissingLevels.join('\n  - ')}`);
    }
    if (allDuplicateLevels.length > 0) {
        errorMessages.push(`⚠️ Các cấp đơn vị BỊ TRÙNG LẶP (${allDuplicateLevels.length}):\n  - ${allDuplicateLevels.join('\n  - ')}`);
    }

    // Reset lại cho lần chạy tiếp theo
    allMissingLevels.length = 0;
    allDuplicateLevels.length = 0;

    if (errorMessages.length > 0) {
        throw new Error(`\n\n========== BÁO CÁO KIỂM TRA CẤP ĐƠN VỊ ==========\n\n${errorMessages.join('\n\n')}\n\n====================================================\n`);
    }
});

When('Choose level is {string}', async ({ app }, keyword) => {
    // Đóng popup nếu đang mở (để quay lại trang danh sách chọn unit khác)
    const closeBtn = app.unitPage.page.locator("//button[@data-pc-section='closebutton']");
    if (await closeBtn.isVisible()) {
        await closeBtn.click();
        await app.unitPage.page.waitForTimeout(300);
    }

    if (keyword == "Bộ ngành") {
        await app.unitPage.txt_searchUnit.fill('Bộ');
        await app.unitPage.page.keyboard.press('Enter');
        await app.unitPage.selectUnit("Bộ");
    }
    if (keyword == "Địa phương") {
        await app.unitPage.txt_searchUnit.fill('UBND tỉnh, thành phố trực thuộc Trung ương');
        await app.unitPage.page.keyboard.press('Enter');
        await app.unitPage.selectUnit("UBND tỉnh, thành phố trực thuộc Trung ương");
    }
});
