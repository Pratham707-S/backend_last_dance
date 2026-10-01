# 🚀 Node.js Day 1: Foundations & File System (`fs`)

Welcome to **Day 1** of your Backend Mastery journey! This document contains all the core concepts, practical code snippets, and deep explanations we covered.

---

## 📌 1. What is Node.js? (Node.js Kya Hai?)

> **Core Definition:** Node.js koi nayi programming language nahi hai. Yeh **JavaScript ka Runtime Environment** hai jo JS ko browser ke bahar (computer / server par) chalata hai.

* **History:** Pehle JavaScript sirf Browser (Chrome, Safari) me chalti thi. 2009 me **Ryan Dahl** ne Google Chrome ke **V8 Engine** ko nikala aur usme **C++** ke powerful features (File System, Networking, Operating System access) jod diye.
* **Purpose:** Web Servers, REST APIs, microservices aur database management ke liye use hota hai.

### 📊 Browser JS vs Node.js:
| Feature | Browser JS | Node.js |
| :--- | :--- | :--- |
| **Kahan run hota hai?** | Chrome, Safari, Firefox | Computer / Server |
| **Access/Control** | HTML, CSS, DOM, UI | Hard Drive, Files, Database, OS |
| **Objects available** | `window`, `document`, `alert` | `global`, `process`, `fs`, `http`, `os` |
| **Primary Goal** | User Interface & Interactions | Backend Business Logic & APIs |

---

## 📌 2. React.js vs Next.js vs Node.js

* **React.js (Frontend UI Library):** Client-side par chalti hai. Buttons, UI components aur Single Page Applications (SPA) banane ke liye.
* **Next.js (Full-Stack React Framework):** React ke upar bana hai. Server-Side Rendering (SSR), SEO friendly web pages aur simple API routes deta hai.
* **Node.js (Backend Runtime):** Pure backend server, scalable microservices, heavy logic aur database connectivity ke liye use hota hai.

---

## 📌 3. CommonJS Modules (`module.exports` & `require`)

Node.js me har file ek private module hoti hai. Ek file ka code doosri file me use karne ke liye export/import karna padta hai:

### 1️⃣ Exporting (`calculator.js`)
```javascript
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

// Jo functions bahar bhejne hain unhe module.exports me daalo
module.exports = {
    add,
    subtract,
    multiply
};
```

### 2️⃣ Importing (`app.js`)
```javascript
// Local file require karne ke liye "./" zaroori hai
const { add, subtract, multiply } = require("./calculator");

console.log("Add:", add(10, 20));       // 30
console.log("Sub:", subtract(50, 15));  // 35
console.log("Mul:", multiply(4, 5));    // 20
```

---

## 📌 4. File System Module (`fs`)

Node.js ka built-in `fs` module computer ki hard drive me files ke sath CRUD (Create, Read, Update, Delete) operations karne deta hai.

```javascript
const fs = require("fs"); // Built-in module (no need of ./)
```

### 📁 1. Create / Write File:
```javascript
// Sync (Blocking) - purani file ho toh overwrite karta hai
fs.writeFileSync("./notes.txt", "Day 1: Node.js Foundations!");

// Async (Non-blocking)
fs.writeFile("./notesAsync.txt", "Async File Data", (err) => {
    if (err) console.error("Error writing:", err);
    else console.log("Async file created!");
});
```

### 📖 2. Read File:
```javascript
// Sync - returns string when 'utf-8' is provided
const data = fs.readFileSync("./notes.txt", "utf-8");
console.log("File Data:", data);

// Async - runs callback when read finishes
fs.readFile("./notes.txt", "utf-8", (err, result) => {
    if (err) console.error("Error reading:", err);
    else console.log("Async Read Data:", result);
});
```

### ➕ 3. Append File (Naya data add karna bina purana mitaye):
```javascript
// Sync Append
fs.appendFileSync("./notes.txt", "\nNew line added!");

// Async Append
fs.appendFile("./log.txt", `User login at: ${new Date().toISOString()}\n`, (err) => {
    if (err) console.error("Error appending:", err);
});
```

---

## 📌 5. Sync (Blocking) vs Async (Non-Blocking)

Yeh backend ka sabse important concept hai:

```
[Sync Execution]
Line 1 ---> Line 2 (Heavy File Read: Server Waits ⏳) ---> Line 3 (Blocked!)

[Async Execution]
Line 1 ---> Line 2 (Background Thread reads file 🚀) ---> Line 3 runs immediately!
                                                └─> Callback runs when file is ready
```

### 🧪 Code Experiment (`syncVsAsync.js`):
```javascript
const fs = require("fs");

console.log("--- 1. Script Shuru Hui ---");

// Async file read background thread (libuv) me chala jata hai
fs.readFile("./notes.txt", "utf-8", (err, result) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("--- 3. (Async File Read Complete) ---");
        console.log("Data:", result);
    }
});

console.log("--- 2. Script Khatam Hui ---");
```

**Terminal Output Order:**
```text
--- 1. Script Shuru Hui ---
--- 2. Script Khatam Hui ---
--- 3. (Async File Read Complete) ---
Data: ...
```

---

## 🎯 Key Takeaways for Day 1:
1. `module.exports` se data bahar bhejo, `require()` se mangwao.
2. Built-in modules ke liye `./` nahi lagta (jaise `require("fs")`).
3. Production backend me hamesha **Async operations** prefer kiye jaate hain taaki server block na ho.


utf 8 = ka kam hota hai un binary numbers ko normal readable text me convert karna 
