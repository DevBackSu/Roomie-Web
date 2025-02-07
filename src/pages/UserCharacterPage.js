import React, { useState } from "react";
import "../css/UserCharacterPage.css";

function UserCharacterPage() {
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
    const [introduction, setIntroduction] = useState("");

    const characteristics = [
        "특성 1",
        "특성 2",
        "특성 3",
        "특성 4",
        "특성 5",
        "특성 6",
        "특성 7",
    ];

    const toggleCharacteristic = (characteristic) => {
        if (selectedCharacteristics.includes(characteristic)) {
            setSelectedCharacteristics((prev) =>
                prev.filter((item) => item !== characteristic)
            );
        } else {
            if (selectedCharacteristics.length < 5) {
                setSelectedCharacteristics((prev) => [...prev, characteristic]);
            } else {
                alert("최대 5개의 특성만 선택할 수 있습니다.");
            }
        }
    };

    const handleSubmit = () => {
        if (selectedCharacteristics.length < 1) {
            alert("최소 1개의 특성을 선택해주세요.");
            return;
        }
        console.log("Selected Characteristics:", selectedCharacteristics);
        console.log("Introduction:", introduction);
        alert("제출되었습니다!");
        // 여기서 서버로 데이터를 전송하는 로직 추가 가능
    };

    return (
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
                            <label key={characteristic} className="character-item">
                                <input
                                    type="checkbox"
                                    checked={selectedCharacteristics.includes(characteristic)}
                                    onChange={() => toggleCharacteristic(characteristic)}
                                    className="checkbox"
                                />
                                <span>{characteristic}</span>
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
    );
}

export default UserCharacterPage;
