const express = require("express");
const router = express.Router()
const auth = require("../middleware/jwt")
const { isAdmin } = require("../middleware/admin");

const {getCategories, deleteCategory, addCategory} = require("../controllers/category")

router.get("/", auth.checkToken, isAdmin, getCategories)
router.delete("/delete/:id", auth.checkToken, isAdmin, deleteCategory)
router.post("/add", auth.checkToken, isAdmin, addCategory)


module.exports = router