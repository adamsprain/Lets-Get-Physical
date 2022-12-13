import {Link, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import React from 'react';
import Button from "react-bootstrap/Button";
import logo from "../images/AppLogo.png";
import { DashboardIcon } from "../icons/DashboardIcon";


/*Functional component which will display the navbar overlayed on every other component page*/
export default function Navbar() {
    let navigate = useNavigate();

    const home = () => {
        navigate("/");
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: "black"}}>
            <div className="container-fluid">
                {/*Allows the icon and title to be clickable so user can return to homepage*/}
                <Link to="/" style={{textDecoration: "none"}} onClick={home}>
                    <ul className="navbar-nav me-auto">
                        <img className="logo" src={logo} alt="Let's Get Physical Logo"></img>
                        <h1 style={{color: "white", paddingTop: 10}} onClick={home}>Let's Get Physical</h1>
                    </ul>
                </Link>
                {/*Allows user to navigate to login page regardless of location*/}
                {navbarButton()}
            </div>
        </nav>
    )
}

const navbarButton = () => {
    if (window.location.pathname !== "/match") {
        return (
            <CustomLink to="/Login" style={{textDecoration: "none"}}>
                <ul className="navbar-nav me-auto">
                    <Button className="nav-bar-button" size="lg">
                        Login
                    </Button>
                </ul>
            </CustomLink>
        )
    } else {
        return (
            <div style={{justifyContent: "right"}}>
                <ul className="navbar-nav me-auto">
                    <DashboardIcon></DashboardIcon>
                </ul>
            </div>
        )
    }
}

/*Helper method used to navigate to a specific page regardless of users location*/
function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <div className={isActive ? "active" : ""}>
            <Link to={to}{...props}>{children}</Link>
        </div>
    )
}
