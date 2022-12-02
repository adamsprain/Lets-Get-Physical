import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {ProfileIcon} from "../icons/ProfileIcon";
import "../styles/App.css";
import "../styles/Login.css";
import {useNavigate} from "react-router-dom";


/*Functional component which displays the signup page*/
/*View Login.css for all styling references used in the components*/
function Signup() {
    const nav = useNavigate(); //navigational component which allows us to change pages

    const [username, setUsername] = useState(""); //username state defaulted to an empty string
    const [password, setPassword] = useState(""); //password state defaulted to an empty string
    //CR: Change variable name to be more self explanatory
    const [password2, setPassword2] = useState(""); //re-enter password state defaulted to an empty string
    const [email, setEmail] = useState(""); //email state defaulted to an empty string
    const [phoneNumber, setPhoneNumber] = useState(""); //phone number state defaulted to an empty string
    const [errorMessage, setErrorMessage] = useState(""); //error message state defaulted to an empty string

    //used to check errors in all fields and handles error messages accordingly
    //if no errors are found, navigates user to prompt page and sends states of provided info to that page
    const handleSubmit = () => {
        //checks for any empty fields
        if (username === "" || password === "" || password2 === "" || email === "" || phoneNumber === "") {
            //updates the state of the error message
            setErrorMessage("Please complete all the fields")
            return;
        }
        //checks to make sure the re-entered password matches
        //CR: Add flagging so error message stays up to date with states of all inputs
        if (password !== password2) {
            setErrorMessage("Passwords do not match")
            return;
        }
        //checks to ensure the password length is of 8
        if (password.length < "8") {
            setErrorMessage("Please enter a password 8 characters or longer")
            return;
        }
        //regex used to check the formatting of the email
        //(must contain @ symbol followed by characters, and a "." followed by at least 2 characters)
        //CR: link where i stole this from
        //CR: look into commenting regex
        let regEmail =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //checks user provided email follows the correct email format
        if (!regEmail.test(email)) {
            setErrorMessage("Invalid email format");
            return;
        }
        //regex used to check formatting of the phone number
        //can accept the following phone number formats:
        //+16306666666
        //6306666666
        //630-666-6666
        //(630) 666-6666
        //CR: Show where i stole this from
        //CR: Add a label to provide a sample format they can follow (or a default in the textfield)
        let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        //checks user provided phone number follows the correct format
        if (!regPhone.test(phoneNumber)) {
            setErrorMessage("Invalid phone number format");
            return;
        }
        //navigates the user to the next page which prompts the user for more info
        //sends down username, password, email, and phone number state to be used in the next page
        nav("/prompt", {state: {username, password, email, phoneNumber}});
        //reload the page once the user lands on the new page
        window.location.reload();
    }

    //changes the state of the username by getting the value inside of the component which calls this method
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    //changes the state of the password by getting the value inside of the component which calls this method
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    //changes the state of the second password by getting the value inside of the component which calls this method
    const handlePassword2 = (e) => {
        setPassword2(e.target.value);
    }
    //changes the state of the phone number by getting the value inside of the component which calls this method
    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }
    //changes the state of the email by getting the value inside of the component which calls this method
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    //displays the visuals of the page
    return (
        //divider which formats the overall page
        <div className="info-page" style={{display: "flex", justifyContent: "center"}}>
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
                {/*Card component which will hold all of the info needed from the user*/}
                <Card className="login-card">
                    <Card.Body>
                        {/*Header of the page which contains a user icon for visual purposes*/}
                        <h1 style={{marginTop: 30}}>
                            <ProfileIcon></ProfileIcon>
                        </h1>
                        {/*Header which provides name and/or purpose of the page*/}
                        <h3 style={{marginBottom: 30}}>Create an account</h3>
                        {/*Each label which displays what the textbox and/or dropdown will be used for*/}
                        {/*Will be repeated throughout the remaining card body*/}
                        {/*CR: Maybe move label above textbox (if it doesn't mess with styling)*/}
                        <div style={{textAlign: "left"}}>
                            <label>Username</label>
                        </div>
                        {/*textbox which will be used for each specific prompt accordingly*/}
                        {/*Will be repeated throughout the remaining card body*/}
                        <div style={{position: "relative"}}>
                            <input
                                id="uname" //assigns unique id to each component
                                onChange={handleUsername} /*updates the state based on purpose of each specific textbox
                                and whenever the user types anything*/
                                value={username} //Displays updated state whenever user makes a change
                                type="text"
                                className="user-input"
                                minLength="6"
                                required
                            />
                        </div>
                        <div style={{textAlign: "left"}}>
                            <label>Password</label>
                        </div>
                        <div style={{position: "relative"}}>
                            <input
                                id="pass1"
                                onChange={handlePassword}
                                value={password} //ensures that the text is encrypted for security purposes
                                type="password"
                                className="user-input"
                                minLength="8"
                                maxLength="20"
                                required
                            />
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
                                required
                            />
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
                        </div>
                        <div>
                            {/*Button displayed at the end of the card for form submission*/}
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
                                {/*CR: Change to "next" button*/}
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

export default Signup;
