import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`${path}`)
    }

    async assertTex(selector, message){
        await expect(selector).toHaveText(message)
    }

    async assertContainsText(selector, message){
         await expect(selector).toHaveText(expect.stringContaining(message))
    }

    async assertToBeDisplayed(selector){
        await expect(selector).toBeDisplayed()
    }

    async assertNotToBeDisplayed(selector){
        await expect(selector).not.toBeDisplayed()
    }
}
