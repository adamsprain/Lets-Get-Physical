import '../styles/App.css';
import '../styles/Homepage.css';
import React from 'react';
import image from "../images/HomeBanner.png";
import Button from "react-bootstrap/Button";
import {RemoveScrollBar} from 'react-remove-scroll-bar';
import {Link} from "react-router-dom";


function Home() {
    return (
        <div className="Page" style={{display: "flex"}}>
            <RemoveScrollBar></RemoveScrollBar>
            <div style={{minWidth: 1500}}>
                <img src={image} className="main-image" alt=""/>
                <div style={{textAlign: "center", position: "relative", marginLeft: 80}}>
                    <h1 className="home">Find Your Swolemate!</h1>
                    <Link to="/login"><Button className="main-button" size="lg"
                                              style={{width: 250, marginRight: 50}}>
                        Create an Account </Button></Link>
                    <Link to="/signup"><Button className='secondary-button' size="lg"
                                               style={{width: 250}}>
                        Login </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
