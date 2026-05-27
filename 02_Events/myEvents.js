const EventEmitter = require("events");

const eventEmitter = new EventEmitter()

eventEmitter.on('greet', (username) => {
    console.log(`Hello ${username}, and welcome to evetns in node js`)
});


eventEmitter.once('pushnotify', () => {
    console.log("this event will run only once");
});

const myListener = () => console.log("i am a test listener");
eventEmitter.on("test", myListener)
eventEmitter.emit("test")
eventEmitter.emit("test")

eventEmitter.removeListener("test", myListener);
eventEmitter.emit("test") // this will not run

console.log(eventEmitter.listeners("test"))

// emit the events
// eventEmitter.emit('greet', 'Mahboob')
// eventEmitter.emit("pushnotify");  // run only once
// eventEmitter.emit("pushnotify"); 

