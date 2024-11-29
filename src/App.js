import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import InfoPage from "./pages/InfoPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                {/* 메인 페이지와 로그인 페이지는 토큰 인증이 없어도 접근 가능 */}
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* 인증이 필요한 페이지는 ProtectedRoute로 보호 */}
                <Route
                    path="/info"
                    element={
                        <ProtectedRoute>
                            <InfoPage />
                        </ProtectedRoute>
                    }
                />

                {/* 잘못된 URL은 메인 페이지로 리다이렉트 */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
