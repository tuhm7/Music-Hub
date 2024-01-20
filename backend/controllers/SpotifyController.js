const querystring = require("querystring");
const { redisClient } = require("../helpers/init_redis");

function createPlaylist(req, res) {
  playlist = req.body["playlist"];
  redisClient.get("sess:" + req.sessionID).then((resp) => {
    resp = JSON.parse(resp);
    const token = resp["token"];
    const promises = playlist.map(async (song) =>
      getSong(song["title"], token).then((data) => data)
    );
    const spotifyPlaylist = Promise.all(promises);
    spotifyPlaylist.then((data) => res.send(data));
  });
  createEmptySpotifyPlaylist(req.session.spotifyID, req.session.token);
}

async function getSong(title, access_token) {
  spotifyPlaylist = [];
  const options = {
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
        albumURL: songData["album"]["images"][0]["url"],
      };
    });
}

function createEmptySpotifyPlaylist(user_id, access_token) {
  console.log(user_id);
  endpoint = "https://api.spotify.com/v1/users/" + user_id + "/playlists";
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    json: true,
    body: JSON.stringify({
      name: "playlist",
      description: "testing",
      public: false,
    }),
  };
  fetch(endpoint, options)
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function addSongsToPlaylist(playlistURI, songsList) {}

module.exports = { createPlaylist };
