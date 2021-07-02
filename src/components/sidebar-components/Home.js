import React, { useState, lazy, Suspense } from 'react';
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
import Tweets from '../shared/Tweets';
import Recommend from '../shared/Recommend';
export default function Home(props) {

    // const Tweets = lazy(() => import('../shared/Tweets'))

    let getUser = JSON.parse(localStorage.getItem("username"))

    const [tweet, setTweet] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { postTweet } = props
            const updatedData = {
                username: getUser,
                tweet: tweet
            }
            await axios.post(`${BASE_API_URL}tweets/${getUser}`, {
                ...postTweet,
                ...updatedData
            })
        } catch (error) {
            if (error.response) {

                console.log('error', error.response.data);
            }
        };
        console.log(tweet)
        event.target.reset(tweet)
    };



    return (
        <>

            <Container>
                <Row>
                    <Col lg={7}>
                        <Header />
                        <Container >
                            <Card style={{ backgroundColor: "black", border: "1px solid #80808087" }}>
                                <Row style={{ marginTop: "20px" }}>
                                    <Col xs={1} >
                                        <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" style={{ width: "45px", height: "45px" }} roundedCircle />
                                    </Col>
                                    <Col xs={11} style={{ paddingLeft: "20px" }}>
                                        <Card.Body style={{ textAlign: "right", padding: 0 }} >
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group controlId="tweet" style={{ display: "block" }}>
                                                    <Form.Control
                                                        as="textarea"
                                                        aria-label="With textarea"
                                                        placeholder="What's up?"
                                                        name="tweet"
                                                        value={tweet}
                                                        onChange={(event) => setTweet(event.target.value)}
                                                        style={{ backgroundColor: "black", height: "80px", border: "0px", color: "white" }} />
                                                </Form.Group>
                                                <Button className="tweet-button" type="submit">Tweet </Button>
                                            </Form>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Container>
                        {/* <Suspense fallback={<div><Spinner animation="border" variant="danger" /></div>}> */}
                        <Tweets />
                        {/* </Suspense> */}

                    </Col>
                    <Col lg={4} className="searchHome">
                        <Recommend />
                    </Col>
                </Row>
            </Container>



        </>
    )
}