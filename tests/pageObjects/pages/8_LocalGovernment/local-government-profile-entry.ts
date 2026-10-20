import { expect } from 'playwright/test';
import { BasePage } from '../../base.page';

export interface DelegateRecord {
    stt: string;
    term: string;
    name: string;
    role: string;
    gender: string;
    checkValue?: string;
    isMatch: boolean;
}

export default class LocalGovernmentProfilePage extends BasePage {

    async open() {
        await super.open('/chinh-quyen-dia-phuong/danh-sach/');
    }

    async verifyPageTitle() {
        const pageTitle = await this.page.title();
        const expectedTitle = "Danh sách chính quyền địa phương";
        await expect(pageTitle).toBe(expectedTitle);
    }

    /**
     * Click vào danh mục bên trái dưới phần "DANH MỤC" (ví dụ: "ĐẠI BIỂU HĐND", "LÃNH ĐẠO CƠ QUAN")
     */
    async selectCategory(categoryName: string) {
        // Tìm element danh mục trong khu vực DANH MỤC hoặc theo text
        const categoryItem = this.page.locator(
            `xpath=//div[@class='tab-list']//span[text()='${categoryName}']`
        )
        await categoryItem.waitFor({ state: 'visible', timeout: 10000 });
        await categoryItem.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);
    }

    /**
     * Đếm số lượng người hoạt động không chuyên trách tại một THÔN/TỔ DÂN PHỐ cụ thể
     * kết hợp với một ĐIỀU KIỆN (Giới tính: Nữ/Nam, hoặc bất kỳ Checkbox nào: Là Đảng viên, Dân tộc thiểu số,...)
     */
    async countDelegatesByVillageAndCondition(
        villageName: string,
        condition: string,
        localName: string,
        categoryName: string = 'Người hoạt động không chuyên trách ở thôn, tổ dân phố'
    ) {
        interface NKCTRecord {
            stt: string;
            term: string;
            name: string;
            role: string;
            village: string;
            conditionValue: string;
            isMatch: boolean;
        }

        const details: NKCTRecord[] = [];
        let matchCount = 0;
        let totalInVillage = 0;
        let hasNextPage = true;
        let pageIndex = 1;

        const cleanVillage = (villageName || '').trim();
        const cleanCondition = (condition || '').trim();
        const lowerCond = cleanCondition.toLowerCase();
        const isGender = lowerCond === 'nữ' || lowerCond === 'nam' || lowerCond.includes('giới tính');
        const targetGender = lowerCond.includes('nữ') ? 'nữ' : 'nam';

        // Chọn hiển thị 100 bản ghi/trang để duyệt nhanh
        await this.setRowsPerPage(100);

        while (hasNextPage) {
            await this.page.waitForTimeout(1000);
            const rows = this.page.locator("tbody tr:not(.p-datatable-emptymessage)");
            const rowCount = await rows.count();

            if (rowCount === 0) {
                console.log(`[Thông báo] Không có bản ghi nào hiển thị trong bảng.`);
                break;
            }

            for (let i = 0; i < rowCount; i++) {
                const currentRow = rows.nth(i);
                const cells = currentRow.locator('td');
                const cellCount = await cells.count();

                if (cellCount < 3) continue;

                const stt = (await cells.nth(0).innerText()).trim();
                const term = cellCount > 1 ? (await cells.nth(1).innerText()).trim() : '';
                const name = cellCount > 2 ? (await cells.nth(2).innerText()).trim() : '';
                const role = cellCount > 3 ? (await cells.nth(3).innerText()).trim() : '';

                // Bấm icon sửa của hàng hiện tại
                const editIcon = currentRow.locator("xpath=.//span[@data-pr-tooltip='Chỉnh sửa'] | .//*[@data-pr-tooltip='Chỉnh sửa']").or(
                    this.page.locator("//span[@data-pr-tooltip='Chỉnh sửa']").nth(i)
                ).first();

                await editIcon.waitFor({ state: 'visible', timeout: 10000 });
                await editIcon.click();

                // Chờ modal chi tiết mở ra
                const dialog = this.page.locator("//div[@data-pc-name='dialog' or @role='dialog' or contains(@class,'p-dialog')]").first();
                await dialog.waitFor({ state: 'visible', timeout: 10000 });
                await dialog.locator('.p-dialog-content, [data-pc-section="content"]').waitFor({ state: 'visible', timeout: 5000 });

                // 1. Đọc giá trị Thôn/tổ dân phố trong popup
                let villageVal = await this.getDropdownValue(dialog, 'Thôn/tổ dân phố');

                const isVillageMatch = !cleanVillage || cleanVillage === '*' || villageVal.toLowerCase().includes(cleanVillage.toLowerCase());
                if (isVillageMatch) {
                    totalInVillage++;
                }

                // 2. Đọc điều kiện (Giới tính hoặc Checkbox)
                let isCondMatch = false;
                let condDesc = '';

                if (isGender) {
                    const genderVal = await this.getDropdownValue(dialog, 'Giới tính');
                    isCondMatch = genderVal.toLowerCase().includes(targetGender);
                    condDesc = `Giới tính: ${genderVal}`;
                } else if (cleanCondition.includes(':')) {
                    const [field, expectedVal] = cleanCondition.split(':').map(s => s.trim());
                    const fVal = await this.getDropdownValue(dialog, field);
                    isCondMatch = fVal.toLowerCase().includes(expectedVal.toLowerCase());
                    condDesc = `${field}: ${fVal}`;
                } else {
                    const isChecked = await this.isCheckboxChecked(dialog, cleanCondition);
                    isCondMatch = isChecked;
                    condDesc = `${cleanCondition}: ${isChecked ? 'Có' : 'Không'}`;
                }

                const isMatch = isVillageMatch && isCondMatch;
                if (isMatch) matchCount++;

                details.push({
                    stt: stt || `${i + 1}`,
                    term,
                    name,
                    role,
                    village: villageVal,
                    conditionValue: condDesc,
                    isMatch
                });

                // Đóng modal
                const closeBtn = dialog.locator(
                    "xpath=.//button[@data-pc-section='closebutton'] | .//*[contains(@class,'p-dialog-header-close')] | .//button[normalize-space()='Hủy'] | .//button[normalize-space()='Đóng'] | .//button[contains(@class,'close-btn')]"
                ).first();

                if (await closeBtn.count() > 0 && await closeBtn.isVisible()) {
                    await closeBtn.click();
                } else {
                    await this.page.keyboard.press('Escape');
                }

                await dialog.waitFor({ state: 'hidden', timeout: 10000 });
            }

            // Phân trang
            const nextButton = this.page.locator("button[aria-label='Next Page'], button.p-paginator-next").first();
            if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
                pageIndex++;
                console.log(`[Phân trang] Đang chuyển sang trang ${pageIndex}...`);
                await nextButton.click();
                await this.page.waitForLoadState('domcontentloaded');
                await this.page.waitForTimeout(1000);
            } else {
                hasNextPage = false;
            }
        }

        // In báo cáo chi tiết
        console.log('\n======================================================================');
        console.log(`📊 BÁO CÁO THỐNG KÊ NGƯỜI HOẠT ĐỘNG KHÔNG CHUYÊN TRÁCH THEO THÔN & ĐIỀU KIỆN`);
        console.log(`🏢 Đơn vị       : ${localName}`);
        console.log(`📁 Danh mục     : ${categoryName}`);
        console.log(`🏘️  Thôn         : ${cleanVillage || '(Tất cả thôn/tổ dân phố)'}`);
        console.log(`🎯 Điều kiện    : ${cleanCondition}`);
        console.log('----------------------------------------------------------------------');
        details.forEach((item) => {
            const marker = item.isMatch ? '⭐ [ĐẠT YÊU CẦU]' : '   ';
            console.log(`${item.stt.padEnd(3)} | ${item.name.padEnd(22)} | Thôn: ${(item.village || '?').padEnd(15)} | ${item.conditionValue.padEnd(25)} ${marker}`);
        });
        console.log('----------------------------------------------------------------------');
        console.log(`👉 TỔNG SỐ BẢN GHI ĐÃ DUYỆT                 : ${details.length}`);
        if (cleanVillage) {
            console.log(`👉 SỐ LƯỢNG THUỘC THÔN "${cleanVillage}"     : ${totalInVillage}`);
        }
        console.log(`👉 SỐ LƯỢNG THỎA MÃN (Thôn: "${cleanVillage || 'Tất cả'}" VÀ "${cleanCondition}"): ${matchCount}`);
        console.log('======================================================================\n');

        return { total: details.length, totalInVillage, matchCount, details };
    }

    /**
     * Đếm số lượng người thuộc Thôn/tổ dân phố (có thể truyền thêm điều kiện giới tính hoặc checkbox)
     */
    async countDelegatesByVillage(
        villageName: string,
        localName: string,
        categoryName: string = 'Người hoạt động không chuyên trách ở thôn, tổ dân phố',
        condition?: string
    ) {
        if (condition && condition.trim() !== '') {
            return await this.countDelegatesByVillageAndCondition(villageName, condition, localName, categoryName);
        }

        const result = await this.countDelegatesByDropdown('Thôn/tổ dân phố', localName, categoryName);
        const matchCount = Object.entries(result.stats)
            .filter(([k]) => k.toLowerCase().includes(villageName.toLowerCase()))
            .reduce((sum, [, count]) => sum + count, 0);
        return { total: result.total, matchCount, details: result.details };
    }

    /**
     * Chọn Thôn/tổ dân phố từ dropdown lọc trên màn hình chi tiết
     * Nếu không truyền villageName hoặc truyền rỗng, sẽ tự động chọn thôn/tổ dân phố đầu tiên có sẵn trong danh sách
     */
    async selectVillage(villageName?: string) {
        // 1. Tìm dropdown Thôn/tổ dân phố trên thanh lọc của danh mục
        const dropdownLocators = [
            this.page.locator("//label[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'thôn') or contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'tổ dân phố')]/following::div[contains(@class,'p-dropdown')][1]"),
            this.page.locator("//label[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'thôn') or contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'tổ dân phố')]/..//div[contains(@class,'p-dropdown')]"),
            this.page.locator("//div[contains(@class,'p-dropdown')][.//*[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'thôn') or contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'tổ dân phố')]]"),
            this.page.locator("//div[contains(@class,'p-dropdown') and not(@aria-label='Choose') and not(ancestor::*[contains(@class,'p-paginator')])]")
        ];

        let targetDropdown = null;
        for (const loc of dropdownLocators) {
            if (await loc.count() > 0 && await loc.first().isVisible()) {
                targetDropdown = loc.first();
                break;
            }
        }

        if (!targetDropdown) {
            throw new Error('Không tìm thấy dropdown "Thôn/tổ dân phố" trên trang chi tiết.');
        }

        await targetDropdown.scrollIntoViewIfNeeded().catch(() => {});
        await targetDropdown.click();
        await this.page.waitForTimeout(500);

        // Chờ danh sách options xuất hiện
        const panel = this.page.locator("div.p-dropdown-panel, div[role='listbox'], ul.p-dropdown-items").first();
        await panel.waitFor({ state: 'visible', timeout: 5000 });

        const filterInput = this.page.locator("input.p-dropdown-filter, input[data-pc-section='filterinput']").first();
        const hasSearch = await filterInput.count() > 0 && await filterInput.isVisible();

        if (villageName && villageName.trim() !== '' && !villageName.startsWith('<')) {
            const cleanName = villageName.trim();
            if (hasSearch) {
                await filterInput.fill(cleanName);
                await this.page.waitForTimeout(500);
            }

            const targetOption = this.page.locator(
                `li.p-dropdown-item:has-text("${cleanName}"), li[role='option']:has-text("${cleanName}")`
            ).first();

            if (await targetOption.count() > 0 && await targetOption.isVisible()) {
                const selectedText = (await targetOption.innerText()).trim();
                console.log(`[Thôn/tổ dân phố] Đã chọn: "${selectedText}"`);
                await targetOption.click();
            } else {
                console.warn(`[Cảnh báo] Không tìm thấy option "${cleanName}", tiến hành chọn option đầu tiên có sẵn.`);
                const firstOption = this.page.locator("li.p-dropdown-item:not(.p-disabled), li[role='option']:not(.p-disabled)").first();
                const selectedText = (await firstOption.innerText()).trim();
                console.log(`[Thôn/tổ dân phố] Đã tự động chọn option đầu tiên: "${selectedText}"`);
                await firstOption.click();
            }
        } else {
            const availableOptions = this.page.locator("li.p-dropdown-item:not(.p-disabled), li[role='option']:not(.p-disabled)");
            const count = await availableOptions.count();
            if (count === 0) {
                throw new Error('Dropdown "Thôn/tổ dân phố" không có option nào để chọn.');
            }

            let picked = false;
            for (let i = 0; i < count; i++) {
                const opt = availableOptions.nth(i);
                const txt = (await opt.innerText()).trim();
                if (txt && !txt.toLowerCase().includes('tất cả')) {
                    console.log(`[Thôn/tổ dân phố] Tự động chọn thôn/tổ dân phố: "${txt}"`);
                    await opt.click();
                    picked = true;
                    break;
                }
            }
            if (!picked) {
                const firstOpt = availableOptions.first();
                const txt = (await firstOpt.innerText()).trim();
                console.log(`[Thôn/tổ dân phố] Tự động chọn option: "${txt}"`);
                await firstOpt.click();
            }
        }

        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);
    }

    /**
     * Chuyển số lượng bản ghi hiển thị trên 1 trang thành số lớn nhất (100, 50,...)
     */
    async setRowsPerPage(size: number = 100) {
        try {
            const rppDropdown = this.page.locator(
                "//div[@aria-label='Choose']"
            ).first();

            if (await rppDropdown.count() > 0 && await rppDropdown.isVisible()) {
                await rppDropdown.click();
                await this.page.waitForTimeout(500);

                // Thử chọn option 100 trước
                const targetOption = this.page.locator(
                    `li.p-dropdown-item:has-text("${size}"), li[role='option']:has-text("${size}")`
                ).first();

                if (await targetOption.count() > 0 && await targetOption.isVisible()) {
                    await targetOption.click();
                } else {
                    // Nếu không có option đúng 100, chọn option lớn nhất ở cuối danh sách
                    const allOptions = this.page.locator("li.p-dropdown-item, li[role='option']");
                    const count = await allOptions.count();
                    if (count > 0) {
                        await allOptions.last().click();
                    }
                }
                await this.page.waitForLoadState('domcontentloaded');
                await this.page.waitForTimeout(1000);
            }
        } catch (e) {
            console.log('[Info] Không tìm thấy hoặc không thể đổi số lượng/trang, tiếp tục theo trang hiện tại.');
        }
    }

    /**
     * Kiểm tra một checkbox có được tích chọn trong popup hay không theo text nhãn bên cạnh
     * (Ví dụ: "Là Đảng viên", "Dân tộc thiểu số", "Vị trí kiêm nhiệm", "MTTQ và đoàn thể",...)
     */
    async isCheckboxChecked(dialog: any, labelText: string): Promise<boolean> {
        // Cuộn nội dung popup xuống để đảm bảo các trường ở dưới (như Cơ cấu, Thành phần) được render
        const dialogContent = dialog.locator('.p-dialog-content, [data-pc-section="content"]').first();
        if (await dialogContent.count() > 0) {
            await dialogContent.evaluate((el: HTMLElement) => {
                el.scrollTop = el.scrollHeight / 2;
            }).catch(() => {});
        }

        // Tìm đúng container bọc checkbox và text theo class chuẩn của dự án: span.cqdp-checkbox-container
        const checkboxContainer = dialog.locator(
            "span.cqdp-checkbox-container, .info-label.cqdp-checkbox-container, span[class*='cqdp-checkbox-container']"
        ).filter({ hasText: labelText }).first();

        if (await checkboxContainer.count() > 0) {
            // Cuộn chính xác tới vị trí của checkbox trong popup
            await checkboxContainer.scrollIntoViewIfNeeded().catch(() => {});

            // 1. Kiểm tra input[type='checkbox']
            const input = checkboxContainer.locator("input.p-checkbox-input, input[type='checkbox']").first();
            if (await input.count() > 0) {
                const checked = await input.isChecked();
                if (checked) return true;
            }

            // 2. Kiểm tra thuộc tính data-p-highlight="true" hoặc class p-highlight của PrimeNG
            const isHighlighted = await checkboxContainer.locator(
                "div[data-p-highlight='true'], div.p-highlight, .p-checkbox-box[data-p-highlight='true']"
            ).count() > 0;

            if (isHighlighted) return true;

            // 3. Kiểm tra sự xuất hiện của icon svg check (chỉ xuất hiện khi được tick)
            const hasCheckIcon = await checkboxContainer.locator("svg.p-checkbox-icon, .pi-check").count() > 0;
            if (hasCheckIcon) return true;

            return false;
        }

        // Fallback: Tìm theo text bất kỳ nếu container có class khác
        const fallbackContainer = dialog.locator(
            `xpath=.//*[self::span or self::label or self::div][contains(., '${labelText}') and (.//input[@type='checkbox'] or .//div[contains(@class,'p-checkbox')])]`
        ).first();

        if (await fallbackContainer.count() > 0) {
            const input = fallbackContainer.locator("input[type='checkbox']").first();
            if (await input.count() > 0 && await input.isChecked()) return true;

            const isHighlighted = await fallbackContainer.locator("div[data-p-highlight='true'], div.p-highlight, svg.p-checkbox-icon").count() > 0;
            return isHighlighted;
        }

        return false;
    }

    /**
     * Đọc giá trị của một trường Dropdown trong modal chi tiết theo tên nhãn (label)
     * (Ví dụ: "Giới tính", "Trình độ", "Dân tộc", "Trình độ chuyên môn",...)
     */
    async getDropdownValue(dialog: any, fieldLabel: string): Promise<string> {
        // Cuộn tới nhãn trường nếu nằm bên dưới popup
        const labelLocator = dialog.locator(
            `xpath=.//label[contains(normalize-space(),'${fieldLabel}')]`
        ).first();

        if (await labelLocator.count() > 0) {
            await labelLocator.scrollIntoViewIfNeeded().catch(() => {});
        }

        // 1. Thử lấy giá trị từ PrimeNG dropdown: span.p-dropdown-label hoặc input
        const dropdownLabel = dialog.locator(
            `xpath=.//label[contains(normalize-space(),'${fieldLabel}')]/..//*[contains(@class,'p-dropdown-label') or @data-pc-section='label'] | .//label[contains(normalize-space(),'${fieldLabel}')]/following-sibling::*//*[contains(@class,'p-dropdown-label') or @data-pc-section='label']`
        ).first();

        if (await dropdownLabel.count() > 0) {
            const text = (await dropdownLabel.innerText()).trim();
            if (text) return text;
        }

        // 2. Thử tìm thẻ input / textarea / select trong container cùng nhãn
        const inputLocator = dialog.locator(
            `xpath=.//label[contains(normalize-space(),'${fieldLabel}')]/..//input | .//label[contains(normalize-space(),'${fieldLabel}')]/..//select | .//label[contains(normalize-space(),'${fieldLabel}')]/following-sibling::*//input`
        ).first();

        if (await inputLocator.count() > 0) {
            const val = (await inputLocator.inputValue().catch(() => '')) || '';
            if (val.trim()) return val.trim();
        }

        // 3. Fallback: Lấy text bên cạnh nhãn
        if (await labelLocator.count() > 0) {
            const parent = labelLocator.locator('xpath=..').first();
            if (await parent.count() > 0) {
                const rawText = (await parent.innerText()).trim();
                const cleaned = rawText.replace(new RegExp(fieldLabel, 'i'), '').replace(/[*:\n\r]/g, '').trim();
                if (cleaned) return cleaned;
            }
        }

        return 'Không xác định / Để trống';
    }

    /**
     * 1. HÀM ĐỘNG: Thống kê số lượng đại biểu theo bất kỳ DROPDOWN nào
     * (Ví dụ: "Giới tính", "Trình độ", "Dân tộc", "Tôn giáo",...)
     * Tự động quét và lập bảng report tổng hợp tất cả các giá trị xuất hiện (Nam: x, Nữ: y, ...)
     */
    async countDelegatesByDropdown(fieldName: string, localName: string, categoryName: string, showPercentage: boolean = true) {
        const details: DelegateRecord[] = [];
        const stats: Record<string, number> = {};
        let hasNextPage = true;
        let pageIndex = 1;

        // Chọn hiển thị 100 bản ghi/trang để duyệt nhanh và đầy đủ
        await this.setRowsPerPage(100);

        while (hasNextPage) {
            await this.page.waitForTimeout(1000);
            const rows = this.page.locator("tbody tr:not(.p-datatable-emptymessage)");
            const rowCount = await rows.count();

            if (rowCount === 0) {
                console.log(`[Thông báo] Không có bản ghi nào hiển thị trong bảng.`);
                break;
            }

            for (let i = 0; i < rowCount; i++) {
                const currentRow = rows.nth(i);
                const cells = currentRow.locator('td');
                const cellCount = await cells.count();

                if (cellCount < 3) continue;

                const stt = (await cells.nth(0).innerText()).trim();
                const term = cellCount > 1 ? (await cells.nth(1).innerText()).trim() : '';
                const name = cellCount > 2 ? (await cells.nth(2).innerText()).trim() : '';
                const role = cellCount > 3 ? (await cells.nth(3).innerText()).trim() : '';

                // Bấm icon sửa của hàng hiện tại
                const editIcon = currentRow.locator("xpath=.//span[@data-pr-tooltip='Chỉnh sửa'] | .//*[@data-pr-tooltip='Chỉnh sửa']").or(
                    this.page.locator("//span[@data-pr-tooltip='Chỉnh sửa']").nth(i)
                ).first();

                await editIcon.waitFor({ state: 'visible', timeout: 10000 });
                await editIcon.click();

                // Chờ modal chi tiết mở ra
                const dialog = this.page.locator("//div[@data-pc-name='dialog' or @role='dialog' or contains(@class,'p-dialog')]").first();
                await dialog.waitFor({ state: 'visible', timeout: 10000 });
                await dialog.locator('.p-dialog-content, [data-pc-section="content"]').waitFor({ state: 'visible', timeout: 5000 });

                // Đọc giá trị dropdown theo trường fieldName truyền vào
                const fieldValue = await this.getDropdownValue(dialog, fieldName);

                // Thống kê tổng hợp số lượng từng giá trị
                stats[fieldValue] = (stats[fieldValue] || 0) + 1;

                details.push({
                    stt: stt || `${i + 1}`,
                    term,
                    name,
                    role,
                    gender: fieldName.toLowerCase().includes('giới tính') ? fieldValue : '',
                    checkValue: `${fieldName}: ${fieldValue}`,
                    isMatch: true
                });

                // Đóng modal
                const closeBtn = dialog.locator(
                    "xpath=.//button[@data-pc-section='closebutton'] | .//*[contains(@class,'p-dialog-header-close')] | .//button[normalize-space()='Hủy'] | .//button[normalize-space()='Đóng'] | .//button[contains(@class,'close-btn')]"
                ).first();

                if (await closeBtn.count() > 0 && await closeBtn.isVisible()) {
                    await closeBtn.click();
                } else {
                    await this.page.keyboard.press('Escape');
                }

                await dialog.waitFor({ state: 'hidden', timeout: 10000 });
            }

            // Kiểm tra phân trang
            const nextButton = this.page.locator("button[aria-label='Next Page'], button.p-paginator-next").first();
            if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
                pageIndex++;
                console.log(`[Phân trang] Đang chuyển sang trang ${pageIndex}...`);
                await nextButton.click();
                await this.page.waitForLoadState('domcontentloaded');
                await this.page.waitForTimeout(1000);
            } else {
                hasNextPage = false;
            }
        }

        // In báo cáo thống kê chi tiết theo DROPDOWN
        console.log('\n======================================================================');
        console.log(`📊 BÁO CÁO THỐNG KÊ ĐẠI BIỂU THEO TRƯỜNG "${fieldName.toUpperCase()}": ${localName}`);
        console.log(`📁 Danh mục: ${categoryName}`);
        console.log('----------------------------------------------------------------------');
        details.forEach((item) => {
            console.log(`${item.stt.padEnd(3)} | Tên: ${item.name.padEnd(25)} | Chức vụ: ${item.role.padEnd(25)} | ${item.checkValue}`);
        });
        console.log('----------------------------------------------------------------------');
        console.log(`👉 TỔNG SỐ ĐẠI BIỂU ĐÃ DUYỆT: ${details.length}`);
        console.log(`👉 BẢNG THỐNG KÊ CHI TIẾT TỪNG GIÁ TRỊ CỦA "${fieldName}":`);
        for (const [val, count] of Object.entries(stats)) {
            if (showPercentage) {
                const percentage = details.length > 0 ? ((count / details.length) * 100).toFixed(2) : '0';
                console.log(`   🔹 ${val}: ${count} đại biểu (${percentage}%)`);
            } else {
                console.log(`   🔹 ${val}: ${count} đại biểu`);
            }
        }
        console.log('======================================================================\n');

        return { total: details.length, stats, details };
    }

    /**
     * HÀM TÁCH RIÊNG: Thống kê dropdown (Trình độ, Giới tính,...) THEO THÔN/TỔ DÂN PHỐ
     * - Nếu modal popup KHÔNG CÓ trường Thôn/tổ dân phố: Báo lỗi FAIL ngay lập tức!
     * - Nếu có trường Thôn/tổ dân phố: chỉ những người khớp villageName mới được đưa vào thống kê trường fieldName.
     */
    async countDelegatesByDropdownInVillage(
        fieldName: string,
        villageName: string,
        localName: string,
        categoryName: string = 'Người hoạt động không chuyên trách ở thôn, tổ dân phố',
        showPercentage: boolean = false
    ) {
        const details: DelegateRecord[] = [];
        const stats: Record<string, number> = {};
        let totalChecked = 0;
        let hasNextPage = true;
        let pageIndex = 1;

        const cleanVillage = (villageName || '').trim();
        if (!cleanVillage) {
            throw new Error(`[Lỗi] Bạn cần cung cấp tên Thôn/Tổ dân phố cụ thể để thực hiện thống kê.`);
        }

        // Chọn hiển thị 100 bản ghi/trang để duyệt nhanh và đầy đủ
        await this.setRowsPerPage(100);

        while (hasNextPage) {
            await this.page.waitForTimeout(1000);
            const rows = this.page.locator("tbody tr:not(.p-datatable-emptymessage)");
            const rowCount = await rows.count();

            if (rowCount === 0) {
                console.log(`[Thông báo] Không có bản ghi nào hiển thị trong bảng.`);
                break;
            }

            for (let i = 0; i < rowCount; i++) {
                const currentRow = rows.nth(i);
                const cells = currentRow.locator('td');
                const cellCount = await cells.count();

                if (cellCount < 3) continue;

                const stt = (await cells.nth(0).innerText()).trim();
                const term = cellCount > 1 ? (await cells.nth(1).innerText()).trim() : '';
                const name = cellCount > 2 ? (await cells.nth(2).innerText()).trim() : '';
                const role = cellCount > 3 ? (await cells.nth(3).innerText()).trim() : '';

                // Bấm icon sửa của hàng hiện tại
                const editIcon = currentRow.locator("xpath=.//span[@data-pr-tooltip='Chỉnh sửa'] | .//*[@data-pr-tooltip='Chỉnh sửa']").or(
                    this.page.locator("//span[@data-pr-tooltip='Chỉnh sửa']").nth(i)
                ).first();

                await editIcon.waitFor({ state: 'visible', timeout: 10000 });
                await editIcon.click();

                // Chờ modal chi tiết mở ra
                const dialog = this.page.locator("//div[@data-pc-name='dialog' or @role='dialog' or contains(@class,'p-dialog')]").first();
                await dialog.waitFor({ state: 'visible', timeout: 10000 });
                await dialog.locator('.p-dialog-content, [data-pc-section="content"]').waitFor({ state: 'visible', timeout: 5000 });

                totalChecked++;

                // 1. Đọc giá trị Thôn/tổ dân phố trong popup
                let villageVal = await this.getDropdownValue(dialog, 'Thôn/tổ dân phố');
                if (villageVal === 'Không xác định / Để trống') villageVal = await this.getDropdownValue(dialog, 'Thôn/Tổ dân phố');
                if (villageVal === 'Không xác định / Để trống') villageVal = await this.getDropdownValue(dialog, 'Thôn / tổ dân phố');
                if (villageVal === 'Không xác định / Để trống') villageVal = await this.getDropdownValue(dialog, 'Thôn, tổ dân phố');
                if (villageVal === 'Không xác định / Để trống') villageVal = await this.getDropdownValue(dialog, 'Tổ dân phố');
                if (villageVal === 'Không xác định / Để trống') villageVal = await this.getDropdownValue(dialog, 'Thôn');

                // NẾU MODAL HOÀN TOÀN KHÔNG CÓ TRƯỜNG THÔN/TỔ DÂN PHỐ -> FAIL NGAY!
                if (villageVal === 'Không xác định / Để trống') {
                    throw new Error(
                        `[Lỗi kiểm thử] Modal chỉnh sửa của bản ghi "${name}" không có trường "Thôn/Tổ dân phố" để lọc. ` +
                        `Vui lòng kiểm tra lại cấu hình form của danh mục "${categoryName}".`
                    );
                }

                // Kiểm tra xem có đúng thôn cần lọc không
                const isVillageMatch = villageVal.toLowerCase().includes(cleanVillage.toLowerCase());

                if (!isVillageMatch) {
                    // Không đúng thôn -> đóng modal và bỏ qua
                    const closeBtn = dialog.locator(
                        "xpath=.//button[@data-pc-section='closebutton'] | .//*[contains(@class,'p-dialog-header-close')] | .//button[normalize-space()='Hủy'] | .//button[normalize-space()='Đóng'] | .//button[contains(@class,'close-btn')]"
                    ).first();
                    if (await closeBtn.count() > 0 && await closeBtn.isVisible()) {
                        await closeBtn.click();
                    } else {
                        await this.page.keyboard.press('Escape');
                    }
                    await dialog.waitFor({ state: 'hidden', timeout: 10000 });
                    continue;
                }

                // 2. Đúng thôn -> Đọc giá trị dropdown theo trường fieldName truyền vào
                const fieldValue = await this.getDropdownValue(dialog, fieldName);

                // Thống kê tổng hợp số lượng từng giá trị
                stats[fieldValue] = (stats[fieldValue] || 0) + 1;

                details.push({
                    stt: stt || `${i + 1}`,
                    term,
                    name,
                    role,
                    gender: fieldName.toLowerCase().includes('giới tính') ? fieldValue : '',
                    checkValue: `${fieldName}: ${fieldValue} (Thôn: ${villageVal})`,
                    isMatch: true
                });

                // Đóng modal
                const closeBtn = dialog.locator(
                    "xpath=.//button[@data-pc-section='closebutton'] | .//*[contains(@class,'p-dialog-header-close')] | .//button[normalize-space()='Hủy'] | .//button[normalize-space()='Đóng'] | .//button[contains(@class,'close-btn')]"
                ).first();

                if (await closeBtn.count() > 0 && await closeBtn.isVisible()) {
                    await closeBtn.click();
                } else {
                    await this.page.keyboard.press('Escape');
                }

                await dialog.waitFor({ state: 'hidden', timeout: 10000 });
            }

            // Kiểm tra phân trang
            const nextButton = this.page.locator("button[aria-label='Next Page'], button.p-paginator-next").first();
            if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
                pageIndex++;
                console.log(`[Phân trang] Đang chuyển sang trang ${pageIndex}...`);
                await nextButton.click();
                await this.page.waitForLoadState('domcontentloaded');
                await this.page.waitForTimeout(1000);
            } else {
                hasNextPage = false;
            }
        }

        // In báo cáo thống kê chi tiết theo DROPDOWN tại THÔN
        console.log('\n======================================================================');
        console.log(`📊 BÁO CÁO THỐNG KÊ ĐẠI BIỂU THEO TRƯỜNG "${fieldName.toUpperCase()}": ${localName}`);
        console.log(`📁 Danh mục: ${categoryName}`);
        console.log(`🏘️  Thôn/Tổ dân phố: ${cleanVillage}`);
        console.log('----------------------------------------------------------------------');
        details.forEach((item) => {
            console.log(`${item.stt.padEnd(3)} | Tên: ${item.name.padEnd(25)} | Chức vụ: ${item.role.padEnd(25)} | ${item.checkValue}`);
        });
        console.log('----------------------------------------------------------------------');
        console.log(`👉 TỔNG SỐ BẢN GHI ĐÃ DUYỆT                     : ${totalChecked}`);
        console.log(`👉 SỐ LƯỢNG THUỘC THÔN "${cleanVillage}"         : ${details.length}`);
        console.log(`👉 BẢNG THỐNG KÊ CHI TIẾT TỪNG GIÁ TRỊ CỦA "${fieldName}":`);
        for (const [val, count] of Object.entries(stats)) {
            if (showPercentage) {
                const percentage = details.length > 0 ? ((count / details.length) * 100).toFixed(2) : '0';
                console.log(`   🔹 ${val}: ${count} đại biểu (${percentage}%)`);
            } else {
                console.log(`   🔹 ${val}: ${count} đại biểu`);
            }
        }
        console.log('======================================================================\n');

        return { total: details.length, totalChecked, stats, details };
    }

    /**
     * Hỗ trợ gọi tương thích cho Giới tính
     */
    async countDelegatesByGender(expectedGender: string, localName: string, categoryName: string = 'ĐẠI BIỂU HĐND') {
        const result = await this.countDelegatesByDropdown('Giới tính', localName, categoryName);
        const matchCount = Object.entries(result.stats)
            .filter(([k]) => k.toLowerCase().includes(expectedGender.toLowerCase()))
            .reduce((sum, [, count]) => sum + count, 0);
        return { total: result.total, matchCount, details: result.details };
    }

    /**
     * 2. HÀM CHUYÊN BIỆT: Đếm số lượng đại biểu theo CHECKBOX (như: Là Đảng viên, Dân tộc thiểu số, MTTQ và đoàn thể,...)
     */
    async countDelegatesByCheckbox(checkboxLabel: string, localName: string, categoryName: string) {
        const details: DelegateRecord[] = [];
        let matchCount = 0;
        let hasNextPage = true;
        let pageIndex = 1;

        // Chọn hiển thị 100 bản ghi/trang để duyệt nhanh và đầy đủ
        await this.setRowsPerPage(100);

        while (hasNextPage) {
            await this.page.waitForTimeout(1000);
            const rows = this.page.locator("tbody tr:not(.p-datatable-emptymessage)");
            const rowCount = await rows.count();

            if (rowCount === 0) {
                console.log(`[Thông báo] Không có bản ghi nào hiển thị trong bảng.`);
                break;
            }

            for (let i = 0; i < rowCount; i++) {
                const currentRow = rows.nth(i);
                const cells = currentRow.locator('td');
                const cellCount = await cells.count();

                if (cellCount < 3) continue;

                const stt = (await cells.nth(0).innerText()).trim();
                const term = cellCount > 1 ? (await cells.nth(1).innerText()).trim() : '';
                const name = cellCount > 2 ? (await cells.nth(2).innerText()).trim() : '';
                const role = cellCount > 3 ? (await cells.nth(3).innerText()).trim() : '';

                // Bấm icon sửa của hàng hiện tại
                const editIcon = currentRow.locator("xpath=.//span[@data-pr-tooltip='Chỉnh sửa'] | .//*[@data-pr-tooltip='Chỉnh sửa']").or(
                    this.page.locator("//span[@data-pr-tooltip='Chỉnh sửa']").nth(i)
                ).first();

                await editIcon.waitFor({ state: 'visible', timeout: 10000 });
                await editIcon.click();

                // Chờ modal chi tiết mở ra
                const dialog = this.page.locator("//div[@data-pc-name='dialog' or @role='dialog' or contains(@class,'p-dialog')]").first();
                await dialog.waitFor({ state: 'visible', timeout: 10000 });
                await dialog.locator('.p-dialog-content, [data-pc-section="content"]').waitFor({ state: 'visible', timeout: 5000 });

                // Kiểm tra checkbox theo text nhãn
                const isChecked = await this.isCheckboxChecked(dialog, checkboxLabel);
                if (isChecked) matchCount++;

                details.push({
                    stt: stt || `${i + 1}`,
                    term,
                    name,
                    role,
                    gender: '',
                    checkValue: `${checkboxLabel}: ${isChecked ? 'Có' : 'Không'}`,
                    isMatch: isChecked
                });

                // Đóng modal
                const closeBtn = dialog.locator(
                    "xpath=.//button[@data-pc-section='closebutton'] | .//*[contains(@class,'p-dialog-header-close')] | .//button[normalize-space()='Hủy'] | .//button[normalize-space()='Đóng'] | .//button[contains(@class,'close-btn')]"
                ).first();

                if (await closeBtn.count() > 0 && await closeBtn.isVisible()) {
                    await closeBtn.click();
                } else {
                    await this.page.keyboard.press('Escape');
                }

                await dialog.waitFor({ state: 'hidden', timeout: 10000 });
            }

            // Kiểm tra phân trang
            const nextButton = this.page.locator("button[aria-label='Next Page'], button.p-paginator-next").first();
            if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
                pageIndex++;
                console.log(`[Phân trang] Đang chuyển sang trang ${pageIndex}...`);
                await nextButton.click();
                await this.page.waitForLoadState('domcontentloaded');
                await this.page.waitForTimeout(1000);
            } else {
                hasNextPage = false;
            }
        }

        // In kết quả theo CHECKBOX
        console.log('\n======================================================================');
        console.log(`📊 BÁO CÁO THỐNG KÊ ĐẠI BIỂU THEO CHECKBOX: ${localName}`);
        console.log(`📁 Danh mục: ${categoryName}`);
        console.log('----------------------------------------------------------------------');
        details.forEach((item) => {
            const marker = item.isMatch ? '⭐ [ĐẠT YÊU CẦU]' : '   ';
            console.log(`${item.stt} | Tên: ${item.name.padEnd(20)} | Chức vụ: ${item.role.padEnd(25)} | ${item.checkValue} ${marker}`);
        });
        console.log('----------------------------------------------------------------------');
        console.log(`👉 TỔNG SỐ ĐẠI BIỂU ĐÃ DUYỆT: ${details.length}`);
        console.log(`👉 SỐ LƯỢNG CÓ "${checkboxLabel}": ${matchCount}`);
        console.log('======================================================================\n');

        return { total: details.length, matchCount, details };
    }

    /**
     * Hàm điều phối chung (tự động nhận diện Giới tính hay Checkbox)
     */
    async countDelegatesByCondition(condition: string, localName: string, categoryName: string = 'ĐẠI BIỂU HĐND') {
        const isGender = condition.toLowerCase() === 'nữ' || condition.toLowerCase() === 'nam';
        if (isGender) {
            return await this.countDelegatesByGender(condition, localName, categoryName);
        } else {
            return await this.countDelegatesByCheckbox(condition, localName, categoryName);
        }
    }

    /**
     * Đọc giá trị ngày sinh từ input "Ngày sinh" trong modal chi tiết
     * Format trả về: DD/MM/YYYY hoặc '' nếu không tìm thấy
     */
    async getDobValue(dialog: any): Promise<string> {
        // Cuộn tới vùng ngày sinh
        const labelLocator = dialog.locator(
            `xpath=.//label[contains(normalize-space(),'Ngày sinh')]`
        ).first();

        if (await labelLocator.count() > 0) {
            await labelLocator.scrollIntoViewIfNeeded().catch(() => {});
        }

        // Tìm input ngày sinh (PrimeNG datepicker, role=combobox hoặc type=text)
        const dobInput = dialog.locator(
            `xpath=.//label[contains(normalize-space(),'Ngày sinh')]/..//input[@type='text'] | .//label[contains(normalize-space(),'Ngày sinh')]/following-sibling::*//input[@type='text'] | .//label[contains(normalize-space(),'Ngày sinh')]/..//input[@role='combobox']`
        ).first();

        if (await dobInput.count() > 0) {
            const val = (await dobInput.inputValue().catch(() => '')).trim();
            if (val) return val;

            // Nếu inputValue rỗng, thử getAttribute value
            const attrVal = (await dobInput.getAttribute('value').catch(() => '') || '').trim();
            if (attrVal) return attrVal;
        }

        return '';
    }

    /**
     * Phân tích chuỗi ngày DD/MM/YYYY hoặc YYYY, trả về năm sinh (number) hoặc null
     */
    parseBirthYear(dobStr: string): number | null {
        if (!dobStr) return null;

        // Format chuẩn DD/MM/YYYY
        const matchFull = dobStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (matchFull) return parseInt(matchFull[3], 10);

        // Format chỉ có năm YYYY
        const matchYear = dobStr.match(/^(\d{4})$/);
        if (matchYear) return parseInt(matchYear[1], 10);

        // Format YYYY-MM-DD
        const matchISO = dobStr.match(/^(\d{4})-\d{2}-\d{2}/);
        if (matchISO) return parseInt(matchISO[1], 10);

        return null;
    }

    /**
     * 3. HÀM THỐNG KÊ ĐỘ TUỔI ĐẠI BIỂU:
     * - Nhóm 1: tuổi < 35
     * - Nhóm 2: 35 <= tuổi <= 50
     * - Nhóm 3: tuổi > 50
     */
    async countDelegatesByAgeGroup(localName: string, categoryName: string = 'ĐẠI BIỂU HĐND') {
        const currentYear = new Date().getFullYear();

        interface AgeRecord {
            stt: string;
            name: string;
            role: string;
            dob: string;
            age: number | null;
            group: string;
        }

        const details: AgeRecord[] = [];
        const stats = { under35: 0, from35to50: 0, over50: 0, unknown: 0 };
        let hasNextPage = true;
        let pageIndex = 1;

        // Chọn hiển thị 100 bản ghi/trang
        await this.setRowsPerPage(100);

        while (hasNextPage) {
            await this.page.waitForTimeout(1000);
            const rows = this.page.locator("tbody tr:not(.p-datatable-emptymessage)");
            const rowCount = await rows.count();

            if (rowCount === 0) {
                console.log(`[Thông báo] Không có bản ghi nào hiển thị trong bảng.`);
                break;
            }

            for (let i = 0; i < rowCount; i++) {
                const currentRow = rows.nth(i);
                const cells = currentRow.locator('td');
                const cellCount = await cells.count();

                if (cellCount < 3) continue;

                const stt = (await cells.nth(0).innerText()).trim();
                const name = cellCount > 2 ? (await cells.nth(2).innerText()).trim() : '';
                const role = cellCount > 3 ? (await cells.nth(3).innerText()).trim() : '';

                // Bấm icon sửa
                const editIcon = currentRow.locator("xpath=.//span[@data-pr-tooltip='Chỉnh sửa'] | .//*[@data-pr-tooltip='Chỉnh sửa']").or(
                    this.page.locator("//span[@data-pr-tooltip='Chỉnh sửa']").nth(i)
                ).first();

                await editIcon.waitFor({ state: 'visible', timeout: 10000 });
                await editIcon.click();

                // Chờ modal mở
                const dialog = this.page.locator("//div[@data-pc-name='dialog' or @role='dialog' or contains(@class,'p-dialog')]").first();
                await dialog.waitFor({ state: 'visible', timeout: 10000 });
                await dialog.locator('.p-dialog-content, [data-pc-section="content"]').waitFor({ state: 'visible', timeout: 5000 });

                // Đọc ngày sinh
                const dob = await this.getDobValue(dialog);
                const birthYear = this.parseBirthYear(dob);
                const age = birthYear ? currentYear - birthYear : null;

                // Phân nhóm tuổi
                let group = 'Không xác định';
                if (age !== null) {
                    if (age < 35) {
                        group = 'Dưới 35 tuổi';
                        stats.under35++;
                    } else if (age <= 50) {
                        group = '35 - 50 tuổi';
                        stats.from35to50++;
                    } else {
                        group = 'Trên 50 tuổi';
                        stats.over50++;
                    }
                } else {
                    stats.unknown++;
                }

                details.push({ stt: stt || `${i + 1}`, name, role, dob, age, group });

                // Đóng modal
                const closeBtn = dialog.locator(
                    "xpath=.//button[@data-pc-section='closebutton'] | .//*[contains(@class,'p-dialog-header-close')] | .//button[normalize-space()='Hủy'] | .//button[normalize-space()='Đóng'] | .//button[contains(@class,'close-btn')]"
                ).first();

                if (await closeBtn.count() > 0 && await closeBtn.isVisible()) {
                    await closeBtn.click();
                } else {
                    await this.page.keyboard.press('Escape');
                }

                await dialog.waitFor({ state: 'hidden', timeout: 10000 });
            }

            // Phân trang
            const nextButton = this.page.locator("button[aria-label='Next Page'], button.p-paginator-next").first();
            if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
                pageIndex++;
                console.log(`[Phân trang] Đang chuyển sang trang ${pageIndex}...`);
                await nextButton.click();
                await this.page.waitForLoadState('domcontentloaded');
                await this.page.waitForTimeout(1000);
            } else {
                hasNextPage = false;
            }
        }

        // In báo cáo thống kê độ tuổi
        console.log('\n======================================================================');
        console.log(`📊 BÁO CÁO THỐNG KÊ ĐẠI BIỂU THEO ĐỘ TUỔI (năm ${currentYear}): ${localName}`);
        console.log(`📁 Danh mục: ${categoryName}`);
        console.log('----------------------------------------------------------------------');
        details.forEach((item) => {
            const ageStr = item.age !== null ? `${item.age} tuổi` : 'Không có ngày sinh';
            console.log(`${item.stt.padEnd(3)} | Tên: ${item.name.padEnd(25)} | Chức vụ: ${item.role.padEnd(25)} | Ngày sinh: ${(item.dob || '?').padEnd(12)} | ${ageStr.padEnd(10)} | ${item.group}`);
        });
        console.log('----------------------------------------------------------------------');
        console.log(`👉 TỔNG SỐ ĐẠI BIỂU ĐÃ DUYỆT: ${details.length}`);
        console.log(`👉 THỐNG KÊ THEO NHÓM TUỔI:`);
        console.log(`   🔹 Dưới 35 tuổi  (tuổi < 35)    : ${stats.under35} đại biểu`);
        console.log(`   🔹 35 - 50 tuổi  (35 ≤ tuổi ≤ 50): ${stats.from35to50} đại biểu`);
        console.log(`   🔹 Trên 50 tuổi  (tuổi > 50)    : ${stats.over50} đại biểu`);
        if (stats.unknown > 0) {
            console.log(`   ⚠️  Không xác định được tuổi     : ${stats.unknown} đại biểu`);
        }
        console.log('======================================================================\n');

        return { total: details.length, stats, details };
    }

    /**
     * HÀM TÁCH RIÊNG: Thống kê độ tuổi THEO THÔN/TỔ DÂN PHỐ
     * - Nếu modal popup KHÔNG CÓ trường Thôn/tổ dân phố: Báo lỗi FAIL ngay lập tức!
     * - Nếu có trường Thôn/tổ dân phố: chỉ những người khớp villageName mới được đưa vào thống kê độ tuổi.
     */
    async countDelegatesByAgeGroupInVillage(
        villageName: string,
        localName: string,
        categoryName: string = 'Người hoạt động không chuyên trách ở thôn, tổ dân phố'
    ) {
        const currentYear = new Date().getFullYear();

        interface AgeRecord {
            stt: string;
            name: string;
            role: string;
            village: string;
            dob: string;
            age: number | null;
            group: string;
        }

        const details: AgeRecord[] = [];
        const stats = { under35: 0, from35to50: 0, over50: 0, unknown: 0 };
        let totalChecked = 0;
        let hasNextPage = true;
        let pageIndex = 1;

        const cleanVillage = (villageName || '').trim();
        if (!cleanVillage) {
            throw new Error(`[Lỗi] Bạn cần cung cấp tên Thôn/Tổ dân phố cụ thể để thực hiện thống kê độ tuổi.`);
        }

        // Chọn hiển thị 100 bản ghi/trang
        await this.setRowsPerPage(100);

        while (hasNextPage) {
            await this.page.waitForTimeout(1000);
            const rows = this.page.locator("tbody tr:not(.p-datatable-emptymessage)");
            const rowCount = await rows.count();

            if (rowCount === 0) {
                console.log(`[Thông báo] Không có bản ghi nào hiển thị trong bảng.`);
                break;
            }

            for (let i = 0; i < rowCount; i++) {
                const currentRow = rows.nth(i);
                const cells = currentRow.locator('td');
                const cellCount = await cells.count();

                if (cellCount < 3) continue;

                const stt = (await cells.nth(0).innerText()).trim();
                const name = cellCount > 2 ? (await cells.nth(2).innerText()).trim() : '';
                const role = cellCount > 3 ? (await cells.nth(3).innerText()).trim() : '';

                // Bấm icon sửa
                const editIcon = currentRow.locator("xpath=.//span[@data-pr-tooltip='Chỉnh sửa'] | .//*[@data-pr-tooltip='Chỉnh sửa']").or(
                    this.page.locator("//span[@data-pr-tooltip='Chỉnh sửa']").nth(i)
                ).first();

                await editIcon.waitFor({ state: 'visible', timeout: 10000 });
                await editIcon.click();

                // Chờ modal mở
                const dialog = this.page.locator("//div[@data-pc-name='dialog' or @role='dialog' or contains(@class,'p-dialog')]").first();
                await dialog.waitFor({ state: 'visible', timeout: 10000 });
                await dialog.locator('.p-dialog-content, [data-pc-section="content"]').waitFor({ state: 'visible', timeout: 5000 });

                totalChecked++;

                // 1. Đọc giá trị Thôn/tổ dân phố trong popup
                let villageVal = await this.getDropdownValue(dialog, 'Thôn/tổ dân phố');
                if (villageVal === 'Không xác định / Để trống') villageVal = await this.getDropdownValue(dialog, 'Thôn/Tổ dân phố');
                if (villageVal === 'Không xác định / Để trống') villageVal = await this.getDropdownValue(dialog, 'Thôn / tổ dân phố');
                if (villageVal === 'Không xác định / Để trống') villageVal = await this.getDropdownValue(dialog, 'Thôn, tổ dân phố');
                if (villageVal === 'Không xác định / Để trống') villageVal = await this.getDropdownValue(dialog, 'Tổ dân phố');
                if (villageVal === 'Không xác định / Để trống') villageVal = await this.getDropdownValue(dialog, 'Thôn');

                // NẾU MODAL HOÀN TOÀN KHÔNG CÓ TRƯỜNG THÔN/TỔ DÂN PHỐ -> FAIL NGAY!
                if (villageVal === 'Không xác định / Để trống') {
                    throw new Error(
                        `[Lỗi kiểm thử] Modal chỉnh sửa của bản ghi "${name}" không có trường "Thôn/Tổ dân phố" để lọc. ` +
                        `Vui lòng kiểm tra lại cấu hình form của danh mục "${categoryName}".`
                    );
                }

                // Kiểm tra xem có đúng thôn cần lọc không
                const isVillageMatch = villageVal.toLowerCase().includes(cleanVillage.toLowerCase());

                if (!isVillageMatch) {
                    // Không đúng thôn -> đóng modal và bỏ qua
                    const closeBtn = dialog.locator(
                        "xpath=.//button[@data-pc-section='closebutton'] | .//*[contains(@class,'p-dialog-header-close')] | .//button[normalize-space()='Hủy'] | .//button[normalize-space()='Đóng'] | .//button[contains(@class,'close-btn')]"
                    ).first();
                    if (await closeBtn.count() > 0 && await closeBtn.isVisible()) {
                        await closeBtn.click();
                    } else {
                        await this.page.keyboard.press('Escape');
                    }
                    await dialog.waitFor({ state: 'hidden', timeout: 10000 });
                    continue;
                }

                // 2. Đúng thôn -> Đọc ngày sinh
                const dob = await this.getDobValue(dialog);
                const birthYear = this.parseBirthYear(dob);
                const age = birthYear ? currentYear - birthYear : null;

                // Phân nhóm tuổi
                let group = 'Không xác định';
                if (age !== null) {
                    if (age < 35) {
                        group = 'Dưới 35 tuổi';
                        stats.under35++;
                    } else if (age <= 50) {
                        group = '35 - 50 tuổi';
                        stats.from35to50++;
                    } else {
                        group = 'Trên 50 tuổi';
                        stats.over50++;
                    }
                } else {
                    stats.unknown++;
                }

                details.push({ stt: stt || `${i + 1}`, name, role, village: villageVal, dob, age, group });

                // Đóng modal
                const closeBtn = dialog.locator(
                    "xpath=.//button[@data-pc-section='closebutton'] | .//*[contains(@class,'p-dialog-header-close')] | .//button[normalize-space()='Hủy'] | .//button[normalize-space()='Đóng'] | .//button[contains(@class,'close-btn')]"
                ).first();

                if (await closeBtn.count() > 0 && await closeBtn.isVisible()) {
                    await closeBtn.click();
                } else {
                    await this.page.keyboard.press('Escape');
                }

                await dialog.waitFor({ state: 'hidden', timeout: 10000 });
            }

            // Phân trang
            const nextButton = this.page.locator("button[aria-label='Next Page'], button.p-paginator-next").first();
            if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
                pageIndex++;
                console.log(`[Phân trang] Đang chuyển sang trang ${pageIndex}...`);
                await nextButton.click();
                await this.page.waitForLoadState('domcontentloaded');
                await this.page.waitForTimeout(1000);
            } else {
                hasNextPage = false;
            }
        }

        // In báo cáo thống kê độ tuổi tại THÔN
        console.log('\n======================================================================');
        console.log(`📊 BÁO CÁO THỐNG KÊ ĐẠI BIỂU THEO ĐỘ TUỔI (năm ${currentYear}): ${localName}`);
        console.log(`📁 Danh mục: ${categoryName}`);
        console.log(`🏘️  Thôn/Tổ dân phố: ${cleanVillage}`);
        console.log('----------------------------------------------------------------------');
        details.forEach((item) => {
            const ageStr = item.age !== null ? `${item.age} tuổi` : 'Không có ngày sinh';
            console.log(`${item.stt.padEnd(3)} | Tên: ${item.name.padEnd(25)} | Chức vụ: ${item.role.padEnd(25)} | Ngày sinh: ${(item.dob || '?').padEnd(12)} | ${ageStr.padEnd(10)} | ${item.group}`);
        });
        console.log('----------------------------------------------------------------------');
        console.log(`👉 TỔNG SỐ BẢN GHI ĐÃ DUYỆT                     : ${totalChecked}`);
        console.log(`👉 SỐ LƯỢNG THUỘC THÔN "${cleanVillage}"         : ${details.length}`);
        console.log(`👉 THỐNG KÊ THEO NHÓM TUỔI TẠI THÔN "${cleanVillage}":`);
        console.log(`   🔹 Dưới 35 tuổi  (tuổi < 35)    : ${stats.under35} đại biểu`);
        console.log(`   🔹 35 - 50 tuổi  (35 ≤ tuổi ≤ 50): ${stats.from35to50} đại biểu`);
        console.log(`   🔹 Trên 50 tuổi  (tuổi > 50)    : ${stats.over50} đại biểu`);
        if (stats.unknown > 0) {
            console.log(`   ⚠️  Không xác định được tuổi     : ${stats.unknown} đại biểu`);
        }
        console.log('======================================================================\n');

        return { total: details.length, totalChecked, stats, details };
    }

    /**
     * Đếm số chức danh/chức vụ hiển thị trực tiếp ở bảng danh sách (không cần mở popup chi tiết từng bản ghi)
     * Ví dụ: 1 Chủ tịch, 2 Phó Chủ tịch => Chức danh = 2
     */
    async countRolesFromTable(localName: string, categoryName: string = 'LÃNH ĐẠO CƠ QUAN') {
        const details: { stt: string; term: string; name: string; role: string }[] = [];
        const roleStats: Record<string, number> = {};
        let hasNextPage = true;
        let pageIndex = 1;

        // Chọn hiển thị 100 bản ghi/trang để đọc nhanh và đầy đủ
        await this.setRowsPerPage(100);

        // Chờ bảng dữ liệu ổn định
        await this.page.waitForTimeout(1000);

        // Tự động tìm vị trí các cột từ header của bảng
        let sttColIndex = 0;
        let termColIndex = 1;
        let nameColIndex = 2;
        let roleColIndex = 3;

        const headers = this.page.locator("thead th, table th");
        const headerCount = await headers.count();
        if (headerCount > 0) {
            for (let h = 0; h < headerCount; h++) {
                const headerText = (await headers.nth(h).innerText()).trim().toUpperCase();
                if (headerText.includes('STT')) {
                    sttColIndex = h;
                } else if (headerText.includes('NHIỆM KỲ')) {
                    termColIndex = h;
                } else if (headerText.includes('LÃNH ĐẠO') || headerText.includes('ĐẠI BIỂU') || headerText.includes('HỌ VÀ TÊN')) {
                    nameColIndex = h;
                } else if (headerText.includes('CHỨC VỤ') || headerText.includes('CHỨC DANH')) {
                    roleColIndex = h;
                }
            }
        }

        while (hasNextPage) {
            await this.page.waitForTimeout(1000);
            const rows = this.page.locator("tbody tr:not(.p-datatable-emptymessage)");
            const rowCount = await rows.count();

            if (rowCount === 0) {
                console.log(`[Thông báo] Không có bản ghi nào hiển thị trong bảng.`);
                break;
            }

            for (let i = 0; i < rowCount; i++) {
                const currentRow = rows.nth(i);
                const cells = currentRow.locator('td');
                const cellCount = await cells.count();

                if (cellCount <= roleColIndex) continue;

                const stt = cellCount > sttColIndex ? (await cells.nth(sttColIndex).innerText()).trim() : `${details.length + 1}`;
                const term = cellCount > termColIndex ? (await cells.nth(termColIndex).innerText()).trim() : '';
                const name = cellCount > nameColIndex ? (await cells.nth(nameColIndex).innerText()).trim() : '';
                const role = (await cells.nth(roleColIndex).innerText()).trim();

                const roleKey = role || '(Chưa xác định)';
                roleStats[roleKey] = (roleStats[roleKey] || 0) + 1;

                details.push({
                    stt: stt || `${details.length + 1}`,
                    term,
                    name,
                    role: roleKey
                });
            }

            // Kiểm tra phân trang
            const nextButton = this.page.locator("button[aria-label='Next Page'], button.p-paginator-next").first();
            if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
                pageIndex++;
                console.log(`[Phân trang] Đang chuyển sang trang ${pageIndex}...`);
                await nextButton.click();
                await this.page.waitForLoadState('domcontentloaded');
                await this.page.waitForTimeout(1000);
            } else {
                hasNextPage = false;
            }
        }

        const distinctRoles = Object.keys(roleStats).filter(r => r !== '(Chưa xác định)');
        const distinctCount = distinctRoles.length;

        // In báo cáo rõ ràng ra console
        console.log('\n======================================================================');
        console.log(`📊 BÁO CÁO THỐNG KÊ CHỨC DANH / CHỨC VỤ (TRỰC TIẾP TỪ BẢNG): ${localName}`);
        console.log(`📁 Danh mục: ${categoryName}`);
        console.log('----------------------------------------------------------------------');
        details.forEach((item) => {
            console.log(`${item.stt.padEnd(4)} | Tên: ${item.name.padEnd(25)} | Chức danh: ${item.role.padEnd(30)} | ${item.term}`);
        });
        console.log('----------------------------------------------------------------------');
        console.log(`👉 TỔNG SỐ LÃNH ĐẠO / BẢN GHI    : ${details.length}`);
        console.log(`👉 TỔNG SỐ LOẠI CHỨC DANH        : ${distinctCount}`);
        console.log('----------------------------------------------------------------------');
        console.log(`📋 CHI TIẾT SỐ LƯỢNG TỪNG CHỨC DANH:`);
        for (const [role, count] of Object.entries(roleStats)) {
            console.log(`   🔹 ${role}: ${count}`);
        }
        console.log('======================================================================\n');

        return {
            totalRecords: details.length,
            distinctRolesCount: distinctCount,
            roleStats,
            details
        };
    }
}

