const path = require('path');
const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();


// Database Definition (databasename, user, password
const sequelize = new Sequelize('auth', 'auth', 'auth-pw', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    // SQLite only
    storage: path.resolve(__dirname, '../db/auth.db')
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('users', require('../models/user'));



// Routing
router.use((req, res, next) => {
    // Just want to view what's happening
    console.log('Route Middleware');
    next();
});

router.get('/users', (req, res) => {
    User.sync().then(() => {
        User
            .findAll()
            .then(users => {
                console.log('returned users');
                res.json({status: 300, message: "Found users"});
            })
            .catch(err => {
                console.log(err.message);
                res.json({status: 403, message: "Didn't find users"});
            });


    });
});



router.post('/register', (req, res) => {

    User.sync().then(() => {
        User
            .create({
                user: req.body.username,
                pw: req.body.password
            })
            .then(user => {
                res.json({
                    status: 201,
                    username: user.get('user'),
                    message: 'User created!',
                    token: 'faketoken'
                })
            }).catch(err => {
                res.json({
                    status: 400,
                    message: err.errors[0].message
                })
        });
    }).catch(() => {
        res.json({
            status: 400,
            message: 'An error occurred.'
        })
    });
});



module.exports = router;