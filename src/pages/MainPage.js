import React, { useEffect, useState } from 'react';

function MainPage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setMessage('환영합니다!');
        } else {
            setMessage('로그인 해주세요.');
        }
    }, []);

    const handleLoginClick = () => {
        window.location.href = '/login'; // 로그인 페이지로 이동
    };

    return (
        <div>
            <h1>메인 페이지</h1>
            <p>{message}</p>
            {!localStorage.getItem('token') && (
                <button onClick={handleLoginClick}>로그인</button>
            )}
        </div>
    );
}

export default MainPage;
