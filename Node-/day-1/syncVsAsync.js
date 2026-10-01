const fs = require("fs");

console.log("--- 1. Script start ho gayi ---");

// 🟢 Async Append (notes.txt me nayi line add karega)
fs.appendFile("./notes.txt", "\n new line form append!", (err) => {
    if (err) {
        console.log("Error aaya:", err);
    } else {
        console.log("--- 3. notes.txt me line successfully add ho gayi! ---");
    }
});

console.log("--- 2. Script khatam hui ---");
