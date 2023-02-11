const database = require("../database");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const mailer = require("../contact/mailer");

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
  const { name, email, hashedPassword, tos, newsletter, regtoken } = req.body;

  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      database
        .query(
          "INSERT INTO users(name, email, hashedPassword, tos, newsletter, regtoken) VALUES (?, ?, ?, ?, ?, ?)",
          [name, email, hashedPassword, tos, newsletter, regtoken]
        )
        .then(([result]) => {
          const date = new Date();
          const mail = {
            email: email,
          };

          let emailVerificationToken = jwt.sign(mail, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          const url = `http://localhost:3000/confirmation?name=${emailVerificationToken}`;

          res.location(`/api/users/${result.insertId}`).sendStatus(201);
          mailer.sendMail(
            {
              from: "diogogoliveira88@gmail.com",
              to: "diogogoliveira88@gmail.com",
              subject: "The ChalkBoard Verification",
              text:
                "Please click on the following link to confirm your registration: " +
                url,
              html:
                '<p>Please click on the following link to confirm your registration</p><a href="' +
                url +
                '">Click here</a>',
            },
            (err, info) => {
              if (err) console.error(err);
              else console.log(info);
            }
          );
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyUser2 = (req, res) => {
  const { status, email } = req.body;

  const authorizationHeader = req.get("Authorization");

  const [type, token] = authorizationHeader.split(" ");

  console.log(token);

  database
    .query("select status from users where email = ?", [status, email])
    .then(([result]) => {
      console.log(result);
      if (result[0].status === "Pending") {
        result[0].status === "Active";
        res.sendStatus(201);
      } else {
        res.status(400).send("Test Failed");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const verifyUser = (req, res) => {
  const authHeader = req.get("authorization");
  const [type, token] = authHeader.split(" ") || [];

  if (token) {
    try {
      if (process.env.JWT_SECRET) {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        const { email } = verifiedToken;

        database
          .query("SELECT status FROM users where email = ?", [email])
          .then(([result]) => {
            if (result === null) {
              res.status(404).send("User not found");
            } else if (result.status !== undefined) {
              res.status(400).send("This account is already verified");
            } else {
              database.query("UPDATE users SET status=? where email = ?", [
                "Active",
                email,
              ]);

              res.json(verifiedToken);
            }
          });
      }
    } catch (err) {
      console.error(err);
      res.status(403).send("Please try again");
    }
  }
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
  verifyUser,
};
