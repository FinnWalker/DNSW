const participantModel = require("../models/participantModel");
const sanitize = require("mongo-sanitize");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const ciphers = require("../tools/ciphers");

const teams = [
  "Australia",
  "Bangladesh",
  "England",
  "India",
  "New Zealand",
  "Pakistan",
  "South Africa",
  "Sri Lanka",
  "Thailand",
  "West Indies"
];

//async function email(email, name, image_path, image_path_2) {
async function email(email, name, image_path, score) {
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
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;" > <head> <meta charset="UTF-8" /> <meta content="width=device-width, initial-scale=1" name="viewport" /> <meta name="x-apple-disable-message-reformatting" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <meta content="telephone=no" name="format-detection" /> <title>ICC T20 World Cup EDM</title>   <style type="text/css"> @media only screen and (max-width: 600px) { p, ul li, ol li, a { font-size: 24px !important; line-height: 150% !important; } h1 { font-size: 30px !important; text-align: center; line-height: 120% !important; } h2 { font-size: 26px !important; text-align: center; line-height: 120% !important; } h3 { font-size: 20px !important; text-align: center; line-height: 120% !important; } h1 a { font-size: 30px !important; } h2 a { font-size: 26px !important; } h3 a { font-size: 20px !important; } .es-menu td a { font-size: 16px !important; } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size: 16px !important; } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size: 16px !important; } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size: 12px !important; } *[class="gmail-fix"] { display: none !important; } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align: center !important; } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align: right !important; } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align: left !important; } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display: inline !important; } .es-button-border { display: block !important; } a.es-button { font-size: 20px !important; display: block !important; border-width: 10px 0px 10px 0px !important; } .es-btn-fw { border-width: 10px 0px !important; text-align: center !important; } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width: 100% !important; } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width: 100% !important; max-width: 600px !important; } .es-adapt-td { display: block !important; width: 100% !important; } .adapt-img { width: 100% !important; height: auto !important; } .es-m-p0 { padding: 0px !important; } .es-m-p0r { padding-right: 0px !important; } .es-m-p0l { padding-left: 0px !important; } .es-m-p0t { padding-top: 0px !important; } .es-m-p0b { padding-bottom: 0 !important; } .es-m-p20b { padding-bottom: 20px !important; } .es-mobile-hidden, .es-hidden { display: none !important; } .es-desk-hidden { display: table-row !important; width: auto !important; overflow: visible !important; float: none !important; max-height: inherit !important; line-height: inherit !important; } .es-desk-menu-hidden { display: table-cell !important; } table.es-table-not-adapt, .esd-block-html table { width: auto !important; } table.es-social { display: inline-block !important; } table.es-social td { display: inline-block !important; } } #outlook a { padding: 0; } .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .es-button { mso-style-priority: 100 !important; text-decoration: none !important; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .es-desk-hidden { display: none; float: left; overflow: hidden; width: 0; max-height: 0; line-height: 0; mso-hide: all; } </style> </head> <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;" > <div class="es-wrapper-color" style="background-color:#F6F6F6;">  <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;" > <tr style="border-collapse:collapse;"> <td valign="top" style="padding:0;Margin:0;"> <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;" > <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;"> <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" > <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;" > <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;" > <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;" > <img class="adapt-img" src="https://t20-biggest-hit.s3-ap-southeast-2.amazonaws.com/Biggest+Hit+Banner.png" alt="T20 World Cup Biggest Hit Banner" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="T20 World Cup Biggest Hit Banner" width="560" /> </td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;" > <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0px;border-bottom:0px solid #CCCCCC;background:rgba(0, 0, 0, 0) none repeat scroll 0% 0%;height:1px;width:100%;margin:0px;" ></td> </tr> </table> </td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;" > <img class="adapt-img" src="cid:thumbnail" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="560" /> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;" > <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;" > <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td class="es-m-txt-c" align="center" style="padding:0;Margin:0;" > <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:24px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:36px;color:#333333;" > SHARE YOUR “BIGGEST HIT IN NSW” ON SOCIAL MEDIA AND TAG<br />#T20WORLDCUP #ILOVESYDNEY </p> </td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;" > <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0px;border-bottom:1px solid #161840;background:rgba(0, 0, 0, 0) none repeat scroll 0% 0%;height:1px;width:100%;margin:0px;" ></td> </tr> </table> </td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;" > <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;" > <em >"Celebrate the ICC Women’s T20 World Cup by attending all four match days in Sydney and checking out other Fan Zones across the city during the tournament!"<br /></em> </p> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;" >  <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;" > <tr style="border-collapse:collapse;"> <td class="es-m-p0r es-m-p20b" width="174" align="center" style="padding:0;Margin:0;" > <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;" > <a target="_blank" href="https://tickets.t20worldcup.com/content/wt20/home.aspx" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543;" ><img class="adapt-img" src="https://t20-biggest-hit.s3-ap-southeast-2.amazonaws.com/T20+Tile+Get+Tickets.jpg" alt="Get your tickets now!" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="Get your tickets now!" width="174" /></a> </td> </tr> </table> </td> <td class="es-hidden" width="20" style="padding:0;Margin:0;" ></td> </tr> </table>  <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;" > <tr style="border-collapse:collapse;"> <td class="es-m-p20b" width="173" align="center" style="padding:0;Margin:0;" > <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;" > <a target="_blank" href="https://www.sydney.com/t20worldcup" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543;" ><img class="adapt-img" src="https://t20-biggest-hit.s3-ap-southeast-2.amazonaws.com/T20+Tile+Info.jpg" alt="Free fan zone information." style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="Free fan zone information." width="173" /></a> </td> </tr> </table> </td> </tr> </table>  <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;" > <tr style="border-collapse:collapse;"> <td width="173" align="center" style="padding:0;Margin:0;" > <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;" > <a target="_blank" href="https://www.sydney.com/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543;" ><img class="adapt-img" src="https://t20-biggest-hit.s3-ap-southeast-2.amazonaws.com/T20+Tile+Whats+On.jpg" alt="What's on in Sydney." style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="What's on in Sydney." width="173" /></a> </td> </tr> </table> </td> </tr> </table>  </td> </tr> <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;" > <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;" > <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;" > <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;" > <tr style="border-collapse:collapse;"> <td style="padding:0;Margin:0px;border-bottom:1px solid #161840;background:rgba(0, 0, 0, 0) none repeat scroll 0% 0%;height:1px;width:100%;margin:0px;" ></td> </tr> </table> </td> </tr> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;" > <img class="adapt-img" src="https://t20-biggest-hit.s3-ap-southeast-2.amazonaws.com/T20+NSW+Logo+1.png" alt="Destination NSW Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="Destination NSW Logo" width="200" /> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </div> </body> </html>`,
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
  // data: (req, res) => {
  //   participantModel
  //     .find()
  //     .exec()
  //     .then(participants => {
  //       let data = [];
  //       for (let participant of participants) {
  //         data.push({
  //           player_name: participant.player_name,
  //           name: ciphers.decrypt(participant.name),
  //           date_of_birth: ciphers.decrypt(participant.date_of_birth),
  //           state: ciphers.decrypt(participant.state),
  //           email: ciphers.decrypt(participant.email),
  //           info_checkbox: participant.info_checkbox,
  //           home_team: participant.home_team,
  //           away_team: participant.away_team,
  //           top_score: participant.top_score
  //         });
  //       }
  //       res.status(200).json(data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).json({ message: "Error finding participant" });
  //     });
  // }
  // data: (req, res) => {
  //   participantModel
  //     .find()
  //     .exec()
  //     .then(participants => {
  //       let content =
  //         "Player Name, Name, Date of Birth, State, Email, Info Checkbox, Home Team, Away Team, Top Score\n";
  //       //let data = [];
  //       for (let participant of participants) {
  //         let best_score = 0;
  //         for (let score of participant.scores) {
  //           if (score.score > best_score) best_score = score.score;
  //         }
  //         content += `${participant.player_name},${ciphers.decrypt(
  //           participant.name
  //         )},${ciphers.decrypt(participant.date_of_birth)},${ciphers.decrypt(
  //           participant.state
  //         )},${ciphers.decrypt(participant.email)},${
  //           participant.info_checkbox
  //         },${teams[participant.home_team]},${
  //           teams[participant.away_team]
  //         },${best_score}\n`;
  //         // data.push({
  //         //   player_name: participant.player_name,
  //         //   name: ciphers.decrypt(participant.name),
  //         //   date_of_birth: ciphers.decrypt(participant.date_of_birth),
  //         //   state: ciphers.decrypt(participant.state),
  //         //   email: ciphers.decrypt(participant.email),
  //         //   info_checkbox: participant.info_checkbox,
  //         //   home_team: participant.home_team,
  //         //   away_team: participant.away_team,
  //         //   top_score: participant.top_score
  //         // });
  //       }
  //       fs.writeFile("ICC_T20_Cricket.csv", content, function(err) {
  //         if (err) throw err;
  //         const directory = path.join(__dirname, "..", "ICC_T20_Cricket.csv");
  //         res.set({
  //           "Content-Disposition": "attachment; filename=ICC_T20_Cricket.csv",
  //           "Content-type": "text/csv"
  //         });
  //         res.sendFile(directory);
  //       });
  //       //res.status(200).json(data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).json({ message: "Error finding participant" });
  //     });
  // }
  data: (req, res) => {
    participantModel
      .find()
      .exec()
      .then(participants => {
        let content =
          "Player Name, Name, Date of Birth, State, Email, Info Checkbox, Home Team, Away Team, Score, timestamp\n";
        //let data = [];
        for (let participant of participants) {
          for (let score of participant.scores) {
            content += `${participant.player_name},${ciphers.decrypt(
              participant.name
            )},${ciphers.decrypt(participant.date_of_birth)},${ciphers.decrypt(
              participant.state
            )},${ciphers.decrypt(participant.email)},${
              participant.info_checkbox
            },${teams[participant.home_team]},${
              teams[participant.away_team]
            },${score},${score.timestamp}\n`;
          }

          // data.push({
          //   player_name: participant.player_name,
          //   name: ciphers.decrypt(participant.name),
          //   date_of_birth: ciphers.decrypt(participant.date_of_birth),
          //   state: ciphers.decrypt(participant.state),
          //   email: ciphers.decrypt(participant.email),
          //   info_checkbox: participant.info_checkbox,
          //   home_team: participant.home_team,
          //   away_team: participant.away_team,
          //   top_score: participant.top_score
          // });
        }
        fs.writeFile("ICC_T20_Cricket.csv", content, function(err) {
          if (err) throw err;
          const directory = path.join(__dirname, "..", "ICC_T20_Cricket.csv");
          res.set({
            "Content-Disposition": "attachment; filename=ICC_T20_Cricket.csv",
            "Content-type": "text/csv"
          });
          res.sendFile(directory);
        });
        //res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error finding participant" });
      });
  }
};
