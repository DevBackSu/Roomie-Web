import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth"; // auth.js에서 가져옴

function OAuthCallbackPage() {
    const navigate = useNavigate();
    const isNavigating = useRef(false);

    useEffect(() => {
        if (isNavigating.current) return; // 이미 리다이렉션 상태면 실행 X
        isNavigating.current = true; // 리다이렉션 상태 설정

        // URL에서 accessToken과 role 파싱
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const role = urlParams.get("role");

        console.log("URL Params:", urlParams.toString());
        console.log("Access Token:", accessToken);
        console.log("Role:", role);

        if (!accessToken) {
            console.log("callback page access token 없음");
            // 인증 실패 처리
            handleAuthFailure();
            return;
        }

        // accessToken 저장
        saveTokens(accessToken, null);

        switch (role) {
            case "GUEST":
                navigate("/info");
                break;

            case "USER":
                handleUserRole(accessToken);
                break;

            default:
                // 잘못된 role 처리
                console.error("올바르지 않은 role 값:", role);
                handleAuthFailure();
        }
    }, [navigate]);

    /**
     * OAuth 인증 실패 처리 함수
     */
    const handleAuthFailure = () => {
        alert("OAuth 인증에 실패했습니다. 다시 로그인 해주세요.");
        navigate("/login");
    };

    /**
     * USER 역할 처리 함수
     * - refresh token 요청 및 저장
     * - 메인 페이지로 이동
     */
    const handleUserRole = async (accessToken) => {
        try {
            // Refresh token 발급 API 호출
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/user/refreshCookie`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    credentials: "include", // 쿠키를 포함하여 요청
                }
            );

            if (response.ok) {
                console.log("Refresh token 발급 성공. 메인 페이지로 이동합니다.");
                navigate("/main");
            } else {
                console.error("Refresh token 발급 실패.");
                handleAuthFailure();
            }
        } catch (error) {
            console.error("Refresh token 요청 중 오류 발생:", error);
            handleAuthFailure();
        }
    };

    return <div>OAuth 인증 처리 중...</div>;
}

export default OAuthCallbackPage;
