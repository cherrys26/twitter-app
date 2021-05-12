import React, { useState, useEffect } from 'react';
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
import moment from 'moment';
import { AiTwotoneStar } from "react-icons/ai";
export default function Profile() {

    const [user, setUser] = useState();
    const [username, setUsername] = useState();
    const [tweets, setTweets] = useState([]);
    const location = useLocation();
    let path = location.pathname.split("/")

    const userProfile = axios.get(`${BASE_API_URL}/api/user/${path[1]}`);
    const getUsername = axios.get(`${BASE_API_URL}/api/user/${path[1]}`);
    const userTweets = axios.get(`${BASE_API_URL}/api/tweet/${path[1]}`);
    console.log(user)
    console.log(username)
    useEffect(() => {
        userProfile.then(data => setUser(data.data)) // eslint-disable-next-line
    }, [])
    useEffect(() => {
        userTweets.then(tweetData => setTweets(tweetData.data)) // eslint-disable-next-line
    }, [])
    useEffect(() => {
        getUsername.then(userUsername => setUsername(userUsername.data[0].username)) // eslint-disable-next-line
    }, [])

    const date = moment(`2021-05-07T14:52:28.923Z`).format('LL');;
    console.log(date);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Verified User :D
        </Tooltip>
    );

    return (
        <div>
            <Container>
                <Col md={12}>
                    <Row>
                        <Navbar bg="light" variant="light" style={{ justifyContent: "space-between" }}>
                            <Navbar.Brand>
                                {user && user.map(user => {
                                    return (
                                        <div>
                                            { user.followers.length > 10 ?
                                                (<div>{user.username}
                                                    <OverlayTrigger
                                                        placement="right"
                                                        delay={{ show: 100, hide: 400 }}
                                                        overlay={renderTooltip}
                                                    ><AiTwotoneStar />
                                                    </OverlayTrigger></div>)
                                                :
                                                (<div>{user.username}</div>)
                                            }
                                        </div>)
                                })}
                                Tweets: {tweets.length}
                            </Navbar.Brand>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            </Form>
                        </Navbar>
                    </Row>
                </Col>
                <Row>
                    <Col md={7}>
                        {user && user.map(user => {
                            return (
                                <Card key={user.name} style={{ marginBottom: "5px" }}>
                                    <Card.Img variant="top" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" style={{ height: "12rem" }} />
                                    <Row>
                                        <Col md={7} style={{ textAlign: "left" }}>
                                            <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" style={{ width: "100px", height: "100px", marginTop: "-50px" }} roundedCircle />
                                        </Col>
                                        <Col md={5} style={{ textAlign: "right", marginLeft: "-10px", marginTop: "10px" }}>
                                            {user.username === JSON.parse(localStorage.getItem('username')) ? (

                                                <Button style={{ backgroundColor: "purple", border: "purple", borderRadius: "20px" }}>Edit Profile</Button>
                                            ) : (
                                                <Button style={{ backgroundColor: "purple", border: "purple", borderRadius: "20px" }}> Follow </Button>
                                            )

                                            }
                                        </Col>
                                    </Row>
                                    <Card.Body style={{ textAlign: "left" }}>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">@{user.username}</Card.Subtitle>
                                        <Card.Text className="mb-2">
                                            {user.bio}
                                            <br />
                                            Joined on: {user.createdAt}
                                        </Card.Text>
                                        <Card.Footer>
                                            <Row>
                                                <Col md={3}>
                                                    <Link to={`${user.username}/followers`} style={{ textDecoration: 'none' }}>
                                                        {user.followers.length} Followers
                                                        </Link>
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`${user.username}/following`} style={{ textDecoration: 'none' }}>
                                                        {user.following.length} Following
                                                    </Link>
                                                </Col>
                                            </Row>

                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            )
                        }
                        )}

                        {tweets && tweets.slice(0).reverse().map(tweets => {
                            return (
                                <Card key={tweets._id} style={{ marginBottom: "0.25px" }}>
                                    <div>{tweets.username}</div>
                                    <div>{tweets.tweet}</div>
                                    <div>{tweets.createdAt}</div>
                                </Card>
                            )
                        })}
                    </Col>
                    <Col md={5}>
                        hello world
                    </Col>
                </Row>
            </Container>
        </div>
    )

}
