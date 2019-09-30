import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from "react-router-dom";

import { history } from '../History';
import { login } from '../authentication';
import { serverUrl } from '../setting'

class Login extends Component {

    //로그인 정보 입력 하고 로그인 버튼 눌렀을 때
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //요청 양식은 이미 values에 동일하게 맞춰져 있는 상태이므로
                //따로 가공해줄 필요 없이 바로 http 요청 을 보낸다
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
                                message.success(response.user.name + '님 환영합니다!');
                                history.push("/main")
                            })
                        } else if (result === 401) {
                            //비밀번호 불일치 혹은 이메일이 등록되지 않았음
                            message.error('로그인에 실패 하였습니다. 이메일 혹은 비밀번호를 다시 확인 해 주세요.');
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

                {/* 비밀번호 폼*/}
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '비밀번호를 입력 해 주세요!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>

                {/* 비밀번호 잃어버림, 로그인, 가입 버튼*/}
                <Form.Item>
                    {/*<Link to='/login/forgot' className="login-form-forgot">Forgot password</Link>*/}
                    <Button type="primary" htmlType="submit" className="button">
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>

            </Form>
        );
    }
}

export default Form.create()(Login);
