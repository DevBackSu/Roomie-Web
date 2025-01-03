import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens, getRefreshToken } from "../utils/auth"; // auth.js에서 가져옴

function OAuthCallbackPage() {
    const navigate = useNavigate();
    const isNavigating = useRef(false);

    useEffect(() => {
        if (isNavigating.current) return;  // 이미 리다이렉션 상태면 실행 X

        isNavigating.current = true; // 리다이렉션 상태 설정
        
        // URL에서 accessToken 파싱
        const urlParams = new URLSearchParams(window.location.search);

        console.log(urlParams)

        const accessToken = urlParams.get("accessToken");

        console.log(accessToken)

        if (accessToken) {
            // accessToken을 저장
            saveTokens(accessToken, null);

            // refreshToken이 존재하는지 확인 (Cookie)
            const refreshToken = getRefreshToken();

            console.log(accessToken)
            console.log(refreshToken)

            if (refreshToken) {
                console.log("OAuth 인증 성공: refreshToken이 존재합니다. 홈으로 이동합니다.");
                navigate("/"); // refreshToken이 있다면 홈으로 이동
            } else {
                console.log("OAuth 인증 성공: 최초 로그인입니다. /info로 이동합니다.");
                navigate("/info"); // 최초 로그인이라면 /info로 이동
            }
        } else {
            console.error("OAuth 인증 실패. 다시 로그인해주세요.");
            alert("OAuth 인증에 실패했습니다. 다시 로그인 해주세요.");
            navigate("/login");
        }

    }, [navigate]);

    return <div>OAuth 인증 처리 중...</div>;
}

export default OAuthCallbackPage;
