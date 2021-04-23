import React from 'react';
import '../../../App.css'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar'

export default function Home() {
    return (
        <div className="p-grid">
            <div className="p-col-1">
                <Avatar style={{ borderRadius: "50px" }} />
            </div>
            <div className="p-col-11">
                <InputTextarea autoResize rows={5} cols={65} style={{ border: "none" }} placeholder="What's up?" />
                <Button className="tweet-button" label="Tweet" />
            </div>
        </div>
    )
}