// Install Express v.4.18.1
import express from 'express'
const app = express()

// Install LowDB v.3.0.0
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Serve static files using express
app.use(express.static('public'))


// ----------------------------------------------------
// Display all data
//    Endpoint: curl http://localhost:3000/data
// ----------------------------------------------------
app.get('/data', async function(req, res) {
  await db.read()
  res.send(db.data)
})

// ----------------------------------------------------
// Display all posts
//    Endpoint: curl http://localhost:3000/posts
// ----------------------------------------------------
app.get('/posts', async function(req, res) {
  await db.read()
  res.send(db.data.posts)
})

// ----------------------------------------------------
// Display single post by index
//    Endpoint: curl http://localhost:3000/index/0
// ----------------------------------------------------
app.get('/index/:index', async function(req, res) {
  let index = req.params.index
  await db.read()
  res.send(db.data.posts[index])
})

// ----------------------------------------------------
// Display single post by id
//    Endpoint: curl http://localhost:3000/posts/0
// ----------------------------------------------------
app.get('/posts/:id', async function(req, res) {
  let id = parseInt(req.params.id)
  await db.read()
  let post = db.data.posts.find((post) => {return post.id === id})
  res.send(post)
})

// ----------------------------------------------------
// Add single post
//    Endpoint: curl http://localhost:3000/posts/add/title/published
// ----------------------------------------------------
app.get('/posts/add/:title/:published', async function(req, res) {
  let title = req.params.title
  let published = req.params.published === 'true' ? true : false
  await db.read()

  let highestIndex = db.data.posts.reduce((prevPost, currPost) => {
    console.log(prevPost)
    if (currPost.id > prevPost.id) return currPost
    return prevPost
  }).id

  let newPost = {
    'id': highestIndex + 1,
    'title': title,
    'published': published
  }

  db.data.posts.push(newPost)
  await db.write()

  res.send(db.data.posts)
})

// ----------------------------------------------------
// Filter posts by published state
//    Endpoint: curl http://localhost:3000/published/true
// ----------------------------------------------------
app.get('/published/:published', async function(req, res) {
  let published = req.params.published === 'true' ? true : false
  await db.read()
  let posts = db.data.posts.filter((post) => {return post.published === published})
  res.send(posts)
})

// ----------------------------------------------------
// Change single post published status
//    Endpoint: curl http://localhost:3000/posts/status/:id/:published
// ----------------------------------------------------
app.get('/posts/status/:id/:published', async function(req, res) {
  let id = parseInt(req.params.id)
  let published = req.params.published.toLowerCase() === 'true' ? true : false
  await db.read()

  let postIndex = db.data.posts.findIndex((post) => {return post.id === id})
  db.data.posts[postIndex].published = published

  await db.write()

  res.send(db.data.posts)
})

// ----------------------------------------------------
// Delete post by id
//    Endpoint: curl http://localhost:3000/posts/delete/2
// ----------------------------------------------------
app.get('/posts/delete/:id', async function(req, res) {
  let id = parseInt(req.params.id)
  await db.read()
  let postIndex = db.data.posts.findIndex((post) => {return post.id === id})
  if (postIndex === -1) return
  db.data.posts.splice(postIndex, 1)
  await db.write()
  res.send(db.data.posts)
})



// ----------------------------------------------------
// Export app
// ----------------------------------------------------
// const server = app.listen(port, () => console.log(`Running on port ${port}!`))
export { app }
// module.exports = app
