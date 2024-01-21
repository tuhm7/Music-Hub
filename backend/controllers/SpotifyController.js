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

function createEmptySpotifyPlaylist(req, res) {
  playlist = req.body["spotifyObject"];
  const endpoint =
    "https://api.spotify.com/v1/users/" + req.session.spotifyID + "/playlists";
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + req.session.token,
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
    .then((data) =>
      addSongsToPlaylist(req.session.token, data["id"], playlist)
    );
  res.status(200);
}

function addSongsToPlaylist(token, playlistURI, songsList) {
  const spotifyURI = songsList.map((songObject) =>
    songObject["uri"].replace("playlist", "track")
  );
  const endpoint =
    "https://api.spotify.com/v1/playlists/" + playlistURI + "/tracks";
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    json: true,
    body: JSON.stringify({
      uris: spotifyURI,
      position: 0,
    }),
  };

  fetch(endpoint, options);
}

module.exports = { createPlaylist, createEmptySpotifyPlaylist };
