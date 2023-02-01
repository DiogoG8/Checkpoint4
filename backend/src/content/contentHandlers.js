const database = require("../database");

const getContent = (req, res) => {
  database
    .query("select * from content")
    .then(([content]) => {
      res.json(content);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getContentByUser = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("select * from content where id = ?", [id])
    .then(([content]) => {
      if (content[0] != null) {
        res.json(content[0]);
      } else {
        res.status(404).send("That topic doesn't exit...yet!");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getContent,
  getContentByUser,
};
