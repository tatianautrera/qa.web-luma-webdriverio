import { $ } from '@wdio/globals'
import Page from './basePage.js';
import LoginPage from './login.page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterUserPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputName () {
        return $('input[data-testid="nome"]');
    }

    get inputEmail () {
        return $('input[data-testid="email"]');
    }

    get inputPassword () {
        return $('input[data-testid="password"]');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async registerUser (name, email, password) {
        await this.inputName.setValue(name);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async open () {
        return super.open('/login');
        
    }

    async accessRegisterPage () {
        await this.open()
        await LoginPage.accessRegisterPage()
    }
}

export default new RegisterUserPage();
