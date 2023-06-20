## Test description
This project is made with Playwright test suite from Microsoft: https://playwright.dev


## Test setup
Node.js needs to be installed on the system. Current version is specified in .nvmrc.

```
# Install Playwright and other dependencies
npm install

# Install browsers
npx playwright install

# Install dependencies (not sure if this is 100% necessary as install failed on Debian, but tests still work)
npx playwright install-deps
```

## Test usage
```
# Run tests
npm run test

# Run tests in headed mode and with short pauses between actions
npm run test:chrome-headed

# Run only tests with tag @first
npm run test:tagged @first

# Run Playwright code generator
npm run codegen

# ** Check package.json scripts section for all possible commands **
```