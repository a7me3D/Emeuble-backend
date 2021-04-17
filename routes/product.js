const express = require("express");
const router = express.Router()
const auth = require("../middleware/jwt")

const { allProducts, addProduct, productById} = require("../controllers/product")

router.get("/", allProducts)

// Todo: jwtCheck + isAdmin
router.post("/add", addProduct)

router.get("/:id", productById)

module.exports = router
