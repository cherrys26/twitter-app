import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import axios from 'axios';

import { BASE_API_URL } from "../utils/constants"

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Explore from "./sidebar-components/Explore"
import Messages from "./sidebar-components/Messages"
import Notifications from "./sidebar-components/Notifications"
import Profile from "./sidebar-components/Profile"
import OpenTweet from "./sidebar-components/Tweet"
import Home from "./sidebar-components/Home";
import Followers from "./sidebar-components/Followers"
import Following from "./sidebar-components/Following"
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { AiOutlineHome, AiOutlineBell, AiOutlineUser, AiOutlineClose } from "react-icons/ai";
import { GiFeather } from "react-icons/gi";
import { BiSearchAlt, BiSend } from "react-icons/bi";
import "./Sidebar.scss"


function GetUser() {
    return JSON.parse(localStorage.getItem('username'))
}

const routes = [
    {
        path: "/home",
        main: () => <Home />
    },
    {
        path: "/home",
        exact: true,
        main: () => <Home />
    },
    {
        path: "/explore",
        main: () => <Explore />
    },
    {
        path: "/notifications",
        main: () => <Notifications />
    },
    {
        path: "/messages",
        main: () => <Messages />
    },
    {
        path: `/${GetUser()}`,
        exact: true,
        main: () => <Profile />
    },
    {
        path: "/:username",
        exact: true,
        main: () => <Profile />
    },
    {
        path: "/:username/followers",
        exact: true,
        main: () => <Followers />
    },
    {
        path: "/:username/following",
        exact: true,
        main: () => <Following />
    },
    {
        path: "/:username/:id",
        exact: true,
        main: () => <OpenTweet />
    }

];

function TweetModal(props) {

    let getUser = JSON.parse(localStorage.getItem("username"))

    const [tweet, setTweet] = useState('')

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
        console.log(tweet)
    };

    return (
        <Modal
            {...props}
            size="s"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ backgroundColor: "rgba(250, 250, 250, 0.15" }}
        >
            <Modal.Title style={{ backgroundColor: "black", borderBottom: "1px solid rgba(150, 150, 150, 0.5" }} >
                <Button style={{ backgroundColor: "transparent", border: "none", color: "darkgray", borderRadius: "50px" }} onClick={props.onHide}>
                    <AiOutlineClose />
                </Button>
            </Modal.Title>
            <Modal.Body style={{ textAlign: "right", padding: 0, backgroundColor: "black" }} >
                <Row style={{ marginTop: "20px" }}>
                    <Col xs={1} >
                        <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "45px", height: "45px" }} roundedCircle />
                    </Col>
                    <Col xs={11} style={{ paddingLeft: "20px" }}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="tweet" style={{ display: "block" }}>
                                <Form.Control
                                    as="textarea"
                                    aria-label="With textarea"
                                    placeholder="What's up?"
                                    name="tweet"
                                    value={tweet}
                                    onChange={(e) => setTweet(e.target.value)}
                                    style={{ backgroundColor: "black", height: "80px", border: "0px", color: "white" }} />
                            </Form.Group>
                            <Dropdown.Divider style={{ borderTop: "1px solid rgba(150, 150, 150, 0.5" }} />
                            <Button className="tweet-button" type="submit" >Tweet </Button>
                        </Form>
                    </Col>
                </Row>

            </Modal.Body>
        </Modal>
    );
}


export default function Sidebar(props) {
    const [user, setUser] = useState();

    const [tweetShow, setTweetShow] = useState(false);
    let getUser = JSON.parse(localStorage.getItem("username"))

    const userProfile = axios.get(`${BASE_API_URL}user/${getUser}`);

    useEffect(() => {
        userProfile.then(data => setUser(data.data)) // eslint-disable-next-line
    }, [])



    return (
        <Router>
            <Container style={{ display: "flex", marginRight: 0, marginLeft: 0, maxWidth: "inherit" }}>

                <Col lg={3} sm={1} xs={2}
                    style={{
                        padding: "10px",
                    }}
                >
                    <Container spacing={4}>
                        <ul className="items">
                            <Col>
                                <li>
                                    <Link to="/home" style={{ textDecoration: 'none' }}><h5><AiOutlineHome className="icon" /> <span className="hide">Home</span></h5></Link>
                                </li>
                            </Col>
                            <br />
                            <Col>
                                <li>
                                    <Link to="/explore" style={{ textDecoration: 'none' }} ><h5><BiSearchAlt className="icon" /> <span className="hide">Explore</span></h5></Link>
                                </li>
                            </Col>
                            <br />
                            <Col>
                                <li>
                                    <Link to="/notifications" style={{ textDecoration: 'none' }}><h5><AiOutlineBell className="icon" /> <span className="hide">Notifications</span></h5></Link>
                                </li>
                            </Col>
                            <br />
                            <Col>
                                <li>
                                    <Link to="/messages" style={{ textDecoration: 'none' }}><h5><BiSend className="icon" /> <span className="hide">Messages</span></h5></Link>
                                </li>
                            </Col>
                            <br />
                            <Col>
                                <li>
                                    <Link to={`/${GetUser()}`} style={{ textDecoration: 'none' }}><h5><AiOutlineUser className="icon" /> <span className="hide">Profile</span></h5></Link>
                                </li>
                            </Col>
                            <br />
                            <Col>
                                <li>
                                    <Button className="list-button" type="button" onClick={() => setTweetShow(true)}>Tweet </Button>
                                    <Button className="list-ava" type="button" onClick={() => setTweetShow(true)}><GiFeather style={{ fontSize: "x-large" }} /> </Button>
                                    <TweetModal
                                        show={tweetShow}
                                        onHide={() => setTweetShow(false)}
                                        onSubmit={() => setTweetShow(false)}
                                    />
                                </li>
                            </Col>
                            <br />
                            <Row className="align-items-end">
                                <Col>
                                    <li>
                                        <OverlayTrigger
                                            placement="top"
                                            trigger="click"
                                            rootClose={true}
                                            overlay={(
                                                <Popover className="popover-main" >
                                                    {user && user.map(user => {
                                                        return (
                                                            <div className="popover-custom-header">
                                                                <Container>
                                                                    <Row>
                                                                        <Col xs={4}>
                                                                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "40px", height: "40px" }} roundedCircle />
                                                                        </Col>
                                                                        <Col xs={8}>
                                                                            <Container>
                                                                                <Col xs={12}>
                                                                                    {user.name}
                                                                                </Col>
                                                                                <Col xs={12}>
                                                                                    @{user.username}
                                                                                </Col>
                                                                            </Container>
                                                                        </Col>
                                                                    </Row>
                                                                </Container>
                                                                <Button onClick={() => props.history.push('/') & localStorage.removeItem("username") & console.log("logout :(")}>
                                                                    Logout @{user.username}
                                                                </Button>
                                                            </div>
                                                        )
                                                    })}

                                                </Popover >)}
                                        >
                                            <Button className="infoBtn" style={{ backgroundColor: "transparent", border: "transparent" }}>
                                                {user && user.map(user => {
                                                    return (
                                                        <div>
                                                            <Container>
                                                                <Row>
                                                                    <Col xs={4}>
                                                                        <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "50px", height: "50px" }} roundedCircle />
                                                                    </Col>
                                                                    <Col xs={8}>
                                                                        <Container>
                                                                            <Col xs={12}>
                                                                                {user.name}
                                                                            </Col>
                                                                            <Col xs={12}>
                                                                                @{user.username}
                                                                            </Col>
                                                                        </Container>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </div>
                                                    )
                                                })}
                                            </Button>
                                        </OverlayTrigger>
                                    </li>
                                </Col>
                            </Row>
                        </ul>
                    </Container>
                </Col>


                <Col lg={9} sm={11} xs={10} style={{ flex: 1, padding: "0 10px" }}>
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main />}
                            />
                        ))}
                    </Switch>
                </Col>
            </Container>
        </Router >
    );
}
