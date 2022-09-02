const express = require('express');

const authController = require('../controllers/auth_controller');

const router = express.Router();

router.get('/signup', authController.getSignup);

router.post('/signup', authController.signup);

router.get('/login', authController.getLogin);


module.exports = router;