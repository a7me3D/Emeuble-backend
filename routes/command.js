const express = require("express");
const router = express.Router()
const auth = require("../middleware/jwt")
const { isAdmin } = require("../middleware/admin");

const {getCommands, addCommand, validateCommand, getCommandsByUserId} = require("../controllers/command")


router.get('/', auth.checkToken, isAdmin, getCommands)
router.post('/add', auth.checkToken,  addCommand)
router.post('/validate/:commandId', auth.checkToken, isAdmin, validateCommand)
router.get('/me', auth.checkToken, getCommandsByUserId)

module.exports = router