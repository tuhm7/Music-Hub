const axios = require("axios");
const cheerio = require("cheerio");

// returns playlist json object where data[0] is the playlist title and data[1] is the tracks list
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
  const title = object[0]["data"]["seoData"]["appleTitle"];
  object = object[0]["data"]["seoData"]["ogSongs"];
  var tracksList = [];
  object.forEach((song) => {
    tracksList.push({
      id: song["id"],
      title: song["attributes"]["name"],
      artist: song["attributes"]["artistName"],
    });
  });
  return [{ title }, { tracks: tracksList }];
}

module.exports = { getApplePlaylist };
