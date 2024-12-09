import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function OAuthCallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOAuthCallback = () => {
            const urlParams = new URLSearchParams(window.location.search);

            console.log("url : " + urlParams);

            const accessToken = urlParams.get("accessToken");
            const refreshToken = urlParams.get("refreshToken");

            console.log("access token : " + accessToken);
            console.log("refresh token : " + refreshToken);

            saveTokens(accessToken, refreshToken);

            if (!refreshToken) {
                navigate("/info", { replace: true }); // 회원가입 페이지로 이동
            } else {
                navigate("/main", { replace: true }); // 메인 페이지로 이동
            }
        };

        handleOAuthCallback();
    }, [navigate]);

    return <div>Processing login...</div>;
}

export default OAuthCallbackPage;