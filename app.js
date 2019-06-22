// include modules and setup server variables 
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const port = 3000

// setup the app
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }));

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
const Todo = require('./models/todo.js')

// routes 
app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todo.js'))

// listening on localhost
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})