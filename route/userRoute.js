const express = require('express');
var app = express();
const { userRegister, 
        userLogin, 
        getUserDetails} = require('../controller/userController');
const {auth} = require('../middleware/auth');
const router = express.Router();

router.post('/register', userRegister);

router.post('/login', userLogin);

router.get('/user/:id', auth, getUserDetails);


module.exports = router;

