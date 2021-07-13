import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants';
import Swal from 'sweetalert2';
import { Link, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import Jumbotron from 'react-bootstrap/Jumbotron';


function Signup(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');

    const { formState: { errors } } = useForm();

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const updatedData = {
                name: name,
                email: email,
                username: username,
                password: password,
                bio: bio
            }

            await axios.post(`${BASE_API_URL}signup`, {
                ...updatedData
            });
            Swal.fire('Awesome!', "You're successfully registered!", 'success').then(
                (result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        props.resetUser();
                        props.history.push('/');
                    }
                }
            );
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.errors
                });
                console.log('error', error.response.data.errors);
            }
        }
    };

    return (
        <>
            <Jumbotron fluid id="sign">
                <h1>Sign up for Switter!</h1>
            </Jumbotron>
            <Form className="input-form" onSubmit={handleSubmit}>
                <div
                    className="col-md-6 offset-md-3">
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="off"
                            // {...register("name", {
                            //     required: 'Name is required.',
                            //     pattern: {
                            //         value: /^[a-zA-Z\s]+$/,
                            //         message: 'First name should contain only characters.'
                            //     }
                            // })}
                            className={`${errors.name ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.name.message}</p>
                        )}
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="off"
                            className={`${errors.email ? 'input-error' : ''}`}
                        />
                        {errors.email && (
                            <p className="errorMsg">{errors.email.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            autoComplete="off"
                            // {...register("username", {
                            //     required: 'Username is required.',
                            //     pattern: {
                            //         value: /^[a-zA-Z0-9.-_]+$/,
                            //         message: 'Username is not valid.'
                            //     }
                            // })}
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
                            placeholder="Choose a password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="off"
                            // {...register("password", {
                            //     required: 'Password is required.',
                            //     minLength: {
                            //         value: 6,
                            //         message: 'Password should have at-least 6 characters.'
                            //     }
                            // })}
                            className={`${errors.password ? 'input-error' : ''}`}
                        />
                        {errors.password && (
                            <p className="errorMsg">{errors.password.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="bio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            type="text"
                            name="bio"
                            value={bio}
                            onChange={(event) => setBio(event.target.value)}
                            placeholder="Tell us a bit about you"
                            autoComplete="off"

                        />

                    </Form.Group>

                    <br />
                    <motion.div whileHover={{ scale: 1.02 }} style={{
                        width: "fit-content",
                        margin: "auto"
                    }}>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </motion.div>
                    <br />
                    <Route>
                        <p style={{ textAlign: "center" }}>Already have an account? <Link to="/">Login</Link></p>
                    </Route>
                </div>
            </Form>
        </>
    );
};

export default Signup;

