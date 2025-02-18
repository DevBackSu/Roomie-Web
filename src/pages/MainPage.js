import React, { useCallback, useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../css/main.css";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);

function MainPage() {
    const [statistics, setStatistics] = useState(null); // 통계 데이터를 저장할 상태
    const [localRank, setLocalRank] = useState(null); // 지역 순위를 저장할 상태
    const [characterRank, setCharacterRank] = useState(null); // 특성 순위를 저장할 상태
    const [error, setError] = useState(null); // 오류 상태
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken")); // 로그인 여부 확인

    const defaultLocalRank = useMemo(() => ["서울", "제주", "부산", "아산", "대전"], []);
    const defaultCharacterRank = useMemo(() => ["잠귀가 밝아요", "방 안에서 먹어요", "알람이 필수에요", "아침부터 움직여요", "잘 안 나가요"], []);

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
            console.log(`Fetched data from ${url}:`, data);
            setter(data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setter(null); // API 호출 실패 시 데이터를 null로 설정하여 기본값 표시
            setError(err.message || "데이터를 불러오는 데 실패했습니다.");
        }
    };

    // 데이터 로딩 및 캐시 체크
    const initializeData = useCallback(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            console.log("Access Token 없음. 기본값으로 설정.");
            setLocalRank(defaultLocalRank); // 기본값 설정
            setCharacterRank(defaultCharacterRank); // 기본값 설정
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
            // API 호출
            fetchData(`${process.env.REACT_APP_API_URL}/api/main/statistics`, (data) => {
                if (data) {
                    setStatistics(data);
                    localStorage.setItem("statistics", JSON.stringify(data)); // 로컬스토리지에 데이터 저장
                }
            });

            fetchData(`${process.env.REACT_APP_API_URL}/api/main/lrank`, (data) => {
                if (data && data.rank) {
                    setLocalRank(data.rank);
                    localStorage.setItem("localRank", JSON.stringify(data.rank)); // 로컬스토리지에 데이터 저장
                } else {
                    setLocalRank([]);
                }
            });

            fetchData(`${process.env.REACT_APP_API_URL}/api/main/crank`, (data) => {
                console.log("통계 데이터");
                if (data && data.characterRank) {
                    setCharacterRank(data.characterRank);
                    localStorage.setItem("characterRank", JSON.stringify(data.characterRank)); // 로컬스토리지에 데이터 저장
                } else {
                    setCharacterRank([]);
                }
            });
        }
    }, [defaultLocalRank, defaultCharacterRank]);

    // 매일 자정에 API 호출
    const scheduleDailyFetch = useCallback(() => {
        const now = new Date();
        const nextMidnight = new Date(now);
        nextMidnight.setHours(24, 0, 0, 0); // 자정 시간 설정

        const timeUntilMidnight = nextMidnight - now; // 자정까지 남은 시간

        // 자정에 맞춰 API 호출 설정
        setTimeout(() => {
            initializeData(); // 자정에 데이터 초기화 함수 호출
            scheduleDailyFetch(); // 자정을 지나면 다시 호출을 예약
        }, timeUntilMidnight);
    }, [initializeData]);

    useEffect(() => {
        initializeData(); // 페이지 로드시 데이터 초기화 및 API 호출
        scheduleDailyFetch(); // 매일 자정에 API 호출 예약
    }, [initializeData, scheduleDailyFetch]);

    // 원형 그래프 데이터를 위한 설정
    const chartData = statistics ? {
        labels: ['종달새형', '올빼미형'],
        datasets: [
            {
                data: [
                    Number(statistics["1"]) === 0 ? null : Number(statistics["1"]),
                    Number(statistics["2"]) === 0 ? null : Number(statistics["2"]),
                ],
                backgroundColor: ['#A0D1F5', '#1F3A61'],
                hoverBackgroundColor: ['#A0D1F5', '#1F3A61'],
            },
        ],
    } : {
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
                {isLoggedIn ? (
                        <div className="profile-section">
                            <div className="profile-image">
                                <img src="/img/ball.jpg" alt="기본 사진"/>
                            </div>
                            <div className="details-box">
                                <h2>세부내용</h2>
                                <p>사용자 세부 내용...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="notLogin-section">
                            <img src="/img/logo.png" alt="사이트 로고" className="logo-image"/>
                            <p>해당 사이트는 사용자 맞춤 분석 및 추천 기능을 제공합니다.</p>
                        </div>
                    )}

                    <div className="data-section">
                        <div className="data-box">
                            <h2>통계 데이터</h2>
                            <div className="chart-wrapper">
                                {chartData ? (
                                    <Doughnut data={chartData} />
                                ) : error ? (
                                    <div style={{ color: "red" }}>{error}</div>
                                ) : (
                                    <p>Loading statistics...</p>
                                )}
                            </div>
                        </div>

                        <div className="rank-box">
                            <h2>특성 Rank</h2>
                            {characterRank && characterRank.length > 0 ? (
                                <ul>
                                    {characterRank.map((item, index) => (
                                        <li key={index}>{index + 1}. {item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>특성 순위를 측정할 데이터가 없습니다!</p>
                            )}
                        </div>

                        <div className="local-rank-box">
                            <h2>Local Rank</h2>
                            {localRank && localRank.length > 0 ? (
                                <ul>
                                    {localRank.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>순위를 측정할 데이터가 없습니다!</p>
                            )}
                        </div>
                    </div>

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
