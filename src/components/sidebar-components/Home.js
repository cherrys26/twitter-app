import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API_URL } from "../../utils/constants"
import Header from './Toolbar';
import Card from 'react-bootstrap/Card'
import '../../App.css'
import Button from 'react-bootstrap/button'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineRetweet, AiTwotoneStar } from "react-icons/ai";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import moment from 'moment';
import { Link } from "react-router-dom"
import Like from '../shared/Like';
import Tooltip from 'react-bootstrap/Tooltip'
import Reply from '../shared/Reply';
export default function Home(props) {

    let getUser = JSON.parse(localStorage.getItem("username"))

    const [tweet, setTweet] = useState('')
    const [tweets, setTweets] = useState([]);
    const [user, setUser] = useState([]);


    const userProfile = axios.get(`${BASE_API_URL}user/${getUser}`);
    const userTweets = axios.get(`${BASE_API_URL}tweets/${getUser}`);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { postTweet } = props
            const updatedData = {
                username: getUser,
                tweet: tweet
            }
            await axios.post(`${BASE_API_URL}tweets/${getUser}`, {
                ...postTweet,
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
        userTweets.then(tweetData => setTweets(tweetData.data)) // eslint-disable-next-line
    }, [])

    useEffect(() => {
        userProfile.then(data => setUser(data.data)) // eslint-disable-next-line
    }, [])


    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Verified User :D
        </Tooltip>
    );

    return (
        <>

            <Container>
                <Row>
                    <Col lg={7}>
                        <Header />
                        <Container >
                            <Card style={{ backgroundColor: "black", border: "1px solid grey" }}>
                                <Row style={{ marginTop: "20px" }}>
                                    <Col xs={1} >
                                        <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" style={{ width: "45px", height: "45px" }} roundedCircle />
                                    </Col>
                                    <Col xs={11} style={{ paddingLeft: "20px" }}>
                                        <Card.Body style={{ textAlign: "right", padding: 0 }} >
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group controlId="tweet" style={{ display: "block" }}>
                                                    <Form.Control
                                                        as="textarea"
                                                        aria-label="With textarea"
                                                        placeholder="What's up?"
                                                        name="tweet"
                                                        value={tweet}
                                                        onChange={(event) => setTweet(event.target.value)}
                                                        style={{ backgroundColor: "black", height: "80px", border: "0px", color: "white" }} />
                                                </Form.Group>
                                                <Button className="tweet-button" type="submit">Tweet </Button>
                                            </Form>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Container>
                        <br />

                        {tweets && tweets.slice(0).reverse().map(tweets => {
                            return (
                                <Card key={tweets._id} style={{ marginBottom: "0.25px", backgroundColor: "black", border: "1px solid grey" }}>
                                    <Container style={{ padding: "5px" }}>
                                        <Row>
                                            <Col xs={1} style={{ paddingLeft: "5%" }}>
                                                <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" style={{ width: "45px", height: "45px" }} roundedCircle />
                                            </Col>
                                            <Col xs={11} style={{ paddingLeft: "1%" }}>
                                                <Container>
                                                    <Row>
                                                        <Link to={`${tweets.username}/${tweets._id}`} >
                                                            < button className="homeButton" >
                                                                <Row>
                                                                    <Col xs={{ span: 11, offset: 1 }} style={{ padding: "0px", textAlign: "left" }}>
                                                                        {user && user.map(user => {
                                                                            return (
                                                                                <span key={user._id}>
                                                                                    <Link to={`${user.name}`}
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
                                                                    <Col xs={{ span: 10, offset: 1 }} style={{ textAlign: "left", padding: "0" }}>
                                                                        <div style={{ paddingBottom: "10px", color: "white" }}>{tweets.tweet}</div>
                                                                    </Col>
                                                                </Row>
                                                            </button>
                                                        </Link>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={{ span: 3, offset: 1 }}>
                                                            <Reply />
                                                        </Col>
                                                        <Col sm={3}>
                                                            <AiOutlineRetweet />
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
                    <Col lg={4} className="searchHome">
                        <Form inline>
                            <Form.Control type="text" placeholder="Search Switter" style={{ border: "1px solid darkgrey", borderRadius: "1rem", backgroundColor: "grey", color: "white" }} />
                        </Form>
                        <Card style={{ marginTop: "20px", border: "1px solid grey" }}>

                            <ListGroup variant="flush">
                                <ListGroup.Item style={{ backgroundColor: "black", border: "1px solid grey", color: "white" }}>Cras justo odio fff fffff ffff f bf f f fff fff kkkkkkkkl</ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: "black", border: "1px solid grey", color: "white" }}>hello</ListGroup.Item>
                                <ListGroup.Item style={{ backgroundColor: "black", border: "1px solid grey", color: "white" }}>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>



        </>
    )
}