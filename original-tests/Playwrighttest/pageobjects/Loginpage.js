import { chromium } from 'playwright';

class Loginpage {
  constructor() {
    this.page = null;
    this.browser = null;
    this.timeout = 60000;
  }

  async init() {
    this.browser = await chromium.launch({
      headless: false,
      slowMo: 100,
      args: ['--start-maximized']
    });
    const context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    this.page = await context.newPage();
    await this.page.setDefaultTimeout(this.timeout);
    await this.page.setDefaultNavigationTimeout(this.timeout);
  }

  async login(usrname, password) {
    try {
      console.log("Navigating to login page...");
      await this.page.goto('http://orangehrm.qedgetech.com/symfony/web/index.php/auth/login',
        { waitUntil: 'domcontentloaded', timeout: this.timeout }
      );

      console.log("Waiting for login form to be visible...");

      const usernameSelector = this.page.locator('input[name="txtUsername"], #txtUsername, #username');
      const passwordSelector = this.page.locator('input[name="txtPassword"], #txtPassword, #password');
      const loginButtonSelector = this.page.locator('input[name="Submit"], #btnLogin, #login-button, button[type="submit"]');

      await usernameSelector.waitFor({ state: 'visible', timeout: this.timeout });
      console.log("Username field found, filling it...");
      await usernameSelector.fill(usrname);

      await passwordSelector.waitFor({ state: 'visible', timeout: this.timeout });
      console.log("Password field found, filling it...");
      await passwordSelector.fill(password);

      await loginButtonSelector.waitFor({ state: 'visible', timeout: this.timeout });
      console.log("Login button found, clicking it...");
      await loginButtonSelector.click();

      // Instead of waiting for networkidle, wait for a short time and take a screenshot
      console.log("Waiting briefly after login...");
      await this.page.waitForTimeout(5000);

      try {
        await this.page.screenshot({ path: 'login-success.png' });
        console.log("Login screenshot captured as login-success.png");
      } catch (e) {
        console.error("Failed to take screenshot:", e);
      }

      console.log("Login completed!");
    } catch (error) {
      console.error("Error during login:", error);
      try {
        await this.page.screenshot({ path: 'login-error.png' });
        console.log("Screenshot saved as login-error.png");
      } catch (e) {
        console.error("Failed to take screenshot:", e);
      }
      throw error;
    } finally {
      // Make sure to close the browser even if there's an error
      await this.close();
    }
  }

  async close() {
    try {
      console.log("Closing browser...");
      if (this.page) await this.page.close();
      if (this.browser) await this.browser.close();
      console.log("Browser closed successfully");
    } catch (error) {
      console.error("Error closing browser:", error);
    }
  }
}

export const logins = async (usrname, password) => {
  const loginPage = new Loginpage();
  try {
    await loginPage.init();
    await loginPage.login(usrname, password);
    // Browser is already closed in the login method's finally block
  } catch (error) {
    // Make sure browser is closed even if error happens before finally block
    await loginPage.close();
    throw error;
  }
}