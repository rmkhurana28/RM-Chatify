const mongoose = require('mongoose');

mongoose
    .connect(`${process.env.MONGODB_URL}/RM_chat`)
    .then(function() {
        console.log("database Connected Succesfully !!");
    })
    .catch(function(err) {
        console.log(err.message);
    })

module.exports = mongoose.connection;