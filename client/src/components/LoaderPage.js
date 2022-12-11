import '../styles/App.css';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


function LoaderPage() {
        const navigate = useNavigate();
        setTimeout(() => {
            navigate("/match");
            window.location.reload();
        }, 5000);

    return (
        <div>
            <div className="center">
                <div style={{display: "flex", justifyContent: "center"}}>
                    <ClipLoader loading={true} size={150} aria-label="Loading Spinner"
                                data-testid="loader"></ClipLoader>
                </div>
                <h1 style={{paddingTop: 20}}>Finding your gym partner...</h1>
            </div>
        </div>
    );
}

export default LoaderPage;
