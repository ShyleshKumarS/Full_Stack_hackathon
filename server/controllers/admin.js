const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET 
const maxAge = 15 * 60
const createToken = (id) => {
    return jwt.sign({id, role: 'admin'}, secret, {
        expiresIn: maxAge
    })
}

const loginAdmin = async (req, res) => {
    console.log('logging in...')
    const {username, password} = req.body
    try{
        const admin = await Admin.login(username, password)
        if (admin) {
            const token = createToken(admin._id)
            res.cookie('jwt', token, {
                httpOnly: true, maxAge: maxAge * 1000
            })
            console.log('Logged In!')
            res.status(200).json(admin)
        } else {
            res.status(400).json({'Status': 'Not Authenticated!'})
        }
    } catch(err) {
        console.log(err)
    }
}

const addAdmin = async(req, res) => {
    console.log('adding admin')
    const {username, password} = req.body
    try{
        const json = await Admin.create({username, password})
        res.status(200).json(json) 
    } catch(err){
        res.status(400)
        console.log(err)
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