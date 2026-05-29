import {test, expect} from '@playwright/test'

// Local Grouping -  USE TEST.DESCRIBE and tags and annotations

test.describe('Grouping with tags', {tag:'@GroupTags'}, ()=>{     

test('Validate the first checkbox', {tag:'@Smoke'}, async ({page}) => {
   await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");
   await checkboxlink.click();
   const checkbox1 = await page.locator("//input[@type='checkbox']").nth(0);
   await checkbox1.check();
   await expect(checkbox1).toBeChecked();
   console.log("Check box 1  is checked")
    
})


test('Validate the second checkbox', {tag:'@Regression'}, async ({page}) => {
   await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");
   await checkboxlink.click();
   const checkbox2 = await page.locator("//input[@type='checkbox']").nth(1);
   await checkbox2.uncheck();

   await expect(checkbox2).not.toBeChecked();
   console.log("Check box2 is unchecked")
    
})

// Third test case using ANNOTATIONS
test('Third test case using ANNOTATIONS',{annotation:{ type:'Defect', description :'Annotation test check'}} ,async ({page}) => {
   await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");
   await checkboxlink.click();
   const checkbox2 = await page.locator("//input[@type='checkbox']").nth(1);
   await checkbox2.uncheck();

   await expect(checkbox2).not.toBeChecked();
   console.log("Third test case using ANNOTATIONS")
    
})

})


// To run -   npx playwright test -g "@GroupTags"    