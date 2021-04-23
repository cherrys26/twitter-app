import axios from 'axios';

export default class TweetService {
    getTweets() {
        return axios.get('http://localhost:8000/tweets').then(res => res.data)
    }
}