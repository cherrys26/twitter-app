const express = require('express');
const router = express.Router();

const { signup, signin, allUsers, getUser, updateFollowers, getFollowers, getFollowing, updateFollowing } = require('../controllers/auth');
const { postTweet, getTweet } = require('../controllers/tweets')
// Login and signup
router.post('/signup', signup);
router.post('/signin', signin);
//get user information
router.get('/user', allUsers)
router.get("/user/:username", getUser)
// followers
router.get('/followers/:username', getFollowers)
router.put('/followers/:username', updateFollowers)
//following
router.get('/following/:username', getFollowing)
router.put('/following/:username', updateFollowing)
// get and post tweets
router.get("/tweet/:username", getTweet)
router.post("/tweet/:username", postTweet);
module.exports = router;