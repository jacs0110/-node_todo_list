const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// login check
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register check
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log('User already exists!')
      res.render('register', {
        name,
        email,
        password,
        password2
      })
    } else if (password === password2) {
      const newUser = new User({
        name,
        email,
        password
      })
      newUser.save().then(user => {
        res.redirect('/')
      })
      console.log('New user has been created!')
    } else if (password !== password2) {
      console.log('Two passwords are not consistent')
    }
  }).catch(err => console.log(err))
})

// log out
router.get('/logout', (req, res) => {
  res.send('log out')
})

module.exports = router