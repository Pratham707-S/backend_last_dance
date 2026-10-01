const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
   
    const log = `[${new Date().toLocaleTimeString()}] User visited: ${req.url}\n`;
    fs.appendFile("./log.txt", log, (err) => {
        if (err) console.log("Log Error:", err);
    });

    // 2. Routing Logic
    if (req.url === "/") {
        res.end("Welcome to Home Page! ");
    } else if (req.url === "/about") {
        res.end("About Page: Pratham Backend Journey ");
    } else if (req.url === "/contact") {
        res.end("Contact: 902277789fuck u-- ");
    } else {
        res.end("404: Page Not Found ");
    }
});

// Server Listen
server.listen(8000, () => {
    console.log("Server running at: http://localhost:8000");
});
