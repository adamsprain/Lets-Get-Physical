import React from 'react';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import SignupPrompt from "./components/SignupPrompt";
import LoaderPage from "./components/LoaderPage";
import Match from "./components/Match";

//general controller for the entire application
class App extends React.Component {
    render() {
        return (
            <div>
                {/*Navigational bar overlayed on other components regardless of the page*/}
                <Navbar/>
                {/*Routing component which calls the functional component of each page and handles flow between them */}
                <Routes>
                    <Route path="" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/prompt" element={<SignupPrompt/>} />
                    <Route path="/loading" element={<LoaderPage/>} />
                    <Route path="/match" element={<Match/>} />
                </Routes>
            </div>
        );
    }
}

export default App;
