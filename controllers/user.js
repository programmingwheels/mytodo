var User = require('../models/user')
var jwt = require('jsonwebtoken')
var userController={}

userController.createUser= function(req,res){
    var user= new User();
    user.name= req.body.name;
    user.username= req.body.username;
   // user.password = req.body.password;
    user.password= user.generateHashPassword(req.body.password);
    user.saveAsync().then(function(u){
        res.json({code:1})
    }).catch(function(err){
        res.json({code:0,errmsg:err})
    })
}

userController.authenticate = function(req,res){
    console.log(req.body)
    User.findOneAsync({'username':req.body.username}).then(function(user){
        
        if(user.length==0)
           return res.json({code:0,errmsg:'User Doesnt Exists'})
        else if(!user.validatePassword(req.body.password))
           return res.json({code:0,errmsg:'Password Doesnt Match'})
        else {
            var payload={}
            payload._id= user._id;
            payload.username= user.username;
            
            return res.json({code:1,token:jwt.sign(payload,'leninthegreat',{expiresIn:"4h"})})
        }
          
    }).catch(function(err){
        return res.json({code:0,errmsg:err})
    })
}
module.exports= userController;