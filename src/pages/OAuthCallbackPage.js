import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth"; // auth.js에서 가져옴

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

        const role = urlParams.get('role');

        console.log(role)

        if (accessToken) {
            // accessToken을 저장
            saveTokens(accessToken, role);

            if(role === "USER")
            {
                console.log("OAuth 인증 성공 : role : user")
                navigate("/main");
            }
            else if(role === "GUEST") {
                console.log("OAuth 인증 성공 : role : guest")
                navigate("/info");
            }
            // refreshToken이 존재하는지 확인 (Cookie)
            
        } else {
            console.error("OAuth 인증 실패. 다시 로그인해주세요.");
            alert("OAuth 인증에 실패했습니다. 다시 로그인 해주세요.");
            navigate("/login");
        }

    }, [navigate]);

    return <div>OAuth 인증 처리 중...</div>;
}

export default OAuthCallbackPage;