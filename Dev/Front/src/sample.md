
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
주석 남발 환영
//html처럼 생긴거 밖에서는 이렇게 사용
{/* html처럼 생긴거 안에서는 이렇게 사용*/}
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

# 페이지 이동(단순 이동)
```JSX
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Sample extends Component {

    render() {
        return (
            <div>
                <Link to='/new/url'>Click!</Link>
            </div>
        );
    }
}

```

# 페이지 이동(행동 후 이동)
```JSX
import React, { Component } from 'react';
import { history } from '../History';
import { Router } from "react-router-dom";
import { Button } from 'antd';

class Sample extends Component {

    onClick = () => {
        history.push('new/url');
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <Button onClick={this.onClick}/>
                </Router>
            </div>
        );
    }
}
```

# 컴포넌트 여러개 반복시키기 
```JSX
state = {
    array : [1, 2, 3]
}

render() {
    return (
        <div>
            {this.state.array.map(
                element => (<span>element = {element}</span>)
            )}
        <div>
    )
}

```

----
----

# 백엔드와 통신
* 프론트엔드 --(요청)--> 백엔드 
* 프론트엔드 <--(응답)-- 백엔드
* 이렇게 통신을 해야 한다 
* 그렇다면 어떻게 요청? REST

# REST
* URI(자원) + http method(행위)
* URI는 그냥 http://asfesf.wqrkwjrkj.com 뒤에 붙는 거라고 생각하면 됨. 예를들면 /user/1 (아이디가 1인 유저의 정보를 가져와라 라는 의미라고 약속한 경우)
* method는 GET(조회) / POST(업로드) / DELETE(삭제) / PUT(수정) 중에 골라서 약속하면 됨 (의미를 위해 쓰는거)
* 따라서, 프론트엔드와 백엔드는 uri와 method를 서로 약속한뒤에 정보를 주고받으면 된다.

# fetch
* react에서 fetch를 이용해 요청 가능 
```JSX
fetch('uri', { // uri 넣어주기
    method: 'HTTPmethod', //'GET', 'POST', 'DELETE' 등등
    headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
    body: JSON.stringify('body로 담을 정보') //여기에다가 body 넣어주기
}).then(response => {
    if( response.status === 200){
        //이건 정상적으로 된 경우
            return response.json()
    } else {
        //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
    }
}).then(response => {
    //여기서 response로 온 값들을 state로 저장 하던가 해서 쓰면 됨
    //여기서 response라는걸 제대로 쓸 수 있음
    console.log(response) // 이걸로 개발자모드에서 어떠한 응답이 왔는지 확인 가능
    //예를들면
    this.setStatus({
        alarmList : response
    }) 
    //이렇게 응답받은 실제 결과를 status로 저장해 줄 수 있음
})
```

# 양식
* uri : {}로 쌓여 있는 곳에는 실제 변수를 넣어줘야 함
* HTTP method
* body : { key : value } 형식으로 보내줘야 함
* response : 응답 : { key : value } 형식으로 응답이 옴

----
----

# 회원가입 / 로그인
## 로그인
* /login
* POST
* {
    "email" : 이메일주소,
    "password" : 비밀번호
}
* {
    "user" : 유저 정보,
    "lab" : lab 정보 
}
## 회원가입
* /regist
* POST
* {
    "email" : 이메일 주소,
    "password" : 비밀번호,
    "name" : 이름
} 
## 로그인 유저 정보 불러오기
```JSX
import { getUser, getLab } from '../authentication';

//~중략
//아래에서
getUser().id -> 유저아이디
getLab().id -> 랩아이디

```

----
----

# my Lab 멤버 구성 유스케이스
## Lab 생성
* /lab/{userId}
* POST
* {
    "name" : 랩이름,
    "password" : 비밀번호
}
* {
    "lab" : lab 정보
}
## 초대할 멤버 검색 
* /member/{email}
* GET
* {
    "email" : 찾을 유저 이메일
}
* {
    "member" : 찾은 멤버 정보
}
## 멤버 초대 
* /lab/{labId}/{userId}
* PUT
* 없음
* 없음
## Lab 탈퇴
* /lab/{labId}/{userId}
* DELETE
* 없음
* 없음
## 이미 만들어진 lab에 직접 가입
* /lab/{labId}/{userId}
* POST
* {
    "password" : 암호
}
* 없음
## 랩 정보 가져오기(랩이름, 회원들 목록 포함)
* /lab/{labId}
* GET
* 없음
* {
    "lab" : 랩 정보
}

----
----


# my Lab 사용 기기 관리 유스케이스
## 기기 추가 
* /apparatus/{labId}
* POST
* {
    "name" : 기기이름
}
* {
    "apparatus" : 저장된 기기 정보
}
## 기기 삭제
* /apparatus/{labId}/{apparatusId}
* DELETE
* 없음
* 없음 
## 해당 날짜의 예약 리스트 받아오기
* /schedule/{apparatusId}/{date}  <-여기서 date는 YYMMDD 6칸짜리로
* GET
* 없음
* {
    "schedules" : [예약한것들 리스트]
}
## 기기 예약
* /schedule/{userId}/{apparatusId}/{date}/{startTime}/{endTime} (YYMMDD, HHMM, HHMM 형식으로)
* POST
* 없음
* {
    "schedules" : [해당 날짜의 예약 정보 리스트]
}
## 예약 취소 
* /schedule/{apparatusId}/{scheduleId}
* DELETE
* 없음
* 없음
## 기기 리스트 받아오기
* /apparatus/{userId}
* GET
* 없음
* {
    "apparatuses" : [기기들 정보 리스트]
}

----
----


# 알람 유스케이스
* 알람타입 1:유효기간, 2:재고소진, 3:질병
## 알람 받아오기
* /alarm/{userId}
* GET
* 없음
* {
    "alarms" : [{"alarmType" : 타입, "stock" : stock정보} 들의 리스트]
}
## 알람 삭제
* /alarm/{userId}/{alarmType}/{stockId}
* DELETE
* 없음
* 없음

----
----

# 약품 추가 및 사용량 수정 유스케이스 
## 화학약품 msds 불러오기
* /chemical/info/{userId}
* POST
* {
    "name" : 화학약품 이름
}
* {
    "chemical" : msds 정보
}
## 해당 유저가 속한 랩의 모든 화학약품중에 지금 닉네임과 겹치는게 있는지?
* /chemical/nickname/{userId}
* POST
* {
    "nickname" : 닉네임
}
* 없음
## 화학약품이 저장되기 좋은 장소 불러오기
* /chemical/{userId}/{chemicalId}
* GET
* 없음
* {
    "suggest" : [추천될 inventory 리스트],
    "notSuggest" : [추천안된 inventory 리스트]
}
## 선택한 장소에 화학약품을 넣어도 되는지?
* /chemical/{userId}/{chemicalId}/{inventoryId}
* GET
* 없음
* {
    "crash" : true / false (만약 같이 있으면 안되는게 존재할 경우),
    "crashWith" : stock정보 (crash가 true일 때 그 충돌을 발생시킨 원인 약품)
}
## 화학약품 보관장소 추가 (inventory)
* /inventory/{userId}
* POST
* {
    "name" : 보관장소 이름,
    "temperate" : 실수,
    "humidity" : -1(낮음) / 0(보통) / 1(높음),
    "illuminance" : boolean,
    "oximeter" : boolean,
    "explosion" : boolean
}
* {
    "inventories" : [해당 유저의 lab에 저장 된 보관장소 inventory들의 정보 리스트]
}
## 화학약품을 보관장소에 보관(확정)
* /chemical/{userId}/{chemicalId}/{inventoryId}/{put}/{expire} (여기서 put은 넣은날짜 YYMMDD expire는 유효기간 YYMMDD)
* POST
* {
    "nickname" : 닉네임,
    "volume" : float
}
* {
    "stocks" : [방금 넣은 inventory에 저장 된 stock들의 리스트]
}
## 보관장소 수정
* /inventory/{userId}/{stockId}/{newInventoryId}
* PUT
* 없음
* {
    "stocks" : [새로 바뀐 장소의 지금까지 저장 된 stock들의 리스트]
}
## 약품 사용
* /chemical/{userId}/{stockId}/{quantity}
* PUT
* 없음
* {
    "stock" : stock 정보
}
## 약품 삭제
* /chemical/{stockId}
* DELETE
* 없음
* 없음
