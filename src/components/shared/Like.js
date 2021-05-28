import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Tooltip from 'react-bootstrap/Tooltip'

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
                <AiOutlineHeart />
            </button>

        </OverlayTrigger >)
}
