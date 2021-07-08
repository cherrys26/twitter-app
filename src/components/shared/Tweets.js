import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
    useLocation,
    Link,
} from 'react-router-dom'
import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import moment from 'moment';
import { motion } from 'framer-motion'

import { AiTwotoneStar, AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";

import Retweet from './Re';
import Loader from './Loading';
import Like from './Like';
import Reply from './Reply';

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
    let path = location.pathname.split("/")
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
                                                            <Reply />
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
                                                                <Button type="submit" className="homeButton" id="likeButton" onClick={() => console.log(getIndex(tweets._id))}>
                                                                    <motion.span whileHover={{
                                                                        borderRadius: "10px", backgroundColor: "rgba(250, 00, 00, 0.2)", color: "rgba(250, 00, 00, 1)"
                                                                    }}><AiOutlineHeart /></motion.span>
                                                                </Button>

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