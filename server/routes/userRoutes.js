const express = require('express')
const { addUser, loginUser, logoutUser } = require('../controllers/user')

const router = express.Router()

router.post('/login', loginUser)

router.post('/add', addUser)

router.get('/logout', logoutUser)

module.exports = router