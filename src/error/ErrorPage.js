import React from "react";
import { useNavigate } from "react-router-dom";
// import { saveTokens } from "../utils/auth";
import '../css/error.css';

function ErrorPage() {
    const navigator = useNavigate();

    const main = () => {
        navigator("/");
    }

    return (
        <div className="error-page">
            <div className="error-content">
                <h1>오류가 발생했습니다!</h1>
                <p>메인으로 이동해서 다시 시도해보는 걸 추천해요!</p>
                <button onClick={main}>메인 화면으로 돌아가기</button>
            </div>
        </div>
    );
}

export default ErrorPage;
