const socket = new io();

socket.emit('user_id' , user._id);

const newMessage = document.getElementById('newMessageData');
const sendMessageButton = document.getElementById('newMessageBtn');

sendMessageButton.addEventListener('click' , () => {
    socket.emit('u_message' , {
        sender_id : user._id,
        reciever_id : reciever._id,
        data : newMessage.value,
    })
    newMessage.value = '';
})

socket.on('s_incoming' , (s_message) => {
    console.log('message from server (s) is :', s_message);
    const parent = document.getElementById('chatMessages');
    const sender_div = document.createElement('div');
    sender_div.classList.add('sender');
    const sender_div_data = document.createElement('p');
    sender_div_data.innerText = s_message;
    const sender_div_image_div = document.createElement('div');
    sender_div_image_div.classList.add('imagee');
    const sender_div_image_div_img = document.createElement('img')
    sender_div_image_div_img.src = 'data:image/jpeg;base64,' + btoa(String.fromCharCode(...new Uint8Array(user.pic.data)));
    sender_div_image_div_img.alt = 'not found';
    sender_div_image_div.appendChild(sender_div_image_div_img);
    sender_div.appendChild(sender_div_data);
    sender_div.appendChild(sender_div_image_div);
    parent.appendChild(sender_div);
    parent.scrollTop = parent.scrollHeight;
})
socket.on('r_incoming' , (r_message) => {
    console.log('message from server (r) is :', r_message);
    const parent = document.getElementById('chatMessages');
    const reciever_div = document.createElement('div');
    reciever_div.classList.add('reciever');
    const reciever_div_data = document.createElement('p');
    reciever_div_data.innerText = r_message;
    const reciever_div_image_div = document.createElement('div');
    reciever_div_image_div.classList.add('imagee');
    const reciever_div_image_div_img = document.createElement('img')
    reciever_div_image_div_img.src = 'data:image/jpeg;base64,' + btoa(String.fromCharCode(...new Uint8Array(reciever.pic.data)));
    reciever_div_image_div_img.alt = 'not found';
    reciever_div_image_div.appendChild(reciever_div_image_div_img);
    reciever_div.appendChild(reciever_div_data);
    reciever_div.appendChild(reciever_div_image_div);
    parent.appendChild(reciever_div);
    parent.scrollTop = parent.scrollHeight;
})