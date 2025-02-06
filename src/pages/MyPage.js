import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MypageUpdate() {
    const [formData, setFormData] = useState(null); // 사용자 데이터 저장
    const [userRank, setUserRank] = useState([]); // 특성 Rank 저장
    const [userSelf, setUserSelf] = useState(""); // 자기소개 저장
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
                navigate("/login");
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mypage/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("사용자 데이터를 불러오는 데 실패했습니다.");
                }

                const data = await response.json();

                if (data.success) {
                    setFormData(data); // 사용자 데이터 저장
                    setUserRank(data.list); // 특성 Rank 저장
                    setUserSelf(data.self); // 자기소개 저장
                } else {
                    throw new Error(data.message || "사용자 정보를 가져오지 못했습니다.");
                }
            } catch (err) {
                setError(err.message || "오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mypage/mypageUpdage`, {
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
            navigate("/mypage");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    return (
        <div>
            <h1>마이페이지</h1>
            <form onSubmit={handleSubmit}>
                {formData && (
                    <>
                        <div>
                            <label>닉네임:</label>
                            <input
                                type="text"
                                name="nickname"
                                value={formData.nickname || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>이메일:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>자기소개:</label>
                            <textarea
                                name="self"
                                value={userSelf || ""}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>특성 Rank:</label>
                            <ul>
                                {userRank.map((rank, index) => (
                                    <li key={rank.id}>
                                        {index + 1}. {rank.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button type="submit">정보 수정</button>
                    </>
                )}
            </form>
        </div>
    );
}

export default MypageUpdate;
