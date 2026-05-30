import { test as base, Page , expect} from '@playwright/test'

// 1. Define types for your custom fixtures
type loginFixtures = {
    loggedinPage: Page
}

// 2. Extend the base test object
export const test = base.extend<loginFixtures>({
    loggedinPage: async ({ page }, use) => {
        //set up 
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await page.locator('#userEmail').fill('email.yogesh@gmail.com')
        await page.locator('#userPassword').fill('Oasis@360');
        await page.locator('#login').click();

        await use(page)
        // tear down
        await page.getByText(' Sign Out ').click();

    }

})
// Re-export expect so it's always accessible from this file
export { expect };



// Custom Fixtures

// Hooks: Hooks are Test file scoped. Also, Set up and Tear down are controlled by before and after hook separately
// When we want to add some setup and teardown code for Test cases across files, we use concept of Custom Fixture
// Using Custom Hooks, we can combine setup and tear down and is automatically invoked