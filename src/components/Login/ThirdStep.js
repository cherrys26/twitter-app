import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants';
import Swal from 'sweetalert2';
import { Link, Route } from 'react-router-dom'
function ThirdStep(props) {

    const [info, setInfo] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const { user } = props;
            const updatedData = {
                bio: info
            }

            await axios.post(`${BASE_API_URL}/api/signup`, {
                ...user,
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
                    text: error.response.data
                });
                console.log('error', error.response.data);
            }
        }
    };

    return (
        <Form className="input-form" onSubmit={handleSubmit}>
            <div className="col-md-6 offset-md-3">
                <Form.Group controlId="bio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        type="text"
                        name="bio"
                        value={info}
                        onChange={(event) => setInfo(event.target.value)}
                        placeholder="Tell us a bit about you"
                        autoComplete="off"

                    />

                </Form.Group>



                <Button variant="primary" type="submit">
                    Register
</Button>
                <Route>
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </Route>
            </div>
        </Form>
    );
};

export default ThirdStep;