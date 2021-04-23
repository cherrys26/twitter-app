import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';

export default function Explore() {

    function Search() {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText style={{ borderRadius: "50px", width: "500px" }} placeholder="Search" />
            </span>
        )
    }

    return (
        <div>
            <Toolbar left={Search()} />
            <div className="p-grid">
                <div className="p-col-7">
                    Explore
                </div>
                <div className="p-col-5">
                    Hello world
                </div>
            </div>

        </div>
    )
}