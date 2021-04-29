import React, { useState, useEffect } from 'react';
import {
    useLocation,
} from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Card } from 'primereact/card'
import UserService from '../../Services/User'
import TweetService from '../../Services/Tweets';
import { Avatar } from 'primereact/avatar';

export default function Profile() {

    const [user, setUser] = useState();
    const [tweets, setTweets] = useState()
    const userService = new UserService();
    const tweetService = new TweetService();
    const location = useLocation();
    let tag = location.pathname.slice(1)

    useEffect(() => {
        userService.getProfile(tag).then(userData => setUser(userData)) // eslint-disable-next-line
    }, []);
    useEffect(() => {
        tweetService.getProfileTweets(tag).then(tweetData => setTweets(tweetData)) // eslint-disable-next-line
    }, []);


    function User() {
        return (
            <div>
                <h3>@{tag}</h3>
            </div>
        )
    }

    function Search() {

        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText style={{ borderRadius: "50px", width: "300px" }} placeholder="Search" />
            </span>
        )
    }



    return (
        <div>
            <Toolbar left={User()} right={Search()} />
            <div className="p-grid">
                <div className="p-col-7">
                    {user && user.map(user => {
                        return (
                            <Card key={user.id}>
                                <div>
                                    <div>
                                        <h1>{user.username}</h1>
                                        <Avatar image={user.profilePicture} shape="circle" />
                                        <h1>{user.name}</h1>
                                    </div>
                                    <div>
                                        <h4>{user.bio}</h4>
                                        <h4>{user.birthday}</h4>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                    {tweets && tweets.map(tweets => {
                        return (

                            <div key={tweets.tweet}>
                                <div>
                                    <h1>{tweets.username}</h1>
                                    <Avatar image={tweets.profilePicture} shape="circle" />
                                </div>
                                <div>
                                    <h4>{tweets.tweet}</h4>
                                    <h4>{tweets.birthday}</h4>
                                    <h4>{tweets.datePosted}</h4>
                                    <h4>{tweets.timePosted}</h4>
                                </div>
                            </div>

                        )
                    })}
                        Explore
                </div>
                <div className="p-col-5">
                    Hello world
                </div>
            </div>

        </div>
    )

}