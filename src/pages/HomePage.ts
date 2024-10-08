import { expect, Page } from "@playwright/test";
import exp from "constants";
import BasePage from "./BasePage";

export default class HomePage extends BasePage {
    //Locators
    private readonly pageHeadingText = "SIMS Finance";
    private readonly newsMessageHeadingText = "News Messages";
    private readonly userMessageHeadingText = "User Messages";
    private readonly tasksHeadingText = "Tasks";
    private readonly hamburgerMenuBtnLocator = "#banner_navigation_navigate";
    private readonly recentHistorySearchInputLocator =
        "input[type='text']:visible";
    private readonly searchResult = ".ui-menu-item";
    private readonly profileMenuDropdown = "#esr_user_profile_menu";
    private readonly logoutLabel = "Click to Logout";
    private readonly dialogTitle = ".ui-dialog-title";
    private readonly dialogContent = "#control_span_esr_prompt";
    private readonly yesBtn = "#esr_messagebox_yes";
    private readonly noBtn = "#esr_messagebox_no";

    //Constructor

    //Actions

    async expectPageElementsVisibilityOnLoad() {
        //Page Heading
        const pageHeading = this.page.getByRole("heading", {
            name: this.pageHeadingText,
            exact: true
        });
        await expect(pageHeading).toBeVisible();

        //News message heading
        const newsMessageHeading = this.page.getByRole("heading", {
            name: this.newsMessageHeadingText,
            exact: true
        });
        expect(newsMessageHeading).toBeVisible();

        //User message heading
        const userMessageHeading = this.page.getByRole("heading", {
            name: this.userMessageHeadingText,
            exact: true
        });
        expect(userMessageHeading).toBeVisible();

        //Task heading
        const tasksHeading = this.page
            .locator("h3")
            .filter({ hasText: this.tasksHeadingText });
        expect(tasksHeading).toBeVisible();
    }
    async clickHamburgerMenuButton() {
        await this.page.locator(this.hamburgerMenuBtnLocator).click();
    }
    async fillSearchOptions(search: string) {
        await this.page
            .locator(this.recentHistorySearchInputLocator)
            .fill(search);
    }
    async clickSearchOptionInList(item: string) {
        await this.page
            .locator(this.searchResult + ":contains('" + item + "')")
            .click({ timeout: 3000 })
            .catch((error) => {
                console.error(`Error clicking search option in list: ${error}`);
                throw error;
            });
    }

    async clickProfileMenu() {
        await this.page
            .locator(this.profileMenuDropdown)
            .click({ timeout: 3000 })
            .catch((error) => {
                console.error(`Error clicking profile menu dropdown: ${error}`);
                throw error;
            });
    }
    async clickLogoutLabel() {
        await this.page
            .getByLabel(this.logoutLabel)
            .click({ timeout: 3000 })
            .catch((error) => {
                console.error(`Error clicking logout label: ${error}`);
                throw error;
            });
    }
    async logout() {
        await this.clickProfileMenu();
        await this.clickLogoutLabel();
    }
    async verifyDialogTitleAndContent(title: string, content: string) {
        await expect(
            this.page.locator(this.dialogTitle),
            "Check if dialog title is " + title
        ).toHaveText(title);
        await expect(
            this.page.locator(this.dialogContent),
            "Check if dialog content is " + content
        ).toHaveText(content);
    }
    async verifyVisibilityYesNoButton() {
        await expect(
            this.page.locator(this.yesBtn),
            "Expect yes button to be visible"
        ).toBeVisible();
        await expect(
            this.page.locator(this.noBtn),
            "Expect no button to be visible"
        ).toBeVisible();
    }
    async clickYesBtn() {
        await this.verifyVisibilityYesNoButton();
        await this.page
            .locator(this.yesBtn)
            .click({ timeout: 3000 })
            .catch((error) => {
                console.error(`Error clicking yes button: ${error}`);
                throw error;
            });
    }
}
