import { $ } from '@wdio/globals'
import Page from './basePage.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnLogout () {
        return $('button[data-testid="logout"]');
    }

    get linkReport () {
        return $('a[data-testid="link-relatorios"]');
    }

    get messageError () {
        return $('.alert-dismissible span:nth-child(2)');
    }

}

export default new HomePage();
