import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function OAuthCallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOAuthLogin = () => {
            try {
                const queryString = window.location.search;
                console.log("Window Location:", window.location.href);
                console.log("Raw Query String:", queryString);

                const urlParams = new URLSearchParams(queryString);
                const accessToken = urlParams.get("accessToken");
                const refreshToken = urlParams.get("refreshToken");

                console.log("Parsed accessToken:", accessToken);
                console.log("Parsed refreshToken:", refreshToken);

                if (accessToken) {
                    saveTokens(accessToken, refreshToken);
                    console.log("Tokens saved successfully");

                    if (!refreshToken) {
                        console.log("Refresh token not provided, navigating to InfoPage");
                        navigate(`/info?accessToken=${accessToken}`, { replace: true });
                    } else {
                        console.log("Navigating to MainPage");
                        navigate("/", { replace: true });
                    }
                } else {
                    console.error("Failed to log in. No access token found.");
                    navigate("/error", { replace: true });
                }
            } catch (error) {
                console.error("Error during OAuth login:", error);
                navigate("/error", { replace: true });
            }
        };

        handleOAuthLogin();
    }, [navigate]);

    return <div>Processing your login...</div>;
}

export default OAuthCallbackPage;
