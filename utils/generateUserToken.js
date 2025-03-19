const jwt = require('jsonwebtoken');

const generateUserToken = (user) => {
    return jwt.sign({user_email : user.email , user_id : user._id} , process.env.JWT_KEY);
}

module.exports.generateUserToken = generateUserToken;