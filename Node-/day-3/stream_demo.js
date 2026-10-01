const fs = require("fs");


console.log("--- 1. creating a read stream ---");

const readmeStream = fs.createReadStream("./superNotes.txt",{
    encoding: "utf-8",
    highWaterMark:16
})


let chunkCount = 0;



readmeStream.on("data", (chunk) =>{
    chunkCount++;
    console.log(`\n chunk #${chunkCount} ayaa:`);
    console.log(chunk);

});


readmeStream.on("end", () =>{
    console.log(`\n poorri file stream ho gai! total chunks 
        ${chunkCount}`)
});


readmeStream.on("error", (err) =>{
    console.log("strem error", err.message);
    
})
