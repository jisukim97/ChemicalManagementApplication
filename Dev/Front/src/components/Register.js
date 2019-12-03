import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from "react-router-dom";

import { history } from '../History';
import { serverUrl } from '../setting'

class Register extends Component {

    //회원가입 버튼 클릭했을 때
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //회원 가입 정보
                const registInformation = {
                    email : values.email,
                    name : values.username,
                    password : values.password,
                }
                //http요청
                fetch(serverUrl + '/regist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(registInformation)
                }).then(response => {
                    if (response.status === 200) {
                        //가입이 성공적으로 수행 되었을 경우
                        message.success('회원이 되신 것을 환영합니다!');
                        history.push("/login")
                    } else {
                        //요청 오류 발생
                        message.error('같은 이메일을 사용하는 사용자가 이미 존재합니다!');
                    }
                })
            } else {
                //비밀번호 틀렸을 경우
                message.error('두 비밀번호가 같은지 확인 해 주세요!');
            }
        });
    };

    //비밀번호 두개 일치하는지 확인
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('두 비밀번호가 일치하지 않습니다!');
        } else {
            callback();
        }
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

                {/* 이메일 */}
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: '이메일 주소를 입력 해 주세요!' }],
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email Address"
                        />,
                    )}
                </Form.Item>

                {/* 이름 */}
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '이름을 입력 해 주세요!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>

                {/* 비밀번호1 */}
                <Form.Item hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '비밀번호를 입력 해 주세요!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Password" />)}
                </Form.Item>

                {/* 비밀번호2 */}
                <Form.Item hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '비밀번호를 다시 한번 입력 해 주세요!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Confirm password"
                        onBlur={this.handleConfirmBlur} />)}
                </Form.Item>

                {/* 회원가입 버튼 */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="button">
                        Register Now!
                    </Button>
                    Or <Link to="/login">login now!</Link>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(Register);
