const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost/dnsw";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    player_name: String,
    home_team: String,
    away_team: String
});

const participantModel = mongoose.model("Participant", ParticipantSchema);
const sanitize = require("mongo-sanitize");

const create = function(req, res) {
    const player_name = sanitize(req.body.player_name);
    const home_team = sanitize(req.body.home_team);
    const away_team = sanitize(req.body.away_team);
    
    if(player_name && home_team && away_team) {
        participantModel.create({player_name, home_team, away_team}, function(err, participant) {
            if(err) {
                res.status(500).json({message: "Error creating participant"});
            } else {
                res.status(200).json({participant});
            }
        });
    } else {
        res.status(400).json({message: "Please include all fields"});
    }
}

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'))
app.use('/', express.static('public'));


app.post('/player', create);

app.get('/player', (req, res) => {
    res.json({
        "playersRaw":
        [
          {
            "playerName": "Finn",
            "homeTeam": "Australia",
            "awayTeam": "England",
            "topScore": "25.69"
          },
          {
            "playerName": "Danuel",
            "homeTeam": "Bulgaria",
            "awayTeam": "Non Arians",
            "topScore": "1.01"
          },
          {
            "playerName": "Charlie",
            "homeTeam": "Motherland",
            "awayTeam": "Cis Gender",
            "topScore": "999.99"
          },
          {
            "playerName": "Angel",
            "homeTeam": "England",
            "awayTeam": "The EU",
            "topScore": "0.00"
          }
        ]
      });
})

const port = 8060;
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});



const io = require("socket.io").listen(server, {
    path: "/socket.io"
});

app.io = io;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('test');
    socket.on('test', (data) => {
        console.log('that was a test');
    });
});

