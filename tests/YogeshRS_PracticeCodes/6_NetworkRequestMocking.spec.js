import { page, test } from "@playwright/test";

test('Security Testing', async ({ page }) => {

    const uName = page.locator("#userEmail");
    const pass = page.locator('#userPassword');
    const login = page.locator("#login");
    await page.goto("https://rahulshettyacademy.com/client");
    await uName.fill('email.yogesh@gmail.com');
    await pass.fill('Oasis@360');
    await login.click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue(
            {
                url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=yogeshTayal"
            }
        )
    )
 //await page.pause();
    await page.locator('button:has-text(\'View\')').first().click();



})