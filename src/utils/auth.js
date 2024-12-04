// import { useState, useEffect } from 'react';
import Cookies from "js-cookie";

// export function useAuthCheck() {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [userRole, setUserRole] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem("accessToken");
//         const refreshToken = localStorage.getItem("refreshToken");

//         if (token) {
//             fetch(`${process.env.REACT_APP_API_URL}/auth/check`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     if (data.role) {
//                         setIsAuthenticated(true);
//                         setUserRole(data.role);
//                     } else {
//                         setIsAuthenticated(false);
//                     }
//                 });
//         }
//     }, []);

//     return { isAuthenticated, userRole };
// }

export const saveTokens = (accessToken, refreshToken) => {
    console.log("saveToken - accessToken : " + accessToken)
    console.log("saveToken - refreshToken : " + refreshToken)
    
    // 로컬 스토리지에 토큰 저장
    if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
    }

    // 쿠키에 토큰 저장
    if (refreshToken) {
        Cookies.set("refreshToken", refreshToken, { expires: 14, secure: false, sameSite: "Strict" });
        // expires :: 쿠키 유효 기간 / secure :: HTTPS에서만 쿠키 전송 / sameSite : "Strict" :: CSRF 공격 방지를 위해 사이트 간 요청에서 쿠키를 보내지 않도록 설정
    }
};

export function logout() {
    localStorage.clear();
    window.location.href = "/";
}
