import React from "react";
// import { useNavigate } from "react-router-dom";
// import { saveTokens } from "../utils/auth";

function LoginPage() {

    const handleLogin = () => {
        // Google OAuth2 로그인 요청
        window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
}

export default LoginPage;