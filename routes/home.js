const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

const { authenticated } = require('../config/auth.js')

router.get('/', authenticated, (req, res) => {
  Todo.find({ userId: req.user._id }).sort({ done: 'asc', name: 'asc' }).exec((err, todos) => {
    if (err) return console.error(err)
    return res.render('index', { todos: todos })
  })
})

module.exports = router