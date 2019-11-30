import React, { Component } from 'react';
import { Form } from 'antd';
import { Link } from "react-router-dom";
import { List, Typography} from 'antd';

import Member from './Member';
import { getUser, getLab } from '../authentication';
import { serverUrl } from '../setting'



const { Title } = Typography;

class MyGroupMember extends Component {

  state = {
    members : [
      {
        id : 0, 
        name : "정영모"
      },
      {
        id : 1,
        name : "이한빈"
      },
      {
        id : 2,
        name : "김지수"
      },
      {
        id : 3,
        name : "이은무"
      },
      {
        id : 4,
        name : "문혁주"
      },
      {
        id : 5,
        name : "강주영"
      }
    ]
  }

  constructor(props){
    super(props);
    fetch(serverUrl + '/lab/' + getLab().id, {
      method: 'GET', //'GET', 'POST', 'DELETE' 등등
      headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
  }).then(response => {
      if (response.status === 200) {
        //이건 정상적으로 된 경우
        console.log(0)
        console.log(response)
        return response.json()
      } else {
        //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
      }
    }).then(response => {
      //여기서 response로 온 값들을 state로 저장 하던가 해서 쓰면 됨
      //여기서 response라는걸 제대로 쓸 수 있음
      console.log(111)
      console.log(getLab().id)
      console.log(response) // 이걸로 개발자모드에서 어떠한 응답이 왔는지 확인 가능
      var get = response.lab
      var members = []
      for (var i=0 ; i<get.members.length; i++){
        var a = {
          id : get.members[i].id,
          name : get.members[i].name
        }
        members.push(a)
      }

      console.log(222)
      console.log(members)
      this.setState({
        members: members

      })
      //이렇게 응답받은 실제 결과를 status로 저장해 줄 수 있음
    })
  }
  

  render() {
    return (
      <div>
      {/* 약품 목록에서 각각 하나의 원소에 대한 Chemical 클래스 */}
      <br/>
      <center><Title style={{marginBottom : 50}}>Lab Members</Title></center>
      <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={this.state.members}
      renderItem={item => (
        <List.Item>
        <Member members={item}/>
        </List.Item>
      )}
      />
      </div>
    );
  }

}

export default Form.create()(MyGroupMember);
