const express = require("express");
const router = express.Router();
const querystring = require("querystring");

router.get("/", (req, res) => {
  res.json({ test: "spotify" });
  getSong();
});

async function getSong() {
  var access_token =
    "BQB6ZhwqCa2rcEoxH0sO8azEnjauHpeSIcWTQ5wv-Av-gZPKJKyjgY5L0AQyprELsKJ8iokjjuJJlgb_1Rql4NvtZtQ68_Tn_GSMDATzRmv_E7Okfcjaf8_KaHcPHHRxkTNTuW7uAqtgI_wbEs6mbCB6BSbD5Svr2kNUSjTbWFCLGzEPYI4aANe9c7H5MPGRJXQI5qvrU7uO6ok_JQYUNw";
  var options = {
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  fetch(
    "https://api.spotify.com/v1/search?" +
      querystring.stringify({ q: "piano man", type: "track", market: "US" }),
    options
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}
module.exports = router;
