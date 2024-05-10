import { test, expect } from '@playwright/test';
import { logins } from '../pageobjects/Loginpage.js';

test.describe.configure({ mode: 'parallel' }); // Run tests in parallel

test.describe('Login Page Tests', () => {
  test('test valid login', async ({ page }) => {
    const username = 'Admin';
    const password = 'Qedge123!@#';

    await logins(username, password);
  });

  test('test invalid login with incorrect password', async ({ page }) => {
    const username = 'Admin';
    const password = 'wrongpassword';

    await logins(username, password);
  });

  test('test invalid login with incorrect username', async ({ page }) => {
    const username = 'WrongUser';
    const password = 'Qedge123!@#';

    await logins(username, password);
  });

  test('test login with empty credentials', async ({ page }) => {
    const username = '';
    const password = '';

    await logins(username, password);
  });

  //   test('test login page elements visibility', async ({ page }) => {
  //     const loginPage = new LoginPage(page);
  //     await loginPage.goTo();
  //     await expect(loginPage.usernameField).toBeVisible();
  //     await expect(loginPage.passwordField).toBeVisible();
  //     await expect(loginPage.loginButton).toBeVisible();
  //   });
});