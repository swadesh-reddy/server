var NewsFeedService = require('../services/newsfeed');

exports.getAllNewsFeeds = async (req, res, next) => {
    await NewsFeedService.getAllPosts(req).then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
   
}

exports.getPostById = async (req, res, next)=>{
    await NewsFeedService.getPostbyId(req).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
}
exports.getPostsByCategoryName = async (req, res, next)=>{
    console.log(req.body)
    await NewsFeedService.getPostsByCategory(req.body).then(data=>{
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
}

exports.getPostsBySuggestionName = async (req, res, next)=>{
    console.log(req.body)
    await NewsFeedService.getPostsBySuggestion(req.body).then(data=>{
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
}
exports.searchNews = async (req,res,next)=>{
    console.log(req.params.filter)
    await NewsFeedService.searchItem(req,res).then(data=>{
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
}

exports.addPost = async (req, res) => {
    // console.log(req.body)
    await NewsFeedService.addPost(req).then(data => {
        res.send({
            message: "uploaded Successfully"
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Blogs."
        });
    });
}

exports.deletePostById = async (req,res, next)=>{
    console.log(req.body)
    await NewsFeedService.deletePostById(req.params._id).then((data)=>{
        res.send({message:"delete successful", status: 200})
    }).catch(err=>{
        res.status(500).json({
            message: "something went wrong.", status:500
        });
    })
}