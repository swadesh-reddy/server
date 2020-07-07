var suggestionservices = require('../services/suggestion');

exports.getAllSuggestions = async (req, res, next) => {
    await suggestionservices.getAllSuggestions(req).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
   
}

exports.getSuggestionById = async (req, res, next)=>{
    await suggestionservices.getSuggestionById(req).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
}

exports.addSuggestion = async (req, res, next) => {
    await suggestionservices.createSuggestion(req).then(data => {
        res.send({message:"upload successful", status: 200});
    }).catch(err => {
        res.status(500).json({
            message: "something went wrong.", status:500
        });
    });
}
exports.deleteSuggestionById = async (req,res, next)=>{
    console.log(req.params._id)
    var suggestionid = req.params._id
    await suggestionservices.deleteSuggestionById(suggestionid).then((data)=>{
        res.send({message:"delete successful", status: 200})
    }).catch(err=>{
        res.status(500).json({
            message: "something went wrong.", status:500
        });
    })
}