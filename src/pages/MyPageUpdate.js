import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MypageUpdate() {
    const { state } = useLocation(); // state에서 userData를 받아옵니다.
    const navigate = useNavigate();

    const [formData, setFormData] = useState(state ? state.userData : null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!formData) {
            navigate("/mypage"); // userData가 없다면 mypage로 돌아가기
        }
    }, [formData, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mypage/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("정보 저장에 실패했습니다.");
            }

            alert("정보가 저장되었습니다.");
            navigate("/mypage"); // 저장 성공 시 mypage로 이동
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>저장 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    return (
        <div>
            <h1>정보 수정</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름:</label>
                    <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>이메일:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>성별:</label>
                    <input
                        type="radio"
                        name="gender"
                        value="남"
                        checked={formData.gender === "남"}
                        onChange={handleChange}
                    />
                    남
                    <input
                        type="radio"
                        name="gender"
                        value="여"
                        checked={formData.gender === "여"}
                        onChange={handleChange}
                    />
                    여
                </div>
                <div>
                    <label>주요 동물:</label>
                    <input
                        type="radio"
                        name="mainAnimal"
                        value="부엉이"
                        checked={formData.mainAnimal === 2}
                        onChange={handleChange}
                    />
                    부엉이
                    <input
                        type="radio"
                        name="mainAnimal"
                        value="종달새"
                        checked={formData.mainAnimal === 1}
                        onChange={handleChange}
                    />
                    종달새
                </div>
                <div>
                    <label>생년월일:</label>
                    <input
                        type="month"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>학교:</label>
                    <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>지역:</label>
                    <input
                        type="text"
                        name="local"
                        value={formData.local}
                        onChange={handleChange}
                    />
                </div>
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

export default MypageUpdate;
