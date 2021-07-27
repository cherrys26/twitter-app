import React, { useState, useEffect, } from 'react';
import {
    Link,
} from 'react-router-dom'
import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import moment from 'moment';
import { motion } from 'framer-motion'

import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

import Retweet from './Re';
import Loader from './Loading';

export default function Tweets() {

    const [tweets, setTweets] = useState([]);
    const [user, setUser] = useState();
    const [tweet1, setTweet1] = useState([]);
    const [user1, setUser1] = useState();
    const [tweet2, setTweet2] = useState([]);
    const [user2, setUser2] = useState();
    const [tweet3, setTweet3] = useState([]);
    const [user3, setUser3] = useState();
    const [tweet4, setTweet4] = useState([]);
    const [user4, setUser4] = useState();
    const [tweet5, setTweet5] = useState([]);
    const [user5, setUser5] = useState();
    const [tweet6, setTweet6] = useState([]);
    const [user6, setUser6] = useState();

    const [userTweet, setUserTweet] = useState([]);
    const [userTweet1, setUserTweet1] = useState([]);
    const [userTweet2, setUserTweet2] = useState([]);
    const [userTweet3, setUserTweet3] = useState([]);
    const [userTweet4, setUserTweet4] = useState([]);
    const [userTweet5, setUserTweet5] = useState([]);
    const [userTweet6, setUserTweet6] = useState([]);

    const [isLoading, setisLoading] = useState(true);

    let getUser = JSON.parse(localStorage.getItem("username"))
    const userProfile = axios.get(`${BASE_API_URL}user/${getUser}`);
    const userTweets = axios.get(`${BASE_API_URL}tweets/${getUser}`);


    useEffect(() => {
        const interval = setInterval(() => {
            userTweets.then(tweetData => setTweets(tweetData.data))
        }, 2500);
        return () => clearInterval(interval) // eslint-disable-next-line
    }, [])

    useEffect(() => {
        userProfile.then(data => setUser(data.data)) // eslint-disable-next-line
    }, [])

    useEffect(() => {

        if (user && tweets) {
            setUserTweet(tweets.map((item) => Object.assign({}, item, user)))
        }

        if (user && tweets) {
            axios.get(`${BASE_API_URL}tweets/${user[0].following[0]}`)
                .then(followData => setTweet1(followData.data))
        }
        if (user && tweets) {
            axios.get(`${BASE_API_URL}user/${user[0].following[0]}`)
                .then(followData => setUser1(followData.data))
        }

        if (user) {
            axios.get(`${BASE_API_URL}tweets/${user[0].following[1]}`)
                .then(followData => setTweet2(followData.data))
        }
        if (user && tweets) {
            axios.get(`${BASE_API_URL}user/${user[0].following[1]}`)
                .then(followData => setUser2(followData.data))
        }

        if (user) {
            axios.get(`${BASE_API_URL}tweets/${user[0].following[2]}`)
                .then(followData => setTweet3(followData.data))
        }
        if (user && tweets) {
            axios.get(`${BASE_API_URL}user/${user[0].following[2]}`)
                .then(followData => setUser3(followData.data))
        }


        if (user) {
            axios.get(`${BASE_API_URL}tweets/${user[0].following[3]}`)
                .then(followData => setTweet4(followData.data))
        }
        if (user && tweets) {
            axios.get(`${BASE_API_URL}user/${user[0].following[3]}`)
                .then(followData => setUser4(followData.data))
        }

        if (user) {
            axios.get(`${BASE_API_URL}tweets/${user[0].following[4]}`)
                .then(followData => setTweet5(followData.data))
        }
        if (user && tweets) {
            axios.get(`${BASE_API_URL}user/${user[0].following[4]}`)
                .then(followData => setUser5(followData.data))
        }


        if (user) {
            axios.get(`${BASE_API_URL}tweets/${user[0].following[5]}`)
                .then(followData => setTweet6(followData.data))
        } if (user && tweets) {
            axios.get(`${BASE_API_URL}user/${user[0].following[5]}`)
                .then(followData => setUser6(followData.data))
        }


    }, [tweets])

    useEffect(() => {
        const interval = setInterval(() => {
            setUserTweet1(tweet1.map((item1) => Object.assign(item1, user1)))
            setUserTweet2(tweet2.map((item2) => Object.assign(item2, user2)))
            setUserTweet3(tweet3.map((item3) => Object.assign(item3, user3)))
            setUserTweet4(tweet4.map((item4) => Object.assign(item4, user4)))
            setUserTweet5(tweet5.map((item5) => Object.assign(item5, user5)))
            setUserTweet6(tweet6.map((item6) => Object.assign(item6, user6)))
        }, 5000);
        return () => clearInterval(interval)
    })

    let allTweet = userTweet.concat(userTweet1, userTweet2, userTweet3, userTweet4, userTweet5, userTweet6)

    const allTweetSort = allTweet.sort((a, b) => {
        return moment(a.createdAt).diff(b.createdAt)
    })

    useEffect(() => {
        if (userTweet1[0] === undefined) {
            setTimeout(() => setisLoading(true))
        }
        else {
            setTimeout(() => setisLoading(false), 100)
        }
    })

    const likeTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Like
        </Tooltip>
    );

    function getIndex(_id) {
        return tweets.findIndex(obj => obj._id === _id);
    }

    const replyTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Reply
        </Tooltip>
    );

    let handleOpenTweet = async ({ id }) => {
        try {
            await axios.get(`${BASE_API_URL}tweet/${id}`);
            console.log("working")
        } catch (error) {
            if (error.response) {
                console.log('Error', error.response.data)
            }
        }
    }

    return (
        <>
            {isLoading ? <Loader /> :
                <>
                    {(tweets.length > 0) ?
                        (allTweet && allTweet.slice(0).reverse().map(tweets => {
                            return (
                                <Card key={tweets._id} style={{ marginBottom: "0.25px", backgroundColor: "black", border: "1px solid #80808087" }}>
                                    <Container style={{ padding: "5px" }}>
                                        <Row>
                                            <Col xs={2} style={{ paddingLeft: "5%" }}>
                                                <Link to={`${tweets.username}`} >
                                                    <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "45px", height: "45px" }} roundedCircle />
                                                </Link>
                                            </Col>
                                            <Col xs={10} >
                                                <Container>
                                                    <Row>
                                                        <Link to={`${tweets.username}/${tweets._id}`} >
                                                            < button className="homeButton" >
                                                                <Row>
                                                                    <Col xs={{ span: 11 }} style={{ padding: "0px", textAlign: "left" }}>

                                                                        <span >
                                                                            <Link to={`${tweets.username}`}
                                                                                style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>
                                                                                <b>{tweets[0].name}</b>
                                                                            </Link></span>
                                                                        <span style={{ color: "grey", fontSize: "15x", paddingLeft: "6px" }}>
                                                                            @{tweets.username}
                                                                            <span style={{ padding: "0 4px" }}>&#183;</span>
                                                                            {moment(`${tweets.createdAt}`).format("LL") === moment().format("LL") ?
                                                                                (<span>{moment(`${tweets.createdAt}`).fromNow()}</span>)
                                                                                :
                                                                                (<span>{moment(`${tweets.createdAt}`).format("LL")}</span>)
                                                                            }</span>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={{ span: 10 }} style={{ textAlign: "left", padding: "0" }}>
                                                                        <div style={{ paddingBottom: "10px", color: "white" }}>{tweets.tweet}</div>
                                                                    </Col>
                                                                </Row>
                                                            </button>
                                                        </Link>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={{ span: 3 }}>
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                delay={{ show: 600, hide: 200 }}
                                                                overlay={replyTip}
                                                            >
                                                                <button onClick={() => handleOpenTweet(tweets._id)} className="homeButton" id="replyButton">
                                                                    <motion.span whileHover={{
                                                                        borderRadius: "10px", backgroundColor: "rgba(0,191, 255, 0.2)", color: "rgba(0,191, 255, 1)"
                                                                    }}>
                                                                        < AiOutlineMessage />
                                                                    </motion.span>
                                                                </button>

                                                            </OverlayTrigger >

                                                        </Col>
                                                        <Col sm={3}>
                                                            <Retweet />
                                                        </Col>
                                                        <Col sm={3}>
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                delay={{ show: 600, hide: 200 }}
                                                                overlay={likeTip}
                                                            >
                                                                <button type="submit" className="homeButton" id="likeButton" onClick={() => console.log((tweets._id))}>
                                                                    <motion.span whileHover={{
                                                                        borderRadius: "10px", backgroundColor: "rgba(250, 00, 00, 0.2)", color: "rgba(250, 00, 00, 1)"
                                                                    }}><AiOutlineHeart /></motion.span>
                                                                </button>

                                                            </OverlayTrigger >


                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>

                            )
                        })
                        )
                        :
                        (<div>User has no tweets {":("}</div>)}
                </>
            }

        </>
    )
}