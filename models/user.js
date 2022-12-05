const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        unique:true,
        lowercase:true
    },
    password: {
        type: String
    },
    userRole:{
        type:String,
        enum:['user','admin'],
        default:"user"
    }
}, { timestamps: true })


module.exports= mongoose.model('User',userSchema)