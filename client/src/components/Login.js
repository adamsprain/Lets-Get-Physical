import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {ProfileIcon} from "../icons/ProfileIcon";
import {LockIcon} from "../icons/LockIcon";
import {UserIcon} from "../icons/UserIcon";
import "../styles/App.css";
import "../styles/Login.css";
import {useNavigate} from "react-router-dom";

//functional component which returns the display of the login page
//to view any styling referenced here, go to Login.css
function Login() {
    //to send data to new page
    const navigate = useNavigate();

    //state for form data, defaults both to empty strings
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    // States for accessToken for future validation
    const [accessToken, setAccessToken] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    //updates the state of the form based on specific input
    //input is the provided "key" which will map to the correct variable in the form
    const handleInputData = input => e => {
        /*Gets the actual information from each component which calls this method*/
        const {value} = e.target;
        // update prev state with new data
        setFormData(prevState => ({
            ...prevState,
            [input]: value
        }));
    }

    //handles error messages when user tries to create account as well as API call to our endpoints
    const handleSubmit = () => {
        /*Handles any empty fields and displays corresponding error message*/
        if (formData.username === "" || formData.password === "") {
            setErrorMessage("Please complete all the fields")
            return;
        }

        /*API information which takes in the information from the form data*/
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            mode: "cors",
            body: JSON.stringify(formData)
        };

        /*Actual API call to the endpoint and our provided information*/
        fetch("/auth/signin", requestOptions).then((res) => {
            if (res.status === 200) {
                setAccessToken(res.accesstoken);
                console.log(accessToken);
                navigate("/");
                window.location.reload();
            } else {
                console.log("Error");
            }
        });
    }
    //displays visual components
    return (
        //divider which formats the overall page
        <div className="info-page" style={{display: "flex", justifyContent: "center"}}>
            <div style={{marginTop: 40}}>
                <h1 className="header">Let's Get Physical</h1>
            </div>
            {/*Centers all the information*/}
            <div
                style={{
                    display: "flex", /*ALlow the card to grow or shrink based on components inside*/
                    justifyContent: "center", /*Centers items in the card*/
                    alignItems: "center", /*Centers items in the card*/
                    position: "absolute", /*Allows card to be positioned relative to the page*/
                    width: "100%", /*Allows the div to be the width of the page*/
                    height: "100vh", /*Allows the div to be the height of the browser*/
                }}
            >
                {/*Card component which will hold all the info needed from the user*/}
                <Card className="login-card">
                    <Card.Body>
                        <h1 style={{marginTop: 50}}>
                            {/*Header of the page which contains a user icon for visual purposes*/}
                            <ProfileIcon></ProfileIcon>
                        </h1>
                        <h3 style={{marginBottom: 30}}>Sign In</h3>
                        <div style={{textAlign: "left"}}>
                            {/*Each label which displays what the textbox and/or dropdown will be used for*/}
                            {/*Will be repeated throughout the remaining card body*/}
                            {/*CR: Link between label and textbox for accessibility purposes*/}
                            <label>Username</label>
                        </div>
                        {/*Places component on the left side relative to the card position*/}
                        <div style={{position: "relative"}}>
                            <div className="icon">
                                {/*Icon displayed only for the username text box*/}
                                <UserIcon></UserIcon>
                            </div>
                            {/*Text box which provides spacing for the icon to display on the left side*/}
                            <input
                                id="uname" //assigns unique id to each component
                                onChange={handleInputData("username")} /*updates the state based on purpose of each specific textbox
                                and whenever the user types anything*/
                                value={formData.username} //Displays updated state whenever user makes a change
                                type="text"
                                style={{height: 40, width: 350, marginBottom: 10, paddingLeft: 40}}
                                required
                            />
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Password</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <div className="icon">
                                {/*Icon displayed only for the password text box*/}
                                <LockIcon></LockIcon>
                            </div>
                            <input
                                id="password" //assigns unique id to each component
                                onChange={handleInputData("password")} /*updates the state based on purpose of each specific textbox
                                and whenever the user types anything*/
                                value={formData.password} //Displays updated state whenever user makes a change
                                type="password"
                                style={{height: 40, width: 350, paddingLeft: 40}}
                                required
                            />
                        </div>
                        <div>
                            <Button className="main-button" onClick={handleSubmit}
                                    size="lg" style={{
                                marginBottom: 20,
                                marginTop: 40,
                                width: 300,
                                height: 60,
                                fontSize: "25px",
                                fontWeight: 600
                            }}>
                                Sign In
                            </Button>
                            <div className="messages">
                                {/*Paragraph which displays the state of the error message, will display nothing
                            unless user clicks on the button*/}
                                <p className="error">{errorMessage}</p>
                            </div>
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
