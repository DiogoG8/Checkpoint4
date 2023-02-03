const database = require("../database");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const getUserInfo = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Hmmm... this user does not exist!");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const updateUserInfo = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  database
    .query("update users set name = ?,  email = ? where id = ?", [
      name,
      email,
      id,
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not user was not found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

const postNewUser = (req, res) => {
  const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };
  const { name, email, hashedPassword, tos, newsletter } = req.body;

  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      database
        .query(
          "INSERT INTO users(name, email, hashedPassword, tos, newsletter) VALUES (?, ?, ?, ?, ?)",
          [name, email, hashedPassword, tos, newsletter]
        )
        .then(([result]) => {
          res.location(`/api/users/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error saving the user");
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyEmailandPassword = (req, res) => {
  const { email } = req.body;

  database
    .query("select * from users where email = ?", [email])
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];
        argon2
          .verify(req.user.hashedPassword, req.body.password)
          .then((isVerified) => {
            if (isVerified) {
              const payload = { sub: req.user.id };

              const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });

              delete req.user.hashedPassword;
              res.send({ token, user: req.user });
            } else {
              res.sendStatus(500);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  postNewUser,
  verifyEmailandPassword,
};
