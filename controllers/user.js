var userService = require("../services/user");

exports.addUser = (req, res, next) => {
    console.log(req.body);
    userService.addUser(req.body)
    .then((user) => res.json( {"message":"register suffel","status":200}))
    .catch(err => next(err))
}
exports.authenticateUser = (req, res, next)=>{
    userService.userAuthenticate(req.body.email, req.body.password)
    .then((user) => res.json(user))
    .catch(err => next(err))
}
exports.getProfile = async (req,res,next)=>{
    await userService.getProfile(req).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the Blogs."
        });
    });
}
exports.upDateUserPic = async (req, res, next)=>{
        console.log(req.header('authorization'))
    await userService.updateUserpic(req, res).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).json({
            message: "something went wrong.", status:500
        });
    });
}