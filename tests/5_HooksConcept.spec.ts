//Hooks are used to set up and tear down 
// Before all, before each, after all, after each
// Hooks can be definded at Test file level and Group level
// Before all -  Runs before all tc, once per worker
// Before each -  Runs before every tc of test file
// After all -  Runs After all tc, once per worker
// After each  -  Runs after every tc of test file

import {test, expect} from '@playwright/test'

test.beforeAll('Setup', ()=>{
console.log('I am in Before All')

})

test.beforeEach('Launch Application',async({page})=>{
    console.log('I am in Before Each')
 await page.goto ('https://the-internet.herokuapp.com/');


})

test.afterAll('Setup', ()=>{
console.log('I am in After All')

})

test.afterEach('Launch Application',async({page})=>{
console.log('I am in After Each')

})

test('Validate the checkbox visiblity on main page', async ({page}) => {
  // await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");

   await expect(checkboxlink).toBeVisible();
   console.log("Checkbox visiblity")
    
})

test('Validate the first checkbox', async ({page}) => {
  // await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");
   await checkboxlink.click();
   const checkbox1 = await page.locator("//input[@type='checkbox']").nth(0);
   await checkbox1.check();
   await expect(checkbox1).toBeChecked();
   console.log("Check box 1  is checked")
    
})

test('Validate the second checkbox', async ({page}) => {
  // await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");
   await checkboxlink.click();
   const checkbox2 = await page.locator("//input[@type='checkbox']").nth(1);
   await checkbox2.uncheck();

   await expect(checkbox2).not.toBeChecked();
   console.log("Check box2 is unchecked")
    
})


// When runs on 1 workers-  BeforeAll and After ALl runs once per worker

// Running 3 tests using 1 worker
// [chromium] › tests\5_HooksConcept.spec.ts:33:5 › Validate the checkbox visiblity on main page
// I am in Before All
// I am in Before Each
// Checkbox visiblity
// I am in After Each
// [chromium] › tests\5_HooksConcept.spec.ts:42:5 › Validate the first checkbox
// I am in Before Each
// Check box 1  is checked
// I am in After Each
// [chromium] › tests\5_HooksConcept.spec.ts:53:5 › Validate the second checkbox
// I am in Before Each
// Check box2 is unchecked
// I am in After Each
// I am in After All
//   3 passed (22.7s)


// When runs on 3 (undefined) workers-  BeforeAll and After ALl runs once per test file

// Running 3 tests using 2 workers
// [chromium] › tests\5_HooksConcept.spec.ts:33:5 › Validate the checkbox visiblity on main page
// I am in Before All
// I am in Before Each
// Checkbox visiblity
// I am in After Each
// [chromium] › tests\5_HooksConcept.spec.ts:53:5 › Validate the second checkbox
// I am in Before All
// I am in Before Each
// Check box2 is unchecked
// I am in After Each
// I am in After All
// [chromium] › tests\5_HooksConcept.spec.ts:42:5 › Validate the first checkbox
// I am in Before All
// I am in Before Each
// Check box 1  is checked
// I am in After Each
// I am in After All
