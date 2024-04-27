require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const newsRoutes = require('./routes/newsRoutes')

const app = express()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use('/api/admin', adminRoutes)
app.use('/api/news', newsRoutes)

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected to database and listening...')
        })
    })
    .catch((err) => {
        console.log(err)
    })