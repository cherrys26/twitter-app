import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';

import Home from "./sidebar-components/main/Home";
import Explore from "./sidebar-components/Explore"
import Messages from "./sidebar-components/Messages"
import Notifications from "./sidebar-components/Notifications"
import Profile from "./sidebar-components/Profile"
import Feed from "./sidebar-components/main/Feed";
import "./Sidebar.css"

const routes = [
    {
        path: "/home",
        main: () => <Feed />
    },
    {
        path: "/",
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
        path: "/profile",
        main: () => <Profile />
    },
    {
        path: "/:username",
        main: () => <Profile />
    }

];

export default function Sidebar() {

    const [displayLogin, setDisplayLogin] = useState(false);

    const login = {
        'displayLogin': setDisplayLogin
    }

    const onClick = (name) => {
        login[`${name}`](true);
    }

    const onHide = (name) => {
        login[`${name}`](false);
    }


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
                            <Link to="/profile" style={{ textDecoration: 'none' }}><i className="pi pi-user" /> Profile</Link>
                        </li>
                        <br />
                        <li>
                            <Avatar label="P" shape="circle" onClick={() => onClick('displayLogin')} />
                            <Dialog visible={displayLogin} onHide={() => onHide('displayLogin')}>
                                <div>
                                    Hello world testing
                                </div>
                            </Dialog>
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
