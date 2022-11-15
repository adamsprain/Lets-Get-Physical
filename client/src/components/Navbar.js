import { Link, useMatch, useResolvedPath} from "react-router-dom";
import React from 'react';
import Button from "react-bootstrap/Button";
import logo from "../images/AppLogo.png";


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: "black"}}>
            <div className="container-fluid">
                <Link to="/" className="site-title" style={{display: "flex", textDecoration: "none"}}>
                    <img className="logo" src={logo} alt="Let's Get Physical Logo">
                    </img>
                    <h1 style={{color: "white", paddingTop: 10, paddingLeft: 5}}>Let's Get Physical</h1>
                </Link>
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

function CustomLink({to, children, ...props}){
    const resolvedPath =  useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return(
        <div className={isActive ? "active" : ""}>
            <Link to = {to}{...props}>{children}</Link>
        </div>
    )
}