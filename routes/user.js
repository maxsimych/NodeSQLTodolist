const express = require('express'),
    userCtrl = require('../controllers/user'),
    router = express.Router();

router.post('/signup', userCtrl.signup)
    .post('/login', userCtrl.login);

module.exports = router;