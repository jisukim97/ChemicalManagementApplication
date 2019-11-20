import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from "react-router-dom";
import { Typography } from 'antd';

import { history } from '../History';
import { serverUrl } from '../setting';
import { login } from '../authentication';

const { Title } = Typography;

class MyGroupRegister extends Component {

  //로그인 정보 입력 하고 로그인 버튼 눌렀을 때
  handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if (!err) {
              //요청 양식은 이미 values에 동일하게 맞춰져 있는 상태이므로
              //따로 가공해줄 필요 없이 바로 http 요청을 보낸다
              console.log(values)
              fetch(serverUrl + '/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(values)
              })
                  .then(response => {
                      const result = response.status;
                      if (result === 200) {
                          //로그인이 성공하였을 경우
                          response.json().then(response => {
                              //로컬스토리지에 토큰 및 로그인 정보 저장
                              login(response)
                              console.log(response)
                              message.success(response.user.name + '그룹 가입에 성공하였습니다!');
                              history.push("/main")
                          })
                      } else if (result === 401) {
                          //비밀번호 불일치 혹은 이메일이 등록되지 않았음
                          message.error('그룹 가입 신청에 실패하였습니다. 그룹 이름 혹은 그룹 비밀번호를 다시 확인해 주세요.');
                          console.log("fail!")
                      } else {
                          //내부 오류
                      }
                  })
          }
      });
  };



  render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <center><Title style={{marginBottom : 50}}>Lab 가입 신청</Title></center>
          <Form onSubmit={this.handleSubmit} className="form">
              {/* 이메일 폼*/}
              <Form.Item>
                  {getFieldDecorator('LabName', {
                      rules: [{ required: true, message: 'Lab 이름을 입력해 주세요!' }],
                  })(
                      <Input
                          //prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="Lab Name"
                      />,
                  )}
              </Form.Item>

              {/* 비밀번호 폼*/}
              <Form.Item>
                  {getFieldDecorator('password', {
                      rules: [{ required: true, message: '그룹 비밀번호를 입력해 주세요!' }],
                  })(
                      <Input
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          type="Group Password"
                          placeholder="Group Password"
                      />,
                  )}
              </Form.Item>

              {/* 비밀번호 잃어버림, 로그인, 가입 버튼*/}
              <Form.Item>
                  {/*<Link to='/login/forgot' className="login-form-forgot">Forgot password</Link>*/}
                  <Button type="primary" htmlType="submit" className="button">
                      가입 신청
                  </Button>
              </Form.Item>

          </Form>
        </div>
      );
  }
}

export default Form.create()(MyGroupRegister);
