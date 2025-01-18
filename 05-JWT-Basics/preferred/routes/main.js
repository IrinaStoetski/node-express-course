const express = require("express");
const router = express.Router();

const { logon, hello } = require("../controllers/main.js");
const authenticationMiddleware = require("../middleware/auth.js");

router.route("/hello").get(authenticationMiddleware, hello);
router.route("/logon").post(logon);

module.exports = router;
