import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SettingsMenu = ({DeleteThisArticle, slug}) => {
    return (
        <Dropdown onClick={(e) => e.stopPropagation()}>
            <Dropdown.Toggle as="button" bsPrefix="custom-toggle" id="dropdown-basic" style={{
                padding: '10px',
                paddingTop: '0px',
                borderRadius: '5px',
                backgroundColor: '#f8f9fa',
                border: 'none',
                cursor: 'pointer'
            }}>
                ...
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={()=>DeleteThisArticle(slug)}>Delete</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SettingsMenu;
