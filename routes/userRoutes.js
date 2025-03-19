const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser');
router.use(cookieParser())

const { userSignup, userLogin, userNewChat , userLogout} = require('../controllers/user');
const isUserLoggedIn = require('../middlewares/isUserLoggedIn');
const userModel = require('../models/user-model');
const chatModel = require('../models/chat-model');
const messageModel = require('../models/message-model');

const upload = require('../config/multer-config');

router.get('/signup', (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');    
    res.render("signup" , {error , success});
})
router.post('/signup', upload.single('profile_pic') , userSignup);      

router.get('/login', (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render("login" , {error , success});
})
router.post('/login', userLogin);

router.get('/logout' , isUserLoggedIn , userLogout)

router.get('/chats', isUserLoggedIn, async (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    let user = await userModel.findOne({ email: req.user.email }).populate('chats');
    res.render('userHome', { user , error , success})
}) 

router.post('/chats/new', isUserLoggedIn, userNewChat);

router.get('/chats/:r_id', isUserLoggedIn, async (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    let user = await userModel.findOne({ email: req.user.email }).populate('chats');
    let reciever = await userModel.findOne({ _id: req.params.r_id });
    let chat = await chatModel.findOne({ user_1: req.params.r_id, user_2: user._id }).populate('messages');
    if (!chat) {
        chat = await chatModel.findOne({ user_2: req.params.r_id, user_1: user._id }).populate('messages');
    }
    res.render('userHomeChats', { user, reciever, chat , error , success});
})


module.exports = router;