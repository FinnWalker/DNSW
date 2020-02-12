const mongoose = require("mongoose");
require("dotenv").config();

const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const iv = Buffer.from(process.env.ENCRYPTION_IV, "hex");

const ciphers = require("../tools/ciphers");

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  player_name: String,
  name: String,
  date_of_birth: String,
  state: String,
  email: String,
  info_checkbox: Boolean,
  home_team: String,
  away_team: String,
  scores: {
    score: Number,
    timestamp: Number
  }
});

ParticipantSchema.pre("save", function(next) {
  const participant = this;
  if (participant.isModified("email")) this.email = ciphers.encrypt(this.email);
  if (participant.isModified("name")) this.name = ciphers.encrypt(this.name);
  if (participant.isModified("date_of_birth"))
    this.date_of_birth = ciphers.encrypt(this.date_of_birth);
  if (participant.isModified("state")) this.state = ciphers.encrypt(this.state);

  next();
});

module.exports = mongoose.model("Participant", ParticipantSchema);
