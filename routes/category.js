var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category');
var upload = require('../_helpers/multer');

router.post('/addCategory', upload.single('categoryimage'), categoryController.addCategory);
router.get('/getallcategories', categoryController.getAllCategories);
router.post('/getPostsByCategory', categoryController.getCategoryById)
router.delete('/deletecategory/:_id', categoryController.deleteCategory)

module.exports = router;