import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants';

import { Link, useLocation, useHistory } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { BiArrowBack } from 'react-icons/bi'

import moment from "moment";

import Like from '../shared/Like';
import Reply from '../shared/Reply';
import Retweet from '../shared/Re';
import Recommend from '../shared/Recommend';

export default function OpenTweet() {
    let location = useLocation()
    let path = location.pathname.split("/")
    let history = useHistory();
    let getUser = JSON.parse(localStorage.getItem("username"))

    const [tweet, setTweet] = useState('')
    const [replys, setReplys] = useState('')
    const [reply, setReply] = useState('')
    const [user, setUser] = useState('')

    let tweets = axios.get(`${BASE_API_URL}tweet/${path[2]}`);
    let replysGet = axios.get(`${BASE_API_URL}reply/${path[2]}`);
    let users = axios.get(`${BASE_API_URL}user/${path[1]}`);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedData = {
                username: getUser,
                reply: reply
            }
            await axios.post(`${BASE_API_URL}reply/${path[2]}`, {
                ...updatedData
            })
        } catch (error) {
            if (error.response) {

                console.log('error', error.response.data);
            }
        };
        event.target.reset()
    };

    useEffect(() => {
        tweets.then(tweetData => setTweet(tweetData.data)) // eslint-disable-next-line
    }, [])

    useEffect(() => {
        replysGet.then(replyData => setReplys(replyData.data)) // eslint-disable-next-line
    }, [])

    useEffect(() => {
        users.then(userData => setUser(userData.data)) //eslint-disable-next-line
    }, [])


    return (
        <Container>
            <Row>
                <Col md={7}>
                    <Row>
                        <Col md={12}>
                            <Navbar className="topBar">
                                <Navbar.Brand style={{ textTransform: "capitalize", color: "white" }}>
                                    <Button onClick={() => history.goBack()} style={{ backgroundColor: "transparent", border: "transparent", color: "deeppink", fontSize: "20px", verticalAlign: "inherit" }}> <BiArrowBack /></Button>
                                    <b>Tweet</b>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar>

                        </Col>
                    </Row>
                    <Card key={tweet._id} style={{ marginBottom: "0.25px", backgroundColor: "black", border: "1px solid #80808087" }}>
                        <Container style={{ padding: "5px" }}>
                            <Row>
                                <Col xs={2} style={{ paddingLeft: "5%" }}>
                                    <Link to={`/${tweet.username}`} >
                                        <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "45px", height: "45px" }} roundedCircle />
                                    </Link>
                                </Col>
                                <Col xs={10} >
                                    <Container>
                                        <Row>
                                            <Row>
                                                <Col xs={{ span: 11 }} style={{ padding: "0px", textAlign: "left" }}>
                                                    {user && user.map(user => {
                                                        return (
                                                            <span key={user._id}>
                                                                <Link to={`/${user.username}`}
                                                                    style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>
                                                                    <b>{user.name}</b>
                                                                </Link></span>)
                                                    })}
                                                    <span style={{ color: "grey", fontSize: "15x", paddingLeft: "6px" }}>
                                                        @{tweet.username}
                                                        <span style={{ padding: "0 4px" }}>&#183;</span>
                                                        {moment(`${tweet.createdAt}`).format("LL") === moment().format("LL") ?
                                                            (<span>{moment(`${tweet.createdAt}`).fromNow()}</span>)
                                                            :
                                                            (<span>{moment(`${tweet.createdAt}`).format("LL")}</span>)
                                                        }</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={{ span: 10 }} style={{ textAlign: "left", padding: "0" }}>
                                                    <div style={{ paddingBottom: "10px", color: "white" }}>{tweet.tweet}</div>
                                                </Col>
                                            </Row>

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
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="tweet" style={{ display: "block" }}>
                                <Form.Control
                                    as="textarea"
                                    aria-label="With textarea"
                                    placeholder="What's up?"
                                    name="tweet"
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    style={{ backgroundColor: "black", height: "80px", border: "0px", color: "white" }} />
                            </Form.Group>
                            <Button className="tweet-button" type="submit" >Reply </Button>
                        </Form>
                    </Card>
                    {replys && replys.slice(0).reverse().map((reply) => {
                        return (
                            <Card key={reply._id} style={{ marginBottom: "0.25px", backgroundColor: "black", border: "1px solid #80808087" }}>
                                <Container style={{ padding: "5px" }}>
                                    <Row>
                                        <Col xs={2} style={{ paddingLeft: "5%" }}>
                                            <Link to={`/${reply.username}`} >
                                                <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "45px", height: "45px" }} roundedCircle />
                                            </Link>
                                        </Col>
                                        <Col xs={10} >
                                            <Container>
                                                <Row>
                                                    <Row>
                                                        <Col xs={{ span: 11 }} style={{ padding: "0px", textAlign: "left" }}>
                                                            <span style={{ color: "grey", fontSize: "15x", paddingLeft: "6px" }}>
                                                                @{reply.username}
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={{ span: 10 }} style={{ textAlign: "left", padding: "0" }}>
                                                            <div style={{ paddingBottom: "10px", color: "white" }}>{reply.reply}</div>
                                                        </Col>
                                                    </Row>

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
                    })}
                </Col>
                <Col md={4} className="searchHome">
                    <div className="search">

                        <Recommend />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}