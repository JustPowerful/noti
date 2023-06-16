const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");

const authMiddlware = require("../middleware/auth.middleware");

router.post("/register", controller.register); // for registering an account
router.post("/login", controller.login); // for login token
router.post("/check", authMiddlware, controller.authCheck); // check authorization
router.post("/refresh", controller.refresh); // for refresh login token

module.exports = router;
