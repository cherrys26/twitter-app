import React, { useState } from 'react';
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
import TweetBox from '../shared/HomeTweet';


export default function Home() {

    return (
        <>

            <Container>
                <Row>
                    <Col lg={7}>
                        <Header />
                        <Container >
                            <TweetBox />
                        </Container>
                        <Tweets />

                    </Col>
                    <Col lg={4} className="searchHome">
                        <div className="search">
                            <Recommend />
                        </div>
                    </Col>
                </Row>
            </Container>



        </>
    )
}