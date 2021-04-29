import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation()
    let title = location.pathname.slice(1)

    function Search() {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText style={{ borderRadius: "50px", width: "300px" }} placeholder="Search" />
            </span>
        )
    }

    return (
        <Toolbar left={title} right={Search()} style={{ textTransform: "capitalize" }} />
    )
}