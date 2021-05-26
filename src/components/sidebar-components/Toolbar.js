import React from 'react';
import {
    useLocation
} from 'react-router-dom'
import FormControl from 'react-bootstrap/FormControl'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


export default function Header() {

    const location = useLocation();
    let path = location.pathname.split("/")

    return (

        <Navbar bg="light" variant="light">
            <Navbar.Brand style={{ textTransform: "capitalize" }}>{path[1]}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Form inline >
                    <FormControl type="text" placeholder="Search" />
                </Form>
                <Button variant="primary">Search</Button>
            </Navbar.Collapse>
        </Navbar>

    )
}