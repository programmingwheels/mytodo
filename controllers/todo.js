var ToDo = require('../models/todo');
var todoController={}

todoController.createToDo= function(req,res){
   var todo = new ToDo();
   todo.task = req.body.task;
   todo.createdBy = req.user.id;
   todo.saveAsync().then(function(to){
       res.json({status:'success',code:1,message:'Task Created Successfylly'})
   })
}