const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 30
    }
})

const News = mongoose.model('newsDetail', newsSchema)

module.exports = News