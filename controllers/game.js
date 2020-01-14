const participantModel = require("../models/participantModel");
const sanitize = require("mongo-sanitize");
const formidable = require("formidable");
//const fs = require("fs");
//const path = require("path");
const nodemailer = require("nodemailer");

require("dotenv").config();

const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(process.env.TEST, "salt", 32);
const iv = crypto.scryptSync(process.env.TEST, "salt", 16);

function decrypt(text) {
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, "hex");
  decrypted += decipher.final();
  return decrypted.toString();
}

participantModel.findOne({ player_name: "Finn" }, (participant, err) => {
  if (err) console.log(err);
  else if (participant) {
    //console.log("participant found");
    //console.log(participant);
    participant.email = "finn3walker@gmail.com";
    participant.save().then(() => {
      //console.log("participant changed");
      //console.log(participant);
    });
  } else {
    console.log("fuck");
  }
});

async function email(email, name, image_path) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_PASSWORD
    }
  });

  let message = {
    from: "cricketemailtemp@gmail.com",
    to: email,
    subject: "Subject",
    html: `Hi, ${name}, here's your photo! <img alt="Your picture" border="0" src="cid:thumbnail" />`,
    attachments: [
      {
        filename: "thumbnail.jpg",

        path: image_path,

        cid: "thumbnail"
      }
    ]
  };
  let info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
}

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

    if (
      player_name &&
      first_name &&
      last_name &&
      date_of_birth &&
      post_code &&
      email &&
      home_team &&
      away_team
    ) {
      participantModel.create(
        {
          player_name,
          first_name,
          last_name,
          date_of_birth,
          post_code,
          email,
          home_team,
          away_team,
          top_score: 0
        },
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
    participantModel.find(
      {},
      null,
      { sort: { top_score: -1 } },
      (err, participants) => {
        for (let participant of participants) {
          let player = {
            playerName: participant.player_name,
            homeTeam: participant.home_team,
            awayTeam: participant.away_team,
            topScore: participant.top_score.toString()
            //email: participant.email
          };
          players.push(player);
        }
        res.json({ players });
      }
    );
  },
  setScore: function(req, res) {
    const player_name = sanitize(req.body.playerName);
    const score = sanitize(req.body.score);
    if (player_name && score) {
      participantModel.findOne({ player_name }, (err, participant) => {
        if (participant) {
          if (participant.top_score < score) {
            participant.top_score = score;
            participant.save();
          }
          res.json({ participant });
        } else {
          res.status(400).json({ message: "Player does not exist" });
        }
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
        const image_path = files.image.path;

        const player_name = sanitize(fields.playerName);
        /*
        const oldpath = files.image.path;
        const newpath = path.join(
          __dirname,
          "../images/" + player_name + ".png"
        );
        res.status(200).json({ message: "Image received" });
        fs.rename(oldpath, newpath, function(err) {
          if (err) throw err;
        });
        */
        participantModel.findOne(
          { player_name: fields.playerName },
          (err, participant) => {
            if (participant) {
              //console.log(decrypt(participant.email));
              console.log(participant.email);
              email(participant.email, player_name, image_path);
              res.json({ participant });
            } else {
              res.status(400).json({ message: "Player does not exist" });
            }
          }
        );
      } else {
        res.status(300).json({ message: "Please include all fields" });
      }
    });
  }
};
