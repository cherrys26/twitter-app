import axios from 'axios';

export default class TweetService {
    getAllTweets() {
        return axios.get('http://localhost:8000/tweets').then(res => res.data)
    }
    getProfileTweets(username) {
        return axios.get(`http://localhost:8000/tweets/${username}`).then(res => res.data)
    }
}