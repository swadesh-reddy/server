var Suggestion = require('../model/suggestion');
var upload = require('../_helpers/multer');
var mybucket = require('../_helpers/gcs')
var path = require('path');
var fs = require('fs')

exports.createSuggestion = async (req)=>{

    console.log(req.file)
 const file = path.join(__dirname, '../images/'+req.file.originalname)
const myFile = fs.readFileSync(file)

    const fileMetaData = {
        originalname: req.file.originalname,
        buffer: myFile
      }
  return await  mybucket.uploadFile(fileMetaData).then((data)=>{
        console.log(data)
        var category = {
            suggestionname:req.body.suggestionname, 
            suggestionimage:data
        }
        var post = new Suggestion(category);
        var res = post.save();
    }).catch((err)=>{console.log(err);  })
  
    // return res
}

exports.getAllSuggestions = async (req)=>{
    var suggestion = await Suggestion.find({});
    console.log(suggestion)
    return suggestion
}

exports.getSuggestionById = async (req, res)=>{
    var resultcount = await Suggestion.findOne({req})
     if(!resultcount)return {message: 'Category not found', code: 400 } 
     return resultcount;
}
exports.deleteSuggestionById = async(req, res)=>{
    var resultcount = await Suggestion.findByIdAndDelete(req)
    return resultcount
}