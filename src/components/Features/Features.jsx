import React from 'react';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import PaymentIcon from '@material-ui/icons/Payment';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import "./Features.css";

function Features() {
    return (
        <div className="features_container">
            <div className="features_con_cards_con" >
                <div className="features_card_con feature_with_line feature_with_line_hor">
                    <div className="features_card_icon">
                        <LocalShippingIcon style={{color:"4AC85D", fontSize: 40}}/>
                    </div>
                    <div className="features_card_text ">
                        <div className="features_title_text">FREE DELIVERY</div>
                        <div className="features_subtitle_text">WORLDWIDE</div>
                    </div>
                </div>
                <div className="features_card_con feature_with_line_hor">
                    <div className="features_card_icon ">
                        <HeadsetMicIcon style={{color:"4AC85D", fontSize: 35}}/>
                    </div>
                    <div className="features_card_text">
                        <div className="features_title_text">24/7 SUPPORT</div>
                        <div className="features_subtitle_text">CUSTOMER SUPPORT</div>
                    </div>
                </div>
                <div className="features_card_con feature_with_line">
                    <div className="features_card_icon">
                        <PaymentIcon style={{color:"4AC85D", fontSize: 35}}/>
                    </div>
                    <div className="features_card_text">
                        <div className="features_title_text">PAYMENT</div>
                        <div className="features_subtitle_text">SECURE SYSTEM</div>
                    </div>
                </div>
                <div className="features_card_con">
                    <div className="features_card_icon">
                        <EmojiEmotionsIcon style={{color:"4AC85D", fontSize: 35}}/>
                    </div>
                    <div className="features_card_text">
                        <div className="features_title_text">TRUSTED</div>
                        <div className="features_subtitle_text">ENUINE PRODUTS</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
