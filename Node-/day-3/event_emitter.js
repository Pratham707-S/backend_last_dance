const EventEmitter = require("events");

const myEmitter = new EventEmitter();


myEmitter.on("userlogin", (username) =>{
    console.log(`welocom ${username}! notfication sent to email`);

    


})


myEmitter.on("userlogin", (username) =>{
    console.log(`bye ${username}! user logged out safely `);
    
})


console.log("--- simulating events ---");
myEmitter.emit("userlogin", "pratham");
myEmitter.emit("userlogout","pratham");
