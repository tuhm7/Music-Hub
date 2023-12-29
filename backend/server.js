const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");
const querystring = require("querystring");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const store = new session.MemoryStore();
const cors = require("cors");
const randomstring = require("randomstring");
const transferRoutes = require("./routes/Transfer");
require("dotenv").config();

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var stateKey = "spotify_auth_state";

const app = express();

app.use(
  session({
    secret: "secret key",
    cookie: { maxAge: 500000 },
    saveUninitialized: false,
    store,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/transfer", transferRoutes);
// app.use((req, res, next) => {
//   console.log(store);
//   next();
// });

app.get("/", (req, res) => {
  getApplePlaylist(
    "https://music.apple.com/us/playlist/top-100-global/pl.d25f5d1181894928af76c85c967f8f31"
  );
  // getApplePlaylist(
  //   "https://music.apple.com/us/playlist/top-100-global/pl.d25f5d1181894928af76c85c967f8f31"
  // );
  res.json({ testing: "testing" });
});

app.get("/login", function (req, res) {
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

app.get("/callback", function (req, res) {
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

        var options = {
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        if (!req.session.authenticated) {
          req.session.authenticated = true;
          req.session.token = access_token;
          res.cookie("session_id", req.sessionID);
        }
        // store.get(req.sessionID, function (err, data) {
        //   if (data) {
        //     console.log(data["token"]);
        //   }
        //   console.log(data);
        // });
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

async function getProfileData(access_token) {
  var options = {
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  await fetch("https://api.spotify.com/v1/me", options)
    .then((res) => res.json())
    .then((data) => data["display_name"]);
}

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
}
app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log("Server is running on port " + process.env.PORT);
  } else {
    console.log("Error occurred", error);
  }
});
