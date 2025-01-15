// import Cookies from "js-cookie";
import cookie from 'react-cookies';

// 토큰 저장 유틸리티
export const saveTokens = (accessToken, role) => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (role) localStorage.setItem("role", role);
    
    console.log("auth access   " + accessToken)
    console.log("auth role  " + role)
};

// 로그아웃 유틸리티
export const logout = () => {
    const at = getAccessToken();
    if(at) {
        const isLogout = window.confirm("로그아웃을 하시겠습니까?");

        if(isLogout) {
            localStorage.removeItem("accessToken");
            cookie.remove("refreshToken", {path : '/'});
            alert("로그인을 다시 해주세요.");
            window.location.href = "/";
        }
        else {
            return;
        }
    }
    else {
        alert("로그인이 되어 있지 않습니다.")
    }
};

// 토큰 가져오기 유틸리티
export const getAccessToken = () => localStorage.getItem("accessToken");
