// import Cookies from "js-cookie";
import cookie from 'react-cookies';

// 토큰 저장 유틸리티
export const saveTokens = (accessToken, refreshToken) => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
        cookie.save('refreshToken', refreshToken, {
            path : '/',
            expires : new Date(Date.now() + 14 * 86400000),
            secure : false,
            sameSite: None,
            httpOnly : true // js code로의 쿠키에 비정상적 접속을 막음
        });
    }
    console.log("auth access   " + accessToken)
    console.log("auth refresh  " + refreshToken)
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
export const getRefreshToken = () => cookie.load('refreshToken');
