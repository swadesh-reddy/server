var categoryservices = require('../services/category');

exports.getAllCategories = async (req, res, next) => {
    await categoryservices.getAllCategories(req).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
   
}

exports.getCategoryById = async (req, res, next)=>{
    await categoryservices.getCategoryById(req).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
}

exports.addCategory = async (req, res, next) => {
    await categoryservices.createCategory(req).then(data => {
        res.send({message:"upload successful", status: 200});
    }).catch(err => {
        res.status(500).json({
            message: "something went wrong.", status:500
        });
    });
}
exports.deleteCategory = async (req,res, next)=>{
    console.log(req.params._id)
    await categoryservices.deleteCategoryById(req.params._id).then((data)=>{
        res.send({message:"delete successful", status: 200})
    }).catch(err=>{
        res.status(500).json({
            message: "something went wrong.", status:500
        });
    })
}