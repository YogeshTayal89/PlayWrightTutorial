import { test, expect } from '@playwright/test';

test('Capture email from child window and enter in parent page', async ({ page, context }) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const blink = page.locator("[href*='document']");

    // Open child page
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blink.click()
    ]);

    await newPage.waitForLoadState();

    // Capture text from child page
    const text = await newPage.locator('.red').textContent();

    console.log('Full Text:', text);

    // Extract email
    const email = text?.split('at ')[1].split(' with')[0];

    console.log('Extracted Email:', email);

    // Fill email in parent page
    await page.locator('#username').fill(email);
    console.log('Email Entered:' , await page.locator('#username').inputValue());
    

});


// for input value - use .inoutValue method rather that textcontent
//textContent -  will only fetch the text if it is attached to DOM