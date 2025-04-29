import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";
import "../css/header.css"; // 스타일

function Header() {
    const accessToken = localStorage.getItem("accessToken");  // access token 확인

    return (
        <header className="header">
            <nav className="nav">
                {/* 왼쪽 메뉴 (Home, Post) */}
                <div className="nav-left">
                    <Link to="/" className="auth-link">Home</Link>
                    <Link to="/post" className="auth-link">Post</Link>
                </div>

                {/* 오른쪽 메뉴 (Login / MyPage, Logout) */}
                <div className="auth-links">
                    {!accessToken ? (
                        <div className="user-links-no">
                            <Link to="/login" className="auth-link">Login</Link>
                        </div>
                    ) : (
                        <div className="user-links">
                            <Link to="/mypage" className="auth-link">MyPage</Link>
                            <button onClick={logout} className="auth-link">Logout</button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
