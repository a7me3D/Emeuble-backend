const express = require("express");
const router = express.Router()
const auth = require("../middleware/jwt")

const { allProducts, addProduct, productById, updateProduct, deleteProduct} = require("../controllers/product")

router.get("/", allProducts)

// Todo: jwtCheck + isAdmin
router.post("/add", addProduct)
router.post("/update/:id", updateProduct)
router.post("/delete/:id", deleteProduct)

router.get("/:id", productById)

module.exports = router
