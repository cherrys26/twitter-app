import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API_URL } from "../../utils/constants"
import Header from './Toolbar';
import Card from 'react-bootstrap/Card'
import '../../App.css'
import Button from 'react-bootstrap/button'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Loader from '../shared/Loading';
import moment from 'moment';

export default function Home(props) {

    let getUser = JSON.parse(localStorage.getItem("username"))

    const [tweet, setTweet] = useState('')
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500)
    }, [])

    const userTweets = axios.get(`${BASE_API_URL}/api/tweet/${getUser}`);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { postTweet } = props
            const updatedData = {
                username: getUser,
                tweet: tweet
            }
            await axios.post(`${BASE_API_URL}/api/tweet/${getUser}`, {
                ...postTweet,
                ...updatedData
            })
        } catch (error) {
            if (error.response) {

                console.log('error', error.response.data);
            }
        }
    };

    useEffect(() => {
        userTweets.then(tweetData => setTweets(tweetData.data)) // eslint-disable-next-line
    }, [])

    function refreshPage() {
        window.location.reload(false);
    }

    const replyTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Reply
        </Tooltip>
    );
    const likeTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Like
        </Tooltip>
    );

    function Like() {
        return (
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 600, hide: 200 }}
                overlay={likeTip}
            >
                <button type="submit" className="homeButton" id=" likeButton">
                    <AiOutlineHeart />
                </button>

            </OverlayTrigger >)
    }
    function Reply() {
        return (
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 600, hide: 200 }}
                overlay={replyTip}
            >
                <button type="submit" className="homeButton" id=" replyButton">
                    <AiOutlineMessage />
                </button>

            </OverlayTrigger >)
    }

    return (
        <>

            <Container >
                <Col md={12}>
                    <Header />
                </Col>
                <Col md={7}>
                    <Container>
                        <Card >
                            <Row style={{ marginTop: "20px" }}>
                                <Col md={2}>
                                    <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" style={{ width: "40px", height: "40px" }} roundedCircle />
                                </Col>
                                <Col md={10}>
                                    <Card.Body style={{ textAlign: "right" }} >
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="tweet" style={{ display: "block" }}>
                                                <Form.Control
                                                    as="textarea"
                                                    aria-label="With textarea"
                                                    placeholder="What's up?"
                                                    name="tweet"
                                                    value={tweet}
                                                    onChange={(event) => setTweet(event.target.value)}
                                                    style={{ height: "80px", border: "0px", color: "black" }} />
                                            </Form.Group>
                                            <Button className="tweet-button" onClick={refreshPage} type="submit">Tweet </Button>
                                        </Form>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                    <br />

                    {tweets && tweets.slice(0).reverse().map(tweets => {
                        return (
                            <Card key={tweets._id} style={{ marginBottom: "0.25px" }}>
                                <Container>
                                    <Row>
                                        <Row>
                                            <Col >
                                                <div>@{tweets.username}</div>
                                            </Col>
                                            <Col>
                                                {moment(`${tweets.createdAt}`).format("LL") === moment().format("LL") ?
                                                    (<div>{moment(`${tweets.createdAt}`).fromNow()}</div>)
                                                    :
                                                    (<div>{moment(`${tweets.createdAt}`).format("LL")}</div>)
                                                }
                                            </Col>
                                        </Row>
                                        <Col>
                                            <div>{tweets.tweet}</div>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col sm={{ span: 3, offset: 1 }}>
                                            <Reply />
                                        </Col>
                                        <Col sm={3}>
                                            <Like />
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        )
                    })}
                </Col>

            </Container>

        </>
    )
    // return (
    //     <>
    //         {loading === false ? (
    //             <Container >
    //                 <Col md={12}>
    //                     <Header />
    //                 </Col>
    //                 <Col md={7}>
    //                     <Container>
    //                         <Card >
    //                             <Row style={{ marginTop: "20px" }}>
    //                                 <Col md={2}>
    //                                     <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" style={{ width: "40px", height: "40px" }} roundedCircle />
    //                                 </Col>
    //                                 <Col md={10}>
    //                                     <Card.Body style={{ textAlign: "right" }} >
    //                                         <Form onSubmit={handleSubmit}>
    //                                             <Form.Group controlId="tweet" style={{ display: "block" }}>
    //                                                 <Form.Control
    //                                                     as="textarea"
    //                                                     aria-label="With textarea"
    //                                                     placeholder="What's up?"
    //                                                     name="tweet"
    //                                                     value={tweet}
    //                                                     onChange={(event) => setTweet(event.target.value)}
    //                                                     style={{ height: "80px", border: "0px", color: "black" }} />
    //                                             </Form.Group>
    //                                             <Button className="tweet-button" onClick={refreshPage} type="submit">Tweet </Button>
    //                                         </Form>
    //                                     </Card.Body>
    //                                 </Col>
    //                             </Row>
    //                         </Card>
    //                     </Container>
    //                     <br />

    //                     {tweets && tweets.slice(0).reverse().map(tweets => {
    //                         return (
    //                             <Card key={tweets._id} style={{ marginBottom: "0.25px" }}>
    //                                 <Container>
    //                                     <Row>
    //                                         <Row>
    //                                             <Col >
    //                                                 <div>@{tweets.username}</div>
    //                                             </Col>
    //                                             <Col>
    //                                                 {moment(`${tweets.createdAt}`).format("LL") === moment().format("LL") ?
    //                                                     (<div>{moment(`${tweets.createdAt}`).fromNow()}</div>)
    //                                                     :
    //                                                     (<div>{moment(`${tweets.createdAt}`).format("LL")}</div>)
    //                                                 }
    //                                             </Col>
    //                                         </Row>
    //                                         <Col>
    //                                             <div>{tweets.tweet}</div>
    //                                         </Col>

    //                                     </Row>
    //                                     <Row>
    //                                         <Col sm={{ span: 3, offset: 1 }}>
    //                                             <Reply />
    //                                         </Col>
    //                                         <Col sm={3}>
    //                                             <Like />
    //                                         </Col>
    //                                     </Row>
    //                                 </Container>
    //                             </Card>
    //                         )
    //                     })}
    //                 </Col>

    //             </Container>) :
    //             (
    //                 <Loader />
    //             )
    //         }
    //     </>
    // )
}