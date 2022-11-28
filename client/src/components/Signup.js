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
    const[email, setEmail] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");
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
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(email)) {
            setErrorMessage("Invalid email format");
            return;
        }
        let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!regPhone.test(phoneNumber)) {
            setErrorMessage("Invalid phone number format");
            return;
        }
        nav("/prompt", {state: {username, password, email, phoneNumber}});
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
    }

    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }


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
                                className="user-input"
                                minLength="8"
                                maxLength="20"
                                pattern = {password}
                                required
                            />
                            <span className="validity"></span>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Email</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input
                                id="email"
                                onChange={handleEmail}
                                value={email}
                                type="email"
                                className="user-input"
                                maxLength="50"
                                required
                            />
                            <span className="validity"></span>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Phone Number</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input
                                id="phoneNumber"
                                onChange={handlePhoneNumber}
                                value={phoneNumber}
                                type="text"
                                style={{height: 40, width: 350}}
                                maxLength="50"
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
