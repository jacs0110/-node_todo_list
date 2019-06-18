// include modules and setup server variables 
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

// connect to db
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })
const db = mongoose.connection

// Error when connecting to db
db.on('error', () => {
  console.log('MongoDB error!')
})

// Connect to db successfully
db.once('open', () => {
  console.log('MongoDB connected!')
})

// Load models
const Todo = require('./models/todo')

// routes 
// index
app.get('/', (req, res) => {
  res.send('Hello world!')
})

// list all todos
app.get('/todos', (req, res) => {
  res.send('list all todos')
})

// new todo creating page
app.get('/todos/new', (req, res) => {
  res.send('show todo creating page')
})

// show one todo page
app.get('/todos/:id', (req, res) => {
  res.send('show the detail of one todo')
})

// create a new todo
app.post('/todos', (req, res) => {
  res.send('create a new todo')
})

// todo editing page
app.get('/todos/:id/edit', (req, res) => {
  res.send('show todo editing page')
})

// edit a todo
app.post('/todos/:id', (req, res) => {
  res.send('Edit a todo')
})

// delete a todo
app.post('/todos/:id/delete', (req, res) => {
  res.send('delete a todo')
})

// listening on localhost
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})