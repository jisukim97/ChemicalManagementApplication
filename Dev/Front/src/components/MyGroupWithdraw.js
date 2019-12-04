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
<<<<<<< HEAD
    }).then(response => {})
  }

=======
    }).then(response => {
      //여기서 response로 온 값들을 state로 저장 하던가 해서 쓰면 됨
      //여기서 response라는걸 제대로 쓸 수 있음
      console.log(response) // 이걸로 개발자모드에서 어떠한 응답이 왔는지 확인 가능
      //예를들면
      this.setState({
        labName : getLab().name,
        labMemberCount : getLab().members.length
      })
      //이렇게 응답받은 실제 결과를 status로 저장해 줄 수 있음
    })




  }



withdrawGroup =() => {


  fetch(serverUrl + '/lab/' + getLab().id + '/' + getUser().id, { // uri 넣어주기
    method: 'DELETE', //'GET', 'POST', 'DELETE' 등등
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

    //이렇게 응답받은 실제 결과를 status로 저장해 줄 수 있음
  })
}

>>>>>>> 7d49be95747ba32a0804e0b6adec650ca3313a97
  render() {
    //const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: '10px 0' }}>
      <center><Title style={{marginBottom : 50}}>my Lab 탈퇴</Title></center>

<<<<<<< HEAD
      <br /><Text type="secondary">현재 속한 my Lab 이름 : {getLab().name} </Text>
      <br /><Text type="secondary">현재 속한 my Lab 인원수 : {this.props.count} </Text>
=======
      <br /><Text type="secondary">현재 속한 my Lab 이름 : {this.state.labName} </Text>
      <br /><Text type="secondary">현재 속한 my Lab 인원수 : {this.state.labMemberCount} </Text>
>>>>>>> 7d49be95747ba32a0804e0b6adec650ca3313a97

      <br />

      <Button type="primary" onClick={this.showModal}>
      탈퇴하기
      </Button>
      <Modal
      title="탈퇴하기"
      visible={this.state.visible}
<<<<<<< HEAD
      onOk={this.handleOk} 
=======
      onOk={this.handleOk, this.withdrawGroup} 
>>>>>>> 7d49be95747ba32a0804e0b6adec650ca3313a97
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
