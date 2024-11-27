import React, { useState } from "react";
import { signUp } from "../api/authAPI"; // 회원가입 API 함수
import { useNavigate } from "react-router-dom"; // useHistory -> useNavigate

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // useHistory -> useNavigate

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await signUp({ username, password });
            localStorage.setItem("accessToken", response.accessToken); // 회원가입 후 토큰 저장
            navigate("/"); // 회원가입 후 메인 페이지로 리다이렉트 (history.push -> navigate)
        } catch (error) {
            console.error("SignUp failed", error);
            alert("SignUp failed");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;
