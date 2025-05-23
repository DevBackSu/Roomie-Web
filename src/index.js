import React from 'react';  // react 라이브러리 기본값. JSX 문법 사용을 위해 필수
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 프로젝트 진입점

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( //App.js를 렌더링 -> 사용자 정의 태그가 모여있는 파일인 App.js가 호출되어 실행됨
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
