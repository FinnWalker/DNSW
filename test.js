const crypto = require("crypto");
console.log(crypto.scryptSync(crypto.randomBytes(24), crypto.randomBytes(24), 32));