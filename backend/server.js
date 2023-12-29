const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const transferRoutes = require("./routes/Transfer");
const spotifyRoutes = require("./routes/Spotify");
const authRoutes = require("./routes/Auth");

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

// routes
app.use("/auth", authRoutes);
app.use("/transfer", transferRoutes);
app.use("/spotify", spotifyRoutes);

app.get("/", (req, res) => {
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
app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log("Server is running on port " + process.env.PORT);
  } else {
    console.log("Error occurred", error);
  }
});
