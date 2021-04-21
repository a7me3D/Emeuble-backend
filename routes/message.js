const express = require("express");
const router = express.Router()
const { isAdmin } = require("../middleware/admin");
const { getMessages, addMessage } = require("../controllers/message");
const auth = require("../middleware/jwt")

router.get("/", auth.checkToken , isAdmin, getMessages)
router.post("/send", addMessage)
router.get("/me", auth.checkToken, addMessage)


module.exports = router