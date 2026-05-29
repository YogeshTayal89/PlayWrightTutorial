import {test, expect} from '@playwright/test'

test('First Test', async ({page}) => {
   await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");
   await checkboxlink.click();
   const checkbox2 = await page.locator("//input[@type='checkbox']").nth(1);
   await checkbox2.uncheck();

   await expect(checkbox2).not.toBeChecked();
   console.log("Check box is unchecked")
    
})

// Second test case using TAGS
test('Second Test using Tags',{tag:'@smoke'} ,async ({page}) => {
   await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");
   await checkboxlink.click();
   const checkbox2 = await page.locator("//input[@type='checkbox']").nth(1);
   await checkbox2.uncheck();

   await expect(checkbox2).not.toBeChecked();
   console.log("Check box is unchecked")
    
})

// Third test case using ANNOTATIONS
test('Third test case using ANNOTATIONS',{annotation:{ type:'Defect', description :'Annotation test check'}} ,async ({page}) => {
   await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");
   await checkboxlink.click();
   const checkbox2 = await page.locator("//input[@type='checkbox']").nth(1);
   await checkbox2.uncheck();

   await expect(checkbox2).not.toBeChecked();
   console.log("Check box is unchecked")
    
})
