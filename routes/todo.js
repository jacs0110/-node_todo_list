const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

const { authenticated } = require('../config/auth')


// index
router.get('/', authenticated, (req, res) => {
  Todo.find({ userId: req.user._id }).sort({ done: 'asc', date: 'asc' }).exec((err, todos) => {
    if (err) return console.error(err)
    return res.render('index', { todos: todos })
  })
})

// creating a new todo page
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// show a todo page
router.get('/:id', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    if (err) return console.error(err)

    console.log(todo)
    return res.render('detail', { todo: todo })
  })
})

// create a new todo
router.post('/', authenticated, (req, res) => {
  const todo = Todo({
    name: req.body.name,
    userId: req.user._id
  })
  todo.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// editing a todo page
router.get('/:id/edit', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    return res.render('edit', { todo: todo })
  })
})

// edit a todo
router.put('/:id', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    if (err) return console.error(err)
    todo.name = req.body.name
    if (req.body.done === 'on') {
      todo.done = true
    } else {
      todo.done = false
    }
    todo.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})

// delete a todo
router.delete('/:id/delete', authenticated, (req, res) => {
  Todo.findOne({ _id: req.params.id, userId: req.user._id }, (err, todo) => {
    if (err) return console.error(err)
    todo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router