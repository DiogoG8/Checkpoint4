const database = require("../database");
const mailer = require("./mailer");

const postMessage = (req, res) => {
  const { topic, issue, email } = req.body;

  database
    .query("INSERT INTO contact(topic, issue, email) VALUES (?,?,?)", [
      topic,
      issue,
      email,
    ])
    .then(([message]) => {
      res.location(`/api/contact/${message.insertId}`).sendStatus(201);
      mailer.sendMail(
        {
          from: req.body.email,
          to: "diogoguilherme88@gmail.com",
          subject: req.body.topic,
          text: req.body.issue,
          html: req.body.issue,
        },
        (err, info) => {
          if (err) console.error(err);
          else console.log(info);
        }
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error sending the message");
    });
};
module.exports = {
  postMessage,
};
