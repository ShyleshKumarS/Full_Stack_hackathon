const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isAlphanumeric } = require('validator')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Username required!'],
        unique: true,
        validate: [isAlphanumeric, 'Please enter a valid username!']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimum password length is 6!']
    }
}, {timestamps: true})

adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

adminSchema.post('save', (doc, next) => {
    console.log("New user was created and saved!", doc)
    next()
})

adminSchema.statics.login = async function (email, password) {
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

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin