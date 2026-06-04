import { test, expect } from "./logincustomFixture";


test('Validate navigate to Cart page', async ({ loggedinPage }) => {
    await loggedinPage.getByRole('button', { name: 'Cart' }).nth(0).click();
    const carttext = await loggedinPage.getByText('My Cart').textContent();
    console.log(carttext);

    await expect(carttext).toBe('My Cart');

})