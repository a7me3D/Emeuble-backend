const Category = require("../models/category") 

data = [
    { 'categoryName' : 'test1' },
    { 'categoryName' : 'test2' },
    { 'categoryName' : 'test3' }
]


Category.countDocuments((err, count) => {
    if( count == 0) {
        Category.collection.insertMany(data,(err, result) => {
            if(err) console.log(err)
            else console.log("Category data initialised")
        })
    }
})
