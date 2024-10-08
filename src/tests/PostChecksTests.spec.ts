import test from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

test("Postcheck # 1 and #2: Login and Logout", async ({ page }) => {
    const loginPage = new LoginPage(page);
    //Login using username and password
    const username = "FINDIR99D130";
    const password = "SIMSFinance2018#";
    const homepage = await loginPage.login(username, password);
    //Logout
    await homepage.expectPageElementsVisibilityOnLoad();
    await homepage.logout();

    const expectedDialogTitle = "Logout?";
    const expectedDialogContent = "'Logout' Are you sure?";
    await homepage.verifyDialogTitleAndContent(
        expectedDialogTitle,
        expectedDialogContent
    );
    await homepage.clickYesBtn();
    const expectedURLAfterLogout =
        "https://uat-v2.pecuniam-online.co.uk/auth/esr.elogin?cmd=0";
    await homepage.verifyURL(expectedURLAfterLogout);
});
