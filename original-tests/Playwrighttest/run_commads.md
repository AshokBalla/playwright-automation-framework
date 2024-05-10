 
 
 project creation command 

 npm init playwright@latest
 
 npx playwright test
    Runs the end-to-end tests.

npx playwright test --ui
    Starts the interactive UI mode.

npx playwright test --headed
 Starts the browser viable mode.


  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen www.google.com
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

npx playwright test orangehrm/orange.spec.js --headed

npx playwright test tests/clientAppPo.spec.js --config playwright.config.js --project=chrome
npx playwright test tests/clientAppPo.spec.js --config playwright.config.js --project="Mobile Chrome" --headed


npx playwright test upload.spec.js
npx playwright test testseries.spec.js
npx playwright test testparallel.spec.js

cucumbertest

npm run test:cucumber


-bascis 
npx playwright test base.spec.js --headed

-endtoend
npx playwright test endtoend.spec.js --headed

allure reports 
npm i -D @playwight/test allure-playwright

npx @cucumber/cucumber --tags "@Regression"

npm run test:validation    # For validation tests (@Validation tag)
npm run test:regression    # For regression tests (@Regression tag)
npm run test               # For all tests

npx @cucumber/cucumber --parallel 2
npx @cucumber/cucumber --tags "@Regression or @Validation" --parallel 2

npm run test:all-tags-parallel

npx @cucumber/cucumber --tags "@Regression"

npx @cucumber/cucumber --tags "@Validation"

npm run test:validation

npx @cucumber/cucumber --format html:cucumber-report.html

npx @cucumber/cucumber --format html:cucumber-report.html

npx @cucumber/cucumber --parallel 2 --format html:cucumber-report.html

npm run test:report-parallel

npx @cucumber/cucumber --tags "@Regression" --format html:cucumber-report.html

npx @cucumber/cucumber --format html:cucumber-report.html --format summary

npx @cucumber/cucumber --format html:reports/cucumber-report.html


npx playwright test tests/testparallel.spec.js --reporter=allure-playwright
npm run allure:generate
npm run allure:open