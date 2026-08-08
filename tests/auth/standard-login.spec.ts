import { test, expect } from '../../agentsrc/fixtures/base';
import { LoginPage } from '../../agentsrc/pages/LoginPage';
import fs from 'fs';
import path from 'path';

const users = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../agenttests/data/users.json'), 'utf-8'),
);

test.describe('SauceDemo standard login', () => {
  test('standard_user logs in successfully @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const inventory = await loginPage.loginAs(users.standard.username, users.standard.password);

    await expect(inventory.productsHeading).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html$/);
  });
});
