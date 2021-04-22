import React, { Component } from 'react';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Divider } from 'primereact/divider'
import { Link } from 'react-router-dom';

export default class Signup extends Component {

    render() {
        const footer = (
            <div>
                <Divider />
                <p className="p-mt-2">Must Have:</p>
                <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                    <li>At least one lowercase</li>
                    <li>At least one Uppercase</li>
                    <li>At least one Numeric</li>
                    <li>Minimum 8 Characters</li>
                </ul>
            </div>
        )
        return (
            <div>
                <Card>
                    <div className="p-float-label">
                        <InputText id="username" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <br />
                    <div className="p-float-label">
                        <Password toggleMask id="password" footer={footer} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <br />
                    <div className="p-float-label">
                        <InputText id="email" />
                        <label htmlFor="email">email@example.com</label>
                    </div>
                </Card>
                <br />
                <div>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button label="Sign Up" />
                    </Link>
                    <br />
                    <div>
                        <span>Already have an Account:<br /></span>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <span>Login</span>
                        </Link>

                    </div>
                </div>
            </div>
        )
    }
}