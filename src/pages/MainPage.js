import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

function MainPage() {
    const [statistics, setStatistics] = useState(null); // 통계 데이터를 저장할 상태
    const [error, setError] = useState(null); // 오류 상태

    useEffect(() => {
        const fetchStatistics = async () => {
            const accessToken = localStorage.getItem("accessToken"); // Access Token 확인

            if (!accessToken) {
                console.log("Access Token 없음. API 호출 건너뜀.");
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/main/statistics`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`, // Access Token 포함
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json(); // API 응답 데이터를 JSON으로 변환
                setStatistics(data); // 통계 데이터 상태 업데이트
            } catch (err) {
                console.error("Error fetching statistics:", err);
                setError("통계를 불러오는 데 실패했습니다."); // 오류 상태 설정
            }
        };

        fetchStatistics(); // 통계 데이터 가져오기 호출
    }, []);

    return (
        <div>
            <Header></Header>
            <h1>Welcome to the Main Page</h1>
            <Link to="/login">Login</Link>
            <br />
            <button onClick={logout}>Logout</button>

            {/* 통계 데이터 표시 */}
            {statistics ? (
                <div>
                    <h2>Statistics</h2>
                    <pre>{JSON.stringify(statistics, null, 2)}</pre> {/* 데이터를 보기 쉽게 JSON으로 표시 */}
                </div>
            ) : error ? (
                <div style={{ color: "red" }}>{error}</div>
            ) : (
                <p>Loading statistics...</p>
            )}
        </div>
    );
}

export default MainPage;
