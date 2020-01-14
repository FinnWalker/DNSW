const mongoose = require("mongoose");
require('dotenv').config();

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.TEST, 'salt', 32);
const iv = crypto.scryptSync(process.env.TEST, 'salt', 16);

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
 }
 
 function decrypt(text) {
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, 'hex');
  decrypted += decipher.final();
  return decrypted.toString();
 }

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  player_name: String,
  first_name: String,
  last_name: String,
  date_of_birth: String,
  post_code: String,
  email: String,
  home_team: String,
  away_team: String,
  top_score: Number
});

ParticipantSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("email")) return next();

  this.email = encrypt(this.email);
  next();
});

module.exports = mongoose.model("Participant", ParticipantSchema);