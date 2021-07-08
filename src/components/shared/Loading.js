import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function Loader() {
    return (
        < div style={{ textAlign: "center", verticalAlign: "middle", color: "deeppink" }}>
            <Spinner animation="border" role="status" />
        </ div >
    )
}