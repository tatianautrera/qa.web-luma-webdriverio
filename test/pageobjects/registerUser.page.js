import { $ } from '@wdio/globals'
import Page from './basePage.js';
import LoginPage from './login.page.js';
import faker from 'faker-br'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterUserPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputName() {
        return $('input[data-testid="nome"]');
    }

    get inputEmail() {
        return $('input[data-testid="email"]');
    }

    get inputPassword() {
        return $('input[data-testid="password"]');
    }

    get inputCheckbox() {
        return $('input[data-testid="checkbox"]');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async registerUser(user) {
        await this.inputName.setValue(user.name);
        await this.inputEmail.setValue(user.email);
        await this.inputPassword.setValue(user.password);
        if (user.administrator == true)
            await this.inputCheckbox.click();
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async open() {
        return super.open('/login');

    }

    async accessRegisterPage() {
        await this.open()
        await LoginPage.linkRegisterPage.click()
    }

    async registerUserSuccess(){
        await this.accessRegisterPage()
        var user = {
            name: faker.name.firstName(),
            email:  "teste" + faker.internet.email(),
            password: "123456",
            administrator: true
        }
        await this.registerUser(user)
    }
}
export default new RegisterUserPage();