import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import Login from "./Login/Login";
import Home from "./sidebar-components/Home";
import Explore from "./sidebar-components/Explore"
import Messages from "./sidebar-components/Messages"
import Notifications from "./sidebar-components/Notifications"
import Profile from "./sidebar-components/Profile"
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';

const routes = [
    {
        path: "/home",
        main: () => <Home />
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
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        padding: "10px",
                        width: "20%",
                    }}
                >
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                            <Link to="/home"><i className="pi pi-home" style={{ textDecoration: 'none' }} /> Home</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/explore"><i className="pi pi-search" style={{ textDecoration: 'none' }} /> Explore</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/notifications"><i className="pi pi-bell" style={{ textDecoration: 'none' }} /> Notifications</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/messages"><i className="pi pi-send" style={{ textDecoration: 'none' }} /> Messages</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/profile"><i className="pi pi-user" style={{ textDecoration: 'none' }} /> Profile</Link>
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

                <div style={{ flex: 1, padding: "10px" }}>
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
                <ToLogin><i className="pi pi-send" /></ToLogin>
            </div>
        </Router>
    );
}
function ToLogin() {
    let location = useLocation();
    let background = location.state && location.state.background;

    return (
        <div>
            <Switch location={background || location}>
                <Route path="/login" children={<Login />} />
            </Switch>
        </div >
    )
}