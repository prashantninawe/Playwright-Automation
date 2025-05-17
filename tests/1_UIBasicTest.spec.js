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

test('Browser Context Playwright test', async ({browser})=>
{
// playwright code goes here

    // chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const password = page.locator("[type='password']");
    const signInButton = page.locator('#signInBtn');
    const errorBlock = page.locator("[style*='block']");
    const cardTitles = page.locator(".card-title a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log("Page title: " + await page.title());
    // css, xpath
    // await page.locator('input#username').type("learning"); deprecated
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signInButton.click();
    
    // await errorr block
    console.log("Error message: " + await errorBlock.textContent());
    await expect(errorBlock).toContainText("Incorrect username/password.");

    // clear textbox
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signInButton.click();
    
    console.log("Page title: " + await page.title());
    await expect(page).toHaveTitle("ProtoCommerce");

    console.log(await cardTitles.nth(0).textContent());
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.last().textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    
});