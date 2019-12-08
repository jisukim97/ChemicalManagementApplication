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
  }
  

  render() {
    return (
      <div>
      {/* 약품 목록에서 각각 하나의 원소에 대한 Chemical 클래스 */}
      <center><font size='5' font color='black'>my Lab 이름 : <b>{getLab().name}</b></font></center>
      <center><Title style={{marginBottom : 25}}><font size='4' font color='black'>멤버들</font></Title></center>
      <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={this.props.members}
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
