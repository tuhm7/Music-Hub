const querystring = require("querystring");
const { redisClient } = require("../helpers/init_redis");

function createPlaylist(req, res) {
  playlist = req.body["playlist"].slice(0, 10);
  redisClient.get("sess:" + req.sessionID).then((resp) => {
    resp = JSON.parse(resp);
    const token = resp["token"];
    const promises = playlist.map(async (song) =>
      getSong(song["title"], token).then((data) => data)
    );
    const spotifyPlaylist = Promise.all(promises);
    spotifyPlaylist.then((data) => res.send(data));
  });
}

async function getSong(title, access_token) {
  spotifyPlaylist = [];
  var options = {
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  return fetch(
    "https://api.spotify.com/v1/search?" +
      querystring.stringify({ q: title, type: "track", market: "US" }),
    options
  )
    .then((res) => res.json())
    .then((data) => {
      songData = data["tracks"]["items"][0];
      return {
        title: songData["name"],
        artist: songData["artists"][0]["name"],
        uri: songData["uri"],
      };
    });
}

module.exports = { createPlaylist };
