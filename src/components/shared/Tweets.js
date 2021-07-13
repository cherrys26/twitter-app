import React, { useState, useEffect, } from 'react';
import {
    useLocation,
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

import { AiOutlineRetweet, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

import Retweet from './Re';
import Loader from './Loading';

export default function Tweets() {

    const [user, setUser] = useState();
    const [tweets, setTweets] = useState([]);
    const [tweet1, setTweet1] = useState([]);
    const [tweet2, setTweet2] = useState([]);
    const [tweet3, setTweet3] = useState([]);
    const [tweet4, setTweet4] = useState([]);
    const [tweet5, setTweet5] = useState([]);
    const [tweet6, setTweet6] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const location = useLocation();

    let getUser = JSON.parse(localStorage.getItem("username"))
    const userProfile = axios.get(`${BASE_API_URL}user/${getUser}`);
    const userTweets = axios.get(`${BASE_API_URL}tweets/${getUser}`);

    useEffect(() => {
        setTimeout(() => setisLoading(false), 3000);
    });

    useEffect(() => {
        userProfile.then(data => setUser(data.data)) // eslint-disable-next-line
    }, [])
    useEffect(() => {
        userTweets.then(tweetData => setTweets(tweetData.data))// eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (user) {

            axios.get(`${BASE_API_URL}tweets/${user[0].following[0]}`)
                .then(followData => setTweet1(followData.data))
        }
    }, [tweets, setTweet1])

    useEffect(() => {
        if (user) {

            axios.get(`${BASE_API_URL}tweets/${user[0].following[1]}`)
                .then(followData => setTweet2(followData.data))
        }
    }, [tweets, setTweet2])

    useEffect(() => {
        if (user) {
            axios.get(`${BASE_API_URL}tweets/${user[0].following[2]}`)
                .then(followData => setTweet3(followData.data))
        }
    }, [tweets, setTweet3])

    useEffect(() => {
        if (user) {
            axios.get(`${BASE_API_URL}tweets/${user[0].following[3]}`)
                .then(followData => setTweet4(followData.data))
        }
    }, [tweets, setTweet4])

    useEffect(() => {
        if (user) {
            axios.get(`${BASE_API_URL}tweets/${user[0].following[4]}`)
                .then(followData => setTweet5(followData.data))
        }
    }, [tweets, setTweet5])

    useEffect(() => {
        if (user) {
            axios.get(`${BASE_API_URL}tweets/${user[0].following[5]}`)
                .then(followData => setTweet6(followData.data))
        }
    }, [tweets, setTweet6])

    let allTweet = tweets.concat(tweet1, tweet2, tweet3, tweet4, tweet5, tweet6)

    const tweetSort = allTweet.sort((a, b) => {
        return moment(a.createdAt).diff(b.createdAt)
    })

    const likeTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Like
        </Tooltip>
    );

    function getIndex(_id) {
        return tweets.findIndex(obj => obj._id === _id);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedData = {
                username: getUser,
            }
            await axios.post(`${BASE_API_URL}tweets/${getIndex()}`, {
                ...updatedData
            })
        } catch (error) {
            if (error.response) {

                console.log('error', error.response.data);
            }
        };
        event.target.reset()
    };

    const replyTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Reply
        </Tooltip>
    );

    const [show, setShow] = useState(false)
    const showReply = () => setShow(true)
    const hideReply = () => setShow(false)

    // function ReplyTweet(_id) {

    const [tweet, setTweet] = useState({});

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

    //     return (
    //         <div>
    //             {tweet && tweet.map((tweet) => {
    //                 <div>
    //                     {tweet.tweet}
    //                 </div>
    //             })}
    //         </div>
    //     )
    // }

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
                                                                        {user && user.map(user => {
                                                                            return (
                                                                                <span key={user._id}>
                                                                                    <Link to={`${user.username}`}
                                                                                        style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>
                                                                                        <b>{user.name}</b>
                                                                                    </Link></span>)
                                                                        })}
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
                                                            {/* <Modal show={show} onHide={hideReply}>
                                                                <Modal.Body>
                                                                    <Form>
                                                                        <Form.Control as="textarea" rows={3} />
                                                                    </Form>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="secondary" onClick={hideReply}>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" onClick={hideReply}>
                                                                        Reply
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal> */}
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

                                                            {/* <Like /> */}
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