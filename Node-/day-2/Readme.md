# 🚀 Node.js Day 2: Architecture & Web Server Mastery

> **Goal:** Node.js ka under-the-hood architecture samajhna aur apna pehla HTTP Web Server banana.

---

## 🗺️ Day 2 Quick Summary Card

| Topic | Key Concept | Use Case |
| :--- | :--- | :--- |
| **1. Global Paths & Timers** | `__dirname`, `__filename`, `setTimeout`, `setInterval` | File paths resolve karna & scheduling |
| **2. Module Wrapper** | Hidden IIFE `(function(exports, require...))` | Har file ko private scope dena |
| **3. HTTP Web Server** | `http.createServer((req, res) => {})` | Browser se request lena & response dena |
| **4. Multi-Routing** | `req.url` (`/`, `/about`, `/contact`, `404`) | URL ke hisaab se alag page dikhana |
| **5. Visitor Logger** | `fs.appendFile("./log.txt", ...)` | Non-blocking real-time logging |
| **6. Thread Pool (Libuv)** | Default 4 Worker Threads | Heavy CPU tasks (Password Hashing) handle karna |

---

## 📌 1. Global Objects & Special Paths

Node.js me `window` nahi hota, balki `global` object hota hai.

### 🖼️ Folder Path vs File Path Diagram:
```
/Users/pratham/backend-mastery/Node-/day-2/index.js
┌────────────────────────────────────────┐ ┌──────┐
│               __dirname                │ │      │
│     (Current Folder Ka Poora Path)     │ │      │
└────────────────────────────────────────┘ └──────┘
┌─────────────────────────────────────────────────┐
│                   __filename                    │
│          (File Ka Poora Absolute Path)          │
└─────────────────────────────────────────────────┘
```

### ⏱️ Timers (`setTimeout` vs `setInterval`):
* **`setTimeout`** ───► Diye gaye delay ke baad **Sirf 1 Baar** chalta hai.
* **`setInterval`** ───► Har interval par **Baar-Baar Repeat** hota rehta hai (Stop karne ke liye `clearInterval`).

```javascript
// 1. Folder aur File paths
console.log("Folder Path:", __dirname);
console.log("File Path:", __filename);

// 2. setTimeout (2 second delay)
setTimeout(() => {
    console.log("⏰ 2 second baad chala!");
}, 2000);

// 3. setInterval (Har 1s me tick-tick)
let count = 1;
const timer = setInterval(() => {
    console.log(`⏱️ Count: ${count}`);
    count++;
    if (count > 3) {
        clearInterval(timer); // 3 ke baad stop
        console.log("🛑 Timer Stopped!");
    }
}, 1000);
```

---

## 📌 2. Module Wrapper Function (Behind The Scenes)

> ❓ **Sawal:** `require`, `module.exports`, `__dirname` bina import kiye har file me kaise chalte hain?

### 💡 Visual Box Concept:
Node.js tumhari file ko run karne se pehle ek **Hidden Function** ke andar pack kar deta hai:

```
┌────────────────────────────────────────────────────────────────────────┐
│ (function (exports, require, module, __filename, __dirname) {          │
│                                                                        │
│     // 👇 TUMHARI FILE KA CODE YAHAN EXECUTE HOTA HAI                  │
│     console.log("Hello Node.js");                                      │
│                                                                        │
│ });                                                                    │
└────────────────────────────────────────────────────────────────────────┘
```

### 💻 Proof Code (`module_wrapper.js`):
```javascript
// Node.js ne is file ko 5 hidden tools pass kiye hain:
console.log("Total Tools Given by Node.js:", arguments.length); // 5

console.log("1. exports:", exports);
console.log("2. require:", typeof require);
console.log("3. module:", module.id);
console.log("4. __filename:", __filename);
console.log("5. __dirname:", __dirname);
```

---

## 📌 3. HTTP Web Server & Client-Server Architecture

### 🔄 Request-Response Lifecycle:
```
  [ 👤 User / Chrome Browser ]
              │
              │  1. HTTP Request (req) ──► GET http://localhost:8000/about
              ▼
  [ 🖥️ Node.js Server (Port 8000) ]
              │
              ├─► 2. Backend check karta hai: req.url === "/about"
              ├─► 3. Background me log.txt me entry append karta hai
              │
              │  4. HTTP Response (res) ──► res.end("About Page: Pratham")
              ▼
  [ 👤 Browser Displays Text & Stops Spinner ]
```

---

### 💻 Multi-Route Server with Real-Time Logging (`index.js`):

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    // 1. Automatic favicon requests ignore karo
    if (req.url === "/favicon.ico") return res.end();

    // 2. Visitor Logging (Async Non-blocking)
    const log = `[${new Date().toLocaleTimeString()}] Visited: ${req.url}\n`;
    fs.appendFile("./log.txt", log, (err) => {
        if (err) console.log("Log Error:", err);
    });

    // 3. Routing (URL matching)
    if (req.url === "/") {
        res.end("Welcome to Home Page! 🏠");
    } else if (req.url === "/about") {
        res.end("About Page: Pratham Backend Journey 🚀");
    } else if (req.url === "/contact") {
        res.end("Contact: pratham@example.com 📞");
    } else {
        res.end("404: Page Not Found ❌");
    }
});

// Server Listen on Port 8000
server.listen(8000, () => {
    console.log("Server running at: http://localhost:8000");
});
```

---

## 📌 4. Node.js Under The Hood (Event Loop & Thread Pool)

### 🏗️ Architecture Blueprint:
```
┌────────────────────────────────────────────────────────────────────────┐
│                        Node.js Runtime                                 │
├──────────────────────────────────┬─────────────────────────────────────┤
│      V8 Engine (Google)          │         Libuv (C++ Library)         │
│  - Executes JavaScript Code      │  - Event Loop (Orchestrator)        │
│  - Single Threaded Call Stack    │  - Worker Thread Pool (4 Threads)   │
└──────────────────────────────────┴─────────────────────────────────────┘
```

---

### 🧪 Live Proof: 5-Password Hash Experiment (`architecture.js`)

Node.js me heavy task ke liye **by default 4 workers** hote hain (`UV_THREADPOOL_SIZE = 4`).

```
Wave 1 (Ek Sath 4 Tasks ~600ms):
┌───────────┐ ───► [ Worker 1 ] ───► Done (~620ms)
│  Task 1   │
├───────────┤ ───► [ Worker 2 ] ───► Done (~630ms)
│  Task 2   │
├───────────┤ ───► [ Worker 3 ] ───► Done (~635ms)
│  Task 3   │
├───────────┤ ───► [ Worker 4 ] ───► Done (~640ms)
│  Task 4   │
└───────────┘

Wave 2 (Line Me Wait Karega):
┌───────────┐
│  Task 5   │ ───► [ No Free Worker ⏳ ] ───► Worker Free Hua ───► Done (~1248ms) 🚨
└───────────┘
```

### 💻 Code (`architecture.js`):
```javascript
const crypto = require("crypto");
const start = Date.now();

// 4 Tasks run in parallel (Threads 1 to 4)
crypto.pbkdf2("pass", "salt", 100000, 1024, "sha512", () => {
    console.log(`1. Done: ${Date.now() - start}ms`);
});
crypto.pbkdf2("pass", "salt", 100000, 1024, "sha512", () => {
    console.log(`2. Done: ${Date.now() - start}ms`);
});
crypto.pbkdf2("pass", "salt", 100000, 1024, "sha512", () => {
    console.log(`3. Done: ${Date.now() - start}ms`);
});
crypto.pbkdf2("pass", "salt", 100000, 1024, "sha512", () => {
    console.log(`4. Done: ${Date.now() - start}ms`);
});

// 5th Task has no free thread, so it MUST WAIT in queue!
crypto.pbkdf2("pass", "salt", 100000, 1024, "sha512", () => {
    console.log(`5. Done: ${Date.now() - start}ms`);
});
```

### 📊 Actual Terminal Output:
```text
1. Done: 620ms
2. Done: 630ms
3. Done: 635ms
4. Done: 640ms
5. Done: 1248ms  <-- 🚨 Double time because it waited for Worker 1 to finish!
```

---

## 🎯 Day 2 Revision Checklist
* [x] `__dirname` = Folder Path, `__filename` = File Path
* [x] Node.js wraps code in an IIFE providing 5 hidden arguments
* [x] `http.createServer` handles requests (`req`) and sends response (`res.end`)
* [x] `res.end()` is mandatory to close the connection
* [x] `fs.appendFile` logs visitor entries without deleting previous logs
* [x] Libuv has **4 Worker Threads** by default for heavy CPU operations
