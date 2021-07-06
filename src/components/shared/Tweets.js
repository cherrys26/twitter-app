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

import { AiTwotoneStar, AiOutlineRetweet } from "react-icons/ai";

import Retweet from './Re';
import Loader from './Loading';
import Like from './Like';
import Reply from './Reply';

export default function Tweets() {

    const [user, setUser] = useState();
    const [tweets, setTweets] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const location = useLocation();

    let getUser = JSON.parse(localStorage.getItem("username"))
    let path = location.pathname.split("/")
    const userProfile = axios.get(`${BASE_API_URL}user/${getUser}`);
    const userTweets = axios.get(`${BASE_API_URL}tweets/${getUser}`);

    useEffect(() => {
        setTimeout(() => setisLoading(false), 1500);
    });

    useEffect(() => {
        userProfile.then(data => setUser(data.data)) // eslint-disable-next-line
    }, [])
    useEffect((tweets) => {
        userTweets.then(tweetData => setTweets(tweetData.data))
    }, [])


    return (
        <>
            {isLoading ? <Loader /> :
                <>
                    {(tweets.length > 0) ?
                        (tweets && tweets.slice(0).reverse().map(tweets => {
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
                                                            <Like />
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