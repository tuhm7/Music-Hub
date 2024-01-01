const express = require("express");
const router = express.Router();
const randomstring = require("randomstring");
const querystring = require("querystring");
const request = require("request");
require("dotenv").config();

var stateKey = "spotify_auth_state";
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;

router.get("/", (req, res) => {
  res.json({ test: "auth" });
});

router.get("/login", function (req, res) {
  var state = randomstring.generate(16);
  var scope = "user-read-private user-read-email";
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
});

router.get("/callback", function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
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

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        var refresh_token = body.refresh_token;
        console.log(access_token);
        var options = {
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        if (!req.session.authenticated) {
          req.session.authenticated = true;
          req.session.token = access_token;
        }

        // store.get(req.sessionID, function (err, data) {
        //   if (data) {
        //     console.log(data["token"]);
        //   }
        //   console.log(data);
        // });
        redisClient.set(req.sessionID, refresh_token);
        res.redirect("http://localhost:5173/transfer");
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
});

module.exports = router;
