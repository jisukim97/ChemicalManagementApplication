import React, { Component } from 'react';
import { Form, Input, Button, Modal } from 'antd';
//import { Link } from "react-router-dom";
import { Typography } from 'antd';

//import { history } from '../History';
//import { serverUrl } from '../setting';

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

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div style={{ margin: '10px 0' }}>
            <center><Title style={{marginBottom : 50}}>my Lab 멤버 초대</Title></center>


                {/* 그룹 이름 */}
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



            </div>
        );
    }
}

export default Form.create()(MyGroupInvite);
