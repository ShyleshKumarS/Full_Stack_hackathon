const express = require('express')
const { getNews, addNews, deleteNews, editNews, getSingleNews } = require('../controllers/news')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getNews)

router.get('/:id', getSingleNews)

router.post('/', addNews)

router.delete('/:id', deleteNews)

router.patch('/:id', editNews)

module.exports = router