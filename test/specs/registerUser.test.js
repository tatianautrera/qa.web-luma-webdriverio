import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import RegisterUserPage from '../pageobjects/registerUser.page.js'
import faker from 'faker-br'
import allureReporter from '@wdio/allure-reporter'

describe('Cadastro de usuarios', () => {

    beforeEach(async()=>{
        await RegisterUserPage.accessRegisterPage()
    })
    it('should create a new user with success', async () => {       
        await RegisterUserPage.registerUser(faker.name.firstName(), faker.internet.email(), "123456")
        await expect($('button[data-testid="logout"]')).toBeDisplayed()
    })
})