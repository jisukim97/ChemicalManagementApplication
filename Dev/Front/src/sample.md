
# 기본

```JSX
import React, { Component } from 'react';

class Sample extends Component {

    state = {
        stateName : [1, 2, 3]
    }

    render() {
        return (
            <div>
                Hello world!
            </div>
        );
    }
}

export default Sample;
```

# 주석
```JSX
{/* */}
```

# 다른 컴포넌트 삽입
```JSX
import React, { Component } from 'react';
import AnotherComponent from './AnotherComponent.js';

class Sample extends Component {
    
    state = {
        stateName : [1 ,2 ,3];
    }

    render() {
        return (
            <div>
                <AnotherComponent propsName={this.state.stateName}>
            </div>
        )
    }
}
```

# props 이용하기
```JSX
import React, { Component } from 'react';

class AnotherComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.props.propsName[0]} 
            </div>
        )
    }
}
```

# state 변화시키기
```JSX
this.setState(
    {stateName : newState}
)
```

# 함수 작성
```JSX
functionName = (parameter1, parameter2) => {
    const var1 = 3; //선언
    return (parameter1 + parameter2);
}
```

# 함수 사용법
```JSX

onClick = () => {
    // some action
}

//여기서 Button은 이미 만들어진 컴포넌트

render() {
    <div>
        <Button onClick={this.onClick}> button </Button>
    </div>
}
```

# 표준 출력 
```JSX
console.log("Hello world!");
```

# ant.design
```JSX
import { Button } from 'antd';
```

# Usage
```JSX
import React, { Component } from 'react';
import { Button } from 'antd';

class Sample extends Component {

    onClick = () => {
        console.log("You clicked button");
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.onClick}>Primary</Button>
            </div>
        );
    }
}

export default Sample;
```

# Header, Footer와 함께 사용하기
```JSX
import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';

class Sample extends Component {

        render() {
            return (
                <div>
                    <Header/>
                        <Switch>
                            <Route path='/home/page1' exact component={Page1} />
                            <Route path='/home/page2' exact component={Page2} />
                        </Switch>
                    <Footer/>
                </div>
            );
        }
}

```

# 짜가 데이터로 페이지 만들기
```JSX
import React, { Component } from 'react';

class Sample extends Component {

    state = {
        userId : 30,
        labId : 3, 
        chemicalList : [1, 2, 3]
    }

    render() {
        return (
            <div>
                유저아이디 : {this.state.userID} <br/>
                랩아이디 : {this.state.labID} <br/>
            </div>
        );
    }
}
```

# 우리가 할 일
* 실습
* GUI 보면서 각각 페이지마다 컴포넌트 정하기 (재사용 될것 고려 해서)
* 담당 정하기