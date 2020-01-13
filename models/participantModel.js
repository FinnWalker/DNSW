const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  player_name: String,
  first_name: String,
  last_name: String,
  date_of_birth: String,
  post_code: String,
  home_team: String,
  away_team: String,
  top_score: Number
});

module.exports = mongoose.model("Participant", ParticipantSchema);