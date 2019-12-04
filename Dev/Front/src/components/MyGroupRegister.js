import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Modal } from 'antd';
import { Link } from "react-router-dom";
import { Typography } from 'antd';
import { getUser, getLab } from '../authentication';
import { history } from '../History';
import { serverUrl } from '../setting';
import { login } from '../authentication';

const { Title } = Typography;

class MyGroupRegister extends Component {

  state = { visible: false };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        const registInformation = {
          name: values.groupName,
          password: values.password,
        }
        fetch(serverUrl + '/lab/' + getUser().id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registInformation)
        }).then(response => {
          if (response.status === 200) {
            //가입이 성공적으로 수행 되었을 경우
            message.success('그룹의 맴버가 되신 것을 환영합니다!');
            console.log(response + 11)
            localStorage.setItem('lab', JSON.stringify(response.lab));
            this.props.afterGroupGenerate(getUser().id);
          } 
          else if (response.status === 400) {
            //그룹 이름이 없을 경우
            message.warning('그룹 이름이 존재하지 않습니다!');
          }
          else {
            //패스워드가 틀릴 경우
            message.warning('패스워드가 올바르지 않습니다!');
          }
        })
      } else {
      }
    });
  };

  //비밀번호 검증 과정인데 따로 규칙 지정 안했으므로 항상 true
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    form.validateFields(['confirm'], { force: true });
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="form">

        {/* 이름 */}
        <Form.Item>
          {getFieldDecorator('groupName', {
            rules: [{ required: true, message: '그룹 이름을 입력해 주세요!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Group Name"
            />,
          )}
        </Form.Item>

        {/* 비밀번호 */}
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true, message: '비밀번호를 입력 해 주세요!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Group Password" />)}
        </Form.Item>

        {/* 가입 버튼 */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="button">
            가입 신청
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(MyGroupRegister);
