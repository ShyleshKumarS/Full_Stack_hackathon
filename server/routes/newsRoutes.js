const express = require('express')
const { getNews, addNews, deleteNews, editNews } = require('../controllers/news')

const router = express.Router()

router.get('/', getNews)

router.get('/:id')

router.post('/', addNews)

router.delete('/:id', deleteNews)

router.patch('/:id', editNews)

module.exports = router