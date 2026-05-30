import {test, expect} from '@playwright/test'
//Page: automatically launches browser, create a context, create a page
test('Page Fixture ', async ({page}) => {
   //await page.goto ('https://the-internet.herokuapp.com/');
   await page.goto('/');
   const checkboxlink =  page.getByText("checkboxes");
   await checkboxlink.click();
   const checkbox2 = await page.locator("//input[@type='checkbox']").nth(1);
   await checkbox2.uncheck();

   await expect(checkbox2).not.toBeChecked();
   console.log("Check box is unchecked for page fixture")
    
})

// What are Fixtures

// - Fixtures are reusable pieces of setup and tearDown code that provide test resources (like a browser page, context, or custom data) to your tests
// - They help you manage things like browser sessions, authentication, testdata, and more, in a clean and maintainable way.
// - They help keep your tests clean and DRY (Don't Repeat Yourself) by centralizing setup logic.
// - Playwright Test provides built-in fixtures (like page, browser, context) and allows you to define your own custom fixtures.

// Type of fixtures
// - Build in => Page, browser, context, baseURL, browserName, storageState, request
// - Custom =>Global set up and Tear down

// Built In feature usage

// Page: automatically launches browser, create a context, create a page
// Browser: When we want to launch multiple context. Multi user
// Context: When we want to share session, cookies. It opens multiple pages with in the browser. SSO
// browserName: Name of browser test cases running in
// baseURL: it avoid writing the base url in test case again and again
// storageState: authenticate once and use it across
// Request: for api automation