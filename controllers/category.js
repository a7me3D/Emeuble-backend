const Category = require("../models/category")


exports.getCategories = async (req,res) => {
    const categories = await Category.find().lean()
    return res.status(200).json(categories)
}

exports.addCategory = async (req,res) => {
    const category = new Category()
    category.categoryName = req.body.name
    category.save((err, category) => {
        if(err) return res.status(500).json({message:err})
        else return res.status(200).json({message:"category added"})
    })
}

exports.deleteCategory = async (req,res) => {
    const categoryId = req.params.id
    Category.findByIdAndDelete(categoryId, (err, category) => {
        if(err) return res.status(500).json({message:err})
        else return res.status(200).json({message:"Product deleted"})

    })
}