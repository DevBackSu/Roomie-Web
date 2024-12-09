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

// 이걸로 하면 두 번씩 실행되는 문제는 없어지는데 그러면 두 번 실행되는 부분을 찾을 수 없음 -> 오류는 아닌데 안전하지 않은 것들에 대한 경고를 받을 수 없음
// 두 번 실행된 결과값이 다르면 해당 코드에는 문제가 있다는 의미.
// 왜냐면 리엑트는 렌더링 단계와 커밋 단계로 동작하는데 두 결과값이 다르면,,
// 어차피 프로덕트 모드면 알아서 한 번만 실행된다고 하니 우선은 위의 걸로 사용하자.

// ReactDOM.createRoot(document.getElementById("root")).render(  
//   <App />
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
