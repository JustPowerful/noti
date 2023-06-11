const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");

router.post("/register", controller.register); // for registering an account
router.post("/login", controller.login); // for login token
router.post("/refresh", controller.refresh); // for refresh login token

module.exports = router;
