import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants';
import { Link, Route } from 'react-router-dom'
import { motion } from 'framer-motion';
import Jumbotron from 'react-bootstrap/Jumbotron'

function Login(props) {
    const [toHomepage, setToHomepage] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        try {
            const response = await axios.post(`${BASE_API_URL}signin`, data);
            setToHomepage(props.history.push("/home") & localStorage.setItem("username", JSON.stringify(response.data.message.username))
            )
        } catch (error) {
            setToHomepage(alert("Invalid Username or Password"))
        }
    };

    return (
        <div style={{ marginTop: "15%" }}>
            <Jumbotron fluid>
                <h1>Welcome to Switter!</h1>
            </Jumbotron>
            <div>
                <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6 offset-md-3">

                        <Form.Group controlId="name">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                {...register("username", {
                                    required: 'Username is required.',
                                    pattern: {
                                        value: /^[a-zA-Z0-9.-_]+$/,
                                        message: 'Username is not valid.'
                                    }
                                })}
                                className={`${errors.username ? 'input-error' : ''}`}
                            />
                            {errors.username && (
                                <p className="errorMsg">{errors.username.message}</p>
                            )}
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: 'Password is required.',
                                    minLength: {
                                        value: 6,
                                        message: 'Password should have at-least 6 characters.'
                                    }
                                })}
                                className={`${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && (
                                <p className="errorMsg">{errors.password.message}</p>
                            )}
                        </Form.Group>
                        <br />
                        <motion.div whileHover={{ scale: 1.05 }} style={{ textAlign: "center" }}>
                            <Button variant="primary" type="submit" {...toHomepage}>
                                Login
                            </Button>
                        </motion.div>
                    </div>
                </Form>
                <div>

                    <Route>
                        <p style={{ textAlign: "center" }}>Dont have an account? <Link to="/signup">Signup</Link></p>
                    </Route>
                </div>
            </div>
        </div>
    );
};

export default Login;