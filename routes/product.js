const express = require("express");
const router = express.Router()
const auth = require("../middleware/jwt")
const { isAdmin } = require("../middleware/admin");

const { allProducts, addProduct, productById, updateProduct, deleteProduct} = require("../controllers/product");

router.get("/", allProducts)

router.post("/add", auth.checkToken, isAdmin, addProduct)
router.post("/update/:id", auth.checkToken, isAdmin, updateProduct)
router.post("/delete/:id", auth.checkToken, isAdmin, deleteProduct)

router.get("/:id", productById)

module.exports = router
