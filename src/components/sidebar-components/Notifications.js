import React from 'react';
import Header from './Toolbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Card from 'react-bootstrap/Card'
import moment from 'moment'
export default function Notifications() {
    return (
        <Container>
            <Col sm={12}>
                <Header />
            </Col>
            <Row>
                <Col sm={7}>
                    <Tabs defaultActiveKey="likes">
                        <Tab eventKey="likes" title="Likes">
                            <Card style={{ marginBottom: "0.25px" }}>
                                <Container style={{ textAlign: "left" }}>
                                    <Row>
                                        <Col sm={{ span: 11, offset: 1 }}>
                                            <div>@usernmae Liked your tweet</div>
                                        </Col>
                                        <Col sm={{ span: 11, offset: 1 }}>
                                            <div> tweet </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </Tab>
                        <Tab eventKey="replys" title="Replys">
                            <Card style={{ marginBottom: "0.25px" }}>
                                <Container style={{ textAlign: "left" }}>
                                    <Row>
                                        <Col sm={{ span: 11, offset: 1 }}>
                                            <div>@usernmae replyed</div>
                                        </Col>
                                        <Col sm={{ span: 11, offset: 1 }}>
                                            <div> Their tweet </div>
                                        </Col>
                                        <Col sm={{ span: 10, offset: 1 }}>
                                            <Card> your tweet </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </Tab>
                    </Tabs>
                </Col>
                <Col sm={5}>
                    Testing
                </Col>
            </Row >
        </Container >
    )
}