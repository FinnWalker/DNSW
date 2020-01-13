const participantModel = require("../models/participantModel");
const sanitize = require("mongo-sanitize");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

module.exports = {
  create: function(req, res) {
    const player_name = sanitize(req.body.player_name);
    const first_name = sanitize(req.body.first_name);
    const last_name = sanitize(req.body.last_name);
    const date_of_birth = sanitize(req.body.date_of_birth);
    const post_code = sanitize(req.body.post_code);
    const email = sanitize(req.body.email);
    const home_team = sanitize(req.body.home_team);
    const away_team = sanitize(req.body.away_team);

    if (player_name && && first_name && last_name && date_of_birth && post_code && email && home_team && away_team) {
      participantModel.create(
        { player_name, first_name, last_name, date_of_birth, post_code, email, home_team, away_team, top_score: 0 },
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
    participantModel.find({}, null, {sort: {'top_score': -1}}, (err, participants) => {
      for (let participant of participants) {
        let player = {
          playerName: participant.player_name,
          homeTeam: participant.home_team,
          awayTeam: participant.away_team,
          topScore: participant.top_score.toString(),
          email: participant.email
        };
        players.push(player);
      }
      res.json({ players });
    });
  },
  setScore: function(req, res) {
    const player_name = sanitize(req.body.playerName);
    const score = sanitize(req.body.score);
    if (player_name && score) {
      participantModel.findOne({ player_name }, (err, participant) => {
        if (participant.top_score < score) {
          participant.top_score = score;
          participant.save();
        }
        res.json({ participant });
      });
    } else {
      res.status(400).json({ message: "Please include all fields" });
    }
  },
  sendImage: (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err);
      } else if (files.image && fields.playerName) {
        const player_name = sanitize(fields.playerName);
        const oldpath = files.image.path;
        const newpath = path.join(__dirname, "../images/" + player_name + ".png");
        res.status(200).json({ message: "Image received" });
        fs.rename(oldpath, newpath, function(err) {
          if (err) throw err;
        });
      } else {
        res.status(300).json({ message: "Please include all fields" });
      }
    });
  }
};
