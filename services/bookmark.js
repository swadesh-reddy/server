var Bookmark = require('../model/bookmark');


exports.addBookmark = async (req)=>{
    console.log(req.body)
    // upload.single('categoryimage');
    var bookmark = {
        postid:req.body.postid
    }
    var bookmark = new Bookmark(category);
    var res = await bookmark.save();
    return res
}

exports.getAllBookmarks = async (req)=>{
    var bookmarks = await Bookmark.find({});
    console.log(bookmarks)
    return bookmarks
}

// exports.getCategoryById = async (req, res)=>{
//     var resultcount = await Category.findOne({req})
//      if(!resultcount)return {message: 'Category not found', code: 400 } 
//      return resultcount;
// }
exports.deleteBookmark= async(req, res)=>{
    var resultcount = await Bookmark.findByIdAndDelete(req)
    return resultcount
}