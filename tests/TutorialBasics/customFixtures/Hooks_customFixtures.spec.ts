import { test, expect } from '@playwright/test'

test.beforeAll(async () => {
    console.log("This is before all");

})

test.beforeEach('Login Setup', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('email.yogesh@gmail.com')
    await page.locator('#userPassword').fill('Oasis@360');
    await page.locator('#login').click();

    console.log("Login complete for beforeEach");


})

test.afterAll('TearDown flow', async () => {
    console.log("This is After all");
})

test.afterEach(async ({ page }) => {
    await page.getByText(' Sign Out ').click();
    console.log("Tear down complete for AfterEach");
})

test('Validate navigate to Order page', async ({ page }) => {
    
    await page.getByRole('button', { name: 'ORDERS' }).click();
    const ordertext = await page.getByText('Your Orders').textContent();
    console.log('Validation' + ordertext);

    await expect(ordertext).toBe('Your Orders');

})

test('Validate navigate to Cart page', async ({ page }) => {
    
    await page.getByRole('button', { name: 'Cart' }).nth(0).click();
    const carttext = await page.getByText('My Cart').textContent();
    console.log(carttext);

    await expect(carttext).toBe('My Cart');

})
