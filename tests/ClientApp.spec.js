const {test, expect } = require("@playwright/test");
const { text } = require("stream/consumers");


test('Client App Login', async({page})=>
{
    const email = "firstlast@example.com";

    const userName = page.locator('input#userEmail');
    const password = page.locator('input#userPassword');
    const signInButton = page.locator('[value="Login"]');
    
    const products = page.locator(".card-body");
    const cart = page.locator("[routerlink*='cart']");
    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log("Page title: " + await page.title());

    console.log("Enter email: " + email);
    await userName.fill(email);
    console.log("Enter password");
    await password.fill("Passw0rd");
    console.log("Click Sign In");
    await signInButton.click();
    
    // await page.waitForLoadState('networkidle');
    await products.first().waitFor();

    // Zara coat 3
    const count = await products.count();
    // console.log("Products Matched: " + count);

    console.log("Add to cart: " + productName);
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
    console.log(productName + " in cart");
    console.log("Checkout cart");
    await page.locator("text=Checkout").click();

    const cc_info = await page.locator("div.payment div.form__cc div.field input.input.txt");
    // enter cvv
    console.log("Enter CVV");
    await cc_info.nth(1).fill("123");
    // name on card
    console.log("Enter Name");
    await cc_info.nth(2).fill("First Name");

    // enter country
    console.log("Enter Country");
    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();

    for(let i = 0; i < optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent()
        if(text.trim() === 'India'){
            //click India
            await dropdown.locator("button").nth(i).click();
            console.log("Entered " + text)
            break;
        }
    }
    
    // assertions
    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
    
    // place order
    console.log("Place order");
    await page.locator(".action__submit").click();

    // thank you text
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    console.log("Order placed");

    // get order id
    const orderId = await page.locator(".em-spacer-1 label.ng-star-inserted").textContent();
    console.log("Order id: " + orderId);


});