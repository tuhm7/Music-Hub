const express = require("express");
require("dotenv").config();
var cookieParser = require("cookie-parser");
const cors = require("cors");
const transferRoutes = require("./routes/Transfer");
const spotifyRoutes = require("./routes/Spotify");
const authRoutes = require("./routes/Auth");
require("./helpers/init_redis");
const session = require("./middleware/session");

const app = express();
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(session);

// routes
app.use("/auth", authRoutes);
app.use("/transfer", transferRoutes);
app.use("/spotify", spotifyRoutes);

app.get("/", (req, res) => {
  res.json({ main: "hi" });
});

app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log("Server is running on port " + process.env.PORT);
  } else {
    console.log("Error occurred", error);
  }
});
