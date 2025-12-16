const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userModel = require('./models/user-model');
const chatModel = require('./models/chat-model');
const messageModel = require('./models/message-model');

// Connect to MongoDB
mongoose
    .connect(`${process.env.MONGODB_URL}/RM_chat`)
    .then(() => {
        console.log("✓ Database Connected Successfully!");
        seedDatabase();
    })
    .catch((err) => {
        console.log("✗ Database Connection Error:", err.message);
        process.exit(1);
    });

async function seedDatabase() {
    try {
        // Clear existing data
        console.log("\n🗑️  Clearing existing data...");
        await userModel.deleteMany({});
        await chatModel.deleteMany({});
        await messageModel.deleteMany({});
        console.log("✓ Existing data cleared");

        // Create test users
        console.log("\n👥 Creating test users...");
        
        const hashedPassword = await bcrypt.hash('password123', 12);
        
        const users = await userModel.create([
            {
                name: 'Alice',
                email: 'alice@example.com',
                password: hashedPassword,
                pic: Buffer.from(''),
            },
            {
                name: 'Bob',
                email: 'bob@example.com',
                password: hashedPassword,
                pic: Buffer.from(''),
            },
            {
                name: 'Charlie',
                email: 'charlie@example.com',
                password: hashedPassword,
                pic: Buffer.from(''),
            },
            {
                name: 'Diana',
                email: 'diana@example.com',
                password: hashedPassword,
                pic: Buffer.from(''),
            },
            {
                name: 'Eve',
                email: 'eve@example.com',
                password: hashedPassword,
                pic: Buffer.from(''),
            }
        ]);

        console.log(`✓ Created ${users.length} test users`);
        console.log("\nTest User Credentials:");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        users.forEach(user => {
            console.log(`Username: ${user.name.padEnd(10)} | Email: ${user.email.padEnd(25)} | Password: password123`);
        });
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        // Create chats between users
        console.log("💬 Creating chat conversations...");
        
        const chat1 = await chatModel.create({
            user_1: users[0]._id, // Alice
            user_2: users[1]._id, // Bob
            user_1_name: users[0].name,
            user_2_name: users[1].name,
        });

        const chat2 = await chatModel.create({
            user_1: users[0]._id, // Alice
            user_2: users[2]._id, // Charlie
            user_1_name: users[0].name,
            user_2_name: users[2].name,
        });

        const chat3 = await chatModel.create({
            user_1: users[1]._id, // Bob
            user_2: users[3]._id, // Diana
            user_1_name: users[1].name,
            user_2_name: users[3].name,
        });

        const chat4 = await chatModel.create({
            user_1: users[2]._id, // Charlie
            user_2: users[4]._id, // Eve
            user_1_name: users[2].name,
            user_2_name: users[4].name,
        });

        console.log(`✓ Created ${4} chat conversations`);

        // Create messages for Alice and Bob chat
        console.log("\n💭 Creating sample messages...");
        
        const aliceBobMessages = await messageModel.create([
            {
                data: "Hey Bob! How are you doing?",
                sender: users[0]._id,
                reciever: users[1]._id,
            },
            {
                data: "Hi Alice! I'm doing great, thanks! How about you?",
                sender: users[1]._id,
                reciever: users[0]._id,
            },
            {
                data: "I'm good too! Are you free this weekend?",
                sender: users[0]._id,
                reciever: users[1]._id,
            },
            {
                data: "Yes, I am! Do you have something in mind?",
                sender: users[1]._id,
                reciever: users[0]._id,
            },
            {
                data: "Let's catch up for coffee!",
                sender: users[0]._id,
                reciever: users[1]._id,
            },
        ]);

        // Create messages for Alice and Charlie chat
        const aliceCharlieMessages = await messageModel.create([
            {
                data: "Hey Charlie! Did you finish the project?",
                sender: users[0]._id,
                reciever: users[2]._id,
            },
            {
                data: "Almost done! Just need to add some final touches.",
                sender: users[2]._id,
                reciever: users[0]._id,
            },
            {
                data: "That's great! Let me know if you need any help.",
                sender: users[0]._id,
                reciever: users[2]._id,
            },
        ]);

        // Create messages for Bob and Diana chat
        const bobDianaMessages = await messageModel.create([
            {
                data: "Diana, did you see the new feature update?",
                sender: users[1]._id,
                reciever: users[3]._id,
            },
            {
                data: "Yes! It looks amazing. Great work!",
                sender: users[3]._id,
                reciever: users[1]._id,
            },
        ]);

        // Create messages for Charlie and Eve chat
        const charlieEveMessages = await messageModel.create([
            {
                data: "Eve, welcome to the team!",
                sender: users[2]._id,
                reciever: users[4]._id,
            },
            {
                data: "Thank you so much! Happy to be here.",
                sender: users[4]._id,
                reciever: users[2]._id,
            },
            {
                data: "If you need anything, feel free to ask!",
                sender: users[2]._id,
                reciever: users[4]._id,
            },
        ]);

        // Add messages to chats
        chat1.messages = aliceBobMessages.map(msg => msg._id);
        chat2.messages = aliceCharlieMessages.map(msg => msg._id);
        chat3.messages = bobDianaMessages.map(msg => msg._id);
        chat4.messages = charlieEveMessages.map(msg => msg._id);

        await chat1.save();
        await chat2.save();
        await chat3.save();
        await chat4.save();

        console.log(`✓ Created ${aliceBobMessages.length + aliceCharlieMessages.length + bobDianaMessages.length + charlieEveMessages.length} sample messages`);

        // Update users with their chats
        console.log("\n🔗 Linking chats to users...");
        
        users[0].chats = [chat1._id, chat2._id]; // Alice
        users[1].chats = [chat1._id, chat3._id]; // Bob
        users[2].chats = [chat2._id, chat4._id]; // Charlie
        users[3].chats = [chat3._id]; // Diana
        users[4].chats = [chat4._id]; // Eve

        await Promise.all(users.map(user => user.save()));
        
        console.log("✓ Successfully linked all chats to users");

        // Summary
        console.log("\n" + "═".repeat(50));
        console.log("🎉 SEED DATA CREATED SUCCESSFULLY!");
        console.log("═".repeat(50));
        console.log(`\n📊 Summary:`);
        console.log(`   • Users created: ${users.length}`);
        console.log(`   • Chats created: ${4}`);
        console.log(`   • Messages created: ${aliceBobMessages.length + aliceCharlieMessages.length + bobDianaMessages.length + charlieEveMessages.length}`);
        console.log(`\n✨ You can now login with any of the test users!`);
        console.log(`   Password for all users: password123\n`);

        process.exit(0);
    } catch (error) {
        console.error("\n✗ Error seeding database:", error);
        process.exit(1);
    }
}
