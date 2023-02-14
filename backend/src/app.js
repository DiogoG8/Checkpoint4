require("dotenv").config();
const port = process.env.BACKEND_PORT ?? 5000;
const express = require("express");
const cors = require("cors");
const database = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

const userHandlers = require("./users/userHandlers");
const contentHandlers = require("./content/contentHandlers");
const contactHandlers = require("./contact/contactHandlers");
const { validateContactForm } = require("./contact/contactValidators");
const {
  validateUserRegister,
  validateUserChanges,
  validateLogin,
} = require("./users/userValidators");

//Testing if the App listens and if
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const welcome = (req, res) => {
  res.send("This is my last checkpoint :'(");
};

app.get("/", (req, res) => {
  database
    .getConnection()
    .then(() => {
      res.status(200).send("Welcome to the Checkpoint 4 :)");
    })
    .catch((err) => {
      console.error(err);
    });
});

//Login
app.post("/api/login", validateLogin, userHandlers.verifyEmailandPassword); //TESTED

//Users
app.get("/api/users/:id", userHandlers.getUserInfo); //TESTED
app.put("/api/users/:id", validateUserChanges, userHandlers.updateUserInfo); //TESTED
app.post("/api/users", validateUserRegister, userHandlers.postNewUser); // TESTED

//Content
app.get("/api/content/:id", contentHandlers.getContentByUser); //TESTED
app.get("/api/content", contentHandlers.getContent); //TESTED
app.get("/api/counter", contentHandlers.offersCounter); //TESTED

//Contact
app.post("/api/contact", validateContactForm, contactHandlers.postMessage); //TESTED

app.get("/api/confirmation", userHandlers.verifyUser); //TESTED with a mistake
app.post("/api/resendemail", userHandlers.resendEmail);

app.post("/api/resetpassword", userHandlers.resetPassword);
app.put("/api/updatepassword", userHandlers.updatePassword);
app.get("/api/veryfypass", userHandlers.verifyPass);
