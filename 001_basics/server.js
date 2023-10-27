//console.log("Hello world");
// console.log(global);

const os = require("os");
const path = require("path");
const { add, substract, multiply, divide } = require("./math");
// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));

console.log(add(5, 2));
console.log(substract(5, 2));
console.log(multiply(14, 12));
console.log(divide(144, 12));
