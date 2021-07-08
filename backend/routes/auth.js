const express = require('express');
const router = express.Router();

const { signup, signin, allUsers, getUser, getSearch, updateFollowers, getFollowers, deleteFollowers, getFollowing, updateFollowing, deleteFollowing, getLikes,
    updateLikes,
    deleteLikes,
    testJoin,
    testGetJoin,
    updateUser } = require('../controllers/auth');
const { postTweet, getTweet, getTweetById, getAllTweets } = require('../controllers/tweets')
// Login and signup
router.post('/signup', signup);
router.post('/signin', signin);
//get user information
router.get('/user', allUsers)
router.get('/users', getSearch)
router.get("/user/:username", getUser)
router.put("/user/:username", updateUser)
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
router.post("/tweets/:username", postTweet);
router.get("/tweet/:id", getTweetById)
//likes
router.get("/likes/:username", getLikes)
router.post("/likes/:username", updateLikes)
router.delete("/likes/:username", deleteLikes)
// testing
router.get("/test/:id", testGetJoin)
router.post("/test/:id", testJoin)



module.exports = router;