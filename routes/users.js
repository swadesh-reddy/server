var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user')

var upload = require('../_helpers/multer');

router.post('/register', UserController.addUser);
router.post('/login', UserController.authenticateUser)
router.get('/getProfile', UserController.getProfile)
router.post('/updateuserpic',  upload.single('avatar'), UserController.upDateUserPic)
module.exports = router;