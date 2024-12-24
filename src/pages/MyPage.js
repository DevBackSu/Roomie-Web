import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function MyPage() {
    const [userData, setUserData] = useState(null); // 사용자 데이터를 저장할 상태
    const [loading, setLoading] = useState(true);   // 로딩 상태
    const [error, setError] = useState(null);       // 오류 상태
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                navigate("/login"); // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
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
                    if (response.status === 404) {
                        throw new Error("존재하지 않는 사용자입니다.");
                    } else {
                        throw new Error("데이터를 불러오는 데 실패했습니다.");
                    }
                }

                const data = await response.json();
                setUserData(data.userData); // API 응답에서 userData를 저장
            } catch (err) {
                setError(err.message); // 오류 발생 시 상태 업데이트
            } finally {
                setLoading(false); // 로딩 끝
            }
        };

        fetchUserData();
    }, [navigate]);

    const formatBirthDate = (birthDate) => {
        if (!birthDate) return null;

        // 날짜를 연도와 월로 분리
        const [year, month] = birthDate.split("-");
        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

        // 결과 문자열 생성
        return `${year}년 ${monthNames[parseInt(month, 10) - 1]}`;
    };

    const handleEdit = async () => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, {
                method: "GET", // 또는 필요에 따라 "POST" 또는 다른 메서드
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("정보를 수정하는 데 실패했습니다.");
            }

            const data = await response.json();
            // 필요한 경우 데이터를 처리하거나 수정 페이지로 이동
            alert("수정 페이지로 이동합니다.");
            navigate("/user/edit", { state: { userData: data } });
        } catch (err) {
            alert(err.message);
        }
    };

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
            <Header />
            <h1>MyPage</h1>
            <p>이름: {userData.nickname}</p>
            <p>이메일: {userData.email}</p>
            <p>성별: {userData.gender}</p>
            <p>나이: {formatBirthDate(userData.birthDate)}</p>
            <p>학교: {userData.school}</p>
            <p>지역: {userData.local}</p>
            <p>소셜 타입: {userData.socialType}</p>
            <p>역할: {userData.role}</p>
            {userData.imgUrl && <img src={userData.imgUrl} alt="프로필" />}
            <button onClick={handleEdit} style={{ marginTop: "20px" }}>
                수정하기
            </button>
        </div>
    );
}

export default MyPage;
