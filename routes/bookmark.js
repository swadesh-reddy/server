var express = require('express');
var router = express.Router();
var bookmarkController = require('../controllers/bookmarks');
var upload = require('../_helpers/multer');

router.post('/addbookmark', bookmarkController.addBookmark);
router.get('/getallbookmarks', bookmarkController.getAllBookamrks);
router.delete('/deletebookmark/:_id', bookmarkController.deleteBookmark)

module.exports = router;