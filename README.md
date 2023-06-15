## Test description
This project is made with Playwright test suite from Microsoft: https://playwright.dev


## Test setup
Node.js needs to be installed on the system. Current version is specified in .nvmrc.

```
# Install Playwright
npm install @playwright/test

# Install browsers
npx playwright install

# Install dependencies (not sure if this is 100% necessary as install failed on Debian, but tests still work)
npx playwright install-deps
```

## Test usage
```
# Run tests
npm run test-e2e

# Run tests in headed mode and with short pauses between actions
npm run test-e2e:chrome-headed

# Generate and update snapshots
npm run test-e2e:update-snapshots

# Run only tests with tag @first
npm run test-e2e:tagged @first

# Run Playwright code generator on p13dev-latest 
npm run e2e-codegen:p13dev

# ** Check package.json scripts section for all possible commands **
```