import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

function Header() {
    const accessToken = localStorage.getItem("accessToken");  // access token 확인

    return (
        <header>
            <nav>
                <Link to="/">Home </Link>
                {!accessToken ? (  // access token이 없으면 로그인 링크만 표시
                    <Link to="/login"> Login </Link>
                ) : (  // access token이 있으면 "MyPage"와 "Logout" 버튼을 표시
                    <>
                        <Link to="/mypage"> MyPage </Link>  {/* access token이 있으면 MyPage 링크 표시 */}
                        <button onClick={logout}> Logout </button>  {/* 로그아웃 버튼 */}
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
