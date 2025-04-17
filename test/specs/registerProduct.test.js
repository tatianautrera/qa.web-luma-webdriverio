import { expect } from '@wdio/globals'
import HomePage from '../pageobjects/home.page.js'
import RegisterUserPage from '../pageobjects/registerUser.page.js'
import faker from 'faker-br'
import allureReporter from '@wdio/allure-reporter'
import RegisterProductPage from '../pageobjects/registerProduct.page.js'
import LoginPage from '../pageobjects/login.page.js'
import data from '../data/productInvalidFields.json'
const path = require('path');
const filePath = path.resolve(__dirname, '../data/arcondicionado.webp');

describe('Register product', () => {
    before(async () => {
        await RegisterUserPage.registerUserSuccess()
        await HomePage.accessRegisterProductPageByMenu()
    })

    describe('Given i access the page register products',()=>{
    beforeEach(async () => {
        await browser.url('/admin/cadastrarprodutos')
    })

    it('When i create a new product, Then should create a new product with success', async () => {
        var product = {
            name: faker.commerce.product(),
            price: 10,
            description: "123456",
            amount: 1,
            image: filePath
        }

        await RegisterProductPage.registerProduct(product)
        await RegisterProductPage.assertTex(RegisterProductPage.titlePage,'Lista dos Produtos')
    })

    it('When i create a new product, Then should create a new product and consult register with success', async () => {
        var product = {
            name: faker.commerce.product(),
            price: 10,
            description: "123456",
            amount: 1,
            image: filePath
        }
        await RegisterProductPage.registerProduct(product)
        await RegisterProductPage.assertSearchProduct(product.name)
    })

    it('Give i fill invalid dates, then should error invalid fields', async () => {
        for (let i = 0; i < data.productInvalidFields.length; i++) {
            data.productInvalidFields[i].image = filePath
            await RegisterProductPage.registerProduct(data.productInvalidFields[i])
            await RegisterProductPage.assertTex(RegisterProductPage.messageError, data.productInvalidFields[i].message)
            await HomePage.accessRegisterProductPage()
        }
    })

    it('Give i fill already product name, then should error message', async () => {
        var product = {
            name: faker.commerce.product(),
            price: 10,
            description: "123456",
            amount: 1,
            image: filePath
        }
            await RegisterProductPage.registerProduct(product)
            await HomePage.accessRegisterProductPage()
            await RegisterProductPage.registerProduct(product)
            await RegisterProductPage.assertTex(RegisterProductPage.messageError,"Já existe produto com esse nome")       
    })
})
})