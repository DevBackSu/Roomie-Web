import React from "react";
import {Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import InfoPage from "./pages/InfoPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import MyPage from "./pages/MyPage"
import ErrorPage from "./error/ErrorPage";
import MyPageUpdate from "./pages/MyPageUpdate";
import UserCharacter from "./pages/UserCharacterPage";
import MyOtherUpdate from "./pages/MyOtherUpdate";
import NoticePage from "./pages/NoticePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 메인 페이지와 로그인 페이지는 토큰 인증이 없어도 접근 가능 */}
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/oauth/callback" element={<OAuthCallbackPage/>} />
                <Route path="/notice" element={<NoticePage />} />
                <Route path="/error" element={<ErrorPage />} />

                {/* 인증이 필요한 페이지는 ProtectedRoute로 보호 */}
                <Route
                    path="/info"
                    element={
                        <ProtectedRoute>
                            <InfoPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/userCharacter"
                    element={
                        <ProtectedRoute>
                            <UserCharacter />
                        </ProtectedRoute>
                    }
                />
                <Route path="/mypage" element = {
                    <ProtectedRoute>
                        <MyPage />
                    </ProtectedRoute>
                } />
                <Route path="/mypageUpdate" element = {
                    <ProtectedRoute>
                        <MyPageUpdate />
                    </ProtectedRoute>
                } />
                <Route path="/myotherUpdate" element = {
                    <ProtectedRoute>
                        <MyOtherUpdate />
                    </ProtectedRoute>
                } />

                {/* 잘못된 URL은 메인 페이지로 리다이렉트 */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;