require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const adminRoutes = require('./routes/adminRoutes')
const newsRoutes = require('./routes/newsRoutes')
const userRoutes = require('./routes/userRoutes')
const { checkAdmin , checkUser} = require('./middleware/authMiddleware')

const app = express()

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory for storing uploaded files
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specify the filename for the uploaded file
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });


app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(upload.single('img'))

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