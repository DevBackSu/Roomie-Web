/* eslint-disable */
import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import {TestComponent, IsTypeComponent} from "./reactTest/testComponent"
import axios from "axios";
import logo from "./logo.svg";

function App() {
  const [data, setData] = useState("");
  let [content, text] = useState(['0번째', '1번째', '2번째']);
  let [heart, changeHeart] = useState(0); //초기값 = 0
  const [food, setFood] = useState(['감자탕', '햄버거', '삼겹살', '미역국', '카레', '자바칩 프라푸치노', '달걀장조림']);
  const [currentIndex, setCurrentIndex] = useState(0);

  const increase = function(){
    if(currentIndex < food.length - 1){
      setCurrentIndex(currentIndex + 1);
    }
    else {
      alert('마지막 음식입니다.');
    }
  }

  const decrease = function(){
    if(currentIndex > 0){
      setCurrentIndex(currentIndex - 1);
    }
    else {
      alert('첫 음식입니다.');
    }
  }

  useEffect(() => {
    axios
      .get("/api/data")
      .then((res) => setData(res.data)) //호출로 반환받은 값인 data를 setData로 setting
      .catch((err) => console.log(err));
  }, []);

  function titleChange(){
    text(['변경된 0번째', '변경된 1번째', '변경된 2번째']);
  }

  function titleChangeOne(){
    var newList = [...content];
    newList[1] = '하나만 변경한 제목';
    text(newList);
  }

  function tileSort(){
    let newSort = [...content];
    newSort.sort();
    text(newSort);
  }

  return (
    <div className = "App">
      <div className="black-nav">
        <div>여기는 일단 헤더임</div>
      </div>
      <div>data : {data}</div>
      <div className="list">
        <h4>{content[0]} <span onClick={()=>{changeHeart(heart+1)}}>❤</span> {heart} </h4>
        <p>작성자 : holly</p>
        <hr/>
        <h4 onClick={titleChangeOne}>{content[1]}</h4>
        <p>작성자 : molly</p>
        <hr/>
        <h4>{content[2]}</h4>
        <p>작성자 : wow</p>
        <hr/>
        <button onClick={titleChange}>다른 제목으로 변경</button>
        <button onClick={tileSort}>정렬하기</button>
      </div>

      <hr/>
      <h3>props 예시</h3>
      <TestComponent propValue="test Props">안녕 프롭스</TestComponent>
      <hr/>

      <hr/>
      <h3>props 예시 2</h3>
      <IsTypeComponent name = "호호호" age={"dkssud"} isChecked={false}>안녕 프롭스</IsTypeComponent>
      <hr/>

      <button onClick={decrease}>이전 음식</button>
      <div>
        {food[currentIndex]}
      </div>
      <button onClick={increase}>다음 음식</button>
      <p>음식 리스트 : {food}</p>

      <CheckComponent></CheckComponent>

      <img style = {{weight : '100px', height : '100px'}} src={logo}/>
      <p>제목 = 총 {content.length} 개</p>
      <p>음식 = 총 {food.length} 개</p>
      <p>최초 작성일 : 20240507</p>
    </div>
  );
}

function CheckComponent(){ //JSX 문법에 의해 첫 문자가 대문자가 아니면 컴포넌트를 읽지 못함 -> 왜 못 읽나 했다..
  return (
    <div className="check">
      <h2>컴포넌트 사용해보기!</h2>
      <p>날짜</p>
      <p>본문</p>
    </div>
  );
}

export default App;