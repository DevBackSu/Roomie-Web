import Cookies from "js-cookie";

export const saveTokens = (accessToken, refreshToken) => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) Cookies.set("refreshToken", refreshToken, { expires: 14, secure: false, sameSite: "Strict" });
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    document.cookie = "refreshToken=; Max-Age=0"; // Refresh Token 삭제
    window.location.href = "/";
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");
