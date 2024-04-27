const User = require('../models/user')
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET 
const maxAge = 15 * 60
const createToken = (id) => {
    return jwt.sign({id, role: 'user'}, secret, {
        expiresIn: maxAge
    })
}

const addUser = async (req, res) => {
    console.log('adding user')
    const {name, email, password} = req.body
    try{
        const user = await User.create({name, email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true, maxAge: maxAge * 1000
        })
        res.status(201).json({user: user_id})
    } catch (err) {
        res.status(400).json({error: "User not created"})
        console.log(err)
    }
}

const loginUser = async (req, res) => {
    console.log('logging user in')
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true, maxAge: maxAge * 1000
        })
        res.status(200).json({user: user._id})
    } catch (err) {
        res.status(400).json(err)    
    }
}

const logoutUser = (req, res) => {
    console.log('loggin out user')
    res.cookie('jwt', '', {maxAge: 1/ 1000 })
    res.status(200).json('Logged out!')
}

module.exports = {
    addUser,
    loginUser,
    logoutUser
}