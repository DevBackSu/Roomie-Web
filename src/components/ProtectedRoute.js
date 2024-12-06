import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("ProtectedRoute: AccessToken:", accessToken);

    if (!accessToken) {
        console.log("No AccessToken found, redirecting to login...");
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
