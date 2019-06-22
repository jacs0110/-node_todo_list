const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

// index
router.get('/', (req, res) => {
  Todo.find({}).sort({ done: 'asc', name: 'asc' }).exec((err, todos) => {
    if (err) return console.error(err)
    return res.render('index', { todos: todos })
  })
})

// new todo creating page
router.get('/new', (req, res) => {
  res.render('new')
})

// show one todo page
router.get('/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) console.error(err)
    res.render('detail', { todo: todo })
  })
})

// create a new todo
router.post('/', (req, res) => {
  const todo = Todo({
    name: req.body.name
  })

  todo.save(err => {
    if (err) console.error(err)
    res.redirect('/')
  })
})

// todo editing page
router.get('/:id/edit', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) console.error(err)
    res.render('edit', { todo: todo })
  })
})

// edit a todo
router.put('/:id', (req, res) => {
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
router.delete('/:id/delete', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) console.error(err)
    todo.remove(err => {
      if (err) console.error(err)
      res.redirect(`/`)
    })
  })
})

module.exports = router