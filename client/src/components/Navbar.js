import { Link, useMatch, useResolvedPath} from "react-router-dom";
import React from 'react';
import Button from "react-bootstrap/Button";
import logo from "../images/AppLogo.png";


/*Functional component which will display the navbar overlayed on every other component page*/
export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: "black", height: "2%"}}>
            <div className="container-fluid">
                {/*Allows the icon and title to be clickable so user can return to homepage*/}
                <Link to="/" className="site-title" style={{display: "flex", textDecoration: "none"}}>
                    <img className="logo" src={logo} alt="Let's Get Physical Logo">
                    </img>
                    <h1 style={{color: "white", paddingTop: 10, paddingLeft: 5}}>Let's Get Physical</h1>
                </Link>
                {/*Allows user to navigate to login page regardless of location*/}
                <CustomLink to="/Login" style={{textDecoration: "none"}}>
                    <ul className="navbar-nav me-auto">
                        <Button className="nav-bar-button" size="lg">
                            Login
                        </Button>
                    </ul>
                </CustomLink>
            </div>
        </nav>
    )
}

/*Helper method used to navigate to a specific page regardless of users location*/
function CustomLink({to, children, ...props}){
    const resolvedPath =  useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return(
        <div className={isActive ? "active" : ""}>
            <Link to = {to}{...props}>{children}</Link>
        </div>
    )
}