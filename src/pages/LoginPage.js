import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../css/login.css';

function LoginPage() {

    const handleGLogin = () => {
        // Google OAuth2 로그인 요청
        window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
    };

    return (
        <div>
            <Header />
                <div className="login-container">
                    <h1 className="login-title">로그인</h1>
                    <div className="login-icons">
                        <img 
                            src="/img/google.png" 
                            alt="Google Login" 
                            className="login-icon" 
                            onClick={handleGLogin} 
                        />
                    </div>
                </div>
            <Footer />
        </div>
    );
}

export default LoginPage;
