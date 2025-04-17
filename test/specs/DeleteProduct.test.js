import { expect } from '@wdio/globals'
import HomePage from '../pageobjects/home.page.js'
import RegisterUserPage from '../pageobjects/registerUser.page.js'
import faker from 'faker-br'
import allureReporter from '@wdio/allure-reporter'
import RegisterProductPage from '../pageobjects/registerProduct.page.js'
import DeleteProductPage from '../pageobjects/deleteProduct.page.js'

describe('Delete Product', () => {
    describe('Give i have a product', () => {
        let product
        before(async () => {
            await RegisterUserPage.registerUserSuccess()
            await HomePage.accessRegisterProductPageByMenu()
            product = {
                name: "teste" + faker.commerce.product(),
                price: 10,
                description: "123456",
                amount: 1,
                image: "C:\\estudos\\qa.web-luma-webdriverio\\test\\data\\arcondicionado.webp"
            }
            await RegisterProductPage.registerProduct(product)

        })
        it.skip('When i delete a product, then the product should be deleted', async () => {
            console.log("produto nome", product.name)
            await browser.url('/admin/listarprodutos')
            await DeleteProductPage.deleteProduct(product.name)
            await browser.url('/admin/listarprodutos')
            await RegisterProductPage.assertNotFoundSearchProduct(product.name)
        })
    })
})