const { getUser } = require("../controllers/user")
const express = require("express");
const router = express.Router()
const auth = require("../middleware/jwt")

router.get("/:uid", auth.checkToken , getUser);


module.exports = router