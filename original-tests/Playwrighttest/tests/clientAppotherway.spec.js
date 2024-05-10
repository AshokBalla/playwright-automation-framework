const { test, expect } = require('@playwright/test');

test('@Webst Client App login', async ({ page }) => {
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   await page.goto("https://rahulshettyacademy.com/client");

   // Login
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button', { name: "Login" }).click();
   await page.waitForLoadState('networkidle');

   // Wait for products to load
   await page.locator(".card-body b").first().waitFor();

   // Add product to cart
   await page.locator(".card-body").filter({ hasText: productName })
       .getByRole("button", { name: "Add to Cart" }).click();

   // Open cart and verify product
   await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText(productName)).toBeVisible();

   // Checkout
   await page.getByRole("button", { name: "Checkout" }).click();
   await page.getByPlaceholder("Select Country").type("ind");

   // Select country
   const countryOption = await page.getByRole("button", { name: "India" }).nth(1);
   if (await countryOption.isVisible()) {
       await countryOption.click();
   } else {
       throw new Error("Country option not found or not visible");
   }

   // Place order
   await page.getByText("PLACE ORDER").click();

   // Verify order confirmation
   await page.getByText("Thankyou for the order.").waitFor();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});