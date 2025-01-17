import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

function MainPage() {
    const [statistics, setStatistics] = useState(null); // 통계 데이터를 저장할 상태
    const [rank, setRank] = useState(null); // rank 데이터를 저장할 상태
    const [local_rank, setLocalRank] = useState(null); // rank 데이터를 저장할 상태
    const [error, setError] = useState(null); // 오류 상태

    // 기본값 설정
    const defaultStatistics = { value1: 50, value2: 50 };
    const defaultRank = [
        "일찍 자요",
        "늦게 자요",
        "일찍 일어나요",
        "늦게 일어나요",
        "주말마다 집에 가요",
    ];
    const defaultLocalRank = [
        "서울",
        "제주",
        "부산",
        "아산",
        "대전"
    ]

    // API 호출 및 데이터 가져오기 함수
    const fetchData = async (url, setter) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            // INTERNAL_SERVER_ERROR 처리
            if (response.status === 500) {
                const errorData = await response.json();
                throw new Error(errorData.error || "서버에서 오류가 발생했습니다.");
            }

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setter(data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setter(null); // API 호출 실패 시 데이터를 null로 설정하여 기본값 표시
            setError(err.message || "데이터를 불러오는 데 실패했습니다."); // 오류 상태 설정
        }
    };

    // 초기화 함수
    const initializeData = () => {
        const accessToken = localStorage.getItem("accessToken"); // Access Token 확인

        if (!accessToken) {
            console.log("Access Token 없음. 기본값으로 설정.");
            setStatistics(defaultStatistics); // 기본값 설정
            setRank(defaultRank); // 기본값 설정
            setLocalRank(defaultLocalRank);
        } else {
            // Access Token이 있을 경우 API 호출
            fetchData(`${process.env.REACT_APP_API_URL}/api/main/statistics`, setStatistics);
            fetchData(`${process.env.REACT_APP_API_URL}/api/main/crank`, setRank);
            fetchData(`${process.env.REACT_APP_API_URL}/api/main/lrank`, setLocalRank);
        }
    };

    useEffect(() => {
        initializeData(); // 데이터 초기화 및 API 호출
    }, []);

    return (
        <div>
            <Header />
            <h1>Welcome to the Main Page</h1>
            <Link to="/login">Login</Link>
            <br />
            <button onClick={logout}>Logout</button>

            {/* 통계 데이터 표시 */}
            <div>
                <h2>Statistics</h2>
                {statistics ? (
                    <pre>{JSON.stringify(statistics, null, 2)}</pre> // 데이터를 보기 쉽게 JSON으로 표시
                ) : error ? (
                    <div style={{ color: "red" }}>{error}</div> // 오류 메시지 표시
                ) : (
                    <p>Loading statistics...</p>
                )}
            </div>

            {/* rank 데이터 표시 */}
            {/* <div>
                <h2>특성 순위</h2>
                {rank ? (
                    <ul>
                        {rank.map((item, index) => (
                            <li key={index}>{item}</li> // rank 목록 표시
                        ))}
                    </ul>
                ) : error ? (
                    <div style={{ color: "red" }}>{error}</div> // 오류 메시지 표시
                ) : (
                    <p>Loading rank...</p>
                )}
            </div> */}
            <div>
                <h2>지역 순위</h2>
                {rank ? (
                    <ul>
                        {local_rank.map((item, index) => (
                            <li key={index}>{item}</li> // rank 목록 표시
                        ))}
                    </ul>
                ) : error ? (
                    <div style={{ color: "red" }}>{error}</div> // 오류 메시지 표시
                ) : (
                    <p>Loading rank...</p>
                )}
            </div>
        </div>
    );
}

export default MainPage;
