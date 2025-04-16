import { expect } from '@wdio/globals'
import HomePage from '../pageobjects/home.page.js'
import RegisterUserPage from '../pageobjects/registerUser.page.js'
import faker from 'faker-br'
import allureReporter from '@wdio/allure-reporter'
import RegisterProductPage from '../pageobjects/registerProduct.page.js'
import LoginPage from '../pageobjects/login.page.js'
import data from '../data/productInvalidFields.json'

describe('Cadastro de usuarios', () => {
    var email = "teste" + faker.internet.email()
    before(async () => {
        await RegisterUserPage.accessRegisterPage()
        var user = {
            name: faker.name.firstName(),
            email: email,
            password: "123456",
            administrator: true
        }
        await RegisterUserPage.registerUser(user)
        await HomePage.accessRegisterProductPageByMenu()
    })

    describe('Dado que esteja acesando a tela de cadastro de produtos',()=>{
    beforeEach(async () => {
        await browser.url('/admin/cadastrarprodutos')
    })

    it('should create a new product with success', async () => {
        var product = {
            name: faker.commerce.product(),
            price: 10,
            description: "123456",
            amount: 1,
            image: "C:\\estudos\\qa.web-luma-webdriverio\\test\\data\\arcondicionado.webp"
        }

        await RegisterProductPage.registerProduct(product)
        await RegisterProductPage.assertPage('Lista dos Produtos')
    })

    it('should create a new product and consult register with success', async () => {
        var product = {
            name: faker.commerce.product(),
            price: 10,
            description: "123456",
            amount: 1,
            image: "C:\\estudos\\qa.web-luma-webdriverio\\test\\data\\arcondicionado.webp"
        }
        await RegisterProductPage.registerProduct(product)
        await RegisterProductPage.assertSearchProduct(product.name)
    })

    it('should error invalid fields', async () => {
        for (let i = 0; i < data.productInvalidFields.length; i++) {
            await RegisterProductPage.registerProduct(data.productInvalidFields[i])
            await RegisterProductPage.assertMessageError(data.productInvalidFields[i].message)
            await HomePage.accessRegisterProductPage()
        }
    })

    it('should error register product already name', async () => {
        var product = {
            name: faker.commerce.product(),
            price: 10,
            description: "123456",
            amount: 1,
            image: "C:\\estudos\\qa.web-luma-webdriverio\\test\\data\\arcondicionado.webp"
        }
            await RegisterProductPage.registerProduct(product)
            await HomePage.accessRegisterProductPage()
            await RegisterProductPage.registerProduct(product)
            await RegisterProductPage.assertMessageError("Já existe produto com esse nome")       
    })
})
})