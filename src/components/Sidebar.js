import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Explore from "./sidebar-components/Explore"
import Messages from "./sidebar-components/Messages"
import Notifications from "./sidebar-components/Notifications"
import Profile from "./sidebar-components/Profile"
import Home from "./sidebar-components/Home";

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
        path: "/:username",
        main: () => <Profile />
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
            <div className="p-grid" style={{ display: "flex" }}>
                <div
                    className="p-col-fixed"
                    style={{
                        padding: "10px",
                        width: "20%",
                    }}
                >
                    <ul className="items">
                        <li>
                            <Link to="/home" style={{ textDecoration: 'none' }}><i className="pi pi-home" /> Home</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/explore" style={{ textDecoration: 'none' }} ><i className="pi pi-search" /> Explore</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/notifications" style={{ textDecoration: 'none' }}><i className="pi pi-bell" /> Notifications</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/messages" style={{ textDecoration: 'none' }}><i className="pi pi-send" /> Messages</Link>
                        </li>
                        <br />
                        <li>
                            <Link to={getUser()} style={{ textDecoration: 'none' }}><i className="pi pi-user" /> Profile</Link>
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
                </div>

                <div className="p-col" style={{ flex: 1, padding: "10px" }}>
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
                </div>
            </div>
        </Router >
    );
}
