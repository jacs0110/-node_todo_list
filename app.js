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
app.get('/', (req, res) => {
  res.send('Hello world!')
})

// listening on localhost
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})