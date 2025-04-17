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

    searchProduct(name){
        return $(`//td[contains(., "${name}")]`)
    }
   
    async registerProduct(product) {
        const remoteFilePath = await browser.uploadFile(product.image);
        await this.inputName.setValue(product.name);
        await this.inputPrice.setValue(product.price);
        await this.inputDescription.setValue(product.description);
        await this.inputAmount.setValue(product.amount);
        await this.inputImage.setValue(remoteFilePath);

        await this.btnSubmit.click();
    }

    async assertSearchProduct(name){
        await expect(await this.searchProduct(name)).toBeDisplayed()
    }

    async assertNotFoundSearchProduct(name){
        await expect(await this.searchProduct(name)).not.toBeDisplayed()
    }
}

export default new RegisterProductPage();