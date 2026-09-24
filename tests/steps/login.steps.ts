import { expect } from '@playwright/test';
import { Given, Then, When } from '../fixtures/fixtures';

const username = process.env.USERNAME_ADMIN;
const password = process.env.PASSWORD_ADMIN;
const cqdb_db = "Chính quyền địa phương";
const baseUrl = process.env.BASE_URL;

Given('user is on the login page', async ({ app, page }) => {
  await app.loginPage.open();
});

When('user enters correct username', async ({ app, page }) => {
  if (!username) {
    throw new Error('USERNAME_ADMIN is missing');
  }
  await app.loginPage.txt_username.fill(username);
});

When('user enters correct password', async ({ app, page }) => {
  if (!password) {
    throw new Error('PASSWORD_ADMIN is missing');
  }
  await app.loginPage.txt_password.fill(password);
});

When('user enters incorrect username', async ({ app, page }) => {
  await app.loginPage.txt_username.fill('sai_username_khong_ton_tai');
});

When('user enters incorrect password', async ({ app, page }) => {
  await app.loginPage.txt_password.fill('SaiMatKhau@123');
});

// Dùng chung cho: username để trống, khoảng trắng, SQL injection payload...
When('user enters username {string}', async ({ app, page }, value: string) => {
  await app.loginPage.txt_username.fill(value);
});

When('user enters password {string}', async ({ app, page }, value: string) => {
  await app.loginPage.txt_password.fill(value);
});

When('user leaves the username field empty', async ({ app, page }) => {
  await app.loginPage.txt_username.fill('');
});

When('user leaves the password field empty', async ({ app, page }) => {
  await app.loginPage.txt_password.fill('');
});

When('user searches and selects the CQDP database', async ({ app, page }) => {
  await app.loginPage.selectDatabase(cqdb_db);
});

When('user does not select any database', async ({ app, page }) => {
  // không chọn database
});

When('user searches database with keyword {string}', async ({ app, page }, keyword: string) => {
  await app.loginPage.cbb_database.click();
  await app.loginPage.txt_searchDatabase.fill(keyword);
});
When('user enters password from env {string} with surrounding spaces', async ({ app }, envKey: string) => {
  const password = process.env[envKey];
  if (!password) {
    throw new Error(`Env variable "${envKey}" is missing (check .env file)`);
  }
  await app.loginPage.txt_password.fill(`  ${password}  `);
});

When('user enters username from env {string} with surrounding spaces', async ({ app }, envKey: string) => {
  const username = process.env[envKey];
  if (!username) {
    throw new Error(`Env variable "${envKey}" is missing (check .env file)`);
  }
  await app.loginPage.txt_username.fill(`  ${username}  `);
});

When('user clicks the Login button', async ({ app, page }) => {
  await app.loginPage.btn_login.click();
});

When('user clicks the show password icon', async ({ app, page }) => {
  await app.loginPage.lb_eye.click();
});

When('user clicks the {string} link', async ({ app, page }, linkText: string) => {
  await page.getByText(linkText).click();
});
When('user enters username with surrounding spaces {string}', async ({ app, page }) => {
  await app.loginPage.txt_username.fill(`  ${username}  `);
});

When('user enters password with surrounding spaces {string}', async ({ app, page }) => {
  await app.loginPage.txt_password.fill(`  ${password}  `);
});


// ===== Then: assertions =====
Then('user should be redirected to the dashboard', async ({ app, page }) => {
  if (!baseUrl) throw new Error('BASE_URL is missing');
  await expect(page).toHaveURL(`${baseUrl}/trang-chu/`);
});

Then('user should not be redirected to the dashboard', async ({ app, page }) => {
  await expect(page).not.toHaveURL(`${baseUrl}/trang-chu/`);
});

Then('user should remain on the login page', async ({ app, page }) => {
  await expect(page).toHaveURL(`${baseUrl}/login/`);
});

Then('user should see an toast message {string}', async ({ app, page }, message: string) => {
  await expect(app.loginPage.toast_incorrectLogin).toContainText(message);
});

Then('user should see a required field validation error', async ({ app, page }) => {
  await expect(app.loginPage.err_incorrectLogin).toContainText("Thông tin đăng nhập chưa đúng")
});

Then('user should see an error message indicating a database must be selected', async ({ app, page }) => {
  await expect(app.loginPage.err_incorrectLogin).toContainText('Thông tin đăng nhập chưa đúng');
});

Then('user should see {string} in database dropdown', async ({ app, page }, message: string) => {
  await expect(page.locator("//li[@class='p-dropdown-empty-message']")).toContainText(message);
});

Then('no script alert should be triggered', async ({ app, page }) => {
  let alertTriggered = false;
  page.on('dialog', () => { alertTriggered = true; });
  await page.waitForTimeout(1000);
  expect(alertTriggered).toBe(false);
});

Then('no unexpected system error should occur', async ({ app, page }) => {
  const response = page.url();
  await expect(page.locator('text=/Internal Server Error|Stack trace|500/i')).toHaveCount(0);
});

Then('password field should display as plain text', async ({ app, page }) => {
  await expect(app.loginPage.txt_password).toHaveAttribute('type', 'text');
});

Then('user should see {string}', async ({ app, page }, result: string) => {
  if (result === 'user redirected to dashboard') {
    await expect(page).toHaveURL(`${baseUrl}/trang-chu/`);
  } else {
    await expect(app.loginPage.toast_incorrectLogin).toContainText(result);
  }
});