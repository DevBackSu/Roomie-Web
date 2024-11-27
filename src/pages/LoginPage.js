import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

function LoginPage() {
    const [message, setMessage] = useState('');

    const handleLoginSuccess = async (response) => {
        const { tokenId } = response;

        try {
            const result = await axios.post('http://localhost:3001/api/auth/google', {
                tokenId,
            });

            // 로그인 성공 시 accessToken을 로컬 스토리지에 저장
            localStorage.setItem('token', result.data.accessToken);
            setMessage('환영합니다!');
            window.location.href = '/'; // 로그인 후 메인 페이지로 이동
        } catch (error) {
            setMessage('로그인 실패');
            console.error('Google 로그인 오류', error);
        }
    };

    const handleLoginFailure = (error) => {
        console.error('Google 로그인 오류', error);
        setMessage('로그인 실패');
    };

    return (
        <div>
            <h1>로그인 페이지</h1>
            <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"  // 실제 클라이언트 ID는 프론트엔드에서 필요하지 않음. 서버에서 처리
                buttonText="구글로 로그인"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy="single_host_origin"
            />
            {message && <p>{message}</p>}
        </div>
    );
}

export default LoginPage;
