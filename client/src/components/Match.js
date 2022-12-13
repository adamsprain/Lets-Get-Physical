import '../styles/App.css';
import '../styles/Match.css';
import React from 'react';
import EmptyProfile from "../images/EmptyProfile.webp";
import {CapIcon} from "../icons/CapIcon";
import {PhoneIcon} from "../icons/PhoneIcon";
import Button from "react-bootstrap/Button";
import {EmailIcon} from "../icons/EmailIcon";


function Match() {

    return (
        <div className="Page">
            <div style={{display: "flex", justifyContent: "center", textAlign: "center"}}>
                <h1 className="match-label">A match has been found!</h1>
            </div>
            <div style={{display: "flex", textAlign: "center", marginTop: 30, justifyContent: "center"}}>
                <div style={{justifyContent: "left", paddingRight: 100}}>
                    <img src={EmptyProfile} alt="empty profile" className="profile-picture" />
                    <p className="self-info">You</p>
                </div>
                <div style={{justifyContent: "right"}}>
                    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fitness-trends-2022-1641306495.jpg?crop=0.490xw:0.981xh;0.00962xw,0.00962xh&resize=640:*" alt="empty profile" className="profile-picture" />
                    <div style={{textAlign: "left"}}>
                        <p className="user-info">Taylor, 24</p>
                        <div style={{display: "flex"}}>
                            <div className="match-icon">
                                <CapIcon/>
                            </div>
                            <p className="user-info" style={{marginLeft: 40}}>University of Wisconsin-Madison</p>
                        </div>
                        <div style={{display: "flex", paddingBottom: 5, paddingTop: 5}}>
                            <div className="match-icon">
                                <PhoneIcon/>
                            </div>
                            <p className="user-info" style={{marginLeft: 40}}>(630) 666-6666</p>
                        </div>
                        <div style={{display: "flex"}}>
                            <div className="match-icon">
                                <EmailIcon/>
                            </div>
                            <p className="user-info" style={{marginLeft: 40}}>taylor@gmail.com</p>
                        </div>
                    </div>
                    <div style={{paddingTop: 10}}>
                        <a href={"mailto:taylor@gmail.com?subject=Gym%20Partner%20Match"}><Button className="main-button" style={{height: 50, width: "100%", fontSize: "20px"}}>Email your partner</Button></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Match;
