const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/SpotifyController");

router.get("/", (req, res) => {
  res.json({ test: "spotify" });
});

router.post("/songs", spotifyController.createPlaylist);
module.exports = router;
