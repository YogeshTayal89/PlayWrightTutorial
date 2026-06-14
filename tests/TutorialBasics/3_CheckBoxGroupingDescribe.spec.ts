import {test, expect} from '@playwright/test'

// Local Grouping -  USE TEST.DESCRIBE

test.describe('Checkbox module testing', ()=>{   
    
test('Validate the first checkbox', async ({page}) => {
   await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");
   await checkboxlink.click();
   const checkbox1 = await page.locator("//input[@type='checkbox']").nth(0);
   await checkbox1.check();
   await expect(checkbox1).toBeChecked();
   console.log("Check box 1  is checked")
    
})


test('Validate the second checkbox', async ({page}) => {
   await page.goto ('https://the-internet.herokuapp.com/');
   const checkboxlink =  page.getByText("Checkboxes");
   await checkboxlink.click();
   const checkbox2 = await page.locator("//input[@type='checkbox']").nth(1);
   await checkbox2.uncheck();

   await expect(checkbox2).not.toBeChecked();
   console.log("Check box2 is unchecked")
    
})

})


// To run - npx playwright -g'checkbox module'

// test.describe.configure(//{mode :'parallel'}) // test in single file will run in parallel mode
// test.describe.configure(//{mode :'serial'}) // test in single file will run in serial mode, in case test2 is dependent on test1 and 
// if test1 gets fail other will be skipped