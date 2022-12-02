import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {ProfileIcon} from "../icons/ProfileIcon";
import {useLocation, useNavigate} from "react-router-dom";
import "../styles/App.css";
import "../styles/Login.css";

//functional component which takes in the form data needed for account creation and sends it to the backend
//all styling comments can be found in Logins.css for more information
function SignupPrompt() {
    //used to navigate to another page/URL
    const nav = useNavigate();
    //in this case, used to get the states passed down from the login page
    const loc = useLocation();
    //array of options that will be shown for the dropdown
    const gender = ["Male", "Female", "Non-Binary", "Other"]

    //state handler for different variables needed for account creation
    //all variables will be defaulted to empty strings unless the information has been received from the previous
    //signup page
    //age will be defaulted to 1
    const [formData, setFormData] = useState({
        username: loc.state.username, //username state provided from the previous signup page
        password: loc.state.password, //password state provided from the previous signup page
        email: loc.state.email, //email state provided from previous signup page
        phonenumber: loc.state.phonenumber, //phone number state provided from previous signup page
        firstname: "",
        lastname: "",
        location: "",
        age: 1,
        gender: "",
        bio: "",
    })
    //state handler for an error message that would display
    const [errorMessage, setErrorMessage] = useState("");

    //updates the state of the form based on specific input
    //input is the provided "key" which will map the correct variable in the form
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
        if (formData.firstname === "" || formData.lastname === "" || formData.location === "" || formData.bio === ""
            || formData.gender === "") {
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
        fetch("/auth/signup", requestOptions)
            /*Getting the response and changing it to json format*/
            .then((res) => res.json())
            /*Logging the correct information on success*/
            .then((result) => {
                console.log(result);
                console.log(formData);
            })
            /*Logging error if API call was unsuccessful*/
            .catch((err) => console.log('error'))
        /*Navigate back to home page for now until match page is made*/
        nav("/");
        /*Reload the window after navigating the user to the page*/
        window.location.reload();
    }

    //displays visual components
    return (
        //divider which styles the actual page and centers all components within it
        <div className="info-page" style={{display: "flex", justifyContent: "center"}}>
            {/*divider which styles the actual positioning of the card relative to the page*/}
            <div
                style={{
                    display: "flex", /*ALlow the card to grow or shrink based on components inside*/
                    justifyContent: "center", /*Centers items in the card*/
                    alignItems: "center", /*Centers items in the card*/
                    position: "absolute", /*Allows card to be positioned relative to the page*/
                    width: "100%", /*Allows the div to be the width of the page*/
                    height: "100vh", /*Allows the div to be the height of the browser*/
                    paddingTop: 10, /*Ensures the div doesn't clash with the header component*/
                }}
            >
                {/*Card component which will contain all of the prompts needed from the user*/}
                <Card className="prompt-card">
                    <Card.Body>
                        {/*Header of the page which contains a user icon for visual purposes*/}
                        <h1 style={{marginTop: 30}}>
                            <ProfileIcon></ProfileIcon>
                        </h1>
                        {/*Header which provides name of the page*/}
                        <h3 style={{marginBottom: 30}}>Account Information</h3>
                        {/*Each label which displays what the textbox and/or dropdown will be used for*/}
                        {/*Will be repeated throughout the remaining card body*/}
                        <div style={{textAlign: "left"}}>
                            <label>First Name</label>
                        </div>
                        <div style={{position: "relative"}}>
                            {/*textbox which will be used for each specific prompt accordingly*/}
                            {/*Will be repeated throughout the remaining card body*/}
                            <input
                                id="firstname" /*Used to assign a unique ID*/
                                onChange={handleInputData("firstname")} /*When user types in the textbox,
                                updates the state based on specific use of each textbox*/
                                value={formData.firstname} /*Displays updated state when user makes changes*/
                                type="text"
                                className="user-input" /*Styling found in Login.css*/
                                maxLength="20" /*Only allows for a max of 20 characters in the textbox*/
                                required
                            />
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
                                required
                            />
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Gender</label>
                        </div>
                        <div style={{position: "relative"}}>
                            {/*Dropdown component*/}
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={handleInputData("gender")}
                                style={{height: 40, width: 350, marginBottom: 10}}
                            >
                                {/*Displays each option for the dropdown component*/}
                                <option value={formData.gender}>{formData.gender}</option>
                                {
                                    /*Iterates through our gender array and displays each option*/
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
                                required
                            />
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
                                min="1" //Used so that user cannot put negative values as their age
                                required
                            />
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
                                required
                            />
                        </div>
                        <div>
                            {/*Button displayed at the end of the card which submits the form*/}
                            <Button className="main-button"
                                    size="lg"
                                    style={{
                                        marginBottom: 10,
                                        marginTop: 40,
                                        width: 300,
                                        height: 60,
                                        fontSize: "25px",
                                        fontWeight: 600,
                                    }}
                                    onClick={handleSubmit}
                            >
                                Create Account
                            </Button>
                        </div>
                        {/*A hidden div which displays an error message if the user does not fill out
                        one of the prompts correctly*/}
                        <div className="messages" style={{marginBottom: 10}}>
                            {/*Paragraph which displays the state of the error message, will display nothing
                            unless user clicks on the button*/}
                            <p className="error">{errorMessage}</p>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );

}

export default SignupPrompt;
