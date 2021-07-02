import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { AiOutlineMessage } from "react-icons/ai";
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { motion } from 'framer-motion'
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
                    <motion.span whileHover={{
                        borderRadius: "10px", backgroundColor: "rgba(0,191, 255, 0.2)", color: "rgba(0,191, 255, 1)"
                    }}>
                        < AiOutlineMessage />
                    </motion.span>
                </button>

            </OverlayTrigger >
            <Modal show={show} onHide={hideReply}>
                <Modal.Body>
                    <Form>
                        <Form.Control as="textarea" rows={3} />
                    </Form>
                </Modal.Body>
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
