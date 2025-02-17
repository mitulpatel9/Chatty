const express = require('express');
const { checkAuth, UpdateProfile, LogOut, getSignupPage, handleSignup, getSigninPage, handleSignin } = require("../Controller/user.js")
const protectedRoute = require("../Middleware/protectedRoute.js")
const router = express.Router();

// Signup Routes
router.get('/signup', getSignupPage);
router.post('/signup', handleSignup);

// Signin Routes
router.get('/signin', getSigninPage);
router.post('/signin', handleSignin);

//Logour Routes
router.post('/logout', LogOut);

//user profile routes
router.put('/update-profile', protectedRoute, UpdateProfile)

//check routes

router.get('/check', protectedRoute, checkAuth);


module.exports = router;