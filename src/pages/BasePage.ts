import { expect, Page } from "@playwright/test";

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
}
