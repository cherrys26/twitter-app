import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link, Route } from 'react-router-dom'

function SecondStep(props) {
    const { user } = props;
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: user.username,
            password: user.password
        }
    });

    const onSubmit = (data) => {
        props.updateUser(data);
        props.history.push('/signup3');
    };

    return (
        <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            <motion.div
                className="col-md-6 offset-md-3"
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Choose a username"
                        autoComplete="off"
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
                        placeholder="Choose a password"
                        autoComplete="off"
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

                <Button variant="primary" type="submit">
                    Next
        </Button>
                <Route>
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </Route>
            </motion.div>
        </Form>
    );
};

export default SecondStep;