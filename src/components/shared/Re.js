import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { AiOutlineRetweet } from "react-icons/ai";
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { motion } from 'framer-motion'
export default function Retweet() {
    const retweetTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Retweet
        </Tooltip>
    );

    return (
        <>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 600, hide: 200 }}
                overlay={retweetTip}
            >
                <button type="submit" className="homeButton" id="likeButton">
                    <motion.span whileHover={{
                        borderRadius: "10px", backgroundColor: "rgba(0, 250, 0, 0.2)", color: "rgba(0, 250, 0, 1)"
                    }}>
                        < AiOutlineRetweet />
                    </motion.span>
                </button>

            </OverlayTrigger >
        </>)
}
