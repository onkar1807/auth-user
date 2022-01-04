const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {type: String, default: ''},
    address: {type: String, default: ''},
    
}, 
    {timestamps: true}
)


module.exports = mongoose.model('User', userSchema)