const express = require("express");
const request = require("express");
const axios = require("axios");
const router = express.Router();
const cheerio = require("cheerio");
router.get("/", (req, res) => {
  res.json({ test: "transfer" });
});

router.get("/apple", (req, res) => {
  appleUrl = req.query.appleurl;
  playlist = getApplePlaylist(appleUrl).then((data) =>
    res.json({ playlist: data })
  );
});

async function getApplePlaylist(url) {
  const response = await axios.get(url);
  data = response.data;
  const $ = await cheerio.load(data);
  script = $("#serialized-server-data").text();
  object = JSON.parse(script);
  object = object[0]["data"]["seoData"]["ogSongs"];
  var tracksList = [];
  object.forEach((song) => {
    tracksList.push({
      id: song["id"],
      title: song["attributes"]["name"],
      artist: song["attributes"]["artistName"],
    });
  });
  return tracksList;
}

module.exports = router;
