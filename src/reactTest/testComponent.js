import React from "react";
import PropType from "prop-types";

function TestComponent(props){
    if(props.propValue === "test Props"){
        return (
            <div>{props.children}가 나온 이유는 test Props를 받았기 때문임</div>
        );
    }
    else {
        return (
            <div>
                test Props를 받지 않으면 실행됨
                {props.propValue}이 app에서 준 값이고 {props.children}는 상위 컴포넌트에서 여기 호출하는 태그 사이에 있는 값
                <p>props도 첫글자는 대문자여야 한다.</p>
            </div>
        );
    }
}

TestComponent.prototype = { //TestComponent가 받는 매개변수의 타입을 지정
    propValue : PropType.string,
    children : PropType.string
}

function IsTypeComponent(testProp){
    return(
        <div>
            {testProp.name}, {testProp.age}, {testProp.isChecked ? "true":"false"}
            <p>age는 숫자 아니면 문자 가능</p>
        </div>
    );
}

IsTypeComponent.prototype = {
    name : PropType.string,
    age : PropType.oneOf(['string', 'number']),
    isChecked : PropType.bool
}

export {TestComponent, IsTypeComponent};