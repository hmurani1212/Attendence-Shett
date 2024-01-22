const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { Sign, Login, UserDetail} = require('../Controoler/User');
// ALL ROUTES 
router.route('/Create').post(Sign);
router.route('/Login').post(Login);
router.route('/UserDetail').get(fetchUser, UserDetail);

module.exports = router;
