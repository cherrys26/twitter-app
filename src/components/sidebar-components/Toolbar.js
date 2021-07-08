import React from 'react';
import {
    useLocation
} from 'react-router-dom'
import FormControl from 'react-bootstrap/FormControl'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../Sidebar.scss"

export default function Header() {

    const location = useLocation();
    let path = location.pathname.split("/")

    return (

        <Navbar className="topBar">
            <Navbar.Brand style={{ textTransform: "capitalize", color: "white" }}><b>{path[1]}</b></Navbar.Brand>
            <Navbar.Toggle />
        </Navbar>

    )
}