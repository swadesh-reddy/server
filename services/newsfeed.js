var Post = require('../model/newsfeed');
var upload = require('../_helpers/multer');
var mybucket = require('../_helpers/gcs')
var path = require('path');
var fs = require('fs')
var Category = require('../model/category')
exports.addPost = async (req)=>{
    // upload.single('categoryimage');
    const file = path.join(__dirname, '../images/'+req.file.originalname)
const myFile = fs.readFileSync(file)

    const fileMetaData = {
        originalname: req.file.originalname,
        buffer: myFile
      }
  return await mybucket.uploadFile(fileMetaData).then( async (data)=>{
    console.log(req.file.path)
        var post = {
            postname:req.body.postname,
            postimage:data,
            postfilename:req.file.originalname,
            posturl:req.body.posturl,
            postauthor:req.body.postauthor,
            postdescription:req.body.postdescription,
        }

        var newpost = new Post(post);
        var res =  await newpost.save();
       var categories = JSON.parse(req.body.postcategories);
         for(var category in categories){
          var newcategory =  await Category.findById({_id:categories[category]})
            if(newcategory < 1){return};
    
        console.log(newcategory)
        newcategory.posts.push({postid:res._id});
        await newcategory.save();
        };
        
      
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
     if(!resultcount)return {message: 'Category not found', code: 404 } 
     return resultcount;
}
exports.searchItem = async (req, res)=>{
   var posts =  await Post.find({ "postname": { "$regex": req.params.filter, "$options": "i" }});
   if(posts < 1){return {message: 'news not found', code: 404 } }
   return posts
}
exports.deletePostById = async(req, res)=>{
    var categories = await Category.find({});
            categories.forEach(category => {
                console.log(category)
                var posts = category.posts;
                for(var i in posts){
                    if(posts[i].postid == req){
                        console.log(posts[i])
                        posts.splice(i,1)
                        console.log(posts[i])
                    }
                }
                category.save();
            });
        console.log(req)
       var resultcount = await Post.findByIdAndDelete(req);
    
    return resultcount
}