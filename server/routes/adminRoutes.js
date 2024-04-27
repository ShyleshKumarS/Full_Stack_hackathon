const express = require('express')
const { loginAdmin, addAdmin } = require('../controllers/admin.')

const router = express.Router()

router.post('/login', loginAdmin)

router.post('/add', addAdmin)

module.exports = router