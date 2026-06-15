import {test, expect} from '@playwright/test'

test('First Test', async ({page}) => {
   await page.goto ('https://the-internet.herokuapp.com/');
   //await page.goto('/');
   const checkboxlink =  page.getByText("checkboxes");
   await checkboxlink.click();
   const checkbox2 = await page.locator("//input[@type='checkbox']").nth(1);
   await checkbox2.uncheck();

   await expect(checkbox2).not.toBeChecked();
   console.log("Check box is unchecked")
    
})

//Test for branching