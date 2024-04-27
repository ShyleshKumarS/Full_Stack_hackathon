require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const adminRoutes = require('./routes/adminRoutes')
const newsRoutes = require('./routes/newsRoutes')
const userRoutes = require('./routes/userRoutes')
const { checkAdmin , checkUser} = require('./middleware/authMiddleware')

const app = express()

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(cookieParser())
app.use('/api/admin', adminRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/user', userRoutes)

app.get('*', checkAdmin, checkUser)

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected to database and listening...')
        })
    })
    .catch((err) => {
        console.log("Failed to connect to database!\n" + err)
    })