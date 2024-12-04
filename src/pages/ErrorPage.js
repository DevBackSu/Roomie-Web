import React from "react";
import { useNavigate } from "react-router-dom";
// import { saveTokens } from "../utils/auth";

function ErrorPage() {
    const navigator = useNavigate();

    const main = () => {
        navigator("/");
    }

    return (
        <div>
            <h1>Error Page</h1>
            <button onClick={main}>메인으로 이동</button>
        </div>
    );
}

export default ErrorPage;
