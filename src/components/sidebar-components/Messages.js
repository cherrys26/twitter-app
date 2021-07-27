import React, { useEffect, useState } from 'react';

import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';

import { Link, useLocation, useHistory } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import moment from 'moment';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css'

import { BiMessageAdd, BiSend, BiInfoCircle } from 'react-icons/bi'

import Loader from '../shared/Loading';

import '../Sidebar.scss'

function MyVerticallyCenteredModal(props) {

    let history = useHistory()
    let location = useLocation()
    let path = location.pathname.split("/")

    const handleDeleteMessage = async (event) => {
        event.preventDefault()
        console.log(event)
        try {
            const updateData = {
                _id: path[2],
            }
            await axios.delete(`${BASE_API_URL}message/${path[2]}`, {
                headers: {
                    'Content-Type': 'application/json',
                }, data: {
                    ...updateData
                }
            }
            )
            if (event) {
                history.push('/messages')
            }
            if (history) {
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {

                console.log('error', error.response.data);
            }
        }
    };

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form onSubmit={handleDeleteMessage}>
                <Modal.Title id="contained-modal-title-vcenter" >
                    Leave Conversation?
                </Modal.Title>
                <Modal.Body>
                    Deleting this conversation will delete all records of this conversation {`:(`}
                    <Form.Group>

                    </Form.Group>
                </Modal.Body>
                <Modal.Footer >
                    <Button className="tweet-button" onClick={props.onHide}>Cancel</Button>
                    <Button className="tweet-button" type="submit">Delete</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}


export default function Messages() {

    let location = useLocation()

    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [following, setGetFollowing] = useState([]);
    const [messageByUser, setMessageByUser] = useState([]);
    const [messageById, setMessageById] = useState('');

    const [messageFrom, setMessageFrom] = useState('')
    const [messageTo, setMessageTo] = useState('')

    const [newMessage, setNewMessage] = useState('')

    const [isLoading, setisLoading] = useState(true);

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    let getUser = JSON.parse(localStorage.getItem("username"))
    let path = location.pathname.split("/")

    const options = axios.get(`${BASE_API_URL}following/${getUser}`)
    const getMessageByUser = axios.get(`${BASE_API_URL}message/${getUser}`)
    const getMessageById = axios.get(`${BASE_API_URL}messages/${path[2]}`)


    const handleSubmitFrom = async (e) => {
        e.preventDefault();
        e.target.reset()

        try {
            const updatedData = {
                users: getUser,
                message: messageFrom
            }
            await axios.post(`${BASE_API_URL}message/from/${path[2]}`, {
                ...updatedData
            })

        } catch (error) {
            if (error.response) {
                console.log('error', error.response.data);
            }
        };
    };
    const handleSubmitTo = async (e) => {
        e.preventDefault();
        e.target.reset()

        try {
            const updatedData = {
                users: getUser,
                message: messageTo
            }
            await axios.post(`${BASE_API_URL}message/to/${path[2]}`, {
                ...updatedData
            })

        } catch (error) {
            if (error.response) {
                console.log('error', error.response.data);
            }
        };
    };

    useEffect(() => {
        if (path[2] === undefined) {
            setTimeout(() => setisLoading(true))
        } else {
            setTimeout(() => setisLoading(false), 2000)
        }

    })

    useEffect(() => {
        getMessageByUser.then(data => setMessageByUser(data.data))
    }, []) //eslint-disable-line

    useEffect(() => {
        getMessageById.then(data => setMessageById(data.data))
    }, [path[2]]) //eslint-disable-line


    useEffect(() => {
        options.then(data => setGetFollowing(data.data))
    }, [])  //eslint-disable-line


    const handleSubmitNewMessage = async (e) => {
        try {
            const updatedData = {
                userFrom: getUser,
                userTo: newMessage
            }
            await axios.post(`${BASE_API_URL}messages`, {
                ...updatedData
            })
        } catch (error) {
            if (error.response) {
                console.log('error', error.response.data);
            }
        };
        e.target.reset()
    };


    const handleTypeaheadChangeIndustry = selected => {
        const userTo = selected.map(option => option);
        setNewMessage(userTo[0]);
    };

    function Info() {
        return (
            <span id="messInfoBtn">
                <BiInfoCircle />
            </span>
        )
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
                                            <Form onSubmit={handleSubmitNewMessage}>
                                                <Modal.Header closebutton >
                                                    <Modal.Title id="example-custom-modal-styling-title">New Message {`:)`}</Modal.Title>
                                                    <Modal.Title >
                                                        <Button className="tweet-button" type="submit">Message</Button>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group>

                                                        <Typeahead
                                                            className="search-messages"
                                                            id="basic-typeahead-single"
                                                            options={following}
                                                            placeholder="Search new people"
                                                            labelKey="value"
                                                            onChange={handleTypeaheadChangeIndustry}

                                                        />

                                                    </Form.Group>
                                                </Modal.Body>
                                                <Button className="tweet-button" type="submit">Message</Button>
                                            </Form>
                                        </Modal></Navbar.Brand>
                                </Navbar>
                            </>
                        </Col>
                        <Col xs={12}>
                            <Form.Group style={{ margin: "3px 0" }}>
                                <Typeahead
                                    className="search-messages"
                                    id="basic-typeahead-single"
                                    options={following}
                                    placeholder="Search for message"
                                />
                            </Form.Group>
                            <div className="message-flow">
                                <CardColumns>
                                    <>
                                        {messageByUser && messageByUser.map((messager1, idx) => (
                                            <Link to={`/messages/${messager1._id}`} style={{ textDecoration: 'none', color: "white" }}>

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
                                                                            {messageByUser[idx].userFrom.users === getUser ?
                                                                                (<div>
                                                                                    @{messageByUser[idx].userTo.users}
                                                                                </div>)
                                                                                :
                                                                                (<div>
                                                                                    @{messageByUser[idx].userFrom.users}
                                                                                </div>)}
                                                                        </div>
                                                                    </Row>
                                                                    <Row>
                                                                        <div>
                                                                            {messageByUser[idx].userFrom.messages.concat(messageByUser[idx].userTo.messages)[messageByUser[idx].userFrom.messages.concat(messageByUser[idx].userTo.messages).length - 1] === undefined ? (
                                                                                <></>
                                                                            )
                                                                                : (
                                                                                    <>
                                                                                        {
                                                                                            messageByUser[idx].userFrom.messages.concat(messageByUser[idx].userTo.messages)[messageByUser[idx].userFrom.messages.concat(messageByUser[idx].userTo.messages).length - 1].user === getUser ?
                                                                                                (
                                                                                                    <div style={{ color: "gray", fontSize: "14px" }}>
                                                                                                        {`you: `}
                                                                                                        {messageByUser[idx].userFrom.messages.concat(messageByUser[idx].userTo.messages)[messageByUser[idx].userFrom.messages.concat(messageByUser[idx].userTo.messages).length - 1].message}
                                                                                                    </div>
                                                                                                )
                                                                                                :
                                                                                                (
                                                                                                    <div style={{ color: "gray", fontSize: "14px" }}>
                                                                                                        {messageByUser[idx].userFrom.messages.concat(messageByUser[idx].userTo.messages)[messageByUser[idx].userFrom.messages.concat(messageByUser[idx].userTo.messages).length - 1].message}
                                                                                                    </div>

                                                                                                )
                                                                                        } </>
                                                                                )}
                                                                        </div>
                                                                    </Row>
                                                                </Container>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Card>
                                            </Link>
                                        ))}
                                    </>
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
                                    <Form onSubmit={handleSubmitNewMessage}>
                                        <Modal.Header closebutton >
                                            <Modal.Title id="example-custom-modal-styling-title">New Message {`:)`}</Modal.Title>
                                            <Modal.Title >
                                                <Button className="tweet-button" type="submit">Message</Button>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Group>

                                                <Typeahead
                                                    className="search-messages"
                                                    id="basic-typeahead-single"
                                                    options={following}
                                                    placeholder="Search new people"
                                                    labelKey="value"
                                                    onChange={handleTypeaheadChangeIndustry}
                                                />

                                            </Form.Group>
                                        </Modal.Body>
                                        <Button className="tweet-button" type="submit"
                                            onClick={() => console.log(newMessage)}
                                        >
                                            Message
                                        </Button>
                                    </Form>
                                </Modal>

                            </>
                        ) : (<>
                            {isLoading ? <Loader /> :
                                <>
                                    <Navbar className="topBar" id="messageNavBar">
                                        <Navbar.Brand style={{ textTransform: "capitalize", color: "white" }}>
                                            <div>
                                                {messageById.userFrom.users === getUser ? (
                                                    <>
                                                        <b>@{messageById.userTo.users}</b>
                                                    </>
                                                ) : (
                                                    <>
                                                        <b>@{messageById.userFrom.users}</b>
                                                    </>
                                                )}
                                            </div>
                                        </Navbar.Brand>

                                        <NavDropdown title={<Info />} >
                                            <NavDropdown.Item style={{ color: "white" }} onClick={() => setOpenDelete(true)}>
                                                Leave Chat
                                            </NavDropdown.Item>
                                            <MyVerticallyCenteredModal
                                                show={openDelete}
                                                onHide={() => setOpenDelete(false)}
                                                style={{ width: "95%" }}

                                            />

                                        </NavDropdown>

                                        <Navbar.Toggle />
                                    </Navbar>
                                    <div style={{ height: "90vh" }}>
                                        <div className="message-flow" style={{ height: "85vh" }}>

                                            {messageById.userFrom.messages.concat(messageById.userTo.messages).sort((a, b) => {
                                                return moment(a.createdAt).diff(b.createdAt)
                                            }).map((message, idx) => (
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
                                                                        marginLeft: "-10px"
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
                                                                        {moment(`${message.createdAt}`).format("LL") > moment(`${message.createdAt}`).day(-7).format("LL") ?
                                                                            (<span style={{ marginLeft: "-9px" }}>{moment(`${message.createdAt}`).format("ddd LT")}</span>)
                                                                            :
                                                                            (<span style={{ marginLeft: "-9px" }}>{moment(`${message.createdAt}`).format("lll")}</span>)
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        ) : (
                                                            <Container style={{ padding: "0px 15px 0px 0px" }}>
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
                                                                    <Col style={{ padding: "inherit", color: "grey", fontSize: "14px", textAlign: "-webkit-right" }}>
                                                                        {moment(`${message.createdAt}`).format("LL") > moment(`${message.createdAt}`).day(-7).format("LL") ?
                                                                            <>
                                                                                {moment(`${message.createdAt}`).format("LL") === moment().format("LL") ?
                                                                                    (<span>{moment(`${message.createdAt}`).format("LT")}</span>)
                                                                                    :
                                                                                    (<span>{moment(`${message.createdAt}`).format("ddd LT")}</span>)}
                                                                            </>
                                                                            :
                                                                            (<span>{moment(`${message.createdAt}`).format("lll")}</span>)
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        )
                                                    }

                                                </div>
                                            ))}
                                        </div>
                                        {messageById.userFrom.users === getUser ? (

                                            <Form onSubmit={handleSubmitFrom}>
                                                <Form.Group controlId="messagebox" style={{ display: "inline" }}>
                                                    <Form.Control
                                                        as="textarea"
                                                        aria-label="With textarea"
                                                        placeholder="What's up?"
                                                        name="messagebox"
                                                        value={messageFrom}
                                                        onChange={(e) => setMessageFrom(e.target.value)}
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
                                            </Form>)
                                            :
                                            (<Form onSubmit={handleSubmitTo}>
                                                <Form.Group controlId="messagebox" style={{ display: "inline" }}>
                                                    <Form.Control
                                                        as="textarea"
                                                        aria-label="With textarea"
                                                        placeholder="What's up?"
                                                        name="messagebox"
                                                        value={messageTo}
                                                        onChange={(e) => setMessageTo(e.target.value)}
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
                                            </Form>)}
                                    </div>
                                </>}</>)}
                    </Col>
                </Row>
            </Container>
        </>
    )

}
