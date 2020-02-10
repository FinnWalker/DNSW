const participantModel = require("../models/participantModel");
const sanitize = require("mongo-sanitize");
const formidable = require("formidable");
//const fs = require("fs");
//const path = require("path");
const nodemailer = require("nodemailer");

const ciphers = require("../tools/ciphers");

async function email(email, name, image_path, image_path_2) {
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
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns:v="urn:schemas-microsoft-com:vml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" /> <meta name="viewport" content="width=600,initial-scale = 2.3,user-scalable=no"> <!--[if !mso]><!-- --> <link href='https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700' rel="stylesheet"> <link href='https://fonts.googleapis.com/css?family=Quicksand:300,400,700' rel="stylesheet"> <!-- <![endif]--> <title>Thanks for playing!</title> <style type="text/css"> body { width: 100%; background-color: #ffffff; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; mso-margin-top-alt: 0px; mso-margin-bottom-alt: 0px; mso-padding-alt: 0px 0px 0px 0px; } p, h1, h2, h3, h4 { margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; } span.preheader { display: none; font-size: 1px; } html { width: 100%; } table { font-size: 14px; border: 0; } /* ----------- responsivity ----------- */ @media only screen and (max-width: 640px) { /*------ top header ------ */ .main-header { font-size: 20px !important; } .main-section-header { font-size: 28px !important; } .show { display: block !important; } .hide { display: none !important; } .align-center { text-align: center !important; } .no-bg { background: none !important; } /*----- main image -------*/ .main-image img { width: 440px !important; height: auto !important; } /* ====== divider ====== */ .divider img { width: 440px !important; } /*-------- container --------*/ .container590 { width: 440px !important; } .container580 { width: 400px !important; } .main-button { width: 220px !important; } /*-------- secions ----------*/ .section-img img { width: 320px !important; height: auto !important; } .team-img img { width: 100% !important; height: auto !important; } } @media only screen and (max-width: 479px) { /*------ top header ------ */ .main-header { font-size: 18px !important; } .main-section-header { font-size: 26px !important; } /* ====== divider ====== */ .divider img { width: 280px !important; } /*-------- container --------*/ .container590 { width: 280px !important; } .container590 { width: 280px !important; } .container580 { width: 260px !important; } /*-------- secions ----------*/ .section-img img { width: 280px !important; height: auto !important; } } </style> <!-- [if gte mso 9]><style type=”text/css”> body { font-family: arial, sans-serif!important; } </style> <![endif]--> </head> <body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"> <!-- header --> <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color"> <tr> <td align="center"> <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590"> <tr> <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td> </tr> <tr> <td align="center" style="color: #343434; font-size: 24px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header"> <div style="line-height: 35px"> Hi ${name}, Thanks for playing! </div> </td> </tr> <tr> <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td> </tr> <tr> <td align="center"> <table border="0" width="400" align="center" cellpadding="0" cellspacing="0" class="container590"> <tr> <td align="center" style="color: #888888; font-size: 16px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 24px;"> <div style="line-height: 24px"> Here are some photos of your biggest hit </div> </td> </tr> </table> </td> </tr> <tr> <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td> </tr> </table> </td> </tr> <tr class="hide"> <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td> </tr> <tr> <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td> </tr> </table> <!-- end section --> <!--  50% image --> <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff"> <tr> <td align="center"> <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590"> <tr> <td> <table border="0" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590"> <tr> <td align="center"> <img src="cid:thumbnail" style="display: block; width: 280px;" width="280" border="0" alt="" /> </td> </tr> </table> <table border="0" width="5" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590"> <tr> <td width="5" height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td> </tr> </table> <table border="0" width="260" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590"> <tr> <td align="left" style="color: #3d3d3d; font-size: 22px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="align-center main-header"> <div style="line-height: 35px"> YOUR BIGGEST HIT </div> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td> </tr> </table> <!-- end section --> <!--  50% image --> <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff"> <tr> <td align="center"> <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590"> <tr> <td> <table border="0" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590"> <tr> <td align="center"> <img src="cid:thumbnail_2" style="display: block; width: 280px;" width="280" border="0" alt="" /> </td> </tr> </table> <table border="0" width="5" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590"> <tr> <td width="5" height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td> </tr> </table> <table border="0" width="260" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590"> <tr> <td align="left" style="color: #3d3d3d; font-size: 22px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="align-center main-header"> <div style="line-height: 35px"> BREAKDOWN </div> </td> </tr> <tr> <td height="15" style="font-size: 12px; line-height: 12px;">&nbsp;</td> </tr> <tr> <td align="left"> <table border="0" align="left" cellpadding="0" cellspacing="0" class="container590"> <tr> <td align="center"> <table align="center" width="40" border="0" cellpadding="0" cellspacing="0" bgcolor="eeeeee"> <tr> <td height="2" style="font-size: 2px; line-height: 2px;"></td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td height="15" style="font-size: 12px; line-height: 12px;">&nbsp;</td> </tr> <tr> <td align="left" style="color: #888888; font-size: 16px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 24px;" class="align-center"> <div style="line-height: 24px"> Your velocity, hit angle, and distance travelled. </div> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td> </tr> </table> </body> </html>`,
    attachments: [
      {
        filename: "thumbnail.jpg",
        path: image_path,
        cid: "thumbnail"
      },
      {
        filename: "thumbnail_2.jpg",
        path: image_path_2,
        cid: "thumbnail_2"
      }
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

    if (
      player_name &&
      name &&
      date_of_birth &&
      state &&
      email &&
      home_team &&
      away_team
    ) {
      await participantModel
        .findOne({ player_name })
        .exec()
        .then(player => {
          if (player) {
            console.log(player);
            res.status(400).json({ message: "Name taken" });
          } else {
            participantModel.create(
              {
                player_name,
                name,
                date_of_birth,
                state,
                email,
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
                  res.status(200).json({ participant });
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
      } else if (files.image && fields.playerName && files.image_2) {
        const image_path = files.image.path;
        const image_path_2 = files.image_2.path;
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
              email(
                ciphers.decrypt(participant.email),
                player_name,
                image_path,
                image_path_2
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
