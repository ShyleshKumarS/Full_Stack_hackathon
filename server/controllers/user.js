const User = require('../models/user')

const addUser = async (req, res) => {
    console.log('adding user')
    const {name, email, password} = req.body
    try{
        const user = await User.create({name, email, password})
        res.status(201).json(user)
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
        res.status(200).json({user: user._id})
    } catch (err) {
        res.status(400).json(err)    
    }
}

module.exports = {
    addUser,
    loginUser
}