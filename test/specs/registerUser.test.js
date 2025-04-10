import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import HomePage from '../pageobjects/home.page.js'
import RegisterUserPage from '../pageobjects/registerUser.page.js'
import faker from 'faker-br'
import allureReporter from '@wdio/allure-reporter'
import users from '../data/createUser.json'
import registerUserPage from '../pageobjects/registerUser.page.js'

describe('Cadastro de usuarios', () => {

    beforeEach(async () => {
        await RegisterUserPage.accessRegisterPage()
    })
    it('should create a new user with success', async () => {
        var user = {
            name: faker.name.firstName(),
            email: "teste" + faker.internet.email(),
            password: "123456",
            administrator: false
        }
        await RegisterUserPage.registerUser(user)
        await expect(HomePage.btnLogout).toBeDisplayed()
        await expect(HomePage.linkReport).toBeDisabled
    })

    it('should create a new administrator user with success', async () => {
        var user = {
            name: faker.name.firstName(),
            email: "teste" + faker.internet.email(),
            password: "123456",
            administrator: true
        }
        await RegisterUserPage.registerUser(user)
        await expect(HomePage.btnLogout).toBeDisplayed()
        await expect(HomePage.linkReport).toBeDisplayed()
    })

    it('should return erro without required fields', async () => {
        for (let i = 0; i < users.InputWithOutFields.length; i++) {
            await RegisterUserPage.registerUser(users.InputWithOutFields[i])
            await expect(HomePage.messageError).toHaveText(users.InputWithOutFields[i].message)
            await RegisterUserPage.accessRegisterPage()
        }
    })

    it('should return erro invalid email', async () => {
        var user = {
            name: faker.name.firstName(),
            email: "teste",
            password: "123456",
            administrator: true
        }
        await RegisterUserPage.registerUser(user)
         const validationMessage = await browser.execute((el) => el.validationMessage, await registerUserPage.inputEmail)
        expect(validationMessage).toContain('Inclua um "@" no endereço de e-mail.')
    })
})