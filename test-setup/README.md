
    <h1>Beginners Guide to <strong>Set Up a Jest Test Environment for JavaScript ES6</strong></h1>
    <h2  class="my-4">Using Modules and Imports for an Express App</h2>

    <hr />

    <h4>Table of Contents</h4>
    <ul>
      <li><a href="#setupExpress">Set Up Express App</a></li>
      <li><a href="#addJest">Add <strong>Jest</strong> test environment and SuperTest to your ES6 Module project</a></li>
    </ul>
    

    <h3><a id="setupExpress">Set Up Express App</a></h3>
    <ol>
      <li>
        <p>Start you project by creating a root folder with a <code>package.json</code> file. Either run <kbd>npm init</kbd> in a terminal from the project root folder or simply make the file by hand.</p>
        <p>Run <kbd>npm install express</kbd> to install express in your node environment. Also install a database of your choice. This example uses <a href="https://www.npmjs.com/package/lowdb">lowdb</a> via <kbd>npm install lowdb</kbd>.</p>
        <p><strong>Important! Add the line: <code>"type": "module",</code> into the package.json file.</strong> This is what makes your node.js environment process your files as <a href="https://v8.dev/features/modules">ES6 files</a> instead of CommonJS files.</p>

        <figcaption>package.json</figcaption>
        <pre><code>{
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
}</code></pre>
      </li>

      <li>
        <p>Create an <code>app.js</code> file.</p>
        <p>Use ES6 <code>import</code> for any resources you import.</p>
        <p><strong>Important!</strong> Remember to <code>export</code> your app/express methods at the bottom of the file.</p>

        <figcaption>app.js</figcaption>
      <pre><code>// Install Express v.4.18.1
import express from 'express'
const app = express()

// ... Your express app code here ...

export { app }</code>
</pre>
      </li>

      <li>
        <p>Create a separate <code>server.js</code> file to start your express server.</p>
        <p>Separating the server start (<code>app.listen</code>) function from your app allows the Jest test to process your code without restarting the server and clobbering everything.</p>

        <figcaption>server.js</figcaption>
        <pre><code>import { app } from './app.js'
const port = 3000
app.listen(port, () => {
  console.log(`Running on port ${port}!`)
})</code></pre>
      </li>

      <li>
        <p>Change the <code>"main": "index.js"</code> entry in your <code>package.json</code> file to point to <code>"main": "server.js"</code>. This will allow your server to start when you run your app.</p>
        <p>Optional: add the line <code>"start": "node server.js",</code> in the <code>"scripts"</code> section. This will allow you to run your app via <kbd>npm run start</kbd>.</p>

        <figcaption>package.json</figcaption>
        <pre><code>{
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
}</code></pre>
      </li>

      <li>
        <p>Optional: Add the <a href="https://nodemon.io/">nodemon</a> agent to your development environment.</p>
        <p>Run <kbd>npm install --save-dev nodemon</kbd> in the terminal.</p>

        <figcaption>package.json</figcaption>
        <pre><code>{
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
}</code></pre>
      </li>
    </ol>

    <p><strong>This is your basic express app setup complete to use with ES6 file imports.</strong> Your folder/file structure should look like this:</p>

    <pre><code>root
  |--node_modules/
  |--app.js
  |--db.json
  |--server.js
  |--package-lock.json
  |--package.json
</code></pre>



    <h3 class="mt-5 mb-4"><a id="addJest">Add <strong>Jest</strong> test environment and SuperTest to your ES6 Module project</a></h3>

    <ol>
      <li>
        <p><strong>Install SuperTest.</strong> This part is easy. It doesn't require any extra setup. Just run <kbd>npm install --save-dev supertest</kbd>.</p>
      </li>
      <li>
        <p><strong>Install Jest.</strong> This is the main test suite. Install it first via <kbd>npm install --save-dev jest</kbd>. We will add the functionality it needs to process ES6 modules and includes next.</p>
        <p>Your <code>package.json</code> file should have these lines in the <code>"devDependencies"</code> section:</p>

        <figcaption>package.json</figcaption>
        <pre><code>"devDependencies": {
  "jest": "^28.1.3",
  "nodemon": "^2.0.19",
  "supertest": "^6.2.4"
}</code></pre>
      </li>
      <li>
        <p><strong>Disable code transforms.</strong> According to the <a href="https://jestjs.io/docs/ecmascript-modules">Jest documentation</a>, this is where you <em>start modifying Jest native functionality to be able to handle ES6 modules and imports</em>. You can do this in 1 of 3 ways.</p>

        <p><strong>Option 1:</strong> Run <kbd>jest init</kbd> to create a very long <code>jest.config.js</code> file and then modify it.</p>
        <p>If you choose all the default options you get the long file, but everything will be commented out. This is nice because you can see what all of the different Jest setup options are.</p>
        <p>In the file you just created, search the file for the lines for <code>transform</code> and <code>transformIgnorePatterns</code>.</p>
        <p>Set them to (to disable code transforms): <pre><code>transform: {},</code></pre></p>
        <p>and (to process node_modules correctly): <pre><code>transformIgnorePatterns: [
  "\\\\node_modules\\\\",
  "\\.pnp\\.[^\\\\]+$"
],</code></pre>
        </p>

        <p><strong>Option 2:</strong> Create the <code>jest.config.js</code> file manually.</p>
        <p>In your project root folder create a jest.config.js file:</p>

        <figcaption>jest.config.js</figcaption>
        <pre><code>export default {
  transform: {},
  transformIgnorePatterns: [
    "\\\\node_modules\\\\",
    "\\.pnp\\.[^\\\\]+$"
  ],
};</code></pre>

        <p><strong>Option 3:</strong> Add the disable code transform functionality to your <code>package.json</code> file.</p>
        <p>In the first level of keys in your <code>package.json</code> file, add a <code>"jest": {}</code> key. As its object value, add the <code>"transform": {},</code> and <code>"transfortransformIgnorePatterns"</code> keys from above. Remember that since this is a json file you have to wrap the key strings in double quotes.</p>

        <figcaption>package.json</figcaption>
        <pre><code>{
  ...
  "type": "module",
  "scripts": { ... },
  "devDependencies": { ... },
  "dependencies": { ... },
  "jest": {
    "transform": {},
    "transformIgnorePatterns": [
      "\\\\node_modules\\\\",
      "\\.pnp\\.[^\\\\]+$"
    ],
  }
}</code></pre>
      </li>

      <li>
        <p><strong>Execute <kbd>node</kbd> with <kbd>--experimental-vm-modules</kbd></strong>.</p>
        <p>In the <code>package.json</code> file change the <code>"test"</code> line to:</p>

        <figcaption>on mac or unix:</figcaption>
        <pre><code>"test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"</code></pre>

        <figcaption>on windows:</figcaption>
        <pre><code>"test": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js"</code></pre>

        <p><strong>Important for Windows!</strong> In order to make the node environment work on windows <strong>you also have to install <a href="https://github.com/kentcdodds/cross-env">cross-env</a>!</strong> Run <kbd>npm install --save-dev cross-env</kbd>.</p>
      </li>

      <p class="mb-4">These are all the steps you need to set up Jest v.28 and higher to work with ES6 modules and imports.</p>


      <li>
        <p><strong>Create a test file.</strong></p>
        <p>Create an <code>app.test.js</code> or <code>app.spec.js</code> file. Alternatively you can create a <code>__test__</code> folder to hold your test files.</p>

        <figcaption>app.test.js</figcaption>
        <pre><code>import { jest } from '@jest/globals'
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
})</code></pre>
      </li>

      <li>
        <p><strong>Run your tests.</strong></p>
        <p>Run <kbd>npm test</kbd> to run all your tests or <kbd>npm test app.test.js</kbd> to run a single test file. Your Jest test suite should now be processing ES6 modules and using imports correctly. Whether your tests pass is another matter. ;)</p>
      </li>
    </ol>
  </main>
</body>
</html>
