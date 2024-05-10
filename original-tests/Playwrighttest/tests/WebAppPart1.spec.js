const { test, expect, request } = require('@playwright/test');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayLoad
    });

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    console.log("Login Response JSON:", loginResponseJson); // Debugging
    const token = loginResponseJson.token;
    if (!token) {
        throw new Error("Token not found in login response");
    }

    response = { token }; // Store the token for later use
});

test('@Webst Client App login', async ({ page }) => {
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';

    // Add token to localStorage
    if (!response.token) {
        throw new Error("Token is undefined. Ensure login API is working correctly.");
    }
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    // Add product to cart
    const products = page.locator(".card-body");
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const count = await products.count();
    console.log("Number of products:", count); // Debugging
    for (let i = 0; i < count; ++i) {
        const productText = await products.nth(i).locator("b").textContent();
        console.log("Product Text:", productText); // Debugging
        if (productText === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    // Proceed to checkout
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    // Select country
    await page.locator("[placeholder*='Country']").type("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    console.log("Number of dropdown options:", optionsCount); // Debugging
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        console.log("Dropdown Option:", text); // Debugging
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    // Verify user email
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    // Place order
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID:", orderId); // Debugging

    // Verify order in "My Orders"
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("Row Order ID:", rowOrderId); // Debugging
        if (orderId.trim().includes(rowOrderId.trim())) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    console.log("Order ID Details:", orderIdDetails); // Debugging
    expect(orderId.trim().includes(orderIdDetails.trim())).toBeTruthy();
});