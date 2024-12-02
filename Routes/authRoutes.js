const express = require('express');
const { login, signup } = require('../Services/authServices');
// const { signupValidator, loginValidator } = require('../utils/validators/authValidator');


const router = express.Router();

// Login route
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;