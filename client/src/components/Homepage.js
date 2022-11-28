import '../styles/App.css';
import '../styles/Homepage.css';
import React from 'react';
import image from "../images/HomeBanner.jpg";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";


function Home() {
    return (
        <div className="Page" style={{display: "flex"}}>
            <div>
                {/*Displays the large banner-like image on the homepage*/}
                <img src={image} className="main-image" alt=""/>
                {/*Div used to center the buttons and text that user can use to navigate the site*/}
                <div style={{textAlign: "center", position: "relative", marginLeft: 70}}>
                    <h1 className="home">Find Your Swolemate!</h1>
                    {/*Button which directs the user to the signup page*/}
                    <Link to="/signup"><Button className="main-button" size="lg"
                                              style={{width: 250, marginRight: 50}}>
                        Create an Account </Button></Link>
                    {/*Button which directs the user to the login page*/}
                    <Link to="/login"><Button className='secondary-button' size="lg"
                                               style={{width: 250}}>
                        Login </Button>
                    </Link>
                </div>
                {/*Provide extra spacing below the buttons*/}
                <br></br>
            </div>
        </div>
    );
}

export default Home;
