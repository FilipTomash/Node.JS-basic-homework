import { EventEmitter } from "node:events";

const emitter = new EventEmitter();

emitter.on("event", () => {
  console.log("event fired");
});

emitter.on("data", (data) => {
  console.log("data event fired");
  console.log(data);
});

emitter.on("full-name", (firstName, lastName) => {
  console.log("full-name event fired");
  console.log(`${firstName} ${lastName}`);
});

emitter.on("function", function () {
  console.log("From function event");
  console.log(this);
});

emitter.on("arrow", () => {
  console.log("From arrow event");
  console.log(this);
});

emitter.emit("function");
emitter.emit("arrow");
