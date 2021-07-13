import React, { useEffect, useState } from 'react';
import Header from './Toolbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Typeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { BASE_API_URL } from '../../utils/constants';
import Form from "react-bootstrap/Form";
import axios from 'axios';


export default function Messages() {

    const [following, setGetFollowing] = useState([]);

    let getUser = JSON.parse(localStorage.getItem("username"))

    const options = axios.get(`${BASE_API_URL}following/${getUser}`)

    useEffect(() => {
        options.then(data => setGetFollowing(data.data))
    }, [])  //eslint-disable-line

    return (
        <Container>
            <Row>
                <Col sm={7}>
                    <Col xs={12}>
                        <Header />
                    </Col>
                    <Col xs={12}>
                        <Form.Group>
                            <Typeahead
                                id="basic-typeahead-single"
                                options={following}
                                placeholder="Choose a username"
                            />
                        </Form.Group>
                    </Col>
                </Col>
                <Col sm={4}>
                </Col>
            </Row>
        </Container>
    )
}