import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {ProfileIcon} from "../icons/ProfileIcon";
import "../styles/App.css";
import "../styles/Login.css";
import {useNavigate} from "react-router-dom";

/*Functional component which displays the login lage*/
/*See Login functional component for specific comments*/
function Signup() {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = () => {
        if (username === "" || password === "" || password2 === "") {
            setErrorMessage("Please complete all the fields")
            return;
        }
        if (password !== password2) {
            setErrorMessage("Passwords do not match")
            return;
        }
        if (password.length !== 8) {
            setErrorMessage("Please enter a password 8 characters or longer")
            return;
        }
        nav("/prompt", {state: {username, password}});
        window.location.reload();
    }


    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlePassword2 = (e) => {
        setPassword2(e.target.value);
    };

    return (
        <div className="info-page" style={{display: "flex", justifyContent: "center"}}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    width: "100%",
                    height: "100vh",
                    paddingTop: 10,
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
                            <input
                                id="uname"
                                onChange={handleUsername}
                                value={username}
                                type="text"
                                className="user-input"
                                minLength="6"
                                pattern="[A-Za-z0-9_]{6,}"
                                required
                            />
                            <span className="validity"></span>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Password</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input
                                id="pass1"
                                onChange={handlePassword}
                                value={password}
                                type="password"
                                className="user-input"
                                minLength="8"
                                maxLength="20"
                                pattern="^[A-Za-z0-9_]{8,}$"
                                required
                            />
                            <span className="validity"></span>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Re-Enter Password</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input
                                id="pass2"
                                onChange={handlePassword2}
                                value={password2}
                                type="password"
                                style={{height: 40, width: 350}}
                                minLength="8"
                                maxLength="20"
                                pattern = {password}
                                required
                            />
                            <span className="validity"></span>
                        </div>
                        <div>
                            <Button className="main-button"
                                    size="lg"
                                    style={{marginBottom: 10, marginTop: 40, width: 300, height: 60, fontSize: "25px", fontWeight: 600}}
                                    onClick={handleSubmit}
                            >
                                Create Account
                            </Button>
                        </div>
                        <div className="messages" style={{marginBottom: 10}}>
                            <p className="error">{errorMessage}</p>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Signup;
