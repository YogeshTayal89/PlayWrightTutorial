import{test, browser, expect, Page} from '@playwright/test'

test('More Validation check on UI', async({page}) =>{

await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
//await page.pause();
 const hideOption = page.locator('.displayed-class');
 expect(hideOption).toBeVisible;
 await page.locator('#hide-textbox').click();
expect(hideOption).toBeHidden;
})

test('Pop Up handle', async({page})=>{
await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
//await page.pause();

 page.on('dialog', dialog=>dialog.accept());
 await page.locator('#confirmbtn').click();
 await page.locator('#mousehover').hover();

 const frameLoc =  page.frameLocator('#courses-iframe');
 frameLoc.locator('')

})