const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    user_email: { 
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    user_code: { 
        type: Number,
        required: false,
        trim: true,
    },
    user_date_created: {
        type: Date,
        default: Date.now()
    },
    user_last_login: {
        type: Date,
        default: Date.now()
    },
    user_active: {
        type: Boolean,
        default: false
    },
    youtube_auth: {
        type: Boolean,
        default: false
    },
    facebook_auth: {
        type: Boolean,
        default: false
    }
})


const UsersRquest = mongoose.model("user", UserSchema)



module.exports =  UsersRquest