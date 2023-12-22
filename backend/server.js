const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");
const querystring = require("querystring");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  getApplePlaylist("https://music.apple.com/us/artist/my-playlist/1253909570");
  res.send("filler");
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
