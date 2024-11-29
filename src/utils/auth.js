import React, { useState, useEffect } from 'react';

export function useAuthCheck() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (token) {
            fetch(`${process.env.REACT_APP_API_URL}/auth/check`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.role) {
                        setIsAuthenticated(true);
                        setUserRole(data.role);
                    } else {
                        setIsAuthenticated(false);
                    }
                });
        }
    }, []);

    return { isAuthenticated, userRole };
}

export function saveTokens(accessToken, refreshToken) {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
}

export function logout() {
    localStorage.clear();
    window.location.href = "/";
}
