import React, { useCallback, useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import { Doughnut } from 'react-chartjs-2';  // Chart.js에서 Doughnut 차트 사용
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';  // Chart.js 기능 임포트
import "../css/main.css";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);

function MainPage() {
    const [statistics, setStatistics] = useState(null); // 통계 데이터를 저장할 상태
    const [local_rank, setLocalRank] = useState(null); // rank 데이터를 저장할 상태
    const [error, setError] = useState(null); // 오류 상태

    // 기본값 설정
    const defaultLocalRank = useMemo(() => ["서울", "제주", "부산", "아산", "대전"], []);

    // API 호출 및 데이터 가져오기 함수
    const fetchData = async (url, setter) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 500) {
                const errorData = await response.json();
                throw new Error(errorData.error || "서버에서 오류가 발생했습니다.");
            }

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`Fetched data from ${url}:`, data); // 디버깅용 로그
            setter(data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setter(null); // API 호출 실패 시 데이터를 null로 설정하여 기본값 표시
            setError(err.message || "데이터를 불러오는 데 실패했습니다."); // 오류 상태 설정
        }
    };

    // 초기화 함수
    const initializeData = useCallback(() => {
        const accessToken = localStorage.getItem("accessToken"); // Access Token 확인

        if (!accessToken) {
            console.log("Access Token 없음. 기본값으로 설정.");
            setLocalRank(defaultLocalRank); // 기본값 설정
        } else {
            // Access Token이 있을 경우 API 호출
            fetchData(`${process.env.REACT_APP_API_URL}/api/main/statistics`, (data) => {
                if (data) {
                    setStatistics(data);
                }
            });

            fetchData(`${process.env.REACT_APP_API_URL}/api/main/lrank`, (data) => {
                if (data && data.rank) {
                    setLocalRank(data.rank);
                } else {
                    setLocalRank([]); // 빈 배열로 설정
                }
            });
        }
    }, [defaultLocalRank]);

    useEffect(() => {
        initializeData(); // 데이터 초기화 및 API 호출
    }, [initializeData]);

    // 원형 그래프 데이터를 위한 설정
    const chartData = statistics ? {
        labels: ['종달새형', '올빼미형'], // 라벨
        datasets: [
            {
                data: [
                    Number(statistics["1"]) === 0 ? null : Number(statistics["1"]), // value1이 0이면 해당 부분을 그리지 않음
                    Number(statistics["2"]) === 0 ? null : Number(statistics["2"]), // value2가 0이면 해당 부분을 그리지 않음
                ],
                backgroundColor: ['#A0D1F5', '#1F3A61'], // 각 구역 색상
                hoverBackgroundColor: ['#A0D1F5', '#1F3A61'],
            },
        ],
    } : {
        // Access token이 없거나 statistics가 null일 경우 기본값을 사용
        labels: ['종달새형', '올빼미형'],
        datasets: [
            {
                data: [50, 50], // 기본값 50:50
                backgroundColor: ['#A0D1F5', '#1F3A61'],
                hoverBackgroundColor: ['#A0D1F5', '#1F3A61'],
            },
        ],
    };

    return (
        <div>
            <Header />
            <div className="page-wrapper">
                <h1>Welcome to the Main Page</h1>
                <Link to="/login">Login</Link>
                <br />
                <button onClick={logout}>Logout</button>
                <br />
                <div className="main-content">
                    {/* 프로필 사진과 세부 내용 섹션 */}
                    <div className="profile-section">
                        <div className="profile-box">
                            <h2>프로필 사진</h2>
                            <div className="profile-image">
                                <img src="/img/ball.jpg" alt="기본 사진"/>
                            </div> {/* 여기에 실제 프로필 이미지를 추가 */}
                        </div>
                        <div className="details-box">
                            <h2>세부내용</h2>
                            <p>사용자 세부 내용...</p>
                        </div>
                    </div>

                    {/* 통계 데이터, 특성 순위, 지역 순위 섹션 */}
                    <div className="data-section">
                        <div className="data-box">
                            <h2>통계 데이터</h2>
                            <div className="chart-wrapper">
                                {chartData ? (
                                    <Doughnut data={chartData} /> // 원형 그래프 표시
                                ) : error ? (
                                    <div style={{ color: "red" }}>{error}</div>
                                ) : (
                                    <p>Loading statistics...</p>
                                )}
                            </div>
                        </div>

                        <div className="rank-box">
                            <h2>특성 Rank</h2>
                            <p>특성 Rank 데이터...</p>
                        </div>

                        <div className="local-rank-box">
                            <h2>Local Rank</h2>
                            {local_rank && local_rank.length > 0 ? (
                                <ul>
                                    {local_rank.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>순위를 측정할 데이터가 없습니다!</p>
                            )}
                        </div>
                    </div>

                    {/* 추천 친구와 랜덤 친구 섹션 */}
                    <div className="friend-section">
                        <div className="suggested-friends-box">
                            <h2>추천 친구</h2>
                            <p>추천 친구 목록...</p>
                        </div>

                        <div className="random-friends-box">
                            <h2>랜덤 친구</h2>
                            <p>랜덤 친구 목록...</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
