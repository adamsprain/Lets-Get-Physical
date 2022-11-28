import React, {useState} from "react";
import "../styles/App.css";
import "../styles/Login.css";
import Card from "react-bootstrap/Card";
import {ProfileIcon} from "../icons/ProfileIcon";
import Button from "react-bootstrap/Button";
import {useLocation, useNavigate} from "react-router-dom";

//firstname
//lastname
//gender
//age
//location (University)
//bio
function SignupPrompt() {
    const nav = useNavigate();
    const loc = useLocation();
    const gender = ["Male", "Female", "Non-Binary", "Other"]

    const [formData, setFormData] = useState({
        username: loc.state.username,
        password: loc.state.password,
        firstname: "",
        lastname: "",
        location: "",
        age: 1,
        gender: "",
        bio: "",
    })
    const[errorMessage, setErrorMessage] = useState("");
    const handleInputData = input => e => {
        const { value } = e.target;
        // update prev state with new data
        setFormData(prevState => ({
            ...prevState,
            [input]: value
        }));
        console.log(formData);
    }

    const handleSubmit = (e) => {
        if (formData.firstname === "" || formData.lastname === "" || formData.location === "" || formData.bio === ""
            || formData.gender === "") {
            setErrorMessage("Please complete all the fields")
            return;
        }
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify(formData)
        };

        fetch("/auth/signup", requestOptions)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                console.log(formData);
            })
            .catch((err) => console.log('error'))

        nav("/");
        window.location.reload();
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
                <Card className="prompt-card">
                    <Card.Body>
                        <h1 style={{marginTop: 30}}>
                            <ProfileIcon></ProfileIcon>
                        </h1>
                        <h3 style={{marginBottom: 30}}>Account Information</h3>
                        <div style={{textAlign: "left"}}>
                            <label>First Name</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input
                                id="firstname"
                                onChange={handleInputData("firstname")}
                                value={formData.firstname}
                                type="text"
                                className="user-input"
                                maxLength="20"
                                pattern="^[A-Za-z0-9_]{8,}$"
                                required
                            />
                            <span className="validity"></span>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Last Name</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input
                                id="lastname"
                                onChange={handleInputData("lastname")}
                                value={formData.lastname}
                                type="text"
                                className="user-input"
                                maxLength="20"
                                pattern="^[A-Za-z0-9_]{8,}$"
                                required
                            />
                            <span className="validity"></span>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Gender</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={handleInputData("gender")}
                                style={{height: 40, width: 350, marginBottom: 10}}
                            >

                                <option value={formData.gender}>{formData.gender}</option>
                                {
                                    gender.map((x, index) => (
                                        <option key={index} value={x}>{x}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Location</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input
                                id="location"
                                onChange={handleInputData("location")}
                                value={formData.location}
                                type="text"
                                className="user-input"
                                maxLength="50"
                                pattern="^[A-Za-z0-9_]{8,}$"
                                required
                            />
                            <span className="validity"></span>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Age</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input
                                id="age"
                                onChange={handleInputData("age")}
                                value={formData.age}
                                type="number"
                                className="user-input"
                                min="1"
                                required
                            />
                            <span className="validity"></span>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Bio</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input
                                id="bio"
                                onChange={handleInputData("bio")}
                                value={formData.bio}
                                type="text"
                                style={{height: 40, width: 350}}
                                maxLength="100"
                                pattern="^[A-Za-z0-9_]{8,}$"
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

export default SignupPrompt;
