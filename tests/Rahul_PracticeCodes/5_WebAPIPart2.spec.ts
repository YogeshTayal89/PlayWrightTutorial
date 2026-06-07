import { test, expect, Browser, Page, request } from '@playwright/test';

let logintoken:any;
let orderId :any;
const loginPayload = { userEmail: "email.yogesh@gmail.com", userPassword: "Oasis@360" }
const orderPayLoad = {orders:[{country:"Iceland",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}
test.beforeAll(async () => {
   const apiContext = await request.newContext();
   const loginresponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
      {
         data: loginPayload
      }
   );
   expect(loginresponse.ok()).toBeTruthy();
   const loginresposeJson = await loginresponse.json();
   logintoken = loginresposeJson.token;
   console.log(logintoken);

// create order
   const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{ 
      data : orderPayLoad,
      headers : {
         'authorization' : logintoken,
         'content-type' : 'application/json'

      }
   })
   const orderResponseJson =  await orderResponse.json();
   console.log(orderResponseJson);
   orderId = orderResponseJson.orders[0];



})


test('@Webst Client App login', async ({ page }) => {

   await page.addInitScript(value => {
      window.localStorage.setItem('token', value);
   }, logintoken);

   //js file- Login js, DashboardPage
   const email = "email.yogesh@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   // await page.locator("#userEmail").fill(email);
   // await page.locator("#userPassword").fill("Iamking@000");
   // await page.locator("[value='Login']").click();
   // await page.waitForLoadState('networkidle');
   // await page.locator(".card-body b").first().waitFor();
   // const titles = await page.locator(".card-body b").allTextContents();
   // console.log(titles);
   // const count = await products.count();
   // for (let i = 0; i < count; ++i) {
   //    if (await products.nth(i).locator("b").textContent() === productName) {
   //       //add to cart
   //       await products.nth(i).locator("text= Add To Cart").click();
   //       break;
   //    }
   // }

   // await page.locator("[routerlink*='cart']").click();
   // //await page.pause();

   // await page.locator("div li").first().waitFor();
   // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   // expect(bool).toBeTruthy();
   // await page.locator("text=Checkout").click();

   // await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   // const dropdown = page.locator(".ta-results");
   // await dropdown.waitFor();
   // const optionsCount = await dropdown.locator("button").count();
   // for (let i = 0; i < optionsCount; ++i) {
   //    const text = await dropdown.locator("button").nth(i).textContent();
   //    if (text === " India") {
   //       await dropdown.locator("button").nth(i).click();
   //       break;
   //    }
   // }

   // expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   // await page.locator(".action__submit").click();
   // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   // console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   console.log(orderIdDetails);
   
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});