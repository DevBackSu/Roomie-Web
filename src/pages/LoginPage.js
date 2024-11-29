import React from "react";
import { saveTokens } from "../utils/auth";

function LoginPage() {
    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/oauth2/authorization/google`, {
                method: "GET",
                credentials: "include", // 쿠키 기반 인증을 위해 설정
            });
    
            if (response.ok) {
                const accessToken = response.headers.get("Auth");
                const refreshToken = response.headers.get("Refresh");
                saveTokens(accessToken, refreshToken);
                window.location.href = "/";
            } else {
                console.error("Login failed:", response.status, response.statusText);
                alert("Login failed.");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
}

export default LoginPage;
