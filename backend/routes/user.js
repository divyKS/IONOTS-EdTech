const express = require('express');
const { registerUser, getUsers } = require('../controllers/user');
const router = express.Router();

router.post('/users', registerUser);

router.get('/users', getUsers);

module.exports = router;