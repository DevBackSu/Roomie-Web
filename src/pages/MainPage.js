import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/info">Go to Info Page (Protected)</Link>
        </div>
    );
}

export default MainPage;
