import React, { useState } from 'react';
import { FiRepeat } from 'react-icons/fi';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon
} from "react-share";

const Share = ({ postUrl, postTitle, setShow, show}) => {
    
    return (
        <div className="share-container"
    >
            <div 
                className="share-trigger"
               
                
            >
                <FiRepeat className="share-icon" />
                <span className="share-text">Share</span>
            </div>
            
            {show && (
                <div className="share-popup" >
                    <div className="share-buttons">
                        <FacebookShareButton 
                            url={postUrl} 
                            quote={postTitle}
                            className="share-button"
                        >
                            <FacebookIcon size={40} round />
                            <span className="button-label">Facebook</span>
                        </FacebookShareButton>
                        
                        <TwitterShareButton 
                            url={postUrl} 
                            title={postTitle}
                            className="share-button"
                        >
                            <TwitterIcon size={40} round />
                            <span className="button-label">Twitter</span>
                        </TwitterShareButton>
                        
                        <LinkedinShareButton 
                            url={postUrl} 
                            title={postTitle}
                            className="share-button"
                        >
                            <LinkedinIcon size={40} round />
                            <span className="button-label">LinkedIn</span>
                        </LinkedinShareButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Share;

const styles = `
.share-container {
    position: relative;
    display: inline-block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.share-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 2px 4px;
    background-color: #e6f2ff;
    border-radius: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #0077b6;
    font-weight: 500;
    border: 1px solid #b3d7ff;
}

.share-trigger:hover {
    background-color: #cce5ff;
    box-shadow: 0 2px 8px rgba(0, 119, 182, 0.15);
}

.share-icon {
    font-size: 18px;
}

.share-popup {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 10px;
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 100;
    animation: fadeIn 0.2s ease-out;
}

.share-buttons {
    display: flex;
    gap: 12px;
}

.share-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    transition: transform 0.2s ease;
}

.share-button:hover {
    transform: translateY(-2px);
}

.button-label {
    font-size: 12px;
    color: #4d4d4d;
    font-weight: 500;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Responsive adjustments */
@media (max-width: 480px) {
    .share-buttons {
        flex-direction: column;
    }
    
    .share-popup {
        left: 0;
        transform: translateX(0);
    }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);