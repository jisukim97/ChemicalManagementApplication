import React, { Component } from 'react';
import { Modal, Form, Button } from 'antd';
import { Typography } from 'antd';
import { history } from '../History';
import { getUser, getLab } from '../authentication';
import { serverUrl } from '../setting'

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
    this.withdrawGroup();
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  constructor(props) {
    super(props);

  }


  withdrawGroup = () => {

    fetch(serverUrl + '/lab/' + getLab().id + '/' + getUser().id, { // uri 넣어주기
      method: 'DELETE', //'GET', 'POST', 'DELETE' 등등
      headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
    }).then(response => {
      if (response.status === 200) {
        console.log(11112222)
        localStorage.removeItem('lab')
        this.props.afterGroupWithdraw()

      } else {
        //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
      }
    }).then(response => {})
  }

  render() {
    //const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: '10px 0' }}>
      <center><Title style={{marginBottom : 50}}>my Lab 탈퇴</Title></center>

      <br /><Text type="secondary">현재 속한 my Lab 이름 : {getLab().name} </Text>
      <br /><Text type="secondary">현재 속한 my Lab 인원수 : {this.props.count} </Text>

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
      <p>{this.state.labName} 에서 정말 탈퇴 하시겠습니까?</p>
      <p>(탈퇴시, 기기 예약, 알림 등의 정보가 모두 삭제 됩니다.)</p>

      </Modal>

      </div>
    );
  }
}

export default Form.create()(MyGroupWithdraw);
