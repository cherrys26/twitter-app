import React from 'react';
import Header from './Toolbar';
import '../../App.css'
import { Col, Container, Row } from 'react-bootstrap';
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