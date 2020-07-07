var uuid = require('uuid');
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({

    categoryid: { type: String, hashKey: true, default: uuid.v4() },
   categoryname:{type:String},
   categoryimage:{type:String}
})
module.exports = mongoose.model('categories', CategorySchema);
