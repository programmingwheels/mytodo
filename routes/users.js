var express = require('express');
var router = express.Router();
var userController= require('../controllers/user')

router.post('/api/v1/user/create-user',userController.createUser)

module.exports = router;
