const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

router.get("/login", authController.login);

router.get("/callback", authController.callback);

router.get("/profile", authController.sendLoginStatus);

router.get("/logout", authController.logout);

module.exports = router;
