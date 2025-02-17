import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/mypage.css";

function MyPage() {
    const [userData, setUserData] = useState(null); // 사용자 데이터를 저장할 상태
    const [userCharacter, setUserCharacter] = useState([]); // 특성 리스트 저장
    const [selfIntroduction, setSelfIntroduction] = useState(""); // 자기소개
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
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mypage/`, {
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

                setUserData(data.data); // 사용자 정보 저장
                setUserCharacter(data.list); // 특성 리스트 저장
                setSelfIntroduction(data.self); // 자기소개 저장
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

        const [year, month] = birthDate.split("-");
        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

        return `${year}년 ${monthNames[parseInt(month, 10) - 1]}`;
    };

    // 동물의 이름을 mainAnimal 값에 따라 결정
    const getAnimalName = (mainAnimal) => {
        switch (mainAnimal) {
            case 1:
                return "종달새";
            case 2:
                return "올빼미";
            default:
                return "알 수 없음";
        }
    };

    // 프로필 이미지 URL을 번호에 맞게 설정
    const getProfileImage = (imageNumber) => {
        const imageNames = {
            1: "book.png",
            2: "laptop.png",
            3: "bed.png",
            4: "wardrobe.png",
            5: "cleaner.png",
        };

        return `/img/${imageNames[imageNumber] || "default.png"}`; // 기본값 설정
    };

    // 왼쪽 박스 수정 클릭 시
    const handleLeftEditClick = () => {
        navigate("/mypageUpdate", { state: { userData } }); // userData를 state로 전달
    };

    // 오른쪽 박스 수정 클릭 시
    const handleRightEditClick = () => {
        navigate("/myotherUpdate", { state: { userCharacter, selfIntroduction } }); // userCharacter와 selfIntroduction을 state로 전달
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <p>잠시 후 다시 시도해주세요.</p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="no-user-data">
                <p>사용자 정보를 불러오는 데 실패했습니다.</p>
                <p>잠시 후 다시 시도하거나 관리자에게 문의해 주세요.</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="mypage-container">
                <h1 className="mypage-title">MyPage</h1>
                <div className="mypage-content">
                    {/* 왼쪽 박스: 사용자 정보 */}
                    <div className="mypage-info">
                        <img
                            src={getProfileImage(userData.imgUrl)}
                            alt="프로필"
                            className="mypage-img"
                        />
                        <p><strong>이름:</strong> {userData.nickname}</p>
                        <p><strong>이메일:</strong> {userData.email}</p>
                        <p><strong>성별:</strong> {userData.gender}</p>
                        <p><strong>나이:</strong> {formatBirthDate(userData.birthDate)}</p>
                        <p><strong>동물:</strong> {getAnimalName(userData.mainAnimal)}</p>
                        <p><strong>학교:</strong> {userData.school}</p>
                        <p><strong>지역:</strong> {userData.local}</p>
                        <p><strong>소셜 타입:</strong> {userData.socialType}</p>
                        <p><strong>역할:</strong> {userData.role}</p>
                        <button onClick={handleLeftEditClick} className="mypage-button">내 정보 수정하기</button>
                    </div>

                    {/* 오른쪽 박스: 특성 및 자기소개 */}
                    <div className="mypage-extra">
                        <div className="mypage-characteristics">
                            <h3>특성</h3>
                            {userCharacter.length > 0 ? (
                                <ul>
                                    {userCharacter.map((char, index) => (
                                        <li key={index}>{char}</li> // key는 유니크한 값으로 설정
                                    ))}
                                </ul>
                            ) : (
                                <p>등록된 특성이 없습니다.</p>
                            )}
                        </div>
                        <div className="mypage-introduction">
                            <h3>자기소개</h3>
                            <p>{selfIntroduction || "자기소개가 등록되지 않았습니다."}</p>
                        </div>
                        <button onClick={handleRightEditClick} className="mypage-button">추가 정보 수정하기</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyPage;
