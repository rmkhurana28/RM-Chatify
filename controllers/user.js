const userModel = require('../models/user-model');
const chatModel = require('../models/chat-model');

const bcrypt = require('bcrypt');

const { generateUserToken} = require('../utils/generateUserToken');

var cookieParser = require('cookie-parser');

module.exports.userSignup = async function (req,res){
    try{
        let {name , email , password} = req.body;
        
        let user = await userModel.findOne({email});
        if(user){
            req.flash('error' , 'Email id already Exist !!');        
            return res.redirect('/users/signup');
        }

        user = await userModel.findOne({name});
        if(user){
            req.flash('error' , 'Username already Exist !!');            
            return res.redirect('/users/signup');
        }

        bcrypt.genSalt(12 , (err,salt) => {
            bcrypt.hash(password , salt , async (err,hash) => {
                if(err) {             
                    req.flash('success' , 'Logged Out Succesfully !!');   
                    return res.redirect('/users/login');                    
                }
                user = await userModel.create({
                    name,
                    email,
                    password : hash,
                    pic : req.file.buffer,
                })

                let userToken = generateUserToken(user);
                res.cookie('user' , userToken);             
                req.flash('success' , 'Account Created Succesfully !!');
                return res.redirect('/users/chats');
            })
        })
    } catch(err) {
        req.flash('error' , 'Something Went Wrong !!');
        return res.redirect('fix');
    }
}

module.exports.userLogin = async function (req,res){
    try{
        let {email , password} = req.body;
        
        let user = await userModel.findOne({email});
        if(!user){
            req.flash('error' , 'Email id does NOT Exist !!');            
            return res.redirect('/users/login');
        }        

        

        bcrypt.compare(password , user.password , (err , result) => {
            if(!result){
                req.flash('error' , 'Incorrect Password !!');   
                return res.redirect('/users/login');
            }

            let userToken = generateUserToken(user);
            res.cookie('user' , userToken);             
            req.flash('success' , 'Logged in Succesfully !!');
            return res.redirect('/users/chats');
        })

        
        
    } catch(err) {
        req.flash('error' , 'Something Went Wrong !!');
        return res.redirect('fix');
    }
}

module.exports.userNewChat = async function(req,res) {
    try{

        if(req.body.name === req.user.name){
            req.flash('error' , 'Unable to Proceed !!');   
            return res.redirect('/users/chats');
        }


        let reciever = await userModel.findOne({name : req.body.name}).populate('chats');

        if(!reciever){
            req.flash('error' , 'Wrong Username !!');   
            return res.redirect('/users/chats');
        }

        for (let chat of req.user.chats) {
            if(((chat.user_1.toString() === req.user._id.toString()) && (chat.user_2.toString() === reciever._id.toString())) || ((chat.user_2.toString() === req.user._id.toString()) && (chat.user_1.toString() === reciever._id.toString()))){
                req.flash('error' , 'Chat Already Exist !!');   
                return res.redirect('/users/chats');
            }
        };
        
        let newChat = await chatModel.create({
            user_1 : req.user._id,
            user_2 : reciever._id,
            user_1_name : req.user.name,
            user_2_name : reciever.name,
        });

        req.user.chats.push(newChat._id);
        reciever.chats.push(newChat._id);

        await req.user.save();
        await reciever.save();

        req.flash('success' , 'Chat Created Succesfully');   
        return res.redirect('/users/chats');
    } catch (err){
        req.flash('error' , 'Something Went Wrong !!');
        return res.redirect('fix');
    }
    
}   

module.exports.userLogout = async function(req,res) {
    try{
        res.clearCookie('user');    
        req.flash('success' , 'Logged Out Succesfully !!');   
        return res.redirect('/users/login');
    } catch(err){
        req.flash('error' , 'Something Went Wrong !!');
        return res.redirect('fix');
    }
    
}