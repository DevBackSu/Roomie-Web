import Cookies from "js-cookie";

export const saveTokens = (accessToken, refreshToken) => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) Cookies.set("refreshToken", refreshToken, { expires: 14, secure: false, sameSite: "Strict" });
};

export const logout = () => {
    localStorage.clear();
    Cookies.remove("refreshToken");
    window.alert("로그인을 다시 해주세요");
    window.location.href = "/";
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");
