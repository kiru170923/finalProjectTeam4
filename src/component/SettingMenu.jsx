import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useNavigation } from "react-router-dom";
import BootstrapModal from "./BootstrapModal";

const SettingsMenu = ({DeleteThisArticle, slug, article}) => {

    console.log(article)
    const nav = useNavigate();
    const [edit, setEdit] = useState(false);
    return (
        <>
        <Dropdown onClick={(e) => e.stopPropagation()}>
            <Dropdown.Toggle title="Cài đặt" as="button" bsPrefix="custom-toggle" id="dropdown-basic" style={{
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
                <Dropdown.Item href="#/action-1" onClick={(e)=>DeleteThisArticle(slug, e)}>Delete</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-2" onClick={()=>setEdit(true)}>Edit</Dropdown.Item> */}
            </Dropdown.Menu>
        </Dropdown>

        {edit? <BootstrapModal article = {article} />: ''}
        </>
    );
};

export default SettingsMenu;
