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

    // role이 guest인지지 확인
    const checkRole = () => {
        const role = localStorage.getItem("role");
        if (role === "GUEST") {
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (checkRole()) {
            console.log("role이 USER입니다. /으로 이동합니다.");
            navigate("/");
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
        e.preventDefault();
    
        const accessToken = localStorage.getItem("accessToken");
    
        if (!accessToken) {
            console.log("info page access token 없음")
            alert("로그인을 다시 해주세요.");
            window.location.href = "/";
            return;
        }
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: "include", // 쿠키 포함 설정
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const token = await response.json();
                const { accessToken: newAccessToken } = token;
    
                saveTokens(newAccessToken); // accessToken 저장
                alert("정보가 저장되었습니다!");
                navigate("/"); // 성공적으로 저장되면 메인 페이지로 이동
            } else {
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
