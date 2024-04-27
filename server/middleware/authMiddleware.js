const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Admin = require('../models/admin')

const secret = process.env.SECRET
const requireAuth = (req, res, next) => {
    console.log('REQUIRE AUTH')
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.status(401).json({error: 'Unverified'})
            } else {
                console.log(decodedToken)
                if(decodedToken.role !== 'admin'){
                    res.status(401).json({error: 'Not an admin!'})
                } else {
                    next()
                }
            }
        })
    } else { 
        res.status(401).json({error: 'No token'})
    }
} 

const checkAdmin = (req, res, next) => {
    const token = req.cookies.jwt
    console.log('CHECKING')
    if (token) {
        jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.admin = null
                next()
            } else {
                console.log(decodedToken)
                let admin = await Admin.findById(decodedToken.id)
                res.locals.admin = admin
                next()
            }
        })
    } else {
        res.locals.admin = null
        next()
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    console.log('CHECKING')
    if (token) {
        jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = {requireAuth, checkAdmin, checkUser}