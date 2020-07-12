var uuid = require('uuid');
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({

   categoryname:{type:String},
   categoryfilename:{type:String},
   categoryimage:{type:String},
   posts:[{postid:{type:mongoose.Schema.Types.ObjectId, ref:'posts'}}]
})
module.exports = mongoose.model('categories', CategorySchema);
