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
        const accessToken = urlParams.get("accessToken");

        console.log("URL Params:", urlParams);
        console.log("Access Token:", accessToken);

        if (accessToken) {
            // accessToken을 저장
            saveTokens(accessToken, null);

            // 리다이렉션된 URL에서 서버에서 받은 헤더 정보 처리
            const refreshToken = getRefreshTokenFromHeaders();

            console.log("Refresh Token from Headers:", refreshToken);

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

    /**
     * 서버 응답에서 refreshToken을 헤더로 받아오는 함수
     */
    const getRefreshTokenFromHeaders = () => {
        // 예시: `refresh` 헤더에서 refreshToken을 추출할 수 없지만,
        // 서버 응답에서 직접 받은 refreshToken 값을 받아오는 로직을 작성해야 합니다.
        const cookies = document.cookie.split(';');
        let refreshToken = null;

        cookies.forEach((cookie) => {
            const [name, value] = cookie.split('=');
            if (name.trim() === 'refresh') {
                refreshToken = value;
            }
        });

        return refreshToken;
    };

    return <div>OAuth 인증 처리 중...</div>;
}

export default OAuthCallbackPage;
