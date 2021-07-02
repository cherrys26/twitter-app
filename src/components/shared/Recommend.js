import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
export default function Recommend() {
    return (

        <>
            <Form inline>
                <Form.Control type="text" placeholder="Search Switter" style={{ border: "1px solid #80808087", borderRadius: "1rem", backgroundColor: "#80808087", color: "white" }} />
            </Form>
            <Card style={{ marginTop: "20px", border: "1px solid #80808087", backgroundColor: "inherit" }}>

                <ListGroup variant="flush" style={{ border: "1px solid #80808087" }}>
                    <ListGroup.Item style={{ backgroundColor: "black", border: "1px solid #80808087", color: "white" }}>Cras justo odio fff fffff ffff f bf f f fff fff kkkkkkkkl</ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: "black", border: "1px solid #80808087", color: "white" }}>hello</ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: "black", border: "1px solid #80808087", color: "white" }}>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    )
}