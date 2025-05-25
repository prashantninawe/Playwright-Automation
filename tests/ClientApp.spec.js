const {test, expect } = require("@playwright/test");


test('Client App Login', async({page})=>
{
    const userName = page.locator('input#userEmail');
    const password = page.locator('input#userPassword');
    const signInButton = page.locator('[value="Login"]');
    
    const products = page.locator(".card-body");
    const cart = page.locator("[routerlink*='cart']");
    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log("Page title: " + await page.title());

    await userName.fill("firstlast@example.com");
    await password.fill("Passw0rd");
    await signInButton.click();
    
    await page.waitForLoadState('networkidle');
    await products.first().waitFor();

    // Zara coat 3
    const count = await products.count();
    console.log("Products Matched: " +count);

    for(let i = 0; i < count; i++){
        
        // add to cart
        if(await products.nth(i).locator("b").textContent() == productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await cart.click();
    await page.locator(".cart li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();


});