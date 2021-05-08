const express = require('express');
const router = express.Router();

const { signup, signin, users, user } = require('../controllers/auth');
const { postTweet, getTweet } = require('../controllers/tweets')
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/user', users)
router.get('/user/:username', user)
router.post("/tweet", postTweet);
router.post("/tweet/:username", postTweet);
router.get("/tweet/:username", getTweet)
module.exports = router;