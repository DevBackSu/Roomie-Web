/* eslint-disable */
import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";

function App() {
  const [data, setData] = useState("");
  let [content, text] = useState(['0번째', '1번째', '2번째']);
  let [heart, changeHeart] = useState(0); //초기값 = 0
  useEffect(() => {
    axios
      .get("/api/data")
      .then((res) => setData(res.data)) //호출로 반환받은 값인 data를 setData로 setting
      .catch((err) => console.log(err));
  }, []);

  const contentClick = () => {
    setContentPlus(prevIndex => prevIndex + 1);
  }

  function titleChange(){
    text(['변경된 0번째', '변경된 1번째', '변경된 2번째']);
  }

  function titleChangeOne(){
    var newList = [...content];
    newList[1] = '하나만 변경한 제목';
    text(newList);
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
        <button onClick={titleChange}>Button</button>
      </div>

      <CheckComponent></CheckComponent>

      <img style = {{weight : '100px', height : '100px'}} src={logo}/><p>총 </p>
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