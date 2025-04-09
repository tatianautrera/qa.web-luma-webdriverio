import { $ } from '@wdio/globals'
import Page from './basePage.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get linkRegisterPage () {
        return $('a[data-testid="cadastrar"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('/login');
    }

    async accessRegisterPage () {
        await this.linkRegisterPage.click()
    }
}

export default new LoginPage();
