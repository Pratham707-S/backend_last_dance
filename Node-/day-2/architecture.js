const crypto = require("crypto");

const start = Date.now();



crypto.pbkdf2("password", "salt1", 100000, 1024, "sha512", () => {
    console.log(`1. Password Hash Done: ${Date.now() - start}ms`);
});

// Task 2
crypto.pbkdf2("password", "salt1", 100000, 1024, "sha512", () => {
    console.log(`2. Password Hash Done: ${Date.now() - start}ms`);
});

// Task 3
crypto.pbkdf2("password", "salt1", 100000, 1024, "sha512", () => {
    console.log(`3. Password Hash Done: ${Date.now() - start}ms`);
});

// Task 4
crypto.pbkdf2("password", "salt1", 100000, 1024, "sha512", () => {
    console.log(`4. Password Hash Done: ${Date.now() - start}ms`);
});


// Task 5 (Iske paas worker nahi hoga, isko wait karna padega!)
crypto.pbkdf2("password", "salt1", 100000, 1024, "sha512", () => {
    console.log(`5. Password Hash Done: ${Date.now() - start}ms`);
});

