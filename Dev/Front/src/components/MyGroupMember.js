import React, { Component } from 'react';
import { Form } from 'antd';
import { Link } from "react-router-dom";
import { List, Typography} from 'antd';

import Member from './Member';


const { Title } = Typography;

class MyGroupMember extends Component {

  state = {
    members : [
      {
        name : "정영모"
      },
      {
        name : "이한빈"
      },
      {
        name : "김지수"
      },
      {
        name : "이은무"
      },
      {
        name : "문혁주"
      },
      {
        name : "강주영"
      }
    ]
  }

  constructor(props){
    super(props);

    fetch( ).

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
