import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function InfoPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nickname: "",
        email: "",
        gender: "",
        mainAnimal: "",
        birthDate: "",
        school: "",
        local: "",
        imgUrl: "",
    });

    const checkRefreshTokenInCookies = () => {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            if (cookie.startsWith("refreshToken=")) {
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        if (checkRefreshTokenInCookies()) {
            console.log("refreshToken exists. Redirecting to /...");
            navigate("/"); // refreshToken이 있으면 메인 페이지로 이동
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // mainAnimal 값을 숫자로 변환
        if (name === "mainAnimal") {
            // "부엉이"는 2, "종달새"는 1
            setFormData((prev) => ({
                ...prev,
                [name]: value === "부엉이" ? 2 : value === "종달새" ? 1 : "",
            }));
        } else if (name === "imgUrl") {
            // imgUrl은 숫자로 변환 (이미지 선택 번호)
            setFormData((prev) => ({
                ...prev,
                [name]: value, // 1, 2, 3, 4, 5로 설정
            }));
        } else {
            // 나머지 값은 그대로 설정
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

const handleSubmit = async (e) => {
    e.preventDefault();  // 이벤트가 발동했을 때 페이지가 reload되는 현상을 막아줌

    const accessToken = localStorage.getItem("accessToken");

    if(!accessToken) {
        alert("로그인을 다시 해주세요.");
        window.location.href = "/";
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include", // 쿠키 포함
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const token = await response.json(); // 응답 JSON 파싱
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = token;

            if (newAccessToken && newRefreshToken) {
                saveTokens(newAccessToken, newRefreshToken); // saveTokens 함수 호출하여 토큰 저장
            }

            alert("정보가 저장되었습니다!");
            navigate("/"); // 성공적으로 저장되면 메인 페이지로 이동
        } else {
            // const {success: s, message: m} = token;
            // console.log(m);
            alert("정보 저장에 실패했습니다. 새로 고침 후 다시 시도해주세요.");
        }
    } catch (err) {
        console.error("Error submitting user info:", err);
        alert("서버와의 통신에 실패했습니다.");
    }
};

    return (
        <div>
            <h1>정보 입력</h1>
            <form onSubmit={handleSubmit}>
                {/* 이름 */}
                <div>
                    <label htmlFor="nickname">이름:</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                {/* 이메일 */}
                <div>
                    <label htmlFor="email">이메일:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* 성별 */}
                <div>
                    <label>성별:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="남"
                            checked={formData.gender === "남"}
                            onChange={handleChange}
                            required
                        />
                        남
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="여"
                            checked={formData.gender === "여"}
                            onChange={handleChange}
                            required
                        />
                        여
                    </label>
                </div>

                {/* 주요 동물 */}
                <div>
                    <label>주요 동물:</label>
                    <label>
                        <input
                            type="radio"
                            name="mainAnimal"
                            value="부엉이"
                            checked={formData.mainAnimal === 2}
                            onChange={handleChange}
                            required
                        />
                        부엉이
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="mainAnimal"
                            value="종달새"
                            checked={formData.mainAnimal === 1}
                            onChange={handleChange}
                            required
                        />
                        종달새
                    </label>
                </div>

                {/* 생년월일 */}
                <div>
                    <label htmlFor="birthDate">생년월일:</label>
                    <input
                        type="month"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* 학교 */}
                <div>
                    <label htmlFor="school">학교 (선택):</label>
                    <input
                        type="text"
                        id="school"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                    />
                </div>

                {/* 지역 */}
                <div>
                    <label htmlFor="local">지역 (선택):</label>
                    <input
                        type="text"
                        id="local"
                        name="local"
                        value={formData.local}
                        onChange={handleChange}
                    />
                </div>

                {/* 프로필 이미지 */}
                <div>
                    <label>프로필 이미지:</label>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <label key={num}>
                            <input
                                type="radio"
                                name="imgUrl"
                                value={num}
                                checked={formData.imgUrl === String(num)}
                                onChange={handleChange}
                            />
                            {num}
                        </label>
                    ))}
                </div>

                <button type="submit">저장</button>
            </form>
        </div>
    );
}

export default InfoPage;
