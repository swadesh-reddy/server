var User = require('../model/user');
var bcrypt = require('bcrypt');
const config = require('../_helpers/config');
var jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
var mybucket = require('../_helpers/gcs')
var path = require('path');
var fs = require('fs')

module.exports.getUserById = async (authenication) => {
    console.log(authenication);
    var user = await User.findOne(authenication)
    return user
}
module.exports.getAllProfiles =  ()=> {
    var user = User.find({});
}

module.exports.userAuthenticate = async (email, password)=> {
    
    const user = await User.find({"email": email});
    if (user.length <= 0) {
        return { message: "Email is not associated with this account", code: 400 };
      }
      console.log(user)
      console.log(bcrypt.compareSync(password, user[0].hash))
      if (bcrypt.compareSync(password, user[0].hash)) {
         const token = jwt.sign({user: user}, config.secret, {expiresIn: 72000});
        return {
            success: true,
            message: 'Successfully logged in',
            token: token,
            user: user
        };
    }
      else {
        return { message: "email or password is incorrect", code: 400 };
      }
}

module.exports.addUser = async (newUser) => {
    var result = await User.find({email:newUser.email})
    console.log(result.length)
    if(result.length>0){
        return {message:'email is already taken'}
    }
    var newuser = new User(newUser)

    if(newUser.password){
        newuser.hash = bcrypt.hashSync(newUser.password, 10)
        
    }
    newuser.avatar = ""
    var res = await newuser.save()
    return {"message":"register suffel","status":200};
}
module.exports.updateUserpic = async (req,res)=>{
    let decoded = jwt_decode(req.header('authorization'));
    console.log(decoded.user[0].email)
   
    const file = path.join(__dirname, '../images/'+req.file.originalname)
    const myFile = fs.readFileSync(file)

    const fileMetaData = {
        originalname: req.file.originalname,
        buffer: myFile
      }
  return await  mybucket.uploadFile(fileMetaData).then( async (data)=>{
        console.log(decoded.user[0].email)
      //  User.updateOne({"email":decoded.user[0].email},{$set:{avatar:data}})
      var user = await User.findOne({"email":decoded.user[0].email});
       if(!user){res.send({message: "something went wrong.", status:500})}
            user.avatar = data;
            await user.save();
            return user
    }).catch((err)=>{console.log(err);  })
     
}
module.exports.getProfile = async (req)=>{
    let decoded = jwt_decode(req.header('authorization'));
    console.log(decoded.user[0].email)
    let result = await User.find({"email":decoded.user[0].email});
    if (result.length <= 0) {
        return { message: "Email is not associated with this account", code: 400 };
      }
      return result;
}