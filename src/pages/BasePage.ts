import { expect, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
/**
 * @author: @pruthvirajqa2dev
 * Base page class to inherit basic page functionality
 */
export default class BasePage {
    //Constructor
    constructor(public page: Page) {}
    //Locators
    private readonly dialogTitle = ".ui-dialog-title";
    private readonly dialogContent = "#control_span_esr_prompt";
    public readonly testFileDir = "./Test Files/";
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
    /**
     * This function verifies if the title is as expected
     * @param expectedTitle
     *
     */
    async verifyDialogTitle(expectedTitle: string) {
        await expect(
            this.page.locator(this.dialogTitle),
            "Check if dialog title is " + expectedTitle
        ).toHaveText(expectedTitle);
    }
    /**
     * This function verifies the dialog content
     * @param expectedContent
     */
    async verifyDialogContent(expectedContent) {
        await expect(
            this.page.locator(this.dialogContent),
            "Check if dialog content is " + expectedContent
        ).toHaveText(expectedContent);
    }
    /**
     * This function writes a file to file system with default content
     * @param ext
     * @returns Promise
     */
    async fsWriteFile(ext: string) {
        return new Promise((resolve) => {
            fs.writeFile(
                "./Test Files/test" + Date.now() + ext,
                "SIMS Finance Test File Content " + Date.now(),
                function (err) {
                    if (err) {
                        resolve(null);
                    }
                }
            );
            resolve("File created");
        });
    }
    /**
     * This function returns the latest file name from provided directory
     * @param dirPath
     * @returns
     */
    getNewestFileNameInDir(dirPath: string): string | null {
        const files = fs.readdirSync(dirPath);

        if (files.length === 0) {
            console.log("No files in the directory");
            return null;
        }

        const latestFile = files
            .map((fileName) => ({
                name: fileName,
                time: fs.statSync(path.join(dirPath, fileName)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)[0];

        return latestFile ? latestFile.name : null;
    }
    /**
     * This function wraps the function to find the element using role
     * @param name
     */
    async clickButtonUsingRole(name: string) {
        await this.page
            .getByRole("button", {
                name: name,
                exact: true
            })
            .click();
    }
}
