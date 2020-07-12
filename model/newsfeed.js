var uuid = require('uuid');
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({

   postid: { type: String, hashKey: true, default: uuid.v4() },
   postname:{type:String},
   postimage:{type:String},
   postfilename:{type:String},
   postdescription:{type:String},
   posturl:{type:String},
   postauthor:{type:String},
   postcategory:{type:String},
   postcreateddate:{type:Date,  default: Date.now()},
})
module.exports = mongoose.model('posts', PostSchema);
