import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { Text } = Typography;

class MyGroupWithdraw extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div style={{ margin: '10px 0' }}>
            <center><Title style={{marginBottom : 50}}>my Lab 탈퇴</Title></center>

                <br /><Text type="secondary">현재 속한 my Lab 이름 : </Text>
                <br /><Text type="secondary">현재 속한 my Lab 인원수 : </Text>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="button">
                        탙퇴하기
                    </Button>
                </Form.Item>

            </div>
        );
    }
}

export default Form.create()(MyGroupWithdraw);
