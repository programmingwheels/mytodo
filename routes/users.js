var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')

router.post('/create-user', userController.createUser)

router.post('/authenticate', userController.authenticate);
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;