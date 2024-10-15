import test from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ENV from "../config/env";
import expectedTexts from "../data/expectedTexts.json";
import SPC420 from "../pages/SPC420";

async function login(page) {
    const loginPage = new LoginPage(page);
    // await page.setViewportSize({ width: 1266, height: 586 });
    //Login using username and password
    const homepage: HomePage = await loginPage.login(
        ENV.USERID!,
        ENV.PASSWORD!
    );
    return homepage;
}
test.describe("Postchecks", () => {
    test("Postcheck # 1 and #2: Login and Logout", async ({ page }) => {
        test.info().annotations.push({
            type: "Login and Logout",
            description:
                "This test is for performing login to SIMS Finance and then for user " +
                ENV.USERID!
        });
        // let homepage;
        //Login

        const homepage =
            await test.step(`Login using ${ENV.USERID!}`, async () => {
                return await login(page);
            });

        //Logout
        await test.step(`Expect home page elements visible on Load`, async () => {
            await homepage.expectPageElementsVisibilityOnLoad();
        });

        await homepage.logout();
        //Assertions
        const expectedDialogTitle = expectedTexts.expectedLogoutDialogTitle;
        const expectedDialogContent = expectedTexts.expectedLogoutDialogContent;
        await homepage.verifyDialogTitleAndContent(
            expectedDialogTitle,
            expectedDialogContent
        );
        await homepage.clickYesBtn();
        await homepage.verifyURL(ENV.LOGOUT_URL!);
    });
    test("Postcheck #2: File upload using SPC420", async ({ page }) => {
        const homepage: HomePage = await login(page);
        const screen = expectedTexts.SPC420;

        await homepage.clickHamburgerMenuButton();
        await homepage.fillSearchOptions(screen);
        await homepage.clickSearchOptionInList();
        const spc420 = new SPC420(page);
        const directory = "ADM - Administration";
        const subDirectory = "LOGS";
        await spc420.clickSubDirectoryInDirectory(directory, subDirectory);

        await spc420.verifySubDirectoryOpened(directory, subDirectory);

        // await spc420.clickTreeItem();

        // page.waitForTimeout(10000);
    });
});
