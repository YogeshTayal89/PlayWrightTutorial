import {browser,test, playwright, expect} from '@playwright/test';


test('Handle Child window tabs', async({browser})=>{
 const context = await browser.newContext();
const page = await context.newPage();


await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const blink = page.locator("[href*= 'document']");


})


