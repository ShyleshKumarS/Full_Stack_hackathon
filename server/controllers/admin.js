const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET 
const maxAge = 15 * 60
const createToken = (id) => {
    return jwt.sign({id, role: 'admin'}, secret, {
        expiresIn: maxAge
    })
}

const handleSignUpErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { 'email': '', 'password': '' }

    if (err.code === 11000) {
        errors['email'] = 'Admin already exists!'
        return errors
    }

    if (err.message.includes('admin validation failed')){
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

    if (err.message === 'Invalid username!') {
        errors['email'] = err.message
    } 

    if (err.message === 'Invalid password!') {
        errors['password'] = err.message
    } 

    return errors
}

const loginAdmin = async (req, res) => {
    console.log('logging in...')
    const { email, password } = req.body
    try {
        const admin = await Admin.login(email, password)
        if (admin) {
            const token = createToken(admin._id)
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000
            })
            console.log('Logged In!')
            res.status(200).json({ token, admin });
        } else {
            res.status(400).json({ status: 'Not Authenticated!' });
        }
    } catch (err) {
        console.log(err)
        const errors = handleLoginErrors(err)
        res.status(400).json(errors)
    }
}


const addAdmin = async(req, res) => {
    console.log('adding admin')
    const {email, password} = req.body
    try{
        const json = await Admin.create({email, password})
        res.status(200).json(json) 
    } catch(err){
        console.log(err)
        const errors = handleSignUpErrors(err)
        res.status(400).json(errors)
    }
}

const logoutAdmin = (req, res) => {
    console.log('logging out admin')
    res.cookie('jwt', '', {maxAge: 1/ 1000 })
    res.status(200).json('Logged out!')
}

module.exports = {
    addAdmin, 
    loginAdmin, 
    logoutAdmin
}