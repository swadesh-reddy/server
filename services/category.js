var Category = require('../model/category');
var upload = require('../_helpers/multer');
var mybucket = require('../_helpers/gcs')
var path = require('path');
var fs = require('fs')


exports.createCategory = async (req)=>{
 
    const file = path.join(__dirname, '../images/'+req.file.originalname)
   const myFile = fs.readFileSync(file)
   console.log(req.body)
       const fileMetaData = {
           originalname: req.file.originalname,
           buffer: myFile
         }
     return await mybucket.uploadFile(fileMetaData).then((data)=>{

        var category = {
            categoryname:req.body.categoryname,
            categoryimage:data
        }
       
        var post = new Category(category);
        var res = post.save();
       }).catch((err)=>{console.log(err);  })
    // upload.single('categoryimage');
  
}

exports.getAllCategories = async (req)=>{
    var categories = await Category.find({});
    console.log(categories)
    return categories
}

exports.getCategoryById = async (req, res)=>{
    console.log(req.categoryid)
    var resultcount = await Category.findOne({_id:req.categoryid}).populate('posts.postid');
    console.log(resultcount)
     if(!resultcount)return {message: 'Category not found', code: 400 } 
     return resultcount.posts;
}
exports.deleteCategoryById = async(req, res)=>{
    var resultcount = await Category.findByIdAndDelete(req)
    return resultcount
}