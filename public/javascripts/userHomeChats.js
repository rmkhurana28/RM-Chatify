


// const socket = new io("ws://localhost:3000", {
// const socket = new io("wss://rm-chatify.vercel.app", {  
//     transports: ["websocket"],
//     withCredentials: true
// });
const socket = io("https://rm-chatify-production.up.railway.app", {  
    transports: ["polling"],  // Switch from websocket to polling
    withCredentials: true
});



socket.on('connect', () => {
    if (user && user._id) {
        socket.emit('user_id', user._id);
    } else {
        console.error("User ID is undefined.");
    }
});



const newMessage = document.getElementById('newMessageData');
const sendMessageButton = document.getElementById('newMessageBtn');

sendMessageButton.addEventListener('click', () => {
    if (!user || !user._id) {
        console.error("Error: Sender (user) is undefined.");
        return;
    }
    if (!reciever || !reciever._id) {
        console.error("Error: Receiver is undefined.");
        return;
    }
    if (!newMessage.value.trim()) {
        console.error("Error: Message is empty.");
        return;
    }

    socket.emit('u_message', {        
        sender_id: user._id,
        reciever_id: reciever._id,
        data: newMessage.value,
    });    

    newMessage.value = '';
});


socket.on('s_incoming', (s_message) => {
    try {
        const parent = document.getElementById('chatMessages');

        const sender_div = document.createElement('div');
        sender_div.classList.add('sender');

        const sender_div_data = document.createElement('p');
        sender_div_data.innerText = s_message;

        const sender_div_image_div = document.createElement('div');
        sender_div_image_div.classList.add('imagee');

        const sender_div_image_div_img = document.createElement('img');

        if (user && user.pic && user.pic.data) {
            try {
                const arrayBufferView = new Uint8Array(user.pic.data);
                const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
                const reader = new FileReader();

                reader.onloadend = function() {
                    sender_div_image_div_img.src = reader.result;
                };

                reader.onerror = function() {
                    console.error("Error loading sender's profile picture");
                    sender_div_image_div_img.src = '/images/default.png';
                    sender_div_image_div_img.alt = 'pic issue';
                };

                reader.readAsDataURL(blob);
            } catch (err) {
                console.error("Error processing sender's profile picture:", err);
                sender_div_image_div_img.src = '/images/default.png';
                sender_div_image_div_img.alt = 'pic issue';
            }
        } else {
            console.warn("Warning: Sender's profile picture is missing.");
            sender_div_image_div_img.src = '/images/default.png';
            sender_div_image_div_img.alt = 'pic issue';
        }

        sender_div_image_div.appendChild(sender_div_image_div_img);
        sender_div.appendChild(sender_div_data);
        sender_div.appendChild(sender_div_image_div);
        parent.appendChild(sender_div);

        parent.scrollTop = parent.scrollHeight;

    } catch (err) {
        console.error("Error handling incoming message (s):", err);
    }
});

socket.on('r_incoming', (r_message) => {
    try {
        const parent = document.getElementById('chatMessages');

        const reciever_div = document.createElement('div');
        reciever_div.classList.add('reciever');

        const reciever_div_data = document.createElement('p');
        reciever_div_data.innerText = r_message;

        const reciever_div_image_div = document.createElement('div');
        reciever_div_image_div.classList.add('imagee');

        const reciever_div_image_div_img = document.createElement('img');

        if (reciever && reciever.pic && reciever.pic.data) {
            try {
                const arrayBufferView = new Uint8Array(reciever.pic.data);
                const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
                const reader = new FileReader();

                reader.onloadend = function() {
                    reciever_div_image_div_img.src = reader.result;
                };

                reader.onerror = function() {
                    console.error("Error loading receiver's profile picture");
                    reciever_div_image_div_img.src = '/images/default.png';
                    reciever_div_image_div_img.alt = 'pic issue';
                };

                reader.readAsDataURL(blob);
            } catch (err) {
                console.error("Error processing receiver's profile picture:", err);
                reciever_div_image_div_img.src = '/images/default.png';
                reciever_div_image_div_img.alt = 'pic issue';
            }
        } else {
            console.warn("Warning: Receiver's profile picture is missing.");
            reciever_div_image_div_img.src = '/images/default.png';
            reciever_div_image_div_img.alt = 'pic issue';
        }

        reciever_div_image_div.appendChild(reciever_div_image_div_img);
        reciever_div.appendChild(reciever_div_data);
        reciever_div.appendChild(reciever_div_image_div);
        parent.appendChild(reciever_div);

        parent.scrollTop = parent.scrollHeight;

    } catch (err) {
        console.error("Error handling incoming message (receiver):", err);
    }
});
