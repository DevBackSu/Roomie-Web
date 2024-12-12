import Cookies from "js-cookie";

// 토큰 저장 유틸리티
export const saveTokens = (accessToken, refreshToken) => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
        Cookies.set("refreshToken", refreshToken, { 
            expires: 14, // 14일 유지
            secure: false, // HTTPS가 아닌 환경에서 false (개발용)
            sameSite: "None" // Cross-site 요청 방지
        });
    }
};

// 로그아웃 유틸리티
export const logout = () => {
    localStorage.removeItem("accessToken");
    Cookies.remove("refreshToken");
    alert("로그인을 다시 해주세요.");
    window.location.href = "/";
};

// 토큰 가져오기 유틸리티
export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");
