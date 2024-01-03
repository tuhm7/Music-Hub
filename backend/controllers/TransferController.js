const axios = require("axios");
const cheerio = require("cheerio");

function getApplePlaylist(req, res) {
  appleUrl = req.query.appleurl;
  playlist = getApplePlaylistHelper(appleUrl).then((data) =>
    res.json({ playlist: data })
  );
}

async function getApplePlaylistHelper(url) {
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

module.exports = { getApplePlaylist };
