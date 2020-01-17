require('dotenv').config();
const { createCipheriv, createDecipheriv, randomBytes } = require("crypto");
const algorithm = "aes-256-ctr";
const key = process.env.ENCRYPTION_KEY;
const inputEncoding = "utf8";
const outputEncoding = "hex";

module.exports.encrypt = value => {
  const iv = Buffer.from(randomBytes(16));
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(value, inputEncoding, outputEncoding);
  encrypted += cipher.final(outputEncoding);
  return `${iv.toString("hex")}:${encrypted.toString()}`;
};

module.exports.decrypt = value => {
  const textParts = value.split(":");

  //extract the IV from the first half of the value
  const IV = Buffer.from(textParts.shift(), outputEncoding);

  //extract the encrypted text without the IV
  const encryptedText = Buffer.from(textParts.join(":"), outputEncoding);

  //decipher the string
  const decipher = createDecipheriv(algorithm, key, IV);
  let decrypted = decipher.update(encryptedText, outputEncoding, inputEncoding);
  decrypted += decipher.final(inputEncoding);
  return decrypted.toString();
};