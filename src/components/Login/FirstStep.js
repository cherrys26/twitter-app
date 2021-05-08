import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link, Route } from 'react-router-dom'
function FirstStep(props) {
    const { user } = props;
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email
        }
    });

    const onSubmit = (data) => {
        props.updateUser(data);
        props.history.push('/signup2');
    };

    return (
        <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            <motion.div
                className="col-md-6 offset-md-3"
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        autoComplete="off"
                        {...register("name", {
                            required: 'Name is required.',
                            pattern: {
                                value: /^[a-zA-Z\s]+$/,
                                message: 'First name should contain only characters.'
                            }
                        })}
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
                        autoComplete="off"
                        {...register("email", {
                            required: 'Email is required.',
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: 'Email is not vaild.'
                            }
                        })}
                        className={`${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && (
                        <p className="errorMsg">{errors.email.message}</p>
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

export default FirstStep;