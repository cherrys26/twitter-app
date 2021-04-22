import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Link } from 'react-router-dom';
import 'primereact/resources/primereact.css';

export default class Login extends Component {

    render() {
        return (
            <div>
                <Card>
                    <div className="p-float-label">
                        <InputText id="username" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <br />
                    <div className="p-float-label">
                        <Password toggleMask id="password" feedback={false} />
                        <label htmlFor="password">Password</label>

                    </div>
                </Card>
                <br />
                <div>
                    <Link to="/home">
                        <Button label="Log in" />
                    </Link>
                    <br />
                    <div>
                        <span>Don't have an Account:<br /></span>
                        <Link to="/signup">
                            <span>Sign up Now</span>
                        </Link>

                    </div>
                </div>
            </div>
        )
    }
}