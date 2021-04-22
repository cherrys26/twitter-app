import React from 'react';
import '../../App.css'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar'
import Feed from './Feed';

export default function Home() {
    return (
        <div>
            <div>
                <Avatar />
                <InputTextarea autoResize rows={5} cols={65} />
                <Button className="tweet-button" label="Tweet" />
            </div>
            <Feed />
        </div>
    )
}