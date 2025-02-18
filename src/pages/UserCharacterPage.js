import React, { useState } from "react";
import "../css/userCharacter.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // useNavigate 추가
import Header from "../components/Header";
import Footer from "../components/Footer";

function UserCharacterPage() {
    // 네비게이션을 위한 useNavigate 훅
    const navigate = useNavigate();

    // 고정된 특성 값
    const characteristics = [
        { id: 1, name: "주말마다 집에 가요" },
        { id: 2, name: "밖에 잘 안 나가요" },
        { id: 3, name: "잠귀가 어두워요" },
        { id: 4, name: "잠귀가 밝아요" },
        { id: 5, name: "조용한게 좋아요" },
        { id: 6, name: "대화하고 싶어요" },
        { id: 7, name: "깨끗한게 좋아요" },
        { id: 8, name: "깨끗하지 않아도 상관 없어요" },
        { id: 9, name: "알람이 필수에요" },
        { id: 10, name: "방 안에서 먹어요" }
    ];

    // 상태 관리: 선택된 특성 ID와 자기소개
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
    const [introduction, setIntroduction] = useState("");
    // const [useDefaultIntroduction, setUseDefaultIntroduction] = useState(false);

    // 기본 자기소개 내용
    const defaultIntroduction = "만나서 반가워요!";

    // 특성 선택/해제 핸들러
    const toggleCharacteristic = (characteristicId) => {
        if (selectedCharacteristics.includes(characteristicId)) {
            // 이미 선택된 특성을 제거
            setSelectedCharacteristics((prev) =>
                prev.filter((id) => id !== characteristicId)
            );
        } else {
            // 특성을 선택, 최대 5개까지 선택 가능
            if (selectedCharacteristics.length < 5) {
                setSelectedCharacteristics((prev) => [...prev, characteristicId]);
            } else {
                alert("최대 5개의 특성만 선택할 수 있습니다.");
            }
        }
    };

    // 제출 핸들러
    const handleSubmit = () => {
        if (selectedCharacteristics.length < 1) {
            alert("최소 1개의 특성을 선택해주세요.");
            return;
        }

        // 자기소개에 기본 내용을 사용할지 여부에 따른 처리
        const finalIntroduction = introduction.trim() === "" ? defaultIntroduction : introduction;

        // 서버로 전송할 데이터
        const userOtherDTO = {
            features: selectedCharacteristics, // 선택한 특성들의 ID만 전송
            self: finalIntroduction, // 최종 자기소개
        };

        // 헤더에서 access token 가져오기 (예: localStorage에서 가져오기)
        const accessToken = localStorage.getItem("accessToken"); // 예시: localStorage에서 access token 가져옴

        if (!accessToken) {
            alert("로그인된 사용자가 아닙니다.");
            return;
        }

        // API 호출
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/user/infoOther`, userOtherDTO, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // 헤더에 access token 포함
                },
            })
            .then((response) => {
                console.log("데이터가 성공적으로 저장되었습니다.", response);
                alert("제출되었습니다!");

                // 제출 후 메인 페이지로 이동
                navigate("/");  // /로 리디렉션
            })
            .catch((error) => {
                console.error("제출 중 오류가 발생했습니다.", error);
                alert("오류가 발생했습니다.");
            });
    };

    return (
        <div>
            <Header />
            <div className="user-character-page">
                <div className="container">
                    <h1 className="title">가입까지 얼마 남지 않았습니다!</h1>
                    <p className="subtitle">
                        마지막으로 특성과 자기소개를 입력해주세요.
                    </p>

                    {/* 특성 선택 섹션 */}
                    <div className="character-section">
                        <h2 className="section-title">특성 입력하기</h2>
                        <p className="section-subtitle">
                            *최소 1개 ~ 최대 5개 선택 가능
                        </p>
                        <div className="character-list">
                            {characteristics.map((characteristic) => (
                                <label
                                    key={characteristic.id}
                                    className="character-item"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCharacteristics.includes(characteristic.id)}
                                        onChange={() =>
                                            toggleCharacteristic(characteristic.id)
                                        }
                                        className="checkbox"
                                    />
                                    <span>{characteristic.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 자기소개 입력 섹션 */}
                    <div className="introduction-section">
                        <h2 className="section-title">자기소개 입력하기</h2>
                        <p className="section-subtitle">
                            만약 위 특성 외에 공유하고 싶은 내용이 있다면 아래에 입력해주세요!
                        </p>

                        {/* 주의 사항: 자기소개를 입력하지 않으면 기본 내용이 자동으로 입력됨 */}
                        <p className="intro-warning">
                            * 자기소개를 입력하지 않으면 기본 내용인 "<strong>만나서 반가워요!</strong>"가 자동으로 입력됩니다.
                        </p>

                        {/* 자기소개 텍스트박스 */}
                        <textarea
                            className="introduction-textarea"
                            rows="5"
                            placeholder="자기소개를 입력해주세요."
                            value={introduction}
                            onChange={(e) => setIntroduction(e.target.value)}
                        />
                    </div>

                    {/* 제출 버튼 */}
                    <button onClick={handleSubmit} className="submit-button">
                        제출하기
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserCharacterPage;
