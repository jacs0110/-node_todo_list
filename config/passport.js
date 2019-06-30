const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')


module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          console.log('That email is not registered')
          return done(null, false, { message: 'That email is not registered' })
        }
        // if (user.password != password) {
        //   return done(null, false, { message: 'Email or Password incorrect' })
        // }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) {
            console.log('Pass')
            return done(null, user)
          } else {
            console.log('Email and Password incorrect')
            return done(null, false, { message: 'Email and Password incorrect' })
          }
        })
      })
    })
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}