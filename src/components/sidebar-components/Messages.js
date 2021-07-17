import React, { useEffect, useState } from 'react';

import Header from './Toolbar';

import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';

import { Link, useLocation } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css'

import { BiMessageAdd, BiSend } from 'react-icons/bi'

import '../Sidebar.scss'

export default function Messages() {

    let location = useLocation()

    const [open, setOpen] = useState(false)
    const [following, setGetFollowing] = useState([]);
    const [getId, setGetId] = useState('');
    const [mess, setMess] = useState('');

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    let getUser = JSON.parse(localStorage.getItem("username"))
    let path = location.pathname.split("/")

    const options = axios.get(`${BASE_API_URL}following/${getUser}`)

    useEffect(() => {
        options.then(data => setGetFollowing(data.data))
    }, [])  //eslint-disable-line

    const message1 = [
        {
            id: 0,
            userFrom: {
                user: "steve",
                messages: [
                    { message: 'hello buddy', time: 'Jul 14, 2021', user: "steve" },
                    { message: 'hello buddy :)', time: 'Jul 15, 2021', user: "steve" }
                ]
            },
            userTo: {
                user: "steve1",
                messages: [
                    { message: 'This is first message test', time: 'Jul 15, 2021', user: "steve1" },
                ]
            }
        },
        {
            id: 1,
            userFrom: {
                user: "steve",
                messages: [
                    { message: 'This is second message test This is second message test. Glad that this is working :) ', time: 'Jul 12, 2021', user: "steve" },
                    { message: 'okay', time: 'Jul 14, 2021', user: "steve" }
                ]
            },
            userTo: {
                user: "steve3",
                messages: [
                    { message: 'thats what they all say :(', time: 'Jul 13, 2021', user: "steve3" },
                    { message: 'Thank you', time: 'Jul 15, 2021', user: "steve3" },
                ]
            }
        },
        {
            id: 2,
            userFrom: {
                user: "steve2",
                messages: [
                    { message: 'hello buddy', time: 'Jul 14, 2021', user: 'steve2' },
                    { message: 'hello buddy, you didnt respond', time: 'Jul 15, 2021', user: 'steve2' },
                    { message: 'yup yup yup5', time: 'Jul 15, 2021', user: 'steve2' },
                ]
            },
            userTo: {
                user: "steve",
                messages: [
                    { message: 'yup yup yup', time: 'Jul 15, 2021', user: 'steve' },
                    { message: 'yup yup yup2', time: 'Jul 15, 2021', user: 'steve' },
                    { message: 'yup yup yup3', time: 'Jul 15, 2021', user: 'steve' },
                ]
            }
        },

    ]

    let messId = message1[path[2]]

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Container style={{ height: "98vh" }}>
                <Row>
                    <Col sm={5} style={{ paddingRight: "0px" }}>
                        <Col xs={12}>
                            <>
                                <Navbar className="topBar" style={{ justifyContent: "space-between", height: "58px" }}>
                                    <Navbar.Brand style={{ textTransform: "capitalize", color: "white" }}><b>{path[1]}</b></Navbar.Brand>
                                    <Navbar.Brand style={{ textTransform: "capitalize", color: "white" }}>
                                        <Button onClick={handleOpen} style={{
                                            background: "none",
                                            border: "none",
                                            fontSize: "larger",
                                            color: "deeppink"
                                        }}><BiMessageAdd /></Button>
                                        <Modal show={open} onHide={handleClose} style={{ height: "-webkit-fill-available" }} dialogClassName="modal-50w" aria-labelledby="example-custom-modal-styling-title">
                                            <Form onSubmit="">
                                                <Form.Group>
                                                    <Modal.Header closebutton >
                                                        <Modal.Title id="example-custom-modal-styling-title">New Message {`:)`}</Modal.Title>
                                                        <Modal.Title >
                                                            <Button className="tweet-button" type="submit">Message</Button>
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Typeahead
                                                            className="search-messages"
                                                            id="basic-typeahead-single"
                                                            options={following}
                                                            placeholder="Search for people"
                                                        />
                                                    </Modal.Body>
                                                </Form.Group>
                                            </Form>
                                        </Modal></Navbar.Brand>
                                </Navbar>
                            </>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Typeahead
                                    className="search-messages"
                                    id="basic-typeahead-single"
                                    options={following}
                                    placeholder="Search for people"
                                />
                            </Form.Group>
                            <div>

                                <CardColumns>
                                    {message1 && message1.map((messager1, idx) => (
                                        <Link to={`/messages/${messager1.id}`} style={{ textDecoration: 'none', color: "white" }}>
                                            <Card style={{ marginBottom: "0.25px", backgroundColor: "black", border: "1px solid #80808087" }}>
                                                <Container style={{ padding: "5px" }}>
                                                    <Row>
                                                        <Col xs={2} style={{ paddingLeft: "5%" }}>
                                                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "45px", height: "45px" }} roundedCircle />
                                                        </Col>
                                                        <Col xs={10} >
                                                            <Container>
                                                                <Row>
                                                                    <div>
                                                                        {message1[idx].userFrom.user === getUser ?
                                                                            (<div>
                                                                                @{message1[idx].userTo.user}
                                                                            </div>)
                                                                            :
                                                                            (<div>
                                                                                @{message1[idx].userFrom.user}
                                                                            </div>)}
                                                                    </div>
                                                                </Row>
                                                                <Row>
                                                                    {message1[idx].userFrom.messages.concat(message1[idx].userTo.messages)[message1[idx].userFrom.messages.concat(message1[idx].userTo.messages).length - 1].user === getUser ?
                                                                        (
                                                                            <div style={{ color: "gray", fontSize: "14px" }}>
                                                                                {`you: `}
                                                                                {message1[idx].userFrom.messages.concat(message1[idx].userTo.messages)[message1[idx].userFrom.messages.concat(message1[idx].userTo.messages).length - 1].message}
                                                                            </div>
                                                                        )
                                                                        :
                                                                        (
                                                                            <div style={{ color: "gray", fontSize: "14px" }}>
                                                                                {message1[idx].userFrom.messages.concat(message1[idx].userTo.messages)[message1[idx].userFrom.messages.concat(message1[idx].userTo.messages).length - 1].message}
                                                                            </div>

                                                                        )}
                                                                </Row>
                                                            </Container>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Card>
                                        </Link>
                                    ))}
                                </CardColumns>
                            </div>
                        </Col>
                    </Col>
                    <Col sm={6} style={{ paddingLeft: "0px" }}>
                        {path[2] === undefined ? (
                            <>
                                <div>You don't have a message selected</div>
                                <Button onClick={handleOpen}>New Message</Button>
                                <Modal show={open} onHide={handleClose} style={{ height: "-webkit-fill-available" }} dialogClassName="modal-50w" aria-labelledby="example-custom-modal-styling-title">
                                    <Form onSubmit="">
                                        <Form.Group>
                                            <Modal.Header closebutton >
                                                <Modal.Title id="example-custom-modal-styling-title">New Message {`:)`}</Modal.Title>
                                                <Modal.Title >
                                                    <Button className="tweet-button" type="submit">Message</Button>
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Typeahead
                                                    className="search-messages"
                                                    id="basic-typeahead-single"
                                                    options={following}
                                                    placeholder="Search for people"
                                                />
                                            </Modal.Body>
                                        </Form.Group>
                                    </Form>
                                </Modal>
                            </>
                        ) : (<>
                            <Navbar className="topBar" >
                                <Navbar.Brand style={{ textTransform: "capitalize", color: "white" }}>
                                    <div>
                                        {messId.userFrom.user === getUser ? (
                                            <>
                                                <b>@{messId.userTo.user}</b>
                                            </>
                                        ) : (
                                            <>
                                                <b>@{messId.userFrom.user}</b>
                                            </>
                                        )}
                                    </div>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar>
                            <div style={{ height: "90vh" }}>
                                <div style={{ height: "85vh" }}>
                                    {messId.userFrom.messages.concat(messId.userTo.messages).map((message, idx) => (
                                        < div >
                                            {
                                                message.user !== getUser ? (
                                                    <Container>
                                                        <Row>
                                                            <Col xs={2} style={{ paddingRight: "0" }}>
                                                                <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "45px", height: "45px" }} roundedCircle />
                                                            </Col>
                                                            <Col style={{
                                                                padding: "0",
                                                            }}>
                                                                <Card style={{ maxWidth: "70%", backgroundColor: "gray", textAlign: "center", width: "fit-content" }} className="mt-1">
                                                                    <Card.Text style={{ width: "fit-content", alignSelf: "center", padding: "3px 10px" }}>
                                                                        {message.message}
                                                                    </Card.Text>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={{ offset: 2 }} style={{ padding: 0, color: "grey", fontSize: "14px" }}>
                                                                {message.time}
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                ) : (
                                                    <Container>
                                                        <Row style={{ textAlign: "-webkit-right" }}>
                                                            <Col xs={{ offset: 3 }} style={{
                                                                padding: "0"
                                                            }}>
                                                                <Card style={{ maxWidth: "70%", backgroundColor: "deeppink", textAlign: "center", width: "fit-content" }} className="mt-1">
                                                                    <Card.Text style={{ alignSelf: "center", width: "fit-content", padding: "3px 10px" }}>
                                                                        {message.message}
                                                                    </Card.Text>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col style={{ padding: 0, color: "grey", fontSize: "14px", textAlign: "-webkit-right", paddingRight: "25px" }}>
                                                                {message.time}
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                )
                                            }
                                        </div>
                                    ))}
                                </div>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group style={{ display: "inline" }}>
                                        <Form.Control
                                            as="textarea"
                                            aria-label="With textarea"
                                            placeholder="What's up?"
                                            style={{
                                                backgroundColor: "gray",
                                                border: "1px solid darkgray",
                                                color: "white",
                                                borderRadius: "50px",
                                                height: "15px",
                                                width: "90%",
                                                display: "inline"
                                            }} />
                                    </Form.Group>
                                    <Button type="submit" style={{
                                        background: "none",
                                        border: "none",
                                        fontSize: "x-large",
                                        color: "deeppink",
                                        verticalAlign: "top",
                                        padding: "0 0 0 10px"
                                    }}><BiSend /> </Button>
                                </Form>
                            </div>
                        </>)}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
