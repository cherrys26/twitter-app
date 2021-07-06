import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
    useLocation,
    Link,
} from 'react-router-dom'
import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';

import '../Sidebar.scss'

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
import Like from '../shared/Like';
import Reply from '../shared/Reply';
import Recommend from '../shared/Recommend';
import Loader from '../shared/Loading';

export default function Profile(props) {


    const [user, setUser] = useState();
    const [tweets, setTweets] = useState([]);
    const location = useLocation();
    const [followingUser, setFollowingUser] = useState([]);
    const [followerUser, setFollowerUser] = useState([]);

    let getUser = JSON.parse(localStorage.getItem("username"))
    let path = location.pathname.split("/")
    const userFollowing = axios.get(`${BASE_API_URL}following/${getUser}`);
    const userFollowers = axios.get(`${BASE_API_URL}followers/${path[1]}`);
    const userProfile = axios.get(`${BASE_API_URL}user/${path[1]}`);
    const userTweets = axios.get(`${BASE_API_URL}tweets/${path[1]}`);
    const [isLoading, setisLoading] = useState(true);

    const handleUnfollow = async (event) => {
        event.preventDefault();
        console.log(event)
        try {
            const updateData = {
                following: path[1],
            }
            await axios.delete(`${BASE_API_URL}following/${getUser}`, {
                headers: {
                    'Content-Type': 'application/json',
                }, data: {
                    ...updateData
                }
            })
        } catch (error) {
            if (error.response) {

                console.log('error', error.response.data);
            }
        } try {
            const updateFollow = {
                followers: getUser,
            }
            await axios.delete(`${BASE_API_URL}followers/${path[1]}`, {
                headers: {
                    'Content-Type': 'application/json',
                }, data: {
                    ...updateFollow
                }
            })
        } catch (error) {
            if (error.response) {
                console.log('error', error.response.data);
            }

        }
    };

    const handleFollow = async (event) => {
        event.preventDefault();
        console.log(event)
        try {
            const updatedData = {
                following: path[1],
            }
            await axios.post(`${BASE_API_URL}following/${getUser}`, {
                ...updatedData
            })
        } catch (error) {
            if (error.response) {
                console.log('error', error.response.data);
            }
        } try {
            const updatedFollow = {
                followers: getUser,
            }
            await axios.post(`${BASE_API_URL}followers/${path[1]}`, {

                ...updatedFollow

            })
        } catch (error) {
            if (error.response) {
                console.log('error', error.response.data);
            }

        }
    };


    const results = followingUser.find(example => example === `${path[1]}`) ? (
        <Form onSubmit={handleUnfollow}>
            <Button type="submit" style={{ backgroundColor: "deeppink", border: "deeppink", borderRadius: "20px" }}> Following </Button>
        </Form>
    ) : (
        <Form onSubmit={handleFollow}>
            <Button type="submit" style={{ backgroundColor: "deeppink", border: "deeppink", borderRadius: "20px" }}> Follow </Button>
        </Form>
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
        userFollowers.then(followerData => setFollowerUser(followerData.data)) // eslint-disable-next-line
    }, [])
    useEffect(() => {
        userProfile.then(data => setUser(data.data)).catch((error) => { console.log(error) }) // eslint-disable-next-line
    }, [])
    useEffect(() => {
        userTweets.then(tweetData => setTweets(tweetData.data)) // eslint-disable-next-line
    }, [])
    useEffect(() => {
        setTimeout(() => setisLoading(false), 1000);
    });



    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Verified User :D
        </Tooltip>
    );

    return (
        <Container>
            {user && user.map(user => {
                return (
                    <>
                        {(user.username === path[1]) ? (
                            < Row key={user._id} >
                                <Col lg={7}>
                                    <Container>
                                        <Col md={12}>
                                            <Row>
                                                <Navbar style={{ justifyContent: "space-between", backgroundColor: "transparent" }}>
                                                    <Navbar.Brand>
                                                        <div style={{ color: "white" }}>
                                                            {user.followers.length > 10 ?
                                                                (<b>{user.name}
                                                                    <OverlayTrigger
                                                                        placement="right"
                                                                        delay={{ show: 100, hide: 400 }}
                                                                        overlay={renderTooltip}
                                                                    ><AiTwotoneStar />
                                                                    </OverlayTrigger></b>)
                                                                :
                                                                (<b>{user.name}

                                                                </b>)
                                                            }
                                                        </div>
                                                        <span style={{ color: "grey", fontSize: "14px" }}>{tweets.length} Tweets</span>
                                                    </Navbar.Brand>
                                                </Navbar>
                                            </Row>
                                        </Col>
                                        <Col md={12}>
                                            <Card style={{ marginBottom: "5px", backgroundColor: "black" }}>
                                                <Card.Img variant="top" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" style={{ height: "12rem" }} />
                                                <Row>
                                                    <Col md={7} style={{ textAlign: "left" }}>
                                                        <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "100px", height: "100px", marginTop: "-50px" }} roundedCircle />
                                                    </Col>
                                                    <Col md={5} style={{ textAlign: "right", marginLeft: "-10px", marginTop: "10px" }}>
                                                        {user.username === JSON.parse(localStorage.getItem('username')) ? (

                                                            <Button id="editPro" style={{ backgroundColor: "transparent", border: "1px solid deeppink", borderRadius: "20px", color: "deeppink" }}>Edit Profile</Button>
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
                                                {isLoading ? <Loader /> :

                                                    <Tabs defaultActiveKey="home" className="mb-3" style={{ textAlign: "center" }}>
                                                        <Tab eventKey="home" title="Home">
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
                                                                                                                <span>
                                                                                                                    <Link to={`${user.username}`}
                                                                                                                        style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>
                                                                                                                        <b>{user.name}</b>
                                                                                                                    </Link>
                                                                                                                </span>
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
                                                        </Tab>
                                                        <Tab eventKey="likes" title="Likes">
                                                            <div><Likes /></div>
                                                        </Tab>
                                                    </Tabs>}
                                            </Card>


                                        </Col>
                                    </Container>
                                </Col>
                                <Col md={4}>
                                    <Recommend />
                                </Col>

                            </Row>)
                            : (<div>no</div>)}
                    </>
                )
            })}
        </Container >
    )

}
function Likes() {
    return (
        <div>These are liked tweets {`:)`}</div>
    )
}