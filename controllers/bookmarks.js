var bookmarkservices = require('../services/bookmark');

exports.getAllBookamrks = async (req, res, next) => {
    await bookmarkservices.getAllBookmarks(req).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
   
}

// exports.getCategoryById = async (req, res, next)=>{
//     await categoryservices.getCategoryById(req).then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).json({
//             message: err.message || "Some error occurred while retrieving the Blogs."
//         });
//     });
// }

exports.addBookmark = async (req, res, next) => {
    await bookmarkservices.addBookmark(req).then(data => {
        res.send({message:"upload successful", status: 200});
    }).catch(err => {
        res.status(500).json({
            message: "something went wrong.", status:500
        });
    });
}
exports.deleteBookmark = async (req,res, next)=>{
    console.log(req.params._id)
    await bookmarkservices.deleteBookmark(req.params._id).then((data)=>{
        res.send({message:"delete successful", status: 200})
    }).catch(err=>{
        res.status(500).json({
            message: "something went wrong.", status:500
        });
    })
}