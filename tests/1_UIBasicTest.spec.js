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

test('UI Controls', async ({browser})=>
{   
    const context = await browser.newContext();
    const page = await context.newPage();

    const url="https://rahulshettyacademy.com/loginpagePractise/";
    await page.goto(url);

    const userName = page.locator('input#username');
    const password = page.locator("[type='password']");
    const userDropdown = page.locator("select.form-control");
    const signInButton = page.locator('#signInBtn');

    // radio button
    // const userRadioBtn = page.locator("span.checkmark").nth(1);
    const userRadioBtn = page.locator("xpath=//input[@value='user']//following::span[@class='checkmark']");
    const popUpAccept = page.locator("#okayBtn");
    const termsCheck = page.locator("#terms");
    const docLink = page.locator("[href*='documents']");

    // dropdown
    await userDropdown.selectOption("consult");
    await userRadioBtn.click();
    
    // await page.pause();

    await popUpAccept.click();
    await expect(userRadioBtn).toBeChecked();
    console.log(await userRadioBtn.isChecked());

    // checkbox
    await termsCheck.click();
    await expect(termsCheck).toBeChecked();
    await termsCheck.uncheck();
    expect(await termsCheck.isChecked()).toBeFalsy();

    // blinking test
    await expect(docLink).toHaveAttribute("class", "blinkingText");
    
});

test('Child window handle', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const url="https://rahulshettyacademy.com/loginpagePractise/";
    const userName = page.locator('input#username');
    const docLink = page.locator("[href*='documents']");

    await page.goto(url);
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // listen for new page pending, rejected, fulfilled
        docLink.click()
    ]); // new page open

    const redText = await newPage.locator(".red").textContent();
    const arrayText = redText.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log("domain: " + domain);

    await userName.fill(domain);
    // await page.pause();
    console.log("username: " + await userName.inputValue());


});