const mongoose = require("mongoose");
require('dotenv').config();

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

const ciphers = require("../tools/ciphers");

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
  const participant = this;  
  if(participant.isModified("email")) this.participant = ciphers.encrypt(this.email);
  if(participant.isModified("first_name")) this.participant = ciphers.encrypt(this.first_name);
  if(participant.isModified("last_name")) this.participant = ciphers.encrypt(this.last_name);
  if(participant.isModified("date_of_birth")) this.participant = ciphers.encrypt(this.date_of_birth);
  if(participant.isModified("post_code")) this.participant = ciphers.encrypt(this.post_code);
  
  next();
});


module.exports = mongoose.model("Participant", ParticipantSchema);