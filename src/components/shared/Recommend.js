import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API_URL } from "../../utils/constants"

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom'

import SearchSwitter from './Search';

export default function Recommend() {
    const [user, setUser] = useState();
    const [isLoading, setisLoading] = useState(true);

    const userProfile = axios.get(`${BASE_API_URL}user`);

    useEffect(() => {
        userProfile.then(data => setUser(data.data)) // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setTimeout(() => setisLoading(false), 4500);
    });

    let getUser = JSON.parse(localStorage.getItem("username"))

    if (user) {
        var randomUser1 = user[Math.floor(Math.random() * user.length)]; //pluck a random color
        var randomUser2 = user[Math.floor(Math.random() * user.length)]; //pluck a random color
        var randomUser3 = user[Math.floor(Math.random() * user.length)]; //pluck a random color
    }

    return (

        <>
            <SearchSwitter />
            <Card style={{ marginTop: "20px", border: "1px solid #80808087", backgroundColor: "rgba(125, 125, 125, 0.53" }}>
                {isLoading ? <h1>I'm currently loading</h1> :
                    <Card.Body style={{ padding: 0 }}>
                        <Card.Title style={{ backgroundColor: "inherit", borderBottom: "1px solid #80808087", color: "white", margin: "0", padding: "10px" }}>Follow Suggested Users</Card.Title>
                        <Card.Text style={{ backgroundColor: "inherit", borderBottom: "1px solid #80808087", margin: "0", padding: "10px" }}>
                            <Container>
                                <Link style={{ textDecoration: 'none' }} to={`${randomUser1.username}`} >

                                    <Row>
                                        <Col xs={3}>
                                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "50px", height: "50px" }} roundedCircle />
                                        </Col>
                                        <Col xs={9}>
                                            <Container>
                                                <Col xs={12} style={{ color: "white" }}>
                                                    {randomUser1.name}
                                                </Col>
                                                <Col xs={12} style={{ color: "gray" }}>
                                                    @{randomUser1.username}
                                                </Col>
                                            </Container>
                                        </Col>
                                    </Row>
                                </Link>
                            </Container>
                        </Card.Text>
                        <Card.Text style={{ backgroundColor: "inherit", borderBottom: "1px solid #80808087", margin: "0", padding: "10px" }} >
                            <Container>
                                <Link to={`${randomUser2.username}`} style={{ textDecoration: 'none' }} >

                                    <Row>
                                        <Col xs={3}>
                                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "50px", height: "50px" }} roundedCircle />
                                        </Col>
                                        <Col xs={9}>
                                            <Container>
                                                <Col xs={12} style={{ color: "white" }}>
                                                    {randomUser2.name}
                                                </Col>
                                                <Col xs={12} style={{ color: "gray" }}>
                                                    @{randomUser2.username}
                                                </Col>
                                            </Container>
                                        </Col>
                                    </Row>
                                </Link>
                            </Container>
                        </Card.Text>
                        <Card.Text style={{ backgroundColor: "inherit", borderBottom: "1px solid #80808087", marginTop: "0", padding: "10px" }}>
                            <Container>
                                <Link style={{ textDecoration: 'none' }} to={`${randomUser3.username}`} >
                                    <Row>
                                        <Col xs={3}>
                                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "50px", height: "50px" }} roundedCircle />
                                        </Col>
                                        <Col xs={9}>
                                            <Container>
                                                <Col xs={12} style={{ color: "white" }}>
                                                    {randomUser3.name}
                                                </Col>
                                                <Col xs={12} style={{ color: "gray" }}>
                                                    @{randomUser3.username}
                                                </Col>
                                            </Container>
                                        </Col>
                                    </Row>
                                </Link>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                    // <ListGroup variant="flush" style={{ border: "1px solid #80808087", marginTop: "20px" }}>
                    //     <ListGroup.Item style={{ backgroundColor: "black", border: "1px solid #80808087", color: "white" }}>Follow Suggested Users</ListGroup.Item>
                    //     <ListGroup.Item style={{ backgroundColor: "black", border: "1px solid #80808087", color: "white" }}>
                    //         <Container>
                    //             <Link to={`${randomUser1.username}`} >

                    //                 <Row>
                    //                     <Col xs={3}>
                    //                         <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "50px", height: "50px" }} roundedCircle />
                    //                     </Col>
                    //                     <Col xs={9}>
                    //                         <Container>
                    //                             <Col xs={12}>
                    //                                 {randomUser1.name}
                    //                             </Col>
                    //                             <Col xs={12}>
                    //                                 @{randomUser1.username}
                    //                             </Col>
                    //                         </Container>
                    //                     </Col>
                    //                 </Row>
                    //             </Link>
                    //         </Container>
                    //     </ListGroup.Item>
                    //     <ListGroup.Item style={{ backgroundColor: "black", border: "1px solid #80808087", color: "white" }}>
                    //         <Container>
                    //             <Link to={`${randomUser2.username}`} >

                    //                 <Row>
                    //                     <Col xs={3}>
                    //                         <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "50px", height: "50px" }} roundedCircle />
                    //                     </Col>
                    //                     <Col xs={9}>
                    //                         <Container>
                    //                             <Col xs={12}>
                    //                                 {randomUser2.name}
                    //                             </Col>
                    //                             <Col xs={12}>
                    //                                 @{randomUser2.username}
                    //                             </Col>
                    //                         </Container>
                    //                     </Col>
                    //                 </Row>
                    //             </Link>
                    //         </Container>
                    //     </ListGroup.Item>
                    //     <ListGroup.Item style={{ backgroundColor: "black", border: "1px solid #80808087", color: "white" }}>
                    //         <Container>
                    //             <Link to={`${randomUser3.username}`} >
                    //                 <Row>
                    //                     <Col xs={3}>
                    //                         <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{ width: "50px", height: "50px" }} roundedCircle />
                    //                     </Col>
                    //                     <Col xs={9}>
                    //                         <Container>
                    //                             <Col xs={12}>
                    //                                 {randomUser3.name}
                    //                             </Col>
                    //                             <Col xs={12}>
                    //                                 @{randomUser3.username}
                    //                             </Col>
                    //                         </Container>
                    //                     </Col>
                    //                 </Row>
                    //             </Link>
                    //         </Container>
                    //     </ListGroup.Item>
                    // </ListGroup>
                }
            </Card>
        </>
    )
}