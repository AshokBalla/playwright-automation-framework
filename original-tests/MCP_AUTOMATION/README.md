# SauceDemo Playwright Automation

This project automates the SauceDemo e-commerce flow using Playwright and the Page Object Model (POM) pattern.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Run tests:
   ```sh
   npx playwright test
   ```

## Project Structure

- `pageobjects/` - Page Object Model classes
- `tests/` - Test files

## Scenario Automated

- Login
- Add "Sauce Labs Backpack" to cart
- Checkout with random user data
- Verify order completion
