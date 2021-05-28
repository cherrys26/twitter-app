import React, { useState, useEffect } from 'react';
import {
    useLocation,
    Link
} from 'react-router-dom'
import { BASE_API_URL } from '../../utils/constants';
import Card from 'react-bootstrap/Card'
import axios from 'axios';


export default function Following() {

    const location = useLocation();
    let path = location.pathname.split("/")

    const [followingUser, setFollowingUser] = useState();
    const [user, setUser] = useState();

    const userFollowing = axios.get(`${BASE_API_URL}following/${path[1]}`);
    const userProfile = axios.get(`${BASE_API_URL}user/${path[1]}`);

    console.log(user)
    console.log(followingUser)
    useEffect(() => {
        userProfile.then(data => setUser(data.data)) // eslint-disable-next-line
    }, [])

    useEffect(() => {
        userFollowing.then(followingData => setFollowingUser(followingData.data)) // eslint-disable-next-line
    }, [])

    return (
        <div>
            {followingUser && followingUser.map(followingUser => {
                return (
                    <Card>
                        <Link to={`/${followingUser}`} style={{ textDecoration: 'none' }}>
                            {followingUser}
                        </Link>
                    </Card>
                )
            })}
        </div>
    )

}