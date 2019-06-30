const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

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
  // res.locals.errors = req.flash('message')
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register check
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  // error message
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: 'All columns are required' })
  }

  if (password !== password2) {
    errors.push({ message: 'Wrong password' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
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
        // newUser.save().then(user => {
        //   res.redirect('/')
        // })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser.save().then(user => {
              console.log('New user has been created!')
              res.redirect('/')
            }).catch(err => console.log(err))
          })
        })
      } else if (password !== password2) {
        console.log('Two passwords are not consistent')
      }
    }).catch(err => console.log(err))
  }

})

// log out
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Log out successfully')
  res.redirect('/users/login')
})

module.exports = router