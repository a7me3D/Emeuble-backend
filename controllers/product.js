const Product = require("../models/product")


exports.allProducts = async (req, res) => {
    try{
        const products = await Product.find().lean()
        return res.status(200).json(products)
    }catch{
        return res.status(500).json({message:"Internal server error"})
    }
}

exports.productById = async (req, res) => {
    try{
        const productId = req.params.id
        const product = await Product.findById(productId).lean()
        if(product)return res.status(200).json(product)
        else return res.status(404).json({message:"Product not found"})
    }catch{
        return res.status(404).json({message:"Product not found"})
    }
}

exports.productFilter = async (req, res) => {

}

exports.addProduct = (req, res) =>{
    const product = new Product()
    product.categoryId = req.body.category
    product.productName = req.body.name
    product.productDescription = req.body.description
    product.productLength = req.body.length
    product.productWidth = req.body.width
    product.productHeight = req.body.height
    product.productStock = req.body.stock
    product.productPrice = req.body.price
    product.productSold = req.body.sold
    product.productDate = Date.now()


    product.save((err, result) =>{
        if(err){
            return res.status(500).json({message:"Internal server error"})
        }
        else{
            return res.status(200).json({message:"Product added!"})
        }
    })

}

exports.updateProduct = (req, res) => {
    const productId = req.params.id
    Product.findByIdAndUpdate(productId, req.body, (err, product) => {
        if(err) return res.status(500).json({message:err})
        else return res.status(200).json(product)
    })
}

exports.deleteProduct = (req, res) => {
    const productId = req.params.id
    Product.findByIdAndRemove(productId,(err, product) => {
        if(err) return res.status(500).json({message:err})
        else return res.status(200).json({"messsage":"Product deleted"})
    })
}

