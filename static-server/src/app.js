require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = parseInt(process.env.STATIC_PORT ?? "5080");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the static-file-server!");
});

app.use("/static", express.static(path.join(__dirname, "../public/images")));

app.listen(PORT, () =>
  console.log(`Static file server running on port: http://localhost:${PORT}`)
);
