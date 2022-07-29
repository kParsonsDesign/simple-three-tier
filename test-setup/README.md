# Beginners Guide to **Set Up a Jest Test Environment for JavaScript ES6**
### Using Modules and Imports for an Express App

---

### Table of Contents

- [Set Up Express App](#set-up-express-app)
- [Add **Jest** test environment and SuperTest to your ES6 Module project](#add-jest-test-environment-and-supertest-to-your-es6-module-project)
    
## Set Up Express App

1. Start your project by creating a root folder with a `package.json` file. Either run <kbd>npm init</kbd> in a terminal from the project root folder or simply make the file by hand.

    Run <kbd>npm install express</kbd> to install express in your node environment. Also install a database of your choice. This example uses [lowdb](https://www.npmjs.com/package/lowdb) via <kbd>npm install lowdb</kbd>.

    **Important! Add the line: `"type": "module",` into the package.json file.** This is what makes your node.js environment process your files as [ES6 files](https://v8.dev/features/modules) instead of CommonJS files.

    *package.json*
```json
{
  "name": "express module with jest testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.1",
    "lowdb": "^3.0.0"
  }
}
```

2. Create an `app.js` file.

    Use ES6 `import` for any resources you import.

    **Important!** Remember to `export` your app/express methods at the bottom of the file.

    *app.js*
```js
// Install Express v.4.18.1
import express from 'express'
const app = express()

// ... Your express app code here ...

export { app }
```

3. Create a separate `server.js` file to start your express server.

    Separating the server start (`app.listen`) function from your app allows the Jest test to process your code without restarting the server and clobbering everything.

    *server.js*
```js
import { app } from './app.js'
const port = 3000
app.listen(port, () => {
  console.log(`Running on port ${port}!`)
})
```

4. Change the `"main": "index.js"` entry in your `package.json` file to point to `"main": "server.js"`. This will allow your server to start when you run your app.

    Optional: add the line `"start": "node server.js",` in the `"scripts"` section. This will allow you to run your app via <kbd>npm run start</kbd>.

    *package.json*
```json
{
  "name": "express module with jest testing",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.1",
    "lowdb": "^3.0.0"
  }
}
```

5. Optional: Add the [nodemon](https://nodemon.io/) agent to your development environment.

    Run <kbd>npm install --save-dev nodemon</kbd> in the terminal.

    *package.json*
```json
{
  "name": "express module with jest testing",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon ./main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "nodemon": "^2.0.19"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.1",
    "lowdb": "^3.0.0"
  }
}
```

**This is your basic express app setup complete to use with ES6 file imports.** Your folder/file structure should look like this:

```
root
  |--node_modules/
  |--app.js
  |--db.json
  |--server.js
  |--package-lock.json
  |--package.json
```


## Add **Jest** test environment and SuperTest to your ES6 Module project

1. **Install SuperTest.** This part is easy. It doesn't require any extra setup. Just run <kbd>npm install --save-dev supertest</kbd>.

2. **Install Jest.** This is the main test suite. Install it first via <kbd>npm install --save-dev jest</kbd>. We will add the functionality it needs to process ES6 modules and includes next.

    Your `package.json` file should have these lines in the `"devDependencies"` section:

    *package.json*
```json
"devDependencies": {
  "jest": "^28.1.3",
  "nodemon": "^2.0.19",
  "supertest": "^6.2.4"
}
```

3. **Disable code transforms.** According to the [Jest documentation](https://jestjs.io/docs/ecmascript-modules), this is where you *start modifying Jest native functionality to be able to handle ES6 modules and imports*. You can do this in 1 of 3 ways.

    **Option 1:** Run <kbd>jest init</kbd> to create a very long `jest.config.js` file and then modify it.

    If you choose all the default options you get the long file, but everything will be commented out. This is nice because you can see what all of the different Jest setup options are.

    In the file you just created, search the file for the lines for `transform` and `transformIgnorePatterns`.

    *Set them to (to disable code transforms):*
    ```js
    transform: {},
    ```

    *and (to process node_modules correctly):*

    ```js
    transformIgnorePatterns: [
      "\\\\node_modules\\\\",
      "\\.pnp\\.[^\\\\]+$"
    ],
    ```

    **Option 2:** Create the `jest.config.js` file manually.

    In your project root folder create a jest.config.js file:

    *jest.config.js*
    ```js
    export default {
      transform: {},
      transformIgnorePatterns: [
        "\\\\node_modules\\\\",
        "\\.pnp\\.[^\\\\]+$"
      ],
    };
    ```

    **Option 3:** Add the disable code transform functionality to your `package.json` file.

    In the first level of keys in your `package.json` file, add a `"jest": {}` key. As its object value, add the `"transform": {},` and `"transfortransformIgnorePatterns"` keys from above. Remember that since this is a json file you have to wrap the key strings in double quotes.

    *package.json*
    ```json
    {
      "type": "module",
      "scripts": { },
      "devDependencies": { },
      "dependencies": { },
      "jest": {
        "transform": {},
        "transformIgnorePatterns": [
          "\\\\node_modules\\\\",
          "\\.pnp\\.[^\\\\]+$"
        ],
      }
    }
    ```

4. **Execute <kbd>node</kbd> with <kbd>--experimental-vm-modules</kbd>**.

    In the `package.json` file change the `"test"` line to:

    *on mac or unix:*
    ```
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
    ```

    *on windows:*
    ```
    "test": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js"
    ```

    **Important for Windows!** In order to make the node environment work on windows **you also have to install [cross-env](https://github.com/kentcdodds/cross-env)!** Run <kbd>npm install --save-dev cross-env</kbd>.

These are all the steps you need to set up Jest v.28 and higher to work with ES6 modules and imports.


5. **Create a test file.**

    Create an `app.test.js` or `app.spec.js` file. Alternatively you can create a `__test__` folder to hold your test files.

    *app.test.js*
```js
import { jest } from '@jest/globals'
import request from "supertest"
import { app } from "./app"

// simple test to see if test suite is working
describe("Sample Test", () => {
  test("true === true", () => {
    expect(true).toBe(true);
  })
})

// test to see if modules are imported and supertest is accessing api
describe("Test the root path", () => {
  // use supertest syntax
  test("Should get response from GET method", async () => {
    return request(app)
      .get("/")
      .expect(200);
  })
})
```

6. **Run your tests.**

    Run <kbd>npm test</kbd> to run all your tests or <kbd>npm test app.test.js</kbd> to run a single test file. Your Jest test suite should now be processing ES6 modules and using imports correctly. Whether your tests pass is another matter. ;)
