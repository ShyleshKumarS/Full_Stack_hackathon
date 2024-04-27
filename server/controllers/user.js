const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleSignUpErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { 'email': '', 'password': ''}

    if (err.code === 11000) {
        errors['email'] = 'User already exists!'
        return errors
    }

    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties.path)
            errors[properties.path] = properties.message
        });
    }
    return errors
}

const handleLoginErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { 'email': '', 'password': ''}

    if (err.message === 'Invalid email!') {
        errors['email'] = err.message
    } 

    if (err.message === 'Invalid password!') {
        errors['password'] = err.message
    } 

    return errors
}

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
        console.log(err)
        const errors = handleSignUpErrors(err)
        res.status(400).json(errors)
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
        const errors = handleLoginErrors(err)
        res.status(400).json(errors)    
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