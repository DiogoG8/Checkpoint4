const database = require("../database");

const postMessage = (req, res) => {
  const { topic, issue } = req.body;

  database
    .query("INSERT INTO contact(topic, issue) VALUES (?, ?)", [topic, issue])
    .then(([message]) => {
      res.location(`/api/contact/${message.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error sending the message");
    });
};

module.exports = {
  postMessage,
};
