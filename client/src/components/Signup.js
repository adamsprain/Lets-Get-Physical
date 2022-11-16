import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {ProfileIcon} from "../icons/ProfileIcon";
import "../styles/App.css";
import "../styles/Login.css";

/*Functional component which displays the login lage*/
/*See Login functional component for specific comments*/
function Signup() {
    return (
        <div className="info-page" style={{display: "flex", justifyContent: "center"}}>
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
                        <h1 style={{marginTop: 30}}>
                            <ProfileIcon></ProfileIcon>
                        </h1>
                        <h3 style={{marginBottom: 30}}>Create an account</h3>
                        <div style={{textAlign: "left"}}>
                            <label>Username</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input type="text" style={{height: 40, width: 350, marginBottom: 10}}/>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Password</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input type="text" style={{height: 40, width: 350, marginBottom: 10}}/>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Re-Enter Password</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input type="text" style={{height: 40, width: 350}}/>
                        </div>
                        <div>
                            <Button className="main-button"
                                    size="lg" style={{marginBottom: 10, marginTop: 40, width: 300, height: 60, fontSize: "25px", fontWeight: 600}}>
                                Create Account
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Signup;
