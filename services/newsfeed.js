var Post = require('../model/post');
var upload = require('../_helpers/multer');
var mybucket = require('../_helpers/gcs')
var path = require('path');
var fs = require('fs')


exports.addPost = async (req)=>{
    // upload.single('categoryimage');
    const file = path.join(__dirname, '../images/'+req.file.originalname)
const myFile = fs.readFileSync(file)

    const fileMetaData = {
        originalname: req.file.originalname,
        buffer: myFile
      }
  return await mybucket.uploadFile(fileMetaData).then((data)=>{
        console.log(data)
        var post = {
            postname:req.body.postname,
            postimage:data,
            posturl:req.body.posturl,
            postauthor:req.body.postauthor,
            postdescription:req.body.postdescription,
            postcategory:req.body.postcategory,
            postsuggestion:req.body.postsuggestion
        }
        var newpost = new Post(post);
         newpost.save();
    }).catch((err)=>{console.log(err);  })
  
   
}

exports.getAllPosts = async (req)=>{
    var posts = await Post.find({});
    return posts
}
exports.getPostsByCategory = async (req)=>{
    console.log(req)
    var posts = await Post.find(req);
    return posts
}

exports.getPostsBySuggestion = async (req)=>{
    var posts = await Post.find(req);
    console.log(posts)
    return posts
}

exports.getPostById = async (req, res)=>{
    var resultcount = await Post.findOne({req})
     if(!resultcount)return {message: 'Category not found', code: 400 } 
     return resultcount;
}
exports.deletePostById = async(req, res)=>{
    var resultcount = await Post.findByIdAndDelete(req)
    return resultcount
}