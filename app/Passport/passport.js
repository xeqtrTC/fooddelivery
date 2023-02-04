const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const connection = require('../database/database');
const bcrypt = require('bcrypt')


passport.use('local', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log('ulazim', password)

    connection.query('SELECT * FROM users WHERE username = ?', [username], async (err, resultOfQuery) => {
        if(resultOfQuery.length > 0) {
            bcrypt.compare(password, resultOfQuery[0].password, async (err, checkOfPassword) => {
                if(checkOfPassword) {
                    return done(null, resultOfQuery[0])
                } else {
                    console.log(err, 'nulladsadas');
                    return done(null, false, { message: 'Wrong username or password'})
                }
            })
        } else {
            console.log('ovaj error', err);
        }
    })



}))

passport.serializeUser((user, done) => {
    done(null, user.iduser)
})

passport.deserializeUser((id, done) => {
    connection.query('SELECT * FROM users WHERE iduser = ?', [id], (err, result) => {
        if(result) {
            return done(null, result[0])
        } else {
            return done(null, false, { message: 'Something went wrong!'})
        }
    })
})

module.exports = passport