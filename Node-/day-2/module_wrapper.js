// 1. Dekho Node.js ne is file ko kitne arguments diye hain
console.log("--- Module Wrapper Ke 5 Chhupaye Hue Tools ---");
console.log("Total Tools:", arguments.length); // Output aayega: 5

// 2. Wo 5 tools kaunse hain?
console.log("1. exports:", exports);
console.log("2. require function:", typeof require);
console.log("3. module object:", module.id);
console.log("4. __filename (Poora path):", __filename);
console.log("5. __dirname (Folder path):", __dirname);
