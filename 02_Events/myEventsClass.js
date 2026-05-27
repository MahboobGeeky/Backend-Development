const EventEmitter = require("events")

class Chat extends EventEmitter{
    sendMessage(msg){
        console.log(`Message sent: ${msg}`);
        this.emit('message Recieved')
    }
    
}

const chat = new Chat();

chat.on("message rcieved", (msg) => {
    console.log(`New Message: ${msg}`);

});

// trigger event

chat.sendMessage('Hello, Mahboob')