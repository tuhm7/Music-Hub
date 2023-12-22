const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");
const querystring = require("querystring");
const cors = require("cors");
const randomstring = require("randomstring");
require("dotenv").config();

client_id = process.env.CLIENT_ID;
client_secret = process.env.CLIENT_SECRET;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  getApplePlaylist("https://music.apple.com/us/artist/my-playlist/1253909570");
  res.send("filler");
});

app.get("/login", function (req, res) {
  var state = randomstring.generate(16);
  var scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };
    res.redirect("/");
  }
});

async function getApplePlaylist(url) {
  const response = await axios.get(url);
  data = response.data;
  const $ = await cheerio.load(data);
  script = $("script").text();
  script_trimmed = script
    .substring(0, script.indexOf("import.meta.url"))
    .trim();
  object = JSON.parse(script_trimmed);
  console.log(object["tracks"]);
}
app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log("Server is running on port " + process.env.PORT);
  } else {
    console.log("Error occurred", error);
  }
});
