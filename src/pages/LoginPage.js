import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // URL에서 토큰 추출
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessHeader");
        const refreshToken = params.get("refreshHeader");

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);

        if (accessToken) {
            saveTokens(accessToken, refreshToken); // 로컬 스토리지에 저장

            if (!refreshToken) {
                // Refresh Token이 없으면 회원가입 페이지로 이동
                navigate("/info");
            } else {
                // 두 토큰 모두 존재하면 메인 페이지로 이동
                navigate("/");
            }
        }
    }, [navigate]);

    const handleLogin = () => {
        // OAuth2 로그인 요청
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
