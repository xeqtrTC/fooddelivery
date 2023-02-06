const express = require('express');
const router = express.Router();
const userRouter = require('../ApiCalls/userRouter');



// POST
router.route('/registerUser').post(userRouter.RegisterUser);
router.route('/loginUser').post(userRouter.handleLogin);
router.route('/updateUserToAdmin').post(userRouter.updateUserToAdmin);


// GET

module.exports = router;