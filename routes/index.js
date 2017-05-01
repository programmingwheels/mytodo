var express = require('express');
var router = express.Router();
var middleware = require('../config/middleware.js')


//router.use('/todo', middleware.isLoggedIn)




router.get('/todo/hi', function(req, res) {

        res.send(req.user)
    })
    //router.get('/api/v1/create-todo')

module.exports = router;