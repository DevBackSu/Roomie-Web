import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/userCharacter.css";

function MyOtherUpdate() {
    const location = useLocation();
    const navigate = useNavigate();
    const { introduction } = location.state || { introduction: "" };
    
    const [characteristics, setCharacteristics] = useState([]);
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
    const [userIntroduction, setUserIntroduction] = useState(introduction);

    useEffect(() => {
        // API 호출하여 특성 목록 가져오기
        axios.get(`${process.env.REACT_APP_API_URL}/api/mypage/findCharacter`)
            .then(response => {
                setCharacteristics(response.data.result);
            })
            .catch(error => {
                console.error("특성 목록을 불러오는 중 오류 발생", error);
            });
    }, []);

    // 특성 선택/해제 핸들러
    const toggleCharacteristic = (characteristicId) => {
        if (selectedCharacteristics.includes(characteristicId)) {
            setSelectedCharacteristics(prev => prev.filter(id => id !== characteristicId));
        } else {
            if (selectedCharacteristics.length < 5) {
                setSelectedCharacteristics(prev => [...prev, characteristicId]);
            } else {
                alert("최대 5개의 특성만 선택할 수 있습니다.");
            }
        }
    };

    // 수정하기 API 호출
    const handleUpdate = () => {
        if (selectedCharacteristics.length < 1) {
            alert("최소 1개의 특성을 선택해주세요.");
            return;
        }

        const updateData = {
            features: selectedCharacteristics,
            self: userIntroduction,
        };

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert("로그인된 사용자가 아닙니다.");
            return;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/mypage/mypageUpdage`, updateData, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
            alert("수정이 완료되었습니다.");
            navigate("/mypage");
        })
        .catch(error => {
            console.error("수정 중 오류 발생", error);
            alert("오류가 발생했습니다.");
        });
    };

    return (
        <div>
            <Header />
            <div className="user-character-page">
                <div className="container">
                    <h1 className="title">추가 정보 수정</h1>
                    <p className="subtitle">특성과 자기소개를 수정하세요.</p>

                    {/* 특성 선택 */}
                    <div className="character-section">
                        <h2 className="section-title">특성 입력하기</h2>
                        <p className="section-subtitle">*최소 1개 ~ 최대 5개 선택 가능</p>
                        <div className="character-list">
                            {characteristics.map((char) => (
                                <label key={char.id} className="character-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedCharacteristics.includes(char.id)}
                                        onChange={() => toggleCharacteristic(char.id)}
                                        className="checkbox"
                                    />
                                    <span>{char.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 자기소개 입력 */}
                    <div className="introduction-section">
                        <h2 className="section-title">자기소개 입력하기</h2>
                        <textarea
                            className="introduction-textarea"
                            rows="5"
                            placeholder="자기소개를 입력해주세요."
                            value={userIntroduction}
                            onChange={(e) => setUserIntroduction(e.target.value)}
                        />
                    </div>

                    {/* 수정하기 버튼 */}
                    <button onClick={handleUpdate} className="submit-button">
                        수정하기
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyOtherUpdate;
