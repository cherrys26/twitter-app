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
import Home from "./sidebar-components/Home";
import Followers from "./sidebar-components/Followers"
import Following from "./sidebar-components/Following"
import { AiOutlineHome, AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { BiSearchAlt, BiSend } from "react-icons/bi";
import "./Sidebar.css"


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
                <Col sm={2}

                    style={{
                        padding: "10px",
                        width: "20%",
                    }}
                >
                    <ul className="items">
                        <li>
                            <Link to="/home" style={{ textDecoration: 'none' }}><AiOutlineHome /> Home</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/explore" style={{ textDecoration: 'none' }} ><BiSearchAlt /> Explore</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/notifications" style={{ textDecoration: 'none' }}><AiOutlineBell /> Notifications</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/messages" style={{ textDecoration: 'none' }}><BiSend /> Messages</Link>
                        </li>
                        <br />
                        <li>
                            <Link to={`/${getUser()}`} style={{ textDecoration: 'none' }}><AiOutlineUser /> Profile</Link>
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

                <Col sm={10} style={{ flex: 1, padding: "10px" }}>
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
