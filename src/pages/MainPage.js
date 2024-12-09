import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

function MainPage() {
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/info">Go to Info Page (Protected)</Link>
            <br/>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default MainPage;
