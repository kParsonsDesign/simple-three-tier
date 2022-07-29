import { app, server } from './app.js'

// ----------------------------------------------------
// Start Express
// ----------------------------------------------------
const start = (port) => {
  try {
    // app.listen(port, () => {
    //   console.log(`Running on port ${port}!`)
    // })
    server
  } catch (err) {
    console.log(err)
    process.exit()
  }
}

// const port = 3000
// start(port)
