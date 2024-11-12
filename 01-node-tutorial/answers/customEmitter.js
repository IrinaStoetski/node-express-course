const EventEmitter = require("events");

const emitter = new EventEmitter();

setInterval(() => {
  emitter.emit("myCustomEmit", "Hi I'm a custom event emitter");
}, 2000);

emitter.on("myCustomEmit", (msg) => console.log(msg));
