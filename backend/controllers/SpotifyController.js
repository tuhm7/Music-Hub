const querystring = require("querystring");
const { redisClient } = require("../helpers/init_redis");

function createPlaylist(req, res) {
  playlist = req.body["playlist"].slice(0, 10);
  redisClient.get("sess:" + req.sessionID).then((res) => {
    res = JSON.parse(res);
    const token = res["token"];
    playlist.forEach((song) => console.log(getSong(song["title"], token)));
  });
}

async function getSong(title, access_token) {
  spotifyPlaylist = [];
  var options = {
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  fetch(
    "https://api.spotify.com/v1/search?" +
      querystring.stringify({ q: title, type: "track", market: "US" }),
    options
  )
    .then((res) => res.json())
    .then((data) => {
      songData = data["tracks"]["items"][0];
      spotifyPlaylist.push({
        title: songData["name"],
        artist: songData["artists"][0]["name"],
        uri: songData["uri"],
      });
      console.log(spotifyPlaylist);
    });
}

module.exports = { createPlaylist };
