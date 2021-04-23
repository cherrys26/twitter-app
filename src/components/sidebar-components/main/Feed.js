import React, { Component } from 'react';
import { DataScroller } from 'primereact/datascroller'
import TweetService from '../../../Services/Tweets'
import { Avatar } from 'primereact/avatar'
import {
    Link,
    useLocation,
} from 'react-router-dom'
import Home from './Home';
import Header from '../Toolbar';
import 'primeflex/primeflex.css';

export default class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: []
        };

        this.tweetService = new TweetService();
        this.tweetFeed = this.tweetFeed.bind(this);
        console.log(useLocation.pathname);
    }

    componentDidMount() {
        this.tweetService.getTweets().then(data => this.setState({ tweets: data }))
    }

    tweetFeed(data) {
        return (
            <div>
                <span>
                    <Link to="/profile" >
                        <Avatar image={data.user} alt={data.id} shape="circle" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
                    </Link>
                    <h4>{data.text}</h4>
                </span>
            </div>
        )
    }
    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <Header />
                </div>
                <div className="p-col-7">
                    <Home />
                    <DataScroller value={this.state.tweets} itemTemplate={this.tweetFeed} rows={7} inline scrollHeight="675px" />
                </div>
            </div >
        );
    }
}
