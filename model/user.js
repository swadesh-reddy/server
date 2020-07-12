var express = require("express");
var mongoose = require("mongoose");
var uuid = require('uuid')

var UserSchema = mongoose.Schema({
   id: { type: String, hashKey: true, default: uuid.v4() },
    username: String,
    hash: {type: String},
    email: String,
    admin: Boolean,
    contact:Number,
    avatar:String,
    avatfilename:String,
    createddate: { type: Date, default: Date.now },
  // propic: String,  
})
module.exports = mongoose.model('user', UserSchema);

 