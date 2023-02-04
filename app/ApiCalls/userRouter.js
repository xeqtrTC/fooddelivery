
const express = require('express');
const connection = require('../database/database');
const bcrypt = require('bcrypt');
const passport = require('passport');
const geocoder = require('../geolocation/geolocation')

const RegisterUser = async (req, res) => {
    const { username, password, geolocation, firstname, lastname } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const location = await geocoder.geocode(geolocation);
    console.log('OVO JE LOKACIJA', location[0])
    const test = await geocoder.batchGeocode([
        'pljevlja narodna revolucija',
        'pljevlja mila perunicica'
    ])
    console.log('OVO JE TO', test[1])                 
    console.log('OVO JE TO', test[0])


    const sql = 'INSERT INTO users SET ?';
    const sql2 = 'SELECT username FROM users WHERE username = ?';
    const sql3 = 'SELECT firstname FROM users WHERE firstname = ?';
    const sql4 = 'SELECT lastname FROM users WHERE lastname = ?';
    const sql5 = 'SELECT * FROM restaurantchain WHERE nameofcity = ?';

    connection.query(sql2, [username], (error, resultOfCheck) => {
        if(resultOfCheck.length > 0) {
            return res.status(409).json({message: 'User already exists'})
        } else {
            connection.query(sql3, [firstname], (error, resultOfSecondCheck) => {
                if(resultOfSecondCheck.length > 0) {
                    return res.status(409).json({message: 'Firstname already exists'})
                } else {
                    connection.query(sql4, [lastname], (err, resultOfThirdCheck) => {
                        if(resultOfThirdCheck.length > 0) {
                            return res.status(409).json({ message: 'Lastname already exists'})
                        } else {
                            connection.query(sql, { username: username, password: hashedPassword, geolocation: location[0].formattedAddress, firstname: firstname, lastname: lastname}, (err, result) => {
                                if(result.affectedRows > 0) {
                                    return res.status(201).json({message: 'You have registered'})
                                } else {
                                    console.log(err);
                                    return res.status(401).json({ message: 'Something went wrong'})
                                }
                            })
                            

                        }
                    })
                }
            })
        }
    })
}

const handleLogin = async (req, res, next) => {
    console.log('OVDE')
    passport.authenticate('local', (err, user, info) => {
        console.log('OVDE NE')
        if(err) {
            console.log(err);
            return
        }
        if(!user) {
            return res.json(info.message)
        }
        req.logIn(user, (err) => {
            if(err) {
                console.log(err);
                return res.status(401).json({message: 'Soemthing went wrong'})
            } else {
                return res.json({ success: true })
            }
        })
    })(req, res, next)
}

const updateUserToAdmin = (req, res) => {
    const { iduser } = req.body;
    const sql =  'UPDATE users SET admin = 1 WHERE iduser = ?';

    if(req.user === undefined || req.user.admin === 0) {
        return res.status(401);
    } else {
        connection.query(sql, [iduser], (err, resultOfUpdate) => {
            if(resultOfUpdate.affectedRows > 0) {
                return res.status(201).json({ message: 'You have successfully updated user to an admin.'})
            }
        })
    }



}

module.exports = {
    RegisterUser,
    handleLogin,
    updateUserToAdmin
}
