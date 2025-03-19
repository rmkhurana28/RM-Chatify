const express = require("express");
const app = express();
const path = require('path');
require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const expressSession = require("express-session");
const flash = require("connect-flash");
app.use(expressSession({
    secret: process.env.SESSION_SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

const http = require('http');
const server = http.createServer(app);
const { Server} = require('socket.io');
const io = new Server(server);

let n = 0;
const socket_ids = [];
const user_ids = [];

const message_data = [];
let N = 0;

io.on('connection' , (socket) => {
   

    socket.on('user_id' , (id) => {
        socket_ids[n] = socket.id;
        user_ids[n++] = id
    })    
        

    socket.on('u_message' , (data) => {
        message_data[N++] = data;
        const s_index = user_ids.indexOf(data.sender_id);
        const r_index = user_ids.indexOf(data.reciever_id);
        io.to(socket_ids[s_index]).emit('s_incoming' , data.data);
        if(r_index != -1){
            io.to(socket_ids[r_index]).emit('r_incoming' , data.data);
        }        
    })

    

    socket.on('disconnect' , async () => {
        const index = socket_ids.indexOf(socket.id);
        socket_ids.splice(index , 1);
        user_ids.splice(index , 1);
        n = n - 1;

        // send every message to database
        for (const data_object of message_data) {
            let selectChat = await chatModel.findOne({user_1 : data_object.sender_id , user_2 : data_object.reciever_id});
            
            if(!selectChat){
                selectChat = await chatModel.findOne({user_2 : data_object.sender_id , user_1 : data_object.reciever_id});                
            }
            
            let senderData = await userModel.findOne({_id : data_object.sender_id});
            let recieverData = await userModel.findOne({_id : data_object.reciever_id});

            let newMessage = await messageModel.create({
                data : data_object.data,
                sender : senderData._id,
                reciever : recieverData._id,
            })

            selectChat.messages.push(newMessage._id);
            await selectChat.save();
        }
        message_data.length = 0;
        N = 0;

    })
})


const db = require('./config/mongoose-connection');

const userRoutes = require('./routes/userRoutes');
const chatModel = require("./models/chat-model");
const messageModel = require("./models/message-model");
const userModel = require("./models/user-model");

app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname , 'public')));

app.get('/' , (req,res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('home' , {error , success});
})

app.use('/users' , userRoutes);

app.get('/*' , (req,res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render("notFound" , {error , success});
})

server.listen(process.env.PORT);