var uuid = require('uuid');
var mongoose = require('mongoose');

var suggestionSchema = new mongoose.Schema({

    suggestionid: { type: String, hashKey: true, default: uuid.v4() },
   suggestionname:{type:String},
   suggestionimage:{type:String}
})
module.exports = mongoose.model('suggestions', suggestionSchema);
