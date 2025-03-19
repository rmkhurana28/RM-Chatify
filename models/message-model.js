const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    data : String,    
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    date : {
        type : Date,
        default : Date.now(),
    }
})

module.exports = mongoose.model("message" , messageSchema);