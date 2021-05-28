import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { AiOutlineMessage } from "react-icons/ai";
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Reply() {
    const replyTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Reply
        </Tooltip>
    );

    const [show, setShow] = useState(false)
    const showReply = () => setShow(true)
    const hideReply = () => setShow(false)
    return (
        <>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 600, hide: 200 }}
                overlay={replyTip}
            >
                <button onClick={showReply} className="homeButton" id="replyButton">
                    <AiOutlineMessage />
                </button>

            </OverlayTrigger >
            <Modal show={show} onHide={hideReply}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideReply}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={hideReply}>
                        Reply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
}