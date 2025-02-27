import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import "../css/header.css"; // 스타일

function Header() {
    const accessToken = localStorage.getItem("accessToken");  // access token 확인

    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="home-link">Home </Link>
                <Link to="/notice" className="notice-link">Notice </Link>
                <div className="auth-links">
                {!accessToken ? (  // access token이 없으면 로그인 링크만 표시
                    <Link to="/login" className="auth-link"> Login </Link>
                ) : (  // access token이 있으면 "MyPage"와 "Logout" 버튼을 표시
                    <div className="user_links">
                        <Link to="/mypage" className="auth-link"> MyPage </Link>  {/* access token이 있으면 MyPage 링크 표시 */}
                        <button onClick={logout} className="auth-link"> Logout </button>  {/* 로그아웃 버튼 */}
                    </div>
                )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
