const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    user_1 : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    user_1_name : String,
    user_2 : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    user_2_name : String,
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "message"
    }],    
    date : {
        type : Date,
        default : Date.now(),
    }
})

module.exports = mongoose.model("chat" , chatSchema);