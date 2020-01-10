const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  player_name: String,
  home_team: String,
  away_team: String,
  top_score: Number
});

module.exports = mongoose.model("Participant", ParticipantSchema);