var uuid = require('uuid');
var mongoose = require('mongoose');

var BookmarkSchema = new mongoose.Schema({

    bookmarkid: { type: String, hashKey: true, default: uuid.v4() },
    postid:{type:String},
    userid:{type:String}
})
module.exports = mongoose.model('bookmark', BookmarkSchema);
