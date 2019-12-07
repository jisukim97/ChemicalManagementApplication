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
      <div style = {{marginLeft : 105}}><font size='5' font color='black'>{getLab().name}</font></div>
      <center><Title style={{marginBottom : 35}}><font size='6' font color='black'>Lab Members</font></Title></center>
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
