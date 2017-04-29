var mongoose = require('mongoose')
var Promise = require('bluebird')
var ToDoSchema = new mongoose.Schema({
    task:{type:String,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,required:true}
},{timestamps:true});

var ToDo = mongoose.model('ToDo',ToDoSchema);

ToDo = Promise.promisifyAll(ToDo)
Promise.promisifyAll(ToDo.prototype);

module.exports = ToDo;