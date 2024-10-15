import { expect, Page } from "@playwright/test";
/**
 * @author: @pruthvirajqa2dev
 * Base page class to inherit basic page functionality
 */
export default class BasePage {
    //Constructor
    constructor(public page: Page) {}

    //Actions
    async navigateToPage(resource: string) {
        await this.page.goto(resource);
    }
    async verifyURL(url: string) {
        await expect(this.page.url()).toBe(url);
    }

    async getElementByText(text: string) {
        return await this.page.getByText(text);
    }
    async isHeadingVisibleByText(headingText: string) {
        if (
            await this.page
                .getByRole("heading", {
                    name: headingText,
                    exact: true
                })
                .isVisible()
        ) {
            return true;
        } else {
            return false;
        }
    }
}
