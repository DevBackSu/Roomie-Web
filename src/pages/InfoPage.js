import React, { useState } from "react";
import { getAccessToken, logout } from "../utils/auth";

const InfoPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getAccessToken();
            const response = await fetch(`${process.env.REACT_APP_API_URL}/userinfo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            
            if (response.status === 401) {
                // Unauthorized -> 로그아웃 처리
                logout();
            } else if (response.ok) {
                alert("회원가입이 완료되었습니다.");
                window.location.href = "/main";
            } else {
                throw new Error("Failed to submit user info");
            }
        } catch (error) {
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>이메일</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>전화번호</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <button type="submit">가입 완료</button>
            </form>
        </div>
    );
};

export default InfoPage;
