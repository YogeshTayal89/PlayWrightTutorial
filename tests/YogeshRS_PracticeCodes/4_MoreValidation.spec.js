import{test, browser, expect, Page} from '@playwright/test'

test('Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
    //locator(css)
 
});


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