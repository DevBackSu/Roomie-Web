import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { saveTokens } from "../utils/auth";

function InfoPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        additionalInfo: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
            navigate("/login"); // 토큰 없으면 로그인 페이지로 리디렉션
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Info submitted successfully!");
                window.location.href = "/"; // 성공 후 메인 페이지로 리디렉트
            } else {
                alert("Failed to submit info.");
            }
        } catch (error) {
            console.error("Error submitting info:", error);
        }
    };

    return (
        <div>
            <h1>Info Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="additionalInfo"
                    placeholder="Additional Info"
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default InfoPage;
