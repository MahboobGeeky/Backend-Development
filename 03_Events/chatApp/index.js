const ChatRoom = require("./chatRoom.js")

const chat = new ChatRoom()

chat.on('join', (user) => {
    console.log(`${user} has joined the chat`);
})

chat.on('message', (user, message) => {
    console.log(`${user}: ${message}`);
})

chat.on('leave', (user) => {
    console.log(`${user} Leaved the chat`);
})


// simulating the chat
chat.join('Mahboob'); 
chat.join('Thomas')
chat.sendMessage('Mahboob', 'Hi buddy...')
chat.sendMessage('Thomas', 'Hi whatsapp man...')

chat.join('jack')
chat.leave('Mahboob')
chat.sendMessage('Mahboob', "whats going on")