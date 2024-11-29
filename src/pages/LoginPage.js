import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // 리디렉트된 URL에서 토큰 정보 추출
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");

        if (accessToken && refreshToken) {
            saveTokens(accessToken, refreshToken); // 로컬 스토리지에 토큰 저장
            navigate("/"); // 메인 페이지로 리디렉트
        }
    }, [navigate]);

    const handleLogin = () => {
        // 구글 OAuth 로그인 요청 (서버가 리디렉트 처리)
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
