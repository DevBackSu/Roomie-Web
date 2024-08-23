import React, { Component } from "react"; //class는 react에서 제공하는 component 클래스를 상속해서 만들 수 있음

class Subject extends Component{
    state = { //class로 선언되어 있기 때문에 state를 this로 접근 가능
        count : 0,
        title : this.props.title
    };

    onIncrese = () => {
        const newCount = this.state.count + 1;
        this.setState({count:newCount})
    }

    render() {
        return (
            <header>
                <h1>
                <a>
                    {this.state.title}
                </a>
                </h1>
                {this.props.sub} <button onClick={this.onIncrese}> {this.state.count} </button>
                <p>App.js에서 Subject 컴포넌트를 호출할 때 주는 값을 받아 props를 사용해 화면에 출력되는 값을 변경함</p>
            </header>
        );
    }
}

export default Subject;