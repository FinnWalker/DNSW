const mongoose = require("mongoose");
require('dotenv').config();

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
const iv = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 16);

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
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
  if (user.isModified("email"))this.email = encrypt(this.email);
  if (user.isModified("first_name")) this.first_name = encrypt(this.first_name);
  if (user.isModified("last_name")) this.last_name = encrypt(this.last_name);
  if (user.isModified("date_of_birth")) this.date_of_birth = encrypt(this.date_of_birth);
  if (user.isModified("post_code")) this.post_code = encrypt(this.post_code);
  next();
});

module.exports = mongoose.model("Participant", ParticipantSchema);