import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://orangehrm.qedgetech.com/symfony/web/index.php/auth/login');
  await page.getByText('Username').click();
  await page.locator('#txtUsername').fill('Admin');
  await page.locator('#txtPassword').click();
  await page.locator('#txtPassword').fill('Qedge123!@#');
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();
  await page.getByRole('link', { name: 'Welcome Suresh' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Logout' }).click();
});