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
      <br/>
      <center><Title style={{marginBottom : 50}}>Lab Members</Title></center>
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
