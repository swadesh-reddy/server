var express = require('express');
var router = express.Router();
var NewsFeedController = require('../controllers/newsfeed');
var upload = require('../_helpers/multer');

router.get('/getallposts', NewsFeedController.getAllNewsFeeds);
router.get('/searchitem/:filter', NewsFeedController.searchNews);
router.post('/getpostsbycategoryname', NewsFeedController.getPostsByCategoryName);
router.post('/getpostsbysuggestionname', NewsFeedController.getPostsBySuggestionName);
router.post('/addpost', upload.single('postimage'), NewsFeedController.addPost);
router.delete('/deletepost/:_id', NewsFeedController.deletePostById);
module.exports = router;