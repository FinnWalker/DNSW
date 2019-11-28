const participantModel = require("../models/participantModel");
const sanitize = require("mongo-sanitize");

module.exports = {
  create: function(req, res) {
    const player_name = sanitize(req.body.player_name);
    const home_team = sanitize(req.body.home_team);
    const away_team = sanitize(req.body.away_team);

    if (player_name && home_team && away_team) {
      participantModel.create(
        { player_name, home_team, away_team, top_score: 0 },
        function(err, participant) {
          if (err) {
            res.status(500).json({ message: "Error creating participant" });
          } else {
            res.status(200).json({ participant });
          }
        }
      );
    } else {
      res.status(400).json({ message: "Please include all fields" });
    }
  },
  players: function(req, res) {
    let players = [];
    participantModel.find({}, (err, participants) => {
      for (let participant of participants) {
        let player = {
          playerName: participant.player_name,
          homeTeam: participant.home_team,
          awayTeam: participant.away_team,
          topScore: participant.top_score
        };
        players.push(player);
      }
      res.json({ players });
    });
  },
  setScore: function(req, res) {
    const player_name = sanitize(req.body.playerName);
    const score = sanitize(req.body.score);
    participantModel.findOne({ player_name }, (err, participant) => {
      if (participant.top_score < score) {
        participant.top_score = score;
        participant.save();
      }
      res.json({ participant });
    });
  }
};
