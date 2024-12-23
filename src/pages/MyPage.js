import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPage() {
    const [userData, setUserData] = useState(null);  // 사용자 데이터를 저장할 상태
    const [loading, setLoading] = useState(true);    // 로딩 상태
    const [error, setError] = useState(null);        // 오류 상태
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                navigate("/login");  // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/mypage`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("데이터를 불러오는 데 실패했습니다.");
                }

                const data = await response.json();
                setUserData(data);  // API 응답 데이터 저장
            } catch (err) {
                setError(err.message);  // 오류 발생 시 상태 업데이트
            } finally {
                setLoading(false);  // 로딩 끝
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    if (!userData) {
        return <div>사용자 정보가 없습니다.</div>;
    }

    return (
        <div>
            <h1>MyPage</h1>
            <p>이름: {userData.nickname}</p>
            <p>이메일: {userData.email}</p>
            <p>성별: {userData.gender}</p>
            <p>생년월일: {userData.birthDate}</p>
            <p>학교: {userData.school}</p>
            <p>지역: {userData.local}</p>
            {/* 더 많은 사용자 정보를 여기에 추가 가능 */}
        </div>
    );
}

export default MyPage;
