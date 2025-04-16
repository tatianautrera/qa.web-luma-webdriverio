import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import HomePage from '../pageobjects/home.page.js'
import faker from 'faker-br'
import allureReporter from '@wdio/allure-reporter'
import data from '../data/loginInvalidFields.json'
import RegisterUserPage from '../pageobjects/registerUser.page.js'

describe('Login', () => {
    beforeEach(async () => {
        await LoginPage.open()
    })

    it('should login with success', async () => {
        var user = {
            name: faker.name.firstName(),
            email: "teste" + faker.internet.email(),
            password: "123456",
            administrator: false
        } 
        await LoginPage.loginAndCreateUser(user)
        await expect(HomePage.btnLogout).toBeDisplayed()
        await expect(HomePage.linkReport).not.toBeDisplayed()
    })


    it('should login administrator with success', async () => {
        var user = {
            name: faker.name.firstName(),
            email: "teste" + faker.internet.email(),
            password: "123456",
            administrator: true
        }
        await LoginPage.loginAndCreateUser(user)
        await expect(HomePage.btnLogout).toBeDisplayed()
        await expect(HomePage.linkReport).toBeDisplayed()
        await expect(HomePage.txtUserName).toHaveText(expect.stringContaining(user.name))
    })

    it('should return error when try login invalid fields fields', async () => {
        for (let i = 0; i < data.loginInvalidFields.length; i++) {
            await LoginPage.login(data.loginInvalidFields[i])
            await expect(LoginPage.messageError).toHaveText(data.loginInvalidFields[i].message)
            await LoginPage.open()
        }
    })

    it('should access register page sucess', async () => {
        await RegisterUserPage.accessRegisterPage()
        await expect(LoginPage.titlePage).toHaveText('Cadastro')
    })

    it('should return error try login with incorrect password', async () => {
        var user = {
            name: faker.name.firstName(),
            email: "teste" + faker.internet.email(),
            password: "123456",
            administrator: true
        }
        await RegisterUserPage.accessRegisterPage()
        await RegisterUserPage.registerUser(user)
        user.password = "1234567"
        await LoginPage.open()
        await LoginPage.login(user)
        await expect(LoginPage.messageError).toHaveText("Email e/ou senha inválidos")
    })
})