import { BasePage } from '../base.page';

export default class LoginPage extends BasePage {
  readonly txt_username = this.page.locator("//label[@class='label-form']/following-sibling::input[1]");
  readonly txt_password = this.page.locator("//input[@type='password']");
  readonly cbb_database = this.page.getByRole('button', { name: 'Chọn cơ sở dữ liệu' });
  readonly btn_login = this.page.locator("//button[@type='submit']");
  readonly cb_rememberMe = this.page.locator("//input[@type='checkbox']");
  readonly lb_forgotPassword = this.page.locator("//a[@class='title']");
  readonly lb_eye = this.page.locator("//span[@role='switch']");
  readonly txt_searchDatabase = this.page.getByRole('textbox', { name: 'Tìm kiếm' });

  readonly err_incorrectLogin = this.page.locator(
    "//small[@class='error-text']"
  );
  readonly toast_incorrectLogin = this.page.locator(
    "//div[@role='alert']//span[contains(@class,'p-toast-summary')]"
  );

  async login(email: string, password: string) {
    await Promise.all([
      await this.txt_username.fill(email),
      await this.txt_password.fill(password)
    ])
    await this.btn_login.click();
  }

  async open() {
    await super.open('/login/');
  }

  async selectDatabase(database: string) {
    await this.cbb_database.click();
    await this.txt_searchDatabase.fill(database);
    await this.page.getByRole('option', { name: database, exact: true }).click();
  }

}
