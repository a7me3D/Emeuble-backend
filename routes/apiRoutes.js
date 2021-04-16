const express = require("express");
const router = express.Router()
const auth = require("../middleware/jwt")

const { login, register } = require("../controllers/auth")
const { getUser } = require("../controllers/user")


router.get("/", (req, res) => {
  res.status(201).json({
    message: "Welcome to the API."
  });
});

router.post("/login", login);

router.post("/register", register);

router.get("/user/:uid", auth.checkToken , getUser);

module.exports = router