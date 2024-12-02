import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOAuthLogin = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/oauth2/callback`, {
                    method: "GET",
                    credentials: "include", // 인증 정보 포함
                });

                if (response.ok) {
                    // 헤더에서 토큰 추출
                    const accessToken = response.headers.get("Auth");
                    const refreshToken = response.headers.get("Refresh");

                    console.log("Access Token : ", accessToken);
                    console.log("Refresh Token : ", refreshToken);

                    if (accessToken) {
                        saveTokens(accessToken, refreshToken);

                        // 회원가입 페이지로 이동 또는 메인 페이지로 이동
                        if (!refreshToken) {
                            navigate("/info");
                        } else {
                            navigate("/");
                        }
                    }
                } else {
                    console.error("Failed to log in. Status:", response.status);
                }
            } catch (error) {
                console.error("Error during OAuth login:", error);
            }
        };

        handleOAuthLogin();
    }, [navigate]);

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
