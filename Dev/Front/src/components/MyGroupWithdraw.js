import React, { Component } from 'react';
import { Modal, Form, Button, Icon } from 'antd';
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
      <center><Title style={{marginBottom : 30}}><font size='6' font color='black'>my Lab 탈퇴</font></Title></center>

      <font size='4' font color='green'>현재 속한 my Lab 이름 :  
      </font><font size='3' font color='black'> {getLab().name} </font>
      <br /><br/><font size='4' font color='green'>현재 속한 my Lab 인원 수 :  
      </font><font size='3' font color='black'> {this.props.count}명 </font>

      <br />
      <br />
      <br />

      <Button type="primary" onClick={this.showModal}>
      탈퇴하기
      </Button>
      <Icon type="rocket" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: 33 }} onClick={this.showModal} />
      <Modal
      title="탈퇴하기"
      visible={this.state.visible}
      onOk={this.handleOk} 
      onCancel={this.handleCancel}
      >
      <p><font size='3' font color='black'>정말 탈퇴하시겠습니까?</font></p>
      <p><font size='2' font color='black'>(탈퇴 시 기기 예약, 알림 등의 정보가 모두 삭제 됩니다!)</font></p>

      </Modal>

      </div>
    );
  }
}

export default Form.create()(MyGroupWithdraw);
