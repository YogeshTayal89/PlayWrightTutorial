import { test, expect } from '@playwright/test'

test('Context Fixture ', async ({ context }) => {
    const page1 = await context.newPage();
    await page1.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page1.locator('#userEmail').fill('email.yogesh@gmail.com')
    await page1.locator('#userPassword').fill('Oasis@360');
    await page1.locator('#login').click();

    const page2 = await context.newPage();
    await page2.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page2.getByText(' Sign Out ').click();


})
