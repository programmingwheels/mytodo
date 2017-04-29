var User = require('../models/user')
var userController={}

userController.createUser= function(req,res){
    var user= new User();
    user.name= req.body.name;
    user.username= req.body.username;
    user.password= user.generateHashPassword(req.body.password);
    user.saveAsync().then(function(u){
        res.json({code:1})
    }).catch(function(err){
        res.json({code:0,errmsg:err})
    })
}

module.exports= userController;