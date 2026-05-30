import { test, expect } from '@playwright/test'
//Browser: When we want to launch multiple context. Multi user
test('BrowserFixture for multi browsers', async ({ browser }) => {

    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto('https://www.facebook.com')
    console.log("Browser 1 - Facebook open")

    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto('https://www.google.com')
     console.log("Browser 2 - Google open")

})