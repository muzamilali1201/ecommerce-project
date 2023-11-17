const express = require('express');
const { registerUser,loginUser,SearchUser } = require('../controllers/controllers');
const verifyToken = require('../middleware/verifyToken')
const userRouter = express.Router();

userRouter.route('/register').post(registerUser)
userRouter.route('/loginuser').post(loginUser)

module.exports = userRouter;