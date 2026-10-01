const os = require("os");


console.log("--- os.platform() ---", os.platform());
console.log("--- os.totalmen() ---", os.totalmem());

const totalRamGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
const freeRamGB = (os.freemem() / (1024 ** 3)).toFixed(2);

console.log(`Total RAM: ${totalRamGB} GB`);
console.log(`Free RAM: ${freeRamGB} GB`);
