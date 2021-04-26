const Product = require("../models/product")
var formidable = require('formidable');
const { uploadFile } = require("../middleware/uploader");


exports.allProducts = async (req, res) => {
    try{
        const { page = 1, limit = 9 } = req.query;
        const { category, name} = req.query
        
        const filter = {'$and':[
            category ? {"categoryId":category} : null,
            name ? {"productName":{ "$regex": name, "$options": "i" }} : null    
        ]}

        // remove null
        filter["$and"] = filter["$and"].filter(function(query) { return query; });
        if (filter["$and"].length === 0) delete filter["$and"]

        const products = await Product.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean()

        const count = await Product.countDocuments();

        return res.status(200).json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
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

    var form = new formidable.IncomingForm();

    form.parse(req,async (err, fields, files) => {
        const product = new Product()
        product.categoryId = fields.productCategoryId
        product.productName = fields.productName
        product.productDescription = fields.productDescription
        product.productLength = fields.productLength
        product.productWidth = fields.productWidth
        product.productHeight = fields.productHeight
        product.productStock = fields.productStock
        product.productPrice = fields.productPrice
        product.productSold = fields.productSold
        product.productDate = Date.now()
        
        if (files.productImg)
            product.productImg = await uploadFile(files.productImg.name, files.productImg.path)
                                .then((url) => url);
        console.log(product.productImg)
        product.save((err, result) =>{
            if(err){
                console.log(req.body)
                return res.status(500).json({message:"Internal server error"})
            }
            else{
                return res.status(200).json({message:"Product added!"})
            }
        })
    })

}

exports.updateProduct = (req, res) => {
    var form = new formidable.IncomingForm();

    form.parse(req,async (err, fields, files) => {    
        const productId = req.params.id    
        if (files.productImg)
            productImg = await uploadFile(files.productImg.name, files.productImg.path)
                                .then((url) => url);
        let update = {...fields, ...(files.productImg && { productImg } )} 
        Product.findByIdAndUpdate(productId, update, (err, product) => {
            if(err) return res.status(500).json({message:err})
            else return res.status(200).json(product)
        })
    })
}

exports.deleteProduct = (req, res) => {
    const productId = req.params.id
    Product.findByIdAndRemove(productId,(err, product) => {
        if(err) return res.status(500).json({message:err})
        else return res.status(200).json({"messsage":"Product deleted"})
    })
}

