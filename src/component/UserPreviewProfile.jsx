import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Popover, OverlayTrigger } from "react-bootstrap";
import {followAnUser, unFollowAnUser} from '../service/user'
import {getArticlesFromUsersYouFollowed} from '../service/articles'

const UserPreviewProfile = ({ author }) => {
    const [show, setShow] = useState(false);
    const [followingList, setFollowingList] = useState([])
    const [follow, setFollow] = useState(false);
    const target = useRef(null);




    useEffect(() => {
        getArticlesFromUsersYouFollowed().then(res => {
            setFollowingList(res.articles);
        });
    }, []);
    
    useEffect(() => {
        if (followingList.length > 0) {
            let status = followingList.some((user) => user.author.username === author.username);
            setFollow(status); 
        }
    }, [followingList, author.username]); 
    

    const popover = (
        


      
        <Popover 
            id="popover-basic" 
            className="custom-popover"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <Popover.Header as="h3">preview</Popover.Header>
            <Popover.Body>
                <div>
                    <b className="d-flex justify-content-center align-items-center">{author.username}</b>
                    <br />
                    <div className="d-flex justify-content-around align-items-center">
                    <div>Frontend Developer</div>
                    <div><img src={author.image} style={{width:'40px', height:'40px', borderRadius:'20px'}}></img></div>
                    </div>
                    <br />
                  
                    <div className="d-flex justify-content-center align-items-center"><button style={{width: '100vw'}} 
                        className={follow? "btn btn-danger btn-sm mt-2": "btn btn-light btn-sm mt-2"}
                        onClick={() => setFollowUser()}
                    >
                        {follow? 'Unfollow': 'Follow'}
                    </button></div>
                </div>
            </Popover.Body>
        </Popover>
    );


    function followUser(){
        setFollow(true)
        followAnUser(author.username).then((res)=>{
            console.log("Followed")
            console.log(res)
            
            setShow(false)
        })

    }

    function unFollowUser(){ 
        setFollow(false)
        unFollowAnUser(author.username).then((res)=>{
            console.log("unFollowed")
            console.log(res)
           
            setShow(false)
        })
    }

    function setFollowUser(){
        if(follow){
           unFollowUser()
        }else{
            followUser()
        }
        
    }

 


    return (
        <OverlayTrigger
            trigger={["hover, focus"]}
            placement="right"
            overlay={popover}
            show={show}
            delay={{ show: 200, hide: 400 }}
        >
            <img
                ref={target}
                src={author.image}
                className="rounded-circle"
                width="40"
                height="40"
                alt="User Avatar"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={(e) => {
                    if (!e.relatedTarget || !e.relatedTarget.closest(".popover")) {
                        setShow(false);
                    }
                }}
            />

        </OverlayTrigger>
    );
};

export default UserPreviewProfile;
