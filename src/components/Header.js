import React from "react";
import { Link } from "react-router-dom";
import { useAuthCheck, logout } from "../utils/auth";

function Header() {
    const { isAuthenticated, userRole } = useAuthCheck();

    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                {!isAuthenticated ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <>
                        {userRole === "GUEST" && <Link to="/oauth2/sign-up">Complete Info</Link>}
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
