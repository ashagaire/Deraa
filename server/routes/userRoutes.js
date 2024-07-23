const express = require('express');
const { listUser, addUser } = require('../controllers/userController');
const router = express.Router();

router.get('/user', listUser);
router.post('/user', addUser);

module.exports = router;
