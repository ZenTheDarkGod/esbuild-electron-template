
# Esbuild Electron Template
This template provides a super fast electron app build time, and built in testing.

## Create New Project:
```bash
    npm create es-electron-template@latest
```

## How to use?
### Initalise project:
This command installs all the needed npm packages and updates the outdated ones.
```bash
    npm run init
```
### Build:
- #### Source:
    This command will rebundle the contents of the `source` directory.
    ```bash
        npm run build:src
    ```
- #### App:
    This command will rebundle the contents of the `app` & `assets` directory.
    ```bash
        npm run build:app
    ```
- #### All:
    This command will rebundle the contents of the **all** directories.
    ```bash
        npm run build:all
    ```

### Execute:
- #### Execute Current Build: 
    This command will execute the current build.
    ```bash
        npm run exec
    ```
- #### With Building Source:
    This command will rebundle the contents of the `source` directory & execute the build.
    ```bash
        npm run exec:src
    ```
- #### With Building App:
    This command will rebundle the contents of the `app` & `assets` directory & execute the build.
    ```bash
        npm run exec:app
    ```
- #### With Building All:
    This command will rebundle the contents of the **all** directories & execute the build.
    ```bash
        npm run exec:all
    ```

### Tests
- #### Standard Test:
    All the [`jest`](https://github.com/jestjs/jest) testable scripts in the `spec` directory will be tested.
    ```bash
        npm run test
    ```
- ### Coverage Test:
    All the [`jest`](https://github.com/jestjs/jest) testable scripts in the `spec` directory will be tested.
    ```bash
        npm run test:cov
    ```

## Credits
- `versionManager.js` - [@WarstekHUN](https://github.com/WarstekHUN)