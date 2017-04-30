var middleware ={}
var jwt = require('jsonwebtoken')

middleware.isLoggedIn = function(req,res,next){
    var token= req.headers["x-access-token"]
    if(token){
        jwt.verify(token,'leninthegreat',function(err,decoded){
            
            if(err)
              return res.status(403).send({code:0,errmsg:'Invalid token'})
            req.user=decoded;
            next()  
        })
    }else{
        return res.status(403).send({code:0,message:'token required'})
    }
}

module.exports= middleware;