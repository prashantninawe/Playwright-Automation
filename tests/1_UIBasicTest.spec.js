// import { test, expect } from '@playwright/test'
const {test, expect} = require('@playwright/test')

test('Page Playwright test', async ({page})=>
{
// playwright code goes here

    await page.goto("https://google.com/");
    // get title - assertion
    console.log("Page title: " + await page.title());
    await expect(page).toHaveTitle("Google");
});

test.only('Browser Context Playwright test', async ({browser})=>
{
// playwright code goes here

    // chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log("Page title: " + await page.title());
    // css, xpath
    // await page.locator('input#username').type("learning"); deprecated
    await page.locator('input#username').fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator('#signInBtn').click();
    const errorBlock = await page.locator("[style*='block']");
    console.log("Error message: " + await errorBlock.textContent());
    await expect(errorBlock).toContainText("Incorrect username/password.");
});