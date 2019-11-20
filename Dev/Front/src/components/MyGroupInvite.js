import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
//import { Link } from "react-router-dom";
import { Typography } from 'antd';

//import { history } from '../History';
//import { serverUrl } from '../setting';

const { Title } = Typography;

class MyGroupInvite extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div style={{ margin: '10px 0' }}>
            <center><Title style={{marginBottom : 50}}>my Lab 멤버 초대</Title></center>
            <Form onSubmit={this.handleSubmit} className="form">

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
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="button">
                        초대하기
                    </Button>
                </Form.Item>
            </Form>
            </div>
        );
    }
}

export default Form.create()(MyGroupInvite);
