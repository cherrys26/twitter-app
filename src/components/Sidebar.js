import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
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
import { AiOutlineHome, AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { BiSearchAlt, BiSend } from "react-icons/bi";
import "./Sidebar.scss"


function getUser() {
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
        path: `/${getUser()}`,
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

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="s"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body >
                <h4>Do you want to log out?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onLogout}>Logout</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function Sidebar(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <Router>
            <Container style={{ display: "flex", marginRight: 0, marginLeft: 0, maxWidth: "inherit" }}>

                <Col lg={3} sm={3} xs={2}
                    style={{
                        padding: "10px",
                    }}
                >
                    <ul className="items">
                        <li>
                            <Link to="/home" style={{ textDecoration: 'none' }}><h5><AiOutlineHome className="icon" /> <span className="hide">Home</span></h5></Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/explore" style={{ textDecoration: 'none' }} ><h5><BiSearchAlt className="icon" /> <span className="hide">Explore</span></h5></Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/notifications" style={{ textDecoration: 'none' }}><h5><AiOutlineBell className="icon" /> <span className="hide">Notifications</span></h5></Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/messages" style={{ textDecoration: 'none' }}><h5><BiSend className="icon" /> <span className="hide">Messages</span></h5></Link>
                        </li>
                        <br />
                        <li>
                            <Link to={`/${getUser()}`} style={{ textDecoration: 'none' }}><h5><AiOutlineUser className="icon" /> <span className="hide">Profile</span></h5></Link>
                        </li>
                        <br />
                        <li>
                            <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" style={{ width: "50px", height: "50px" }} onClick={() => setModalShow(true)} roundedCircle>
                            </Image>

                            <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                onLogout={() => setModalShow(props.history.push('/') & localStorage.removeItem("username"))}
                            />
                        </li>
                    </ul>
                </Col>


                <Col lg={9} sm={9} xs={10} style={{ flex: 1, padding: "10px" }}>
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
