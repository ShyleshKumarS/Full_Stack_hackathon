const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isAlpha, isEmail } = require('validator')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email!']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimum password length is 6 characters!']
    }
}, {timestamps: true})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.post('save', (doc, next) => {
    console.log("New user was created and saved!", doc)
    next()
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email})

    if (user) {
        console.log('User exists!')
        console.log(user)
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            console.log('User authenticated!')
            return user
        }
        
        throw Error('Invalid password!')
    }
    throw Error('Invalid email!')
}

const User = mongoose.model('user', userSchema)

module.exports = User