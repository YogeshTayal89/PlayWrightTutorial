import {browser,test, playwright, expect} from '@playwright/test';


test('First Test', async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://www.google.com")
    const title = await page.title();
    console.log("Title of page is : " + title);
   await  expect(page).toHaveTitle("Google");

})

test('Second Test using Page for capturing incorrect username', async({page})=>{
const uname = page.locator('#username');
const pwd = page.locator('#password');
const sumbit = page.locator('[name="signin"]');
const texterror = page.locator("[style*='block']");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log("Title of page is : "+await page.title());
await uname.fill("Yogesh Tayal");
await pwd.fill("password");
await sumbit.click();
console.log("Error Message : "+ await texterror.textContent());
await expect(texterror).toHaveText('Incorrect username/password.');
})

test('Login successfully and grab first product', async({page})=>{

const uname = page.locator('#username');
const pwd = page.locator('#password');
const sumbit = page.locator('[name="signin"]');
const cardTitle = page.locator('.card-body a');

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

await uname.fill("rahulshettyacademy");
await pwd.fill("Learning@830$3mK2");
await sumbit.click();

console.log("Name of first product is "+ await cardTitle.first().textContent())
console.log("List of products :", await cardTitle.allTextContents());

})

test('Login new App successfully and grab first product', async({page})=>{

 await page.goto("https://rahulshettyacademy.com/client/");

    const uName = page.locator("#userEmail");
    const pass = page.locator('#userPassword');
    const login = page.locator("#login");
    const cardTitles = page.locator(".card-body b");
    const productName = "ZARA COAT 3";

    await uName.fill('email.yogesh@gmail.com');
    await pass.fill('Oasis@360');
    await login.click();

await page.waitForLoadState('networkidle');
//console.log("Name of first product is "+ await cardTitles.first().textContent())
console.log("List of products :", await cardTitles.allTextContents());

})

test('drop down test', async({page})=>{

const uname = page.locator('#username');
const pwd = page.locator('#password');
const dropdown =  page.locator('select.form-control');
const sumbit = page.locator('[name="signin"]');


await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

await uname.fill("rahulshettyacademy");
await pwd.fill("Learning@830$3mK2");
await dropdown.selectOption('Teacher');
await sumbit.click();


})

