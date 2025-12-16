# RM-Chatify 💬

A real-time chat application built with Node.js, Express, Socket.IO, and MongoDB. Features include user authentication, real-time messaging, and persistent chat history.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## ✨ Features

- 🔐 **User Authentication**: Secure signup/login with JWT and bcrypt password hashing
- 💬 **Real-time Messaging**: Instant messaging using Socket.IO with WebSocket/polling fallback
- 👥 **One-to-One Chats**: Create and manage private conversations with other users
- 💾 **Persistent Chat History**: All messages are stored in MongoDB
- 📸 **Profile Pictures**: Upload and display user profile images
- 🎨 **Responsive UI**: Clean and intuitive interface built with EJS templates
- ⚡ **Session Management**: Secure session handling with Express sessions

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional event-based communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **express-session** - Session middleware
- **cookie-parser** - Cookie parsing

### File Upload & Storage
- **Multer** - Multipart/form-data handling for file uploads

### Template Engine
- **EJS** - Embedded JavaScript templating

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4.4 or higher) - Running locally or a MongoDB Atlas account

## 🚀 Getting Started

Follow these steps to clone and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/rmkhurana28/RM-Chatify.git
cd RM-Chatify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying the example file:

```bash
cp .env.example .env
```

Then edit the `.env` file with your configuration:

```env
# MongoDB Connection URL
# For local MongoDB:
MONGODB_URL=mongodb://localhost:27017

# For MongoDB Atlas (recommended):
# MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net

# JWT Secret Key (use a strong random string)
JWT_KEY=your_super_secret_jwt_key_here_change_this

# Express Session Secret Key (use a strong random string)
SESSION_SECRET_KEY=your_super_secret_session_key_here_change_this

# Server Port
PORT=3000
```

**Important**: Replace the placeholder values with your actual credentials:
- `MONGODB_URL`: Your MongoDB connection string
- `JWT_KEY`: A strong random string (e.g., generated using `openssl rand -base64 32`)
- `SESSION_SECRET_KEY`: Another strong random string
- `PORT`: The port you want the server to run on (default: 3000)

### 4. Set Up MongoDB

**Option A: Local MongoDB**
- Ensure MongoDB is installed and running on your machine
- MongoDB should be accessible at `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string and update `MONGODB_URL` in `.env`
4. Whitelist your IP address in Atlas Network Access

### 5. Seed the Database with Test Data

To populate your database with sample users and chat conversations:

```bash
node seedData.js
```

This will create:
- **5 test users** with pre-configured conversations
- **Sample chat messages** between users
- **All necessary data** to explore the application immediately

**Test User Credentials:**

| Username | Email | Password |
|----------|-------|----------|
| Alice | alice@example.com | password123 |
| Bob | bob@example.com | password123 |
| Charlie | charlie@example.com | password123 |
| Diana | diana@example.com | password123 |
| Eve | eve@example.com | password123 |

### 6. Run the Application

**Development mode with auto-reload:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 7. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You can now:
1. Login with any of the test user credentials
2. View existing conversations
3. Send real-time messages
4. Create new chats with other users

## 📁 Project Structure

```
RM-Chatify/
├── app.js                      # Main application entry point
├── package.json                # Project dependencies and scripts
├── seedData.js                 # Database seeding script
├── .env.example                # Environment variables template
├── config/
│   ├── mongoose-connection.js  # MongoDB connection setup
│   └── multer-config.js        # File upload configuration
├── controllers/
│   └── user.js                 # User-related business logic
├── middlewares/
│   └── isUserLoggedIn.js       # Authentication middleware
├── models/
│   ├── chat-model.js           # Chat schema
│   ├── message-model.js        # Message schema
│   └── user-model.js           # User schema
├── routes/
│   ├── chatRoutes.js           # Chat-related routes
│   ├── messageRoutes.js        # Message-related routes
│   └── userRoutes.js           # User-related routes
├── utils/
│   └── generateUserToken.js    # JWT token generation utility
├── views/
│   ├── home.ejs                # Landing page
│   ├── login.ejs               # Login page
│   ├── signup.ejs              # Signup page
│   ├── userHome.ejs            # User dashboard with chat list
│   ├── userHomeChats.ejs       # Chat conversation page
│   └── notFound.ejs            # 404 page
└── public/
    ├── javascripts/            # Client-side JavaScript
    ├── stylesheets/            # CSS files
    └── images/                 # Static images
```

## 🎯 How to Use

### Creating a New Account
1. Navigate to `/users/signup`
2. Fill in your name, email, password, and upload a profile picture
3. Click "Sign Up" - you'll be automatically logged in

### Logging In
1. Navigate to `/users/login`
2. Enter your email and password
3. Click "Log In"

### Starting a Conversation
1. From your dashboard, enter a username in the "Start New Chat" field
2. Click "Create Chat"
3. The chat will appear in your chat list

### Sending Messages
1. Click on any chat from your chat list
2. Type your message in the input field
3. Messages are sent and received in real-time via Socket.IO

### Logging Out
- Click the "Logout" button from your dashboard

## 🔧 API Endpoints

### User Routes
- `GET /users/signup` - Signup page
- `POST /users/signup` - Create new user account
- `GET /users/login` - Login page
- `POST /users/login` - Authenticate user
- `GET /users/logout` - Logout user
- `GET /users/chats` - User dashboard (protected)
- `POST /users/chats/new` - Create new chat (protected)
- `GET /users/chats/:r_id` - View specific chat conversation (protected)

## 🔌 Socket.IO Events

### Client → Server
- `user_id` - Register user's socket connection
- `u_message` - Send a message
- `disconnect` - Handle user disconnection

### Server → Client
- `s_incoming` - Receive message as sender
- `r_incoming` - Receive message as receiver

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String,
  email: String,
  password: String,  // Hashed with bcrypt
  pic: Buffer,       // Profile picture
  chats: [ObjectId], // References to Chat documents
  date: Date
}
```

### Chat Schema
```javascript
{
  user_1: ObjectId,        // Reference to User
  user_1_name: String,
  user_2: ObjectId,        // Reference to User
  user_2_name: String,
  messages: [ObjectId],    // References to Message documents
  date: Date
}
```

### Message Schema
```javascript
{
  data: String,            // Message content
  sender: ObjectId,        // Reference to User
  reciever: ObjectId,      // Reference to User
  date: Date
}
```

## 🧪 Testing the Application

After seeding the database with test data:

1. **Login as Alice** (alice@example.com / password123)
   - You'll see existing chats with Bob and Charlie
   - Open a chat to view message history
   - Send a new message

2. **Open in another browser/incognito window**
   - Login as Bob (bob@example.com / password123)
   - Check the chat with Alice
   - Send a message and see it appear in real-time on Alice's screen

3. **Create a new chat**
   - Login as any user
   - Enter another user's username (e.g., "Diana")
   - Start chatting!

## 🚧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo systemctl status mongod` (Linux) or check Task Manager (Windows)
- Verify your `MONGODB_URL` in `.env` is correct
- For Atlas: Check IP whitelist and credentials

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change PORT in .env file
```

### Seed Script Issues
- Ensure MongoDB is running before executing `node seedData.js`
- Check that `.env` file is properly configured
- Clear the database manually if needed:
  ```javascript
  // In MongoDB shell
  use RM_chat
  db.dropDatabase()
  ```

### Socket.IO Not Working
- Check browser console for connection errors
- Ensure the server is running
- Verify firewall settings aren't blocking WebSocket connections

## 📝 Development Notes

### Key Implementation Details

1. **Real-time Communication**: Messages are sent via Socket.IO and stored in MongoDB when a user disconnects
2. **Authentication Flow**: JWT tokens are stored in cookies for session management
3. **Chat Creation**: Validates that chats don't already exist between two users
4. **Message Persistence**: Messages are batched and saved to database on socket disconnection

### Code Highlights

- **Bidirectional Chat Lookup**: Chats are searched in both directions (user_1 ↔ user_2)
- **Socket ID Mapping**: Maintains arrays mapping user IDs to socket IDs for targeted message delivery
- **Flash Messages**: User feedback via connect-flash for better UX
- **Profile Pictures**: Stored as Buffer in MongoDB for simplicity

## 🔒 Security Considerations

- Passwords are hashed using bcrypt with salt rounds of 12
- JWT tokens are used for stateless authentication
- Session secrets should be strong random strings in production
- Cookie-based authentication for HTTP requests
- Input validation on user registration and login

## 🌟 Future Enhancements

Potential features to add:
- [ ] Group chat functionality
- [ ] Message read receipts
- [ ] Typing indicators
- [ ] File/image sharing in chats
- [ ] User online/offline status
- [ ] Message search functionality
- [ ] Notification system
- [ ] Password reset functionality
- [ ] Email verification
- [ ] User blocking/reporting

## 👨‍💻 For Recruiters

This project demonstrates:
- **Full-stack development** with Node.js and Express
- **Real-time programming** using Socket.IO
- **Database design** and MongoDB/Mongoose proficiency
- **Authentication & Security** implementation
- **RESTful API** design
- **MVC architecture** pattern
- **Asynchronous JavaScript** and Promise handling
- **Version control** with Git
- **Documentation** and code organization

The application is fully functional and can be tested locally by following the setup instructions above. Feel free to explore the codebase and test the real-time messaging features!

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📧 Contact

**Ridham Khurana**
- GitHub: [@rmkhurana28](https://github.com/rmkhurana28)
- Email: [Your Email Here]

---

**Built with ❤️ by Ridham Khurana**
