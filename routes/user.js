const { getUser, getUsers, updateUser } = require("../controllers/user")
const express = require("express");
const router = express.Router()
const auth = require("../middleware/jwt");
const { isAdmin } = require("../middleware/admin");

router.get("/:uid", auth.checkToken , getUser);
router.get("/", auth.checkToken, isAdmin, getUsers);
router.post("/:id", auth.checkToken, isAdmin, updateUser);


module.exports = router