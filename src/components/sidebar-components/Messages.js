import React from 'react';
import Header from './Toolbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Messages() {
    return (
        <Container>
            <Col sm={12}>
                <Header />
            </Col>
            <Row>
                <Col sm={7}>
                    Messgaes
                </Col>
                <Col sm={5}>
                    Testing
            </Col>
            </Row>
        </Container>
    )
}