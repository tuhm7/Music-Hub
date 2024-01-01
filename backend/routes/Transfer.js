const express = require("express");
const router = express.Router();
const transferController = require("../controllers/TransferController");

router.get("/apple", transferController.getApplePlaylist);

module.exports = router;
