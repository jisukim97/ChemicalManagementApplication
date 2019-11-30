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
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  constructor(props) {
    super(props);

    fetch(serverUrl + '/lab/' + getLab().id, { // uri 넣어주기
      method: 'GET', //'GET', 'POST', 'DELETE' 등등
      headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
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
        labName : getLab().name,
        labMemberCount : (getLab().members).length
      })
      //이렇게 응답받은 실제 결과를 status로 저장해 줄 수 있음
    })


  }





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
