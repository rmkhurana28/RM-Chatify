const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,   
    pic : Buffer,
    chats : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "chat"
    }],
    date : {
        type : Date,
        default : Date.now(),
    }
})

module.exports = mongoose.model("user" , userSchema);