var mongoose= require('mongoose')
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs')
var userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true}
})

userSchema.methods.generateHashPassword = function(password){
    this.password = bcrypt.hashSync(password,bcrypt.genSaltSync(8))
}

userSchema.methods.validatePassword = function(password){
    bcrypt.compareSync(password,this.password)
}

var user= mongoose.model('User',userSchema);
user= Promise.promisifyAll(user)
Promise.promisifyAll(user.prototype)

module.exports = user;