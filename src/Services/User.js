import axios from 'axios';

export default class UserService {
    getUser() {
        return axios.get('http://localhost:8000/users').then(res => res.data);
    }
    getProfile(username) {
        return axios.get(`http://localhost:8000/users/${username}`).then(res => res.data)
    }
}