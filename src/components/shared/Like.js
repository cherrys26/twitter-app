import React, { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Tooltip from 'react-bootstrap/Tooltip'
import { motion } from 'framer-motion'

export default function Like() {
    const likeTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Like
        </Tooltip>
    );



    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 600, hide: 200 }}
            overlay={likeTip}
        >
            <button type="submit" className="homeButton" id="likeButton">
                <motion.span whileHover={{
                    borderRadius: "10px", backgroundColor: "rgba(250, 00, 00, 0.2)", color: "rgba(250, 00, 00, 1)"
                }}><AiOutlineHeart /></motion.span>
            </button>

        </OverlayTrigger >)
}
