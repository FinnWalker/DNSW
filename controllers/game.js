const participantModel = require("../models/participantModel");
const sanitize = require("mongo-sanitize");
const formidable = require("formidable");
//const fs = require("fs");
//const path = require("path");
const nodemailer = require("nodemailer");

const ciphers = require("../tools/ciphers");

//async function email(email, name, image_path, image_path_2) {
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
    subject: `Hi ${name}, Thanks for playing!`,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" > <head> <meta http-equiv="Content-type" content="text/html; charset=utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <meta name="format-detection" content="date=no" /> <meta name="format-detection" content="address=no" /> <meta name="format-detection" content="telephone=no" /> <meta name="x-apple-disable-message-reformatting" /> <link href="https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i" rel="stylesheet" /> <title>Your Biggest Hit</title> <style type="text/css" media="screen"> /* Linked Styles */ body { padding: 0 !important; margin: 0 !important; display: block !important; min-width: 100% !important; width: 100% !important; background: #ffffff; -webkit-text-size-adjust: none; } a { color: #666666; font-weight: bold; text-decoration: none; } a:hover { text-decoration: underline; } p { padding: 0 !important; margin: 0 !important; } img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ } .mcnPreviewText { display: none !important; } /* Mobile styles */ @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) { .mobile-shell { width: 100% !important; min-width: 100% !important; } .bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; } .text-header, .m-center { text-align: center !important; } .center { margin: 0 auto !important; } .container { padding: 20px 10px !important; } .td { width: 100% !important; min-width: 100% !important; } .m-br-15 { height: 15px !important; } .p30-15 { padding: 30px 15px !important; } .p0-15-30 { padding: 0px 15px 30px 15px !important; } .mpb30 { padding-bottom: 30px !important; } .m-td, .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; } .m-block { display: block !important; } .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; } .column, .column-dir, .column-top, .column-empty, .column-empty2, .column-dir-top { float: left !important; width: 100% !important; display: block !important; } .column-empty { padding-bottom: 30px !important; } .column-empty2 { padding-bottom: 10px !important; } .content-spacing { width: 15px !important; } } </style> </head> <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background: white; -webkit-text-size-adjust:none;" > <table width="90%" style="margin: auto" border="0" cellspacing="0" cellpadding="0" bgcolor="white" > <tr> <td align="center" valign="top"> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-shell" > <tr> <td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;" > <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;" > <img src="https://shoreportal.com/dnsw/banner.jpg" border="0" width="100%" height="auto" alt="" /> </td> </tr> </table> <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" > <tr> <td style=""> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td class="p30-15" style=""> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td class="h1 pb25" style="color:#444444; font-weight: bold; font-family: Arial, Helvetica, sans-serif; font-size:25px; line-height:42px; text-align:center;" > YOUR BIGGEST HIT WAS ${score} </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="text-align: center; margin-top: 3vmin" > <tr> <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:center;" > <img style="margin: auto; padding: 1vmin" src="cid:thumbnail" border="0" width="80%" height="auto" alt="" /> </td> </tr> </table> <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" > <tr> <td style="padding-bottom: 10px;"> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td class="p30-15" style="padding: 60px 30px;"> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td class="h1 pb25" style="color:#444444; font-weight: bold; font-family: Arial, Helvetica, sans-serif; font-size:25px; line-height:42px; text-align:center; padding-bottom:25px;" > SHARE YOUR "BIGGEST HIT IN NSW" ON SOCIAL MEDIA AND TAG<br />#T20WORLDCUP #ILOVESYDNEY <hr /> </td> </tr> <tr> <td class="text-center pb25" style="color:#666666; font-family:Arial,sans-serif; font-size:16px; line-height:30px; text-align:center; padding-bottom:25px;" > Celebrate the ICC Woman’s T20 World Cup by attending all four match days in Sydney and checking out other Fan Zones across the city during the tournament! </span> </td> </tr> <tr> <td align="center"> <table class="center" border="0" cellspacing="0" cellpadding="0" style="text-align:center;" > <tr> <td class="text-button" style="background:#ee2364; color:white; font-weight: bold;font-family: Arial, Helvetica, sans-serif; font-size:14px; line-height:18px; padding:12px 15px; text-align:center; border-radius:0px; text-transform:uppercase;" > <a href="https://tickets.t20worldcup.com/content/wt20/home.aspx" target="_blank" class="link" style="color:white; text-decoration:none;" ><span class="link" style="color:white; text-decoration:none;" >GET YOUR TICKETS NOW</span ></a > </td> <td style="width: 50px">test</td> <td class="text-button" style="background:#ee2364; color:white; font-weight: bold;font-family: Arial, Helvetica, sans-serif; font-size:14px; line-height:18px; padding:12px 15px; text-align:center; border-radius:0px; text-transform:uppercase;" > <a href="https://www.sydney.com/t20worldcup" target="_blank" class="link" style="color:white; text-decoration:none;" ><span class="link" style="color:white; text-decoration:none;" >FREE FAN ZONE INFORMATION</span ></a > </td> </tr> </table> <hr style="margin-top: 4vmin" /> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td bgcolor="#ffffff"> <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl" style="direction: rtl;" > <tr> <th class="column-dir-top" dir="ltr" width="217" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr; vertical-align:top;" > <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;" > <img src="https://shoreportal.com/dnsw/Capture.PNG" width="450px" height="auto" border="0" alt="" /> </td> </tr> </table> </th> <th class="column-dir" dir="ltr" width="50" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr;" ></th> <th class="column-dir" dir="ltr" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr;" > <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td class="p30-15"> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td class="h3 pb20" style="color:#000000; font-weight:bold;font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:22px; text-align:left; padding-bottom:20px;" > Make great memories at Sydney's family-friendly attractions. </td> </tr> <tr> <td class="text pb20" style="color:#666666; font-family:Arial,sans-serif; font-size:14px; line-height:22px; text-align:left; padding-bottom:20px;" > Sydney is one of the best cities in the world for family fun, with family-friendly <a href="https://www.sydney.com/things-to-do/family-holidays/tours-for-kids?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >tours</a >, <a href="https://www.sydney.com/things-to-do/family-holidays/eating-out-with-kids?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >restaurants</a > and <a href="https://www.sydney.com/things-to-do/family-holidays/top-attractions-for-kids?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >attractions</a >. See sharks at <a href="https://www.sydney.com/destinations/sydney/sydney-city/darling-harbour/attractions/sea-life-sydney-aquarium?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >SEA LIFE Sydney Aquarium</a > or wild animals at <a href="https://www.sydney.com/destinations/sydney/sydney-city/darling-harbour/attractions/wild-life-sydney-zoo?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >WILD LIFE Sydney Zoo</a >.Take a glittering ferry trip to <a href="https://www.sydney.com/destinations/sydney/sydney-north/attractions/luna-park-sydney?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >Luna Park</a >, <a href="https://www.sydney.com/destinations/sydney/sydney-north/mosman/attractions/taronga-zoo?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >Taronga Zoo</a > or <a href="https://www.sydney.com/destinations/sydney/sydney-north/manly/beach-lifestyle?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >Manly Beach</a >. Board a submarine at the <a href="https://www.sydney.com/destinations/sydney/sydney-city/darling-harbour/attractions/australian-national-maritime-museum?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >National Maritime Museum</a >, see towering dinosaurs at the <a href="https://www.sydney.com/destinations/sydney/sydney-city/city-centre/attractions/australian-museum?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >Museum of Sydney</a >. There are <a href="https://www.sydney.com/things-to-do/family-holidays/free-things-to-do-in-sydney?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >free things to do</a > too, from walking trails around <a href="https://www.sydney.com/destinations/sydney/sydney-city/sydney-harbour?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >Sydney Harbour</a > to family friendly <a href="https://www.sydney.com/things-to-do/family-holidays/family-friendly-beaches?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >beaches</a >. Walk from the <a href="https://www.sydney.com/destinations/sydney/sydney-city/city-centre/attractions/royal-botanic-garden-and-the-domain?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >Botanic Garden</a > to the <a href="https://www.sydney.com/destinations/sydney/sydney-city/city-centre/attractions/art-gallery-new-south-wales?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >Art Gallery of NSW</a >, where entry is free and children can use online booklets to explore artworks. There are also many kid-friendly <a href="https://www.sydney.com/things-to-do/family-holidays/where-to-stay-with-kids?utm_source=https%3A%2F%2Fwww.t20worldcup.com%2F&utm_medium=EDM%201&utm_campaign=ICC%20T20%20Womens%20Cricket%20World%20Cup%202020" >accommodation options</a >.<br /><br /> <a href="https://www.sydney.com/" >FIND OUT MORE</a > </td> </tr> </table> </td> </tr> </table> </th> <th class="column" width="50" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;" ></th> </tr> </table> </td> </tr> </table> <table width="100%" style="margin: auto" border="0" cellspacing="0" cellpadding="0" > <tr> <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:center;" > <img src="https://shoreportal.com/dnsw/DNSW.png" width="200px" height="auto" border="0" alt="" /> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body> </html>`,
    attachments: [
      {
        filename: "thumbnail.jpg",
        path: image_path,
        cid: "thumbnail"
      }
      // {
      //   filename: "thumbnail_2.jpg",
      //   path: image_path_2,
      //   cid: "thumbnail_2"
      // }
    ]
  };
  let info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  create: async function(req, res) {
    const player_name = sanitize(req.body.player_name);
    const name = sanitize(req.body.name);
    const date_of_birth = sanitize(req.body.date_of_birth);
    const state = sanitize(req.body.state);
    const email = sanitize(req.body.email);
    const home_team = sanitize(req.body.home_team);
    const away_team = sanitize(req.body.away_team);
    const info_checkbox = sanitize(req.body.info_checkbox);

    if (
      player_name &&
      name &&
      date_of_birth &&
      state &&
      email &&
      home_team &&
      away_team &&
      info_checkbox
    ) {
      await participantModel
        .findOne({ player_name })
        .exec()
        .then(player => {
          if (player) {
            console.log(player);
            res.status(400).json({ message: "Name taken" });
          } else {
            console.log(info_checkbox);
            participantModel.create(
              {
                player_name,
                name,
                date_of_birth,
                state,
                email,
                info_checkbox: info_checkbox === "True",
                home_team,
                away_team,
                top_score: 0
              },
              function(err, participant) {
                if (err) {
                  console.log(err);
                  res
                    .status(500)
                    .json({ message: "Error creating participant" });
                } else {
                  participant.scores.push({ score: 0, timestamp: 0 });
                  participant
                    .save()
                    .then(res.status(200).json({ participant }));
                }
              }
            );
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Error creating participant" });
        });
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
          let best_score = 0;
          for (let score of participant.scores) {
            if (score.score > best_score) best_score = score.score;
          }
          let player = {
            playerName: participant.player_name,
            homeTeam: participant.home_team,
            awayTeam: participant.away_team,
            topScore: best_score.toFixed(2)
            //email: participant.email
          };
          players.push(player);
        }
        res.json({
          players: players.sort((a, b) => b.topScore - a.topScore)
        });
      }
    );
  },
  playersExtra: function(req, res) {
    let players = [];
    let start_date = sanitize(req.body.start_date);
    let end_date = sanitize(req.body.end_date);
    if (!start_date) start_date = 0;
    if (!end_date) end_date = 999999999999999;
    participantModel.find(
      {},
      null,
      { sort: { top_score: -1 } },
      (err, participants) => {
        for (let participant of participants) {
          console.log(participant.scores);
          let scores = [];
          for (let score of participant.scores) {
            if (
              score.timestamp > parseInt(start_date) &&
              score.timestamp < parseInt(end_date)
            ) {
              scores.push(score.score);
            }
          }

          if (scores.length > 0) {
            let player = {
              playerName: participant.player_name,
              homeTeam: participant.home_team,
              awayTeam: participant.away_team,
              topScore: Math.max(...scores).toFixed(2)
              //email: participant.email
            };
            players.push(player);
          }
        }
        res.json({
          players: players.sort((a, b) => b.topScore - a.topScore)
        });
      }
    );
  },
  setScore: function(req, res) {
    const player_name = sanitize(req.body.playerName);
    const score = sanitize(req.body.score);
    let timestamp = sanitize(req.body.timestamp);
    if (!timestamp) timestamp = 0;
    if (player_name && score) {
      participantModel.findOne({ player_name }, (err, participant) => {
        if (participant) {
          participant.scores.push({ score, timestamp });
          participant.save().then(res.json({ participant }));
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
        //} else if (files.image && fields.playerName && files.image_2) {
      } else if (files.image_2 && fields.playerName) {
        const image_path = files.image_2.path;
        //const image_path_2 = files.image_2.path;
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
              const score =
                participant.scores[participant.scores.length - 1].score;
              email(
                ciphers.decrypt(participant.email),
                player_name,
                image_path,
                score
                //image_path_2
              );

              /*
              res.json({
                first_name: decrypt(participant.first_name),
                last_name: decrypt(participant.last_name),
                date_of_birth: decrypt(participant.date_of_birth),
                post_code: decrypt(participant.post_code),
                email: decrypt(participant.email)
              });
              */
              res.status(200).json({ message: "image received" });
            } else {
              res.status(400).json({ message: "Player does not exist" });
            }
          }
        );
      } else {
        res.status(300).json({ message: "Please include all fields" });
      }
    });
  },
  data: (req, res) => {
    participantModel
      .find()
      .exec()
      .then(participants => {
        let data = [];
        for (let participant of participants) {
          data.push({
            player_name: participant.player_name,
            name: ciphers.decrypt(participant.name),
            date_of_birth: ciphers.decrypt(participant.date_of_birth),
            state: ciphers.decrypt(participant.state),
            email: ciphers.decrypt(participant.email),
            info_checkbox: participant.info_checkbox,
            home_team: participant.home_team,
            away_team: participant.away_team,
            top_score: participant.top_score
          });
        }
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error finding participant" });
      });
  }
};
