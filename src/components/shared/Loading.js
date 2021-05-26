import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function Loader() {
    return (
        < div style={{ marginTop: "30%" }}>
            <Spinner animation="border" role="status" />
            <span className="sr-only">Loading...</span>
        </ div >
    )
}