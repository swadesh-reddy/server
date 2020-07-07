var express = require('express');
var router = express.Router();
var suggestioncontroller = require('../controllers/suggestion');
var upload = require('../_helpers/multer');

router.post('/addsuggestion', upload.single('suggestionimage'), suggestioncontroller.addSuggestion);
router.get('/getallsuggestions', suggestioncontroller.getAllSuggestions);
router.delete('/deletesuggestion/:_id', suggestioncontroller.deleteSuggestionById)

module.exports = router;