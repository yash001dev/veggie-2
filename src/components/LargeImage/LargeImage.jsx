import React from 'react';
import "./LargeImage.css";

function LargeImage({img, PImg}) {
    return (
        <div className="LargeImage_container">
            <div className="largeimage-data">
                <img className="largeimage_image" src={`${img !== null ? img : PImg}`} alt="large_image" />
            </div>
            
        </div>
    )
}

export default LargeImage
