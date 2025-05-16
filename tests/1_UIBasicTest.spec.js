// import { test, expect } from '@playwright/test'
const {test} = require('@playwright/test')

test('Page Playwright test', async ({page})=>
{
// playwright code goes here

    await page.goto("https://google.com/");
    
});

test.only('Browser Context Playwright test', async ({browser})=>
{
// playwright code goes here

    // chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
});