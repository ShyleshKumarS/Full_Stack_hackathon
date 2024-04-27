const express = require('express')
const { getNews, addNews, deleteNews, editNews, getSingleNews } = require('../controllers/news')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getNews)

router.get('/:id', getSingleNews)

router.post('/', requireAuth, addNews)

router.delete('/:id', requireAuth, deleteNews)

router.patch('/:id', requireAuth, editNews)

module.exports = router