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
        //uh this is the div that holds the card component of the login lol
        <div className="login-page" style={{display: "flex", justifyContent: "center"}}>
            <RemoveScrollBar></RemoveScrollBar>
            <div style={{marginTop: 40}}>
                <h1 className="header">Let's Get Physical</h1>
            </div>
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
                <Card className="login-card">
                    <Card.Body>
                        <h1 style={{marginTop: 50}}>
                            <ProfileIcon></ProfileIcon>
                        </h1>
                        <h3 style={{marginBottom: 30}}>Sign In</h3>
                        <div style={{textAlign: "left"}}>
                            <label>Username</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <div className="icon">
                                <UserIcon></UserIcon>
                            </div>
                            <input type="text" style={{height: 40, width: 350, marginBottom: 10, paddingLeft: 40}}
                                   className="input"/>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Password</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <div className="icon">
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
                            <a href="/signup">Don't have an Account?</a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Login;
