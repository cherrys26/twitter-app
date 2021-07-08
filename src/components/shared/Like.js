import React, { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Tooltip from 'react-bootstrap/Tooltip'
import { motion } from 'framer-motion'
import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';


export default function Like() {
    const likeTip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Like
        </Tooltip>
    );

    // const [followingUser, setFollowingUser] = useState([]);

    // const userFollowing = axios.get(`${BASE_API_URL}following/${getUser}`);

    // const handleFollow = async (event) => {
    //     event.preventDefault();
    //     console.log(event)
    //     try {
    //         const updatedData = {
    //             following: path[1],
    //         }
    //         await axios.post(`${BASE_API_URL}following/${getUser}`, {
    //             ...updatedData
    //         })
    //     } catch (error) {
    //         if (error.response) {
    //             console.log('error', error.response.data);
    //         }
    //     }
    // };

    // useEffect(() => {
    //     userFollowing.then(followingData => setFollowingUser(followingData.data)) // eslint-disable-next-line
    // }, [])


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
