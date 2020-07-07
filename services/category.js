var Category = require('../model/category');
var upload = require('../_helpers/multer');


exports.createCategory = async (req)=>{
    console.log(req.body)
    // upload.single('categoryimage');
    var category = {
        categoryname:req.body.categoryname,
        categoryimage:req.file.path
    }
    var post = new Category(category);
    var res = await post.save();
    return res
}

exports.getAllCategories = async (req)=>{
    var categories = await Category.find({});
    console.log(categories)
    return categories
}

exports.getCategoryById = async (req, res)=>{
    var resultcount = await Category.findOne({req})
     if(!resultcount)return {message: 'Category not found', code: 400 } 
     return resultcount;
}
exports.deleteCategoryById = async(req, res)=>{
    var resultcount = await Category.findByIdAndDelete(req)
    return resultcount
}