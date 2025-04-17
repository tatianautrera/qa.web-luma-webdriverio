import { $ } from '@wdio/globals'
import Page from './basePage.js';
import LoginPage from './login.page.js';
import HomePage from './home.page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterProductPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputName() {
        return $('input[data-testid="nome"]');
    }

    get inputPrice() {
        return $('input[data-testid="preco"]');
    }

    get inputDescription() {
        return $('textarea[data-testid="descricao"]');
    }

    get inputAmount() {
        return $('input[data-testid="quantity"]');
    }

    get inputImage() {
        return $('input[data-testid="imagem"]');
    }

    get btnSubmit() {
        return $('button[data-testid="cadastarProdutos"]');
    }

    get titlePage(){
        return $('h1')
    }

    get messageError(){
        return $('.alert-secondary span:nth-child(2)')
    }

    async deleteProduct(name){
        await $(`//td[contains(., "${name}")]/..//button[contains(@class,"btn-danger")]`).click()
    }
}
export default new RegisterProductPage();