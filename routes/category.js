const express = require("express");
const router = express.Router()

const {getCategories, deleteCategory, addCategory} = require("../controllers/category")

router.get("/", getCategories)
router.post("/delete/:id", deleteCategory)
router.post("/add", addCategory)


module.exports = router