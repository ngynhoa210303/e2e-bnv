import { BasePageComponent } from '../base.pageComponent'

export default class AllowCookiesPopup extends BasePageComponent {
  readonly btn_allowAll = this.page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
  readonly btn_allowSelection = this.page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection');
  readonly btn_deny = this.page.locator('#CybotCookiebotDialogBodyButtonDecline');

  async allow_cookie() {
    const isVisible = await this.btn_allowAll.isVisible({ timeout: 5000 }).catch(() => false);
    if (isVisible) {
      await this.btn_allowAll.click();
    }
  }
}
