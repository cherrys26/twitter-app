import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants';
import { useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { Col, Container, Row } from 'react-bootstrap';
import moment from "moment";
import Like from '../shared/Like';
import Reply from '../shared/Reply';

export default function OpenTweet() {
    const location = useLocation()
    let path = location.pathname.split("/")

    const [tweet, setTweet] = useState('')

    const tweets = axios.get(`${BASE_API_URL}tweet/${path[2]}`);

    useEffect(() => {
        tweets.then(tweetData => setTweet(tweetData.data)) // eslint-disable-next-line
    }, [])

    console.log(tweet)

    return (
        <div>
            <Card style={{ marginBottom: "0.25px" }}>
                <Container>
                    <Row>
                        <Row>
                            <Col >
                                <div>@{tweet.username}</div>
                            </Col>
                            <Col>
                                {moment(`${tweet.createdAt}`).format("LL") === moment().format("LL") ?
                                    (<div>{moment(`${tweet.createdAt}`).fromNow()}</div>)
                                    :
                                    (<div>{moment(`${tweet.createdAt}`).format("LL")}</div>)
                                }
                            </Col>
                        </Row>
                        <Col>
                            <div>{tweet.tweet}</div>
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
        </div>
    )
}