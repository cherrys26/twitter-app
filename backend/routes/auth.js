const express = require('express');
const router = express.Router();

const { signup, signin, allUsers, getUser, updateFollowers, getFollowers, deleteFollowers, getFollowing, updateFollowing, deleteFollowing } = require('../controllers/auth');
const { postTweet, getTweet, getTweetById, getAllTweets } = require('../controllers/tweets')
// Login and signup
router.post('/signup', signup);
router.post('/signin', signin);
//get user information
router.get('/user', allUsers)
router.get("/user/:username", getUser)
// followers
router.get('/followers/:username', getFollowers)
router.post('/followers/:username', updateFollowers)
router.delete('/followers/:username', deleteFollowers)
//following
router.get('/following/:username', getFollowing)
router.post('/following/:username', updateFollowing)
router.delete('/following/:username', deleteFollowing)
// get and post tweets
router.get("/tweets", getAllTweets)
router.get("/tweets/:username", getTweet)
router.get("/tweet/:id", getTweetById)
router.post("/tweets/:username", postTweet);
module.exports = router;