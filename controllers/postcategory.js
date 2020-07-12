var postcategoryservices = require('../services/category');
var Category = require('../model/category')
exports.getCategoryById = async (req, res, next)=>{
    // console.log(req.body.categoryid)
    // await postcategoryservices.getCategoryById({categoryid:req.body.categoryid}).then(data => {
    //     console.log(data)
    //     res.send(data);
    // }).catch(err => {
    //     res.status(500).json({
    //         message: err.message || "Some error occurred while retrieving the Blogs."
    //     });
    // });

    // await postcategoryservices.getCategoryById({categoryid:req.body.categoryid}).then((data)=>{
    //       console.log(data)
        
    // }).catch((err)=>{
    //     console.log(err)
    // })
   
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