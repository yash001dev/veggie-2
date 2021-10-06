import React from 'react';
import "./JoinUs.css";

function JoinUs() {
    return (
        <div className="joinus_container">
            <div className="joinus_msg">Be In Touch With Us:</div>
            <div className="joinus_box_con">
                <input type="search" placeholder="Enter Your Mail" className="joinus_box"/>
                <span className="joinus_box_btn">Subscribe</span>
            </div>
        </div>
    )
}

export default JoinUs
