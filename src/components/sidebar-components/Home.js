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
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Loader from '../shared/Loading';
import moment from 'moment';
import { Link } from "react-router-dom"
import Like from '../shared/Like';
import Reply from '../shared/Reply';
export default function Home(props) {

    let getUser = JSON.parse(localStorage.getItem("username"))

    const [tweet, setTweet] = useState('')
    const [tweets, setTweets] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500)
    }, [])

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
    }, [userTweets])

    useEffect(() => {
        userProfile.then(data => setUser(data.data)) // eslint-disable-next-line
    }, [])

    return (
        <>

            <Container>
                <Row>
                    <Col lg={7}>
                        <Header />
                        <Container>
                            <Card >
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
                                                        style={{ height: "80px", border: "0px", color: "black" }} />
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
                                <Card key={tweets._id} style={{ marginBottom: "0.25px" }}>
                                    <Container>
                                        <Row>
                                            <Link to={`${tweets.username}/${tweets._id}`} >
                                                < button className="homeButton" >
                                                    <Row>
                                                        <Col >
                                                            <span> {user && user.map(user => {
                                                                return (
                                                                    <span> {user.name} </span>)
                                                            })}@{tweets.username}</span>
                                                        </Col>
                                                        <Col>
                                                            {moment(`${tweets.createdAt}`).format("LL") === moment().format("LL") ?
                                                                (<div>{moment(`${tweets.createdAt}`).fromNow()}</div>)
                                                                :
                                                                (<div>{moment(`${tweets.createdAt}`).format("LL")}</div>)
                                                            }
                                                        </Col>
                                                    </Row>
                                                    <Col>
                                                        <div>{tweets.tweet}</div>
                                                    </Col>
                                                </button>
                                            </Link>
                                        </Row>
                                        <Row>
                                            <Col sm={{ span: 3, offset: 1 }}>
                                                <Reply />
                                            </Col>
                                            <Col sm={3}>
                                                <Like />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>
                            )
                        })}
                    </Col>
                    <Col lg={4} className="searchHome">
                        <Form inline >
                            <Form.Control type="text" placeholder="Search Switter" />
                        </Form>
                        <Card style={{ marginTop: "20px" }}>

                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio fff fffff ffff f bf f f fff fff kkkkkkkkl</ListGroup.Item>
                                <ListGroup.Item>hello</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>



        </>
    )
}