// include modules and setup server variables 
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const port = 3000

// setup view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// routes 
// index
app.get('/', (req, res) => {
  Todo.find((err, todos) => {
    if (err) return console.error(err)
    res.render('index', { todos: todos })
  })
})

// list all todos
app.get('/todos', (req, res) => {
  res.send('list all todos')
})

// new todo creating page
app.get('/todos/new', (req, res) => {
  res.render('new')
})

// show one todo page
app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) console.error(err)
    res.render('detail', { todo: todo })
  })
})

// create a new todo
app.post('/todos', (req, res) => {
  const todo = Todo({
    name: req.body.name
  })

  todo.save(err => {
    if (err) console.error(err)
    res.redirect('/')
  })
})

// todo editing page
app.get('/todos/:id/edit', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) console.error(err)
    res.render('edit', { todo: todo })
  })
})

// edit a todo
app.post('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) console.error(err)
    todo.name = req.body.name
    if (req.body.done === 'on') {
      todo.done = true
    } else {
      todo.done = false
    }
    todo.save(err => {
      if (err) console.error(err)
      res.redirect(`/todos/${req.params.id}`)
    })
  })
})

// delete a todo
app.post('/todos/:id/delete', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) console.error(err)
    todo.remove(err => {
      if (err) console.error(err)
      res.redirect(`/`)
    })
  })
})

// listening on localhost
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})