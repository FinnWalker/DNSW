require('dotenv').config();

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.TEST, 'salt', 32);
const iv = crypto.scryptSync(process.env.TEST, 'salt', 16);

function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return encrypted.toString('hex');
}

function decrypt(text) {
 let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
 let decrypted = decipher.update(text, 'hex');
 decrypted += decipher.final();
 return decrypted.toString();
}

var hw = encrypt("Some serious stuff")
console.log(hw)
console.log(decrypt(hw))

console.log(decrypt('537dc2f1fed38a8786e0b1eabcd14e1d8abfdd8c740fa9003b211f86450aa6af'));