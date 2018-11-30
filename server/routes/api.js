const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb://user1:password123@ds115094.mlab.com:15094/projectdb"

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else{
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next) {
    // Unauthorized request if Token isn't found
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    // splits authorization into an array where there is a space, [0] for 'Bearer' [1] for the token
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    // token present, only verifies if valid
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) =>{
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if  (error) {
            console.log(error);
        } else {
            // create token to store register data
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
}) 

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                // create token to store login data
                let payload = { subject: user._id}
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

router.get('/information', (req, res) => {
    let information = [
        {
            "id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
    ]
    res.json(information)
})

// only excutes code if verified
router.get('/character', verifyToken, (req, res) => {
    let information = [
        {
            "id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
    ]
    res.json(information)
})

module.exports = router