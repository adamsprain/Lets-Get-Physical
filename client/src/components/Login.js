import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {ProfileIcon} from "../icons/ProfileIcon";
import {LockIcon} from "../icons/LockIcon";
import {UserIcon} from "../icons/UserIcon";
import "../styles/App.css";
import "../styles/Login.css";
import {RemoveScrollBar} from "react-remove-scroll-bar";

//functional component which returns the display of the login page
function Login() {
    return (
        <div className="info-page" style={{display: "flex", justifyContent: "center"}}>
            <RemoveScrollBar></RemoveScrollBar>
            <div style={{marginTop: 40}}>
                <h1 className="header">Let's Get Physical</h1>
            </div>
            {/*Centers all the information*/}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    width: "100%",
                    height: "100vh",
                }}
            >
                {/*Card component which will hold all the info needed from the user*/}
                <Card className="login-card">
                    <Card.Body>
                        <h1 style={{marginTop: 50}}>
                            <ProfileIcon></ProfileIcon>
                        </h1>
                        <h3 style={{marginBottom: 30}}>Sign In</h3>
                        <div style={{textAlign: "left"}}>
                            <label>Username</label>
                        </div>
                        {/*Places component on the left side relative to the card position*/}
                        <div style={{position: "relative"}}>
                            <div className="icon">
                                {/*Icon displayed only for the username text box*/}
                                <UserIcon></UserIcon>
                            </div>
                            {/*Text box which provides spacing for the icon to display on the left side*/}
                            <input type="text" style={{height: 40, width: 350, marginBottom: 10, paddingLeft: 40}}/>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Password</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <div className="icon">
                                {/*Icon displayed only for the password text box*/}
                                <LockIcon></LockIcon>
                            </div>
                            <input type="text" style={{height: 40, width: 350, paddingLeft: 40}}/>
                        </div>
                        <div>
                            <Button className="main-button"
                                    size="lg" style={{marginBottom: 20, marginTop: 40, width: 300, height: 60, fontSize: "25px", fontWeight: 600}}>
                                Sign In
                            </Button>
                        </div>
                        <div>
                            {/*Hyperlink which takes the user to signup page*/}
                            <a href="/signup">Don't have an Account?</a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Login;
