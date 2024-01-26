const randomstring = require("randomstring");
const querystring = require("querystring");
const request = require("request");
const { redisClient } = require("../helpers/init_redis");
require("dotenv").config();

const stateKey = "spotify_auth_state";
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

function login(req, res) {
  const state = randomstring.generate(16);
  const scope =
    "user-read-private user-read-email playlist-modify-private playlist-modify-public";
  res.cookie(stateKey, state);
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
}

function callback(req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
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

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;
        const options = {
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };
        if (!req.session.authenticated) {
          req.session.authenticated = true;
          req.session.token = access_token;
        }
        //id
        fetch("https://api.spotify.com/v1/me", options)
          .then((res) => res.json())
          .then((data) => {
            req.session.spotifyID = data["id"];
            req.session.save();
          });
        res.redirect("http://localhost:5173/transfer?");
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
}

function logout(req, res) {
  req.session.destroy();
  console.log("logouted");
}
function sendLoginStatus(req, res) {
  const options = {
    headers: { Authorization: "Bearer " + req.session.token },
    json: true,
  };
  fetch("https://api.spotify.com/v1/users/" + req.session.spotifyID, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        res.status(400).json({ message: "User not logged in" });
      } else {
        res.status(200).json({
          username: data["display_name"],
          profilePicture: data["images"][0]["url"],
        });
      }
    });
}

module.exports = {
  login,
  callback,
  sendLoginStatus,
  logout,
};
