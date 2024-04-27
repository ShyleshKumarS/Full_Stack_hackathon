const express = require('express')
const { loginAdmin, addAdmin, logoutAdmin } = require('../controllers/admin.')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/login', loginAdmin)

router.post('/add', requireAuth, addAdmin)

router.get('/logout', logoutAdmin)

module.exports = router