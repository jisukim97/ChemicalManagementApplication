import React, { Component } from 'react';
import { Form, Icon, Input, Button, Modal, message } from 'antd';
import { Link } from "react-router-dom";
import { Typography } from 'antd';
import { getUser, getLab } from '../authentication';
import { history } from '../History';
import { serverUrl } from '../setting';
import { Alert } from 'antd';



const { Title } = Typography;

class MyGroupInvite extends Component {

  state = { visible: false };

  showModal = e => {
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

  
  

  searchMember = (email) => {
    console.log(3)
    console.log(email)
    fetch(serverUrl + '/member/' + email, {
      method: 'GET', //'GET', 'POST', 'DELETE' 등등
      headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
  }).then(response => {
      if (response.status === 200) {
        //이건 정상적으로 된 경우
        console.log(0)
        console.log(response)
        return response.json()
      } else {
        console.log('fetch error')
        message.warning('해당 이메일을 가진 사용자가 존재하지 않습니다 !');
      }
    }).then(response => {

      console.log(response) // 이걸로 개발자모드에서 어떠한 응답이 왔는지 확인 가능
      var a = response.member
      var userId = a.id
      var labId = getLab().id

      fetch(serverUrl + '/lab/' + labId + '/' + userId, {
        method: 'PUT', //'GET', 'POST', 'DELETE' 등등
        headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
      }).then(response => {
        if (response.status === 200) {
          //이건 정상적으로 된 경우
          console.log(0)
          console.log(response)
          return response.json()
        } else {
          console.log('fetch error')
          message.warning('해당 사용자는 이미 속해있는 Lab이 있습니다!');
        }
      }).then(response => {

      })

    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          //values.email
          this.searchMember(values.email)
        }
      }
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: '10px 0' }}>
        <center><Title style={{ marginBottom: 50 }}>my Lab 멤버 초대</Title></center>

        <Form onSubmit={this.handleSubmit} className="form">
          {/* 이메일 폼*/}
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '이메일을 입력 해 주세요!' }],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {/*<Link to='/login/forgot' className="login-form-forgot">Forgot password</Link>*/}
            <Button type="primary" htmlType="submit" className="button">
              초대
            </Button>
            
          </Form.Item>
        </Form>

                
               
               
               
               
                
                
                {/* 
                <Form.Item>
                    {getFieldDecorator('memberName', {
                        rules: [{ required: true, message: '초대할 멤버 이메일을 입력해 주세요!' }],
                    })(
                        <Input
                            //prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Member Email"
                        />,
                    )}
                </Form.Item>
<<<<<<< HEAD
                */}
=======

                {/* 초대하기 버튼 */}

                  <Button type="primary" onClick={this.show1Modal}>
                  초대하기
                  </Button>
                  <Modal
                  title="초대하기"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  >
                  <p>님을 My Lab에 초대하시겠습니까?</p>
                  </Modal>

>>>>>>> 7d49be95747ba32a0804e0b6adec650ca3313a97


            </div>
        );
    }
}

export default Form.create()(MyGroupInvite);
