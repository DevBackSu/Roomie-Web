import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const accessToken = localStorage.getItem("accessToken");

    // AccessToken이 없으면 로그인 페이지로 리다이렉트
    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    // AccessToken이 있으면 요청 가능
    return children;
};

export default ProtectedRoute;
