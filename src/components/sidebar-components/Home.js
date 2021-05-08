import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API_URL } from "../../utils/constants"
import Header from './Toolbar';
import Card from 'react-bootstrap/Card'
import '../../App.css'
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/button'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';

import { Col, Container, Row } from 'react-bootstrap';
export default function Home(props) {

    let getUser = JSON.parse(localStorage.getItem("username"))

    const [tweet, setTweet] = useState('')
    const [tweets, setTweets] = useState([]);

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
            });
            Swal.fire('Awesome!', "You're successfully registered!", 'success').then(
                (result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        props.TweetPost()
                        props.history.push('/home');
                    }
                }
            );
        } catch (error) {
            if (error.response) {

                console.log('error', error.response.data);
            }
        }
    };

    useEffect(() => {
        userTweets.then(tweetData => setTweets(tweetData.data)) // eslint-disable-next-line
    }, [])


    return (
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
                                                style={{ width: "inherit", height: "80px", border: "0px" }} />
                                        </Form.Group>
                                        <Button className="tweet-button" type="submit">Tweet </Button>
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
                            <div>{tweets.username}</div>
                            <div>{tweets.tweet}</div>
                            <div>{tweets.createdAt}</div>
                        </Card>
                    )
                })}
            </Col>
        </Container>
    )
}