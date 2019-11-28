const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost/dnsw";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  player_name: String,
  home_team: String,
  away_team: String,
  top_score: String
});

const participantModel = mongoose.model("Participant", ParticipantSchema);
const sanitize = require("mongo-sanitize");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use("/", express.static("public"));

function verifyRequest(req, res, next) {
  if (req.headers["accesskey"] === "SpringWall") {
    next();
  } else {
    console.log(req.headers);
    res.status(400).json({ message: "Access denied" });
  }
}

const game_controller = require("./controllers/game");

app.post("/dnsw/player", verifyRequest, game_controller.create);

app.get("/dnsw/players", verifyRequest, game_controller.players);

app.post("/dnsw/set_score", verifyRequest, game_controller.setScore);

const port = 8060;
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});

const io = require("socket.io").listen(server, {
  path: "/socket.io"
});

app.io = io;

io.on("connection", socket => {
  console.log("a user connected");
  socket.emit("test");
  socket.on("test", data => {
    console.log("that was a test");
  });
});
