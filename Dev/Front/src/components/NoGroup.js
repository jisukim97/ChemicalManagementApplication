import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from "react-router-dom";
import { Typography } from 'antd';

import { history } from '../History';
import { serverUrl } from '../setting';

const { Title } = Typography;
const { Text } = Typography;

class MyGroupWithdraw extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <center>
      <font size='2' font color='green'>현재 속해있는 my Lab이 없습니다!</font></center>
      </div>
    );
  }
}

export default Form.create()(MyGroupWithdraw);
