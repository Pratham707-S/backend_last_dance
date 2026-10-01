const { log } = require("console");
const fs = require("fs");


console.log(" --- File System Demo ---");


fs.writeFileSync("./notes.txt", "Day 1: Node.js doing bitch");


console.log("File created succesfully ");

