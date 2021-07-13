import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { useLocation } from 'react-router-dom'
import { AiOutlineHeart } from "react-icons/ai";
import Tooltip from 'react-bootstrap/Tooltip'
import { motion } from 'framer-motion'
import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';


export default function Like() {

    let location = useLocation();
    let path = location.pathname.split("/");

    // let likesTweets = axios.get(`${BASE_API_URL}/likes/${path[1]}`);

    // console.log(likesTweets);

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
            <button type="submit" className="homeButton" id="likeButton" >
                <motion.span whileHover={{
                    borderRadius: "10px", backgroundColor: "rgba(250, 00, 00, 0.2)", color: "rgba(250, 00, 00, 1)"
                }}><AiOutlineHeart /></motion.span>
            </button>

        </OverlayTrigger >)
}
