import { Page } from "@playwright/test";
import HomePage from "./HomePage";
import BasePage from "./BasePage";
/**
 * @author: @pruthvirajqa2dev
 * SIMS Finance Login page class with locators
 */
export default class LoginPage extends BasePage {
    //Locators
    private readonly usernameInputLocator = ".username";
    private readonly passwordInputLocator = ".password";
    private readonly loginBtnLocator = ".go_button";

    //Constructor

    //Actions

    async fillUsernameAndPassword(username: string, password: string) {
        await this.page.locator(this.usernameInputLocator).fill(username);
        await this.page.locator(this.passwordInputLocator).fill(password);
    }
    async login(username: string, password: string) {
        await this.navigateToPage("/");
        await this.fillUsernameAndPassword(username, password);
        const homepage: HomePage = await this.clickLoginBtn();
        return homepage;
    }
    async clickLoginBtn() {
        await this.page
            .locator(this.loginBtnLocator)
            .click()
            .catch((error) => {
                console.error(`Error clicking login button: ${error}`);
                throw error;
            });

        const homePage = new HomePage(this.page);
        return homePage;
    }
}
