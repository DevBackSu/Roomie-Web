import React, { useState } from "react";
import "../css/footer.css"; // 스타일
import { useNavigate } from "react-router-dom"; // useNavigate 훅 사용

function Footer() {
    const navigate = useNavigate(); // useNavigate 훅 사용 (리다이렉션을 위해 사용)
    const [error, setError] = useState(""); // 오류 메시지를 저장할 상태

    // 회원 탈퇴 요청 함수
    const handleDeleteAccount = async () => {
        // 회원 탈퇴 확인
        const isConfirmed = window.confirm("정말 탈퇴하시겠습니까?");
        if (!isConfirmed) {
            return; // 확인을 누르지 않으면 탈퇴를 진행하지 않음
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // 인증 토큰을 헤더에 추가
                },
            });

            const data = await response.json(); // 반환된 데이터를 JSON 형식으로 파싱

            // 서버에서 반환된 결과 처리
            if (data.success) {
                // 탈퇴 성공 시 localStorage에서 accessToken 삭제
                localStorage.removeItem("accessToken");

                // 탈퇴 후 로그인 페이지로 리다이렉트
                navigate("/login");
                alert("회원 탈퇴가 완료되었습니다.");
            } else {
                // success가 false이고 message가 300인 경우: access token 오류 처리
                if (data.message === 300) {
                    setError("잘못된 토큰 정보입니다. 다시 로그인 후 시도하세요.");
                } else {
                    setError("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
                }
            }
        } catch (error) {
            console.error("회원 탈퇴 중 오류 발생:", error);
            setError("회원 탈퇴 처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <footer className="footer">
            <nav className="nav">
                <div className="left-section">
                    {/* 회원 탈퇴 버튼 클릭 시 confirm 다이얼로그 열기 */}
                    <button className="delete-account-btn" onClick={handleDeleteAccount}>
                        회원 탈퇴
                    </button>
                    {/* 오류 메시지 표시 */}
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className="right-section">
                    {/* 개발 일정 및 GitHub 링크 */}
                    <div className="dev-info">
                        <p>개발 : 2024.08 ~ 2025.01 (ing)</p>
                        <p>
                            <a
                                href="https://github.com/DevBackSu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-link"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                                    alt="GitHub logo"
                                    className="github-logo"
                                />
                                <span>GITHUB</span>
                            </a>
                        </p>
                    </div>
                </div>
            </nav>
        </footer>
    );
}

export default Footer;
