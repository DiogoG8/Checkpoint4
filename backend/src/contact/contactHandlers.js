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
          from: "chalkboardthecompany@gmail.com",
          to: "chalkboardthecompany@gmail.com",
          subject: req.body.email,
          text: req.body.issue + req.body.topic,
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
