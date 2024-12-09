import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
    const token = getAccessToken();
    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
