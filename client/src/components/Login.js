//Allows for use of CSS styling
import "../styles/App.css";
import "../styles/Login.css";
//Allows for use of specific React Components
import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//Allows for use of SVG Icons
import {ProfileIcon} from "../icons/ProfileIcon";
import {LockIcon} from "../icons/LockIcon";
import {UserIcon} from "../icons/UserIcon";
import {useNavigate} from "react-router-dom";

//Creates space between header top of the page and the "Let's Get Physical" header
const HEADER_TOP_MARGIN = 40;
//Allows the div to be the width of the page
const DIV_WIDTH = "100%";
//Allows the div to be the height of the browser
const DIV_HEIGHT = "100vh";
//Creates space between the profile icon and the top of the card for visual purposes
const ICON_TOP_MARGIN = 50;
//Creates space between the "Sign In" text and the text components for visual purposes
const SIGN_IN_BOTTOM_MARGIN = 30;
//Creates space between Sign In button and the hidden error div
const BUTTON_BOTTOM_MARGIN = 10;
//Creates space between the password textbox and the Sign in button
const BUTTON_TOP_MARGIN = 20;
//Allows the Sign In button to be wider than default to fit the card in a more visually appealing manner
const BUTTON_WIDTH = 300;
//Allows the Sign In button to have a larger height in a more visually appealing manner
const BUTTON_HEIGHT = 60;
//Increases the font size of the Sign In button to match the larger sizing
const BUTTON_FONT_SIZE = "25px";
//Increases the font weight of the Sign In button so the text pops out more
const BUTTON_FONT_WEIGHT = 600;
//Allows the div to grow or shrink based on components inside
const FLEX_DISPLAY = "flex";
//Keyword for centering all items in a div
const CENTER_CONTENT = "center";
//Used for the div encompassing the card component to ensure that the positioning will be fixed regardless of screen resolution
const ABSOLUTE_POSITION = "absolute";
//Allows items within a div to be positioned relative to the page
const RELATIVE_POSITION = "relative";
//Used for positioning the labels to the left of the div for visual purposes
const LEFT_ALIGN = "left";


//functional component which returns the display of the login page
//to view any class styling referenced here, go to Login.css
//Author: Holly Qian
//Last Revised: 12/7/2022
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

        navigate("/match");
        window.location.reload();

/*        /!*API information which takes in the information from the form data*!/
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            mode: "cors",
            body: JSON.stringify(formData)
        };

        /!*Actual API call to the endpoint and our provided information*!/
        fetch("/auth/signin", requestOptions).then((res) => {
            //checks to ensure the user exists
            if (res.status === 200) {
                setAccessToken(res.accesstoken);
                console.log(accessToken);
                navigate("/match");
                window.location.reload();
            } else {
                console.log("Error");
            }
        });*/
    }
    //displays visual components
    return (
        //divider which formats the overall page
        <div className="info-page" style={{display: "flex", justifyContent: "center"}}>
            <div style={{marginTop: HEADER_TOP_MARGIN}}>
                <h1 className="header">Let's Get Physical</h1>
            </div>
            {/*Centers all the information*/}
            <div style={{
                display: FLEX_DISPLAY,
                justifyContent: CENTER_CONTENT,
                alignItems: CENTER_CONTENT,
                position: ABSOLUTE_POSITION,
                width: DIV_WIDTH,
                height: DIV_HEIGHT,
            }}>
                {/*Card component which will hold all the info needed from the user*/}
                <Card className="login-card">
                    <Card.Body>
                        <h1 style={{marginTop: ICON_TOP_MARGIN}}>
                            {/*Header of the page which contains a user icon for visual purposes*/}
                            <ProfileIcon></ProfileIcon>
                        </h1>
                        <h3 style={{marginBottom: SIGN_IN_BOTTOM_MARGIN}}>Sign In</h3>
                        <div style={{textAlign: LEFT_ALIGN}}>
                            {/*Each label which displays what the textbox and/or dropdown will be used for*/}
                            {/*Will be repeated throughout the remaining card body*/}
                            <label>Username</label>
                        </div>
                        {/*Places component on the left side relative to the card position*/}
                        <div style={{position: RELATIVE_POSITION}}>
                            <div className="icon">
                                {/*Icon displayed only for the username text box*/}
                                <UserIcon></UserIcon>
                            </div>
                            {/*Text box which provides spacing for the icon to display on the left side*/}
                            <input
                                //assigns unique id to each component
                                id="uname"
                                /*updates the state based on purpose of each specific textbox
                                and whenever the user inputs anything*/
                                onChange={handleInputData("username")}
                                //Displays updated state whenever user makes a change
                                value={formData.username}
                                //Specifies that this input should contain text
                                type="text"
                                className="login-input"
                                required
                            />
                        </div>
                        <div style={{textAlign: LEFT_ALIGN}}>
                            <label>Password</label>
                        </div>
                        <div style={{position: RELATIVE_POSITION}}>
                            <div className="icon">
                                {/*Icon displayed only for the password text box*/}
                                <LockIcon></LockIcon>
                            </div>
                            <input
                                //assigns unique id to each component
                                id="password"
                                /*updates the state based on purpose of each specific textbox
                                and whenever the user inputs anything*/
                                onChange={handleInputData("password")}
                                //Displays updated state whenever user makes a change
                                value={formData.password}
                                //Encrypts the textbox so user cannot see what they typed for security purposes
                                type="password"
                                className="login-input"
                                required
                            />
                        </div>
                        <div>
                            {/*Button component which will handle login submission and error updates based on user response of the prompts*/}
                            <Button className="main-button" onClick={handleSubmit}
                                    style={{
                                        marginBottom: BUTTON_BOTTOM_MARGIN,
                                        marginTop: BUTTON_TOP_MARGIN,
                                        width: BUTTON_WIDTH,
                                        height: BUTTON_HEIGHT,
                                        fontSize: BUTTON_FONT_SIZE,
                                        fontWeight: BUTTON_FONT_WEIGHT,
                                    }}>
                                Sign In
                            </Button>
                            {/*Contains the message that will initially display nothing*/}
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
