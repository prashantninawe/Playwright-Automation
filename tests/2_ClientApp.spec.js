// import { test, expect } from '@playwright/test'
const {test, expect} = require('@playwright/test')

test('Browser Context Playwright test', async ({page})=>
{
// playwright code goes here

    // chrome - plugins/cookies
    // const context = await browser.newContext();
    // const page = await context.newPage();

    const userName = page.locator('input#userEmail');
    const password = page.locator('input#userPassword');
    const signInButton = page.locator('[value="Login"]');
    const cardTitles = page.locator(".card-body b");

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log("Page title: " + await page.title());

    await userName.fill("firstlast@example.com");
    await password.fill("Passw0rd");
    await signInButton.click();
    
    // await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    
});