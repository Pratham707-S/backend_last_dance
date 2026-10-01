const { log } = require("console");
const fs = require("fs/promises");



async function managefiles() {
    try{

        console.log("---1. File Writinh ---");

        await fs.writeFile("./superNotes.txt", "day 3 : doing avdance pratice of node.js")
        console.log("file creating done ");


        console.log("\n---2. file appending ---");

        await fs.appendFile("./superNotes.txt", "\n yeh line async/awit se add hui");
        console.log("new add line ho gai");

        console.log("\n--- 3. file reading ---");

        const data = await fs.readFile("/superNotes.txt", "utf-8");
        console.log("file content:\n" + data);


        console.log("\n--- 4.folder ke andra ki files check karna ---");

        const fileList = await fs.readdir("./");
        console.log("koi error aaye:", error.message);
        
        
        
        
        
        
        
        

    } catch (error){
        console.log("if any error than see here ",error.message);
        

    }
    
}

managefiles();
