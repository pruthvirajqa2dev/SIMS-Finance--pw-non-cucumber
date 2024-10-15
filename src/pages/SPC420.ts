import { expect, Page } from "@playwright/test";
import HomePage from "./HomePage";
import BasePage from "./BasePage";
/**
 * @author: @pruthvirajqa2dev
 * This page class is for SPC420 screen related page elements and actions on them
 */
export default class SPC420 extends BasePage {
    //Locators and Texts
    private readonly pageHeadingText = "SPC420 - File Manager";
    private readonly serverDirectoriesText = "Server Directories";
    private readonly packageDetailsText = "Package Details";
    private readonly direcotoryDetailsText = "Directory Details";
    private readonly spc420TreeItemWithDynTextLocator = '.esr_tree>>text="%"';
    private readonly spc420SubTreeItemWithDynTextLocator =
        '.esr_tree_open>>text="%"';
    private readonly downArrowLocator =
        '.fa-angle-down[data-control_type="TREE_IMAGE"]';
    private readonly pkgDirLocator = '[data-alias="PACKAGE_DIR"]';
    private readonly directoryADMText = "ADM - Administration";
    private readonly subDirectoryLOGSText = "LOGS";

    //Constructor
    //Actions
    /**
     * @author: @pruthvirajqa2dev
     * This methods verifies key page elements are visible after loading
     */
    async expectPageElementsVisibilityOnLoad() {
        //Page Heading
        await this.isHeadingVisibleByText(this.pageHeadingText);
        //Server Directories heading
        await this.isHeadingVisibleByText(this.serverDirectoriesText);
        //Package details heading
        await this.isHeadingVisibleByText(this.packageDetailsText);
    }
    /**
     * @author: @pruthvirajqa2dev
     * This function clicks the subdirectory in the given directory, if it is already open.
     * Else it double clicks the directory and then clicks the subdirectory on screen spc420
     * @param dir
     * @param subdir
     */
    async clickSubDirectoryInDirectory(dir: string, subdir: string) {
        if (await this.page.locator(this.downArrowLocator).isVisible()) {
            const dirLocator = await this.page.locator(
                this.spc420TreeItemWithDynTextLocator.replace("%", dir)
            );
            await expect(dirLocator).toBeVisible();
        } else {
            await this.page
                .locator(
                    this.spc420TreeItemWithDynTextLocator.replace("%", dir)
                )
                .dblclick();
            const dirLocator = await this.page.locator(
                this.spc420TreeItemWithDynTextLocator.replace("%", dir)
            );
            await expect(dirLocator).toBeVisible();
        }
        const subDirLocator = await this.page.locator(
            this.spc420SubTreeItemWithDynTextLocator.replace("%", subdir)
        );
        await expect(subDirLocator).toBeVisible;
        await subDirLocator.click();
    }
    /**
     *
     */
    async verifySubDirectoryOpened(dir: string, subdir: string) {
        //Sub Directory Heading
        await this.isHeadingVisibleByText(this.direcotoryDetailsText);
        const pkgDirLocator = this.page.locator(this.pkgDirLocator);
        const packageName = dir.split(" ")[0] + "_" + subdir;
        expect(pkgDirLocator).toContainText(packageName);
        // await expect(this.page.locator(this.pkgDirLocator)).toHaveText();
        // await this.page.locator(this.pkgDirLocator).textContent
    }
}
