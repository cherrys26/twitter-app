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
import Spinner from 'react-bootstrap/Spinner'

import moment from 'moment';

import { AiTwotoneStar, AiOutlineRetweet } from "react-icons/ai";

import Retweet from '../shared/Re';
import Loader from '../shared/Loading';
import Like from '../shared/Like';
import Reply from '../shared/Reply';
import Recommend from '../shared/Recommend';
export default function Profile(props) {

    const Tweets = lazy(() => import('../shared/Tweets'))

    const [user, setUser] = useState();
    const [tweets, setTweets] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true)
    const [followingUser, setFollowingUser] = useState([]);

    let getUser = JSON.parse(localStorage.getItem("username"))
    let path = location.pathname.split("/")
    const userFollowing = axios.get(`${BASE_API_URL}following/${getUser}`);
    const userProfile = axios.get(`${BASE_API_URL}user/${path[1]}`);

    const handleFollow = async (event) => {
        event.preventDefault();
        try {
            const { postTweet } = props
            const updatedData = {
                username: path[1],

            }
            await axios.post(`${BASE_API_URL}following/${getUser}`, {
                ...postTweet,
                ...updatedData
            })
        } catch (error) {
            if (error.response) {

                console.log('error', error.response.data);
            }
        }
    };
    const handleUnfollow = async (event) => {
        event.preventDefault();
        try {
            const { updateFollowing } = props
            const updatedData = {
                username: path[1],

            }
            await axios.delete(`${BASE_API_URL}following/${getUser}`, {
                ...updateFollowing,
                ...updatedData
            })
        } catch (error) {
            if (error.response) {

                console.log('error', error.response.data);
            }
        }
    };

    const results = followingUser.find(example => example === `${path[1]}`) ? (
        <Form onSubmit={handleUnfollow}>
            <Button style={{ backgroundColor: "purple", border: "purple", borderRadius: "20px" }}> Unfollow </Button>
        </Form>
    ) : (
        <Button onSubmit={handleFollow} style={{ backgroundColor: "purple", border: "purple", borderRadius: "20px" }}> Follow </Button>
    )

    function Foll() {
        return (
            results
        )
    }


    useEffect(() => {
        userFollowing.then(followingData => setFollowingUser(followingData.data)) // eslint-disable-next-line
    }, [])
    useEffect(() => {
        setTimeout(() => setLoading(false), 1500)
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
        <Container>
            <Row>
                <Col lg={7}>
                    <Container>
                        <Col md={12}>
                            <Row>
                                <Navbar style={{ justifyContent: "space-between", backgroundColor: "transparent" }}>
                                    <Navbar.Brand>
                                        {user && user.map(user => {
                                            return (
                                                <div key={user._id} style={{ color: "white" }}>
                                                    {user.followers.length > 10 ?
                                                        (<b>{user.name}
                                                            <OverlayTrigger
                                                                placement="right"
                                                                delay={{ show: 100, hide: 400 }}
                                                                overlay={renderTooltip}
                                                            ><AiTwotoneStar />
                                                            </OverlayTrigger></b>)
                                                        :
                                                        (<b>{user.name}</b>)
                                                    }
                                                </div>)
                                        })}

                                        <span style={{ color: "grey", fontSize: "14px" }}>{tweets.length} Tweets</span>
                                    </Navbar.Brand>
                                </Navbar>
                            </Row>
                        </Col>
                        <Col md={12}>
                            {user && user.map(user => {
                                return (
                                    <Card key={user.name} style={{ marginBottom: "5px", backgroundColor: "black" }}>
                                        <Card.Img variant="top" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" style={{ height: "12rem" }} />
                                        <Row>
                                            <Col md={7} style={{ textAlign: "left" }}>
                                                <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" style={{ width: "100px", height: "100px", marginTop: "-50px" }} roundedCircle />
                                            </Col>
                                            <Col md={5} style={{ textAlign: "right", marginLeft: "-10px", marginTop: "10px" }}>
                                                {user.username === JSON.parse(localStorage.getItem('username')) ? (

                                                    <Button style={{ backgroundColor: "transparent", border: "1px solid deeppink", borderRadius: "20px", color: "deeppink" }}>Edit Profile</Button>
                                                ) : (
                                                    <Foll />
                                                )

                                                }
                                            </Col>
                                        </Row>
                                        <Card.Body style={{ textAlign: "left" }}>
                                            <Card.Title><b>{user.name}</b></Card.Title>
                                            <Card.Subtitle style={{ color: "grey", fontSize: "14px", paddingBottom: "10px" }}>@{user.username}</Card.Subtitle>
                                            <Card.Text className="mb-2">
                                                {user.bio}
                                                <br />
                                                <span style={{ color: "grey", fontSize: "14px" }}>Joined on: {moment(`${user.createdAt}`).format("LL")}</span>
                                            </Card.Text>
                                            <Card.Text>
                                                <Row>
                                                    <Col md={3}>
                                                        <Link to={`${user.username}/followers`} style={{ textDecoration: 'none' }}>
                                                            <span style={{ color: "white" }}>{user.followers.length}</span> <span style={{ color: "grey", fontSize: "14px" }}>Followers</span>
                                                        </Link>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Link to={`${user.username}/following`} style={{ textDecoration: 'none' }}>
                                                            <span style={{ color: "white" }}>{user.following.length}</span> <span style={{ color: "grey", fontSize: "14px" }}>Following</span>
                                                        </Link>
                                                    </Col>
                                                </Row>

                                            </Card.Text>
                                        </Card.Body>
                                        <Tabs defaultActiveKey="home" className="mb-3" style={{ textAlign: "center" }}>
                                            <Tab eventKey="home" title="Home">
                                                <Suspense fallback={<div><Spinner animation="border" variant="danger" /></div>}>
                                                    <Tweets />
                                                </Suspense>
                                            </Tab>
                                            <Tab eventKey="likes" title="Likes">
                                                <div><Likes /></div>
                                            </Tab>
                                        </Tabs>
                                    </Card>
                                )
                            }
                            )}

                        </Col>
                    </Container>
                </Col>
                <Col md={4}>
                    <Recommend />
                </Col>
            </Row>
        </Container>
    )

}
function Likes() {
    return (
        <div>These are liked tweets {`:)`}</div>
    )
}