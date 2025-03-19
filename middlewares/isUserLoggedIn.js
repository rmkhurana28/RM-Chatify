const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function (req,res,next) {
    if(!req.cookies.user){
        req.flash('error' , 'You need to be logged in !!');   
        return res.redirect('/users/login');
    }

    try{
        let userDecoded = jwt.verify(req.cookies.user , process.env.JWT_KEY);
        let user = await userModel
                            .findOne({email : userDecoded.user_email})
                            .populate('chats')
                            .select("-password");

        req.user = user;
        // console.log(userDecoded);
        next();
    } catch(err) {
        console.log(err.message);
    }
}
