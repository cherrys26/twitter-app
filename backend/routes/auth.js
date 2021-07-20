const express = require('express');
const router = express.Router();

const { signup, signin, allUsers, getUser, getSearch, updateFollowers, getFollowers, deleteFollowers, getFollowing, updateFollowing, deleteFollowing, getLikes,
    updateLikes,
    deleteLikes,
    updateUser,
} = require('../controllers/auth');
const { postTweet, getTweet, getTweetById, getAllTweets, getReply, postReply } = require('../controllers/tweets')
const { getAllMessages, getMessages, updateMessages, userFromPost, userToPost, getMessageByUser } = require('../controllers/messages')
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
// replys 
router.get("/reply/:id", getReply);
router.post("/reply/:id", postReply);

// messages
router.get("/messages", getAllMessages);
router.post("/messages", updateMessages);
router.get("/messages/:id", getMessages);
router.get("/message/:user", getMessageByUser);
router.post("/message/from/:id", userFromPost);
router.post("/message/to/:id", userToPost);


module.exports = router;