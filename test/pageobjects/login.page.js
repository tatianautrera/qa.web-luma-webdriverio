import { $ } from '@wdio/globals'
import Page from './basePage.js';
import RegisterUserPage from './registerUser.page.js';
import registerUserPage from './registerUser.page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get linkRegisterPage() {
        return $('a[data-testid="cadastrar"]');
    }

    get inputEmail() {
        return $('input[data-testid="email"]');
    }

    get inputPassword() {
        return $('input[data-testid="senha"]');
    }

    get btnSubmit() {
        return $('button[data-testid="entrar"]');
    }

    get messageError() {
        return $('.alert-dismissible span:nth-child(2)');
    }

    get titlePage() {
        return $('h2');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async loginAndCreateUser(user) {
        await RegisterUserPage.accessRegisterPage()
        await RegisterUserPage.registerUser(user)
        await this.open()
        await this.login(user)

    }

    async login(user) {
        await this.inputEmail.setValue(user.email)
        await this.inputPassword.setValue(user.password)
        await this.btnSubmit.click()
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('/login');
    }
}

export default new LoginPage();
