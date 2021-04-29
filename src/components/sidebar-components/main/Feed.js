import React, { Component, useState, useEffect } from 'react';
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

// export default class Feed extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             tweets: []
//         };

//         this.tweetService = new TweetService();
//         this.tweetFeed = this.tweetFeed.bind(this);
//         console.log(useLocation.pathname);
//     }

//     componentDidMount() {
//         this.tweetService.getAllTweets().then(data => this.setState({ tweets: data }))
//     }

//     tweetFeed(data) {
//         return (
//             <div className="p-grid nested-grid">
//                 <span className="p-col-3">
//                     <Link to={data.username}>
//                         <Avatar image={data.profilePicture} alt={data.username} shape="circle" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
//                         <p>@{data.username}</p>
//                     </Link>
//                 </span>
//                 <div className="p-col-9">
//                     <div className="p-grid">
//                         <div className="p-col-8">
//                             <time dateTime={data.datePosted}>{data.datePosted}</time>
//                             <time>{data.timePosted}</time>
//                         </div>
//                         <div className="p-col-8">
//                             <h5>{data.tweet}</h5>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         )
//     }
//     render() {
//         return (
//             <div className="p-grid">
//                 <div className="p-col-12">
//                     <Header />
//                 </div>
//                 <div className="p-col-7">
//                     <Home />
//                     <DataScroller value={this.state.tweets} itemTemplate={this.tweetFeed} rows={2} inline scrollHeight="750px" />
//                 </div>
//             </div >
//         );
//     }
// }

export default function Feed() {

    const [tweets, setTweets] = useState();
    const tweetService = new TweetService();

    useEffect(() => {
        tweetService.getAllTweets().then(data => setTweets(data)) //eslint-disable-next-line
    }, []);

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <Header />
            </div>
            <div className="p-col-7">
                <Home />
                <div>
                    {tweets && tweets.map(tweets => {
                        return (
                            <div className="p-grid nested-grid">
                                <span className="p-col-3">
                                    <Link to={tweets.username}>
                                        <Avatar image={tweets.profilePicture} alt={tweets.username} shape="circle" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
                                        <p>@{tweets.username}</p>
                                    </Link>
                                </span>
                                <div className="p-col-9">
                                    <div className="p-grid">
                                        <div className="p-col-8">
                                            <time dateTime={tweets.datePosted}>{tweets.datePosted}</time>
                                            <time>{tweets.timePosted}</time>
                                        </div>
                                        <div className="p-col-8">
                                            <h5>{tweets.tweet}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}