import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

function MainPage() {
    return (
        <div>
            <Header></Header>
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