const Admin = require('../models/admin')
const mongoose = require('mongoose')

const loginAdmin = async (req, res) => {
    console.log('logging in...')
    const {username, password} = req.body
    try{
        const json = await Admin.findOne({username, password})
        if (json) {
            console.log('Logged In!')
            res.status(200).json(json)
        } else {
            res.status(400).json({'Status': 'Not Authenticated!'})
        }
    } catch(err) {
        console.log(err)
    }
}

const addAdmin = async(req, res) => {
    console.log('adding...')
    const {username, password} = req.body
    try{
        const json = await Admin.create({username, password})
        res.status(200).json(json) 
    } catch(err){
        res.status(400)
        console.log(err)
    }
}

module.exports = {addAdmin, loginAdmin}