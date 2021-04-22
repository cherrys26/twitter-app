import React, { useState, useEffect } from 'react';
import { DataScroller } from 'primereact/datascroller'
import TweetService from '../Services/Tweets'
import { Avatar } from 'primereact/avatar'
import {
    Link
} from 'react-router-dom'

export default function Feed() {
    const [tweets, setTweets] = useState('');
    const tweetService = new TweetService();

    useEffect(() => {
        tweetService.getTweets().then(data => setTweets(data));
    }, []); // eslint-disable-line


    const tweetFeed = (data) => {
        return (
            <div>
                <span>
                    <Link to="/profile" >
                        <Avatar image={data.user} alt={data.user} shape="circle" />
                    </Link>
                    <h4>{data.text}</h4>
                </span>
            </div>
        )
    }

    return (
        <div>
            <DataScroller value={tweets} itemTemplate={tweetFeed} rows={5} inline scrollHeight="500px" />
        </div>
    )
}