import { test, expect } from "./logincustomFixture";

test('Validate navigate to Order page', async ({ loggedinPage }) => {
   
    await loggedinPage.getByRole('button', { name: 'ORDERS' }).click();
    const ordertext = await loggedinPage.getByText('Your Orders').textContent();
    console.log('Validation' + ordertext);

    await expect(ordertext).toBe('Your Orders');

})