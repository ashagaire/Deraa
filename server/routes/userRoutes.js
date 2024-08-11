const express = require('express');
const pool = require("../db");
const router = express.Router();



router.post('/user', addUser);

module.exports = router;
