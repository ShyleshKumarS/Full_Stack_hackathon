const express = require('express')
const { addUser, loginUser } = require('../controllers/user')

const router = express.Router()

router.post('/login', loginUser)

router.post('/add', addUser)

module.exports = router