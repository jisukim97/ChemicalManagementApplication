import React, { Component } from 'react';
import { Modal, Form, Button } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { Text } = Typography;

class MyGroupWithdraw extends Component {

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: '10px 0' }}>
      <center><Title style={{marginBottom : 50}}>my Lab 탈퇴</Title></center>

      <br /><Text type="secondary">현재 속한 my Lab 이름 : </Text>
      <br /><Text type="secondary">현재 속한 my Lab 인원수 : </Text>

      <br />

      <Button type="primary" onClick={this.showModal}>
      탈퇴하기
      </Button>
      <Modal
      title="탈퇴하기"
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      >
      <p>에서 정말 탈퇴 하시겠습니까?</p>
      <p>(탈퇴시, 기기 예약, 알림 등의 정보가 모두 삭제 됩니다.)</p>

      </Modal>

      </div>
    );
  }
}

export default Form.create()(MyGroupWithdraw);
