import React, { useState, useEffect } from 'react';
import {
    useLocation,
    Link
} from 'react-router-dom'
import { BASE_API_URL } from '../../utils/constants';
import Card from 'react-bootstrap/Card'
import axios from 'axios';


export default function Followers() {

    const location = useLocation();
    let path = location.pathname.split("/")

    const [followerUser, setFollowerUser] = useState();
    const [user, setUser] = useState();

    const userFollowers = axios.get(`${BASE_API_URL}followers/${path[1]}`);
    const userProfile = axios.get(`${BASE_API_URL}user/${path[1]}`);

    console.log(user)
    console.log(followerUser)
    useEffect(() => {
        userProfile.then(data => setUser(data.data)) // eslint-disable-next-line
    }, [])

    useEffect(() => {
        userFollowers.then(followerData => setFollowerUser(followerData.data)) // eslint-disable-next-line
    }, [])

    return (
        <div>
            {followerUser && followerUser.map(followerUser => {
                return (
                    <Card>
                        <Link to={`/${followerUser}`} style={{ textDecoration: 'none' }}>
                            {followerUser}
                        </Link>
                    </Card>
                )
            })}
        </div>
    )

}