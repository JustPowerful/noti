const express = require("express");
const router = express.Router();

// middleware
const authMiddleware = require("../middleware/auth.middleware");

// controller
const controller = require("../controllers/user.controller");

router.get("/getdata", authMiddleware, controller.getUserData); // get current user data.

module.exports = router;
