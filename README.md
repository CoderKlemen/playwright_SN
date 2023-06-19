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



## TO-DO

Sign-in > Validate login functionality
[x] Test case for entry of login credentials
[x] Validate successful login
[x] Validate error handling
    [x] Password
    [x] email

Create Project and Experiment in the Project
[x] Test case for creation of Project
[ ] Test case for creation of Experiment
[ ] Optional - Error handling:
    [ ] Duplicated project ( same name )
    [ ] Project with too short name ( less than 2 chars )