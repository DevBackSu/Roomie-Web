import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function OAuthCallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOAuthLogin = () => {
            try {
                const queryString = window.location.search; // 쿼리 파라미터 가져오기
                console.log("Raw Query String:", queryString); // 디버깅용 로그
                const urlParams = new URLSearchParams(queryString);
                const accessToken = urlParams.get("accessToken");
                const refreshToken = urlParams.get("refreshToken");

                console.log("access : " + accessToken)
                console.log("refresh : " + refreshToken)

                if (accessToken) {
                    saveTokens(accessToken, refreshToken);

                    console.log("토큰 저장")

                    console.log(!refreshToken)

                    // 회원가입 페이지로 이동 또는 메인 페이지로 이동
                    if (!refreshToken) {
                        console.log("여기 안 들어옴?")
                        navigate("/info");
                    } else {
                        navigate("/");
                    }
                } else {
                    console.error("Failed to log in. No access token found.");
                    navigate("/error"); // 실패 시 에러 페이지로 이동
                }
            } catch (error) {
                console.error("Error during OAuth login:", error);
                navigate("/error");
            }
        };

        handleOAuthLogin();
    }, [navigate]);

    return <div>Processing your login...</div>;
}

export default OAuthCallbackPage;
