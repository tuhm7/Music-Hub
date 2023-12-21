const express = require("express");

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("<h1>initial commit</h1>");
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is running on port " + PORT);
  } else {
    console.log("Error occurred", error);
  }
});
