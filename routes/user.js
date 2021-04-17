const { getUser, getUsers, updateUser } = require("../controllers/user")
const express = require("express");
const router = express.Router()
const auth = require("../middleware/jwt")

router.get("/:uid", auth.checkToken , getUser);
router.get("/", auth.checkToken , getUsers);
router.post("/", auth.checkToken , updateUser);


module.exports = router