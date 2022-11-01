import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import {Route, Routes} from "react-router-dom";
class App extends React.Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="" element={<Login />} />
                    <Route path="/signup" element={<Signup/>} />
                </Routes>
            </div>
        );
    }
}

export default App;
