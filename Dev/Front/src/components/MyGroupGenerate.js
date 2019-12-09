import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from "react-router-dom";
import { Typography } from 'antd';
import { history } from '../History';
import { getUser, getLab } from '../authentication';
import { serverUrl } from '../setting'

const { Title } = Typography;

class MyGroupGenerate extends Component {

  constructor(props){
    super(props);
  }

  //그룹 생성 버튼 클릭했을 때
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(222222);
      if (!err) {
        //그룹 생성 정보
        console.log(values)
        const registInformation = {
          name: values.groupName,
          password: values.groupPassword,
        }
        console.log(registInformation)
        //http요청
        fetch(serverUrl + '/lab/' + getUser().id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registInformation)
        }).then(response => {
          if (response.status === 200) {
            //그룹 생성이 성공적으로 수행 되었을 경우
            message.success('그룹이 생성되었습니다!');
            response.json().then(response => {
              console.log(555)
              localStorage.setItem('lab', JSON.stringify(response.lab));
              this.props.afterGroupGenerate(getLab().id);

            })
          }
          else {
            message.warning('중복된 my Lab 이름이 존재합니다!');
          }

        })
      } else {
        //비밀번호 틀렸을 경우
      }
    });
  };

  //비밀번호 두개 일치하는지 확인
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('groupPassword')) {
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
      <div>
      <center><font size='4' >my Lab 생성<span> </span> <Icon type="contacts"style={{size: 4}} /></font></center><br/>
      <Form onSubmit={this.handleSubmit} className="form">

      {/* 그룹 이름 */}
      <Form.Item>
      {getFieldDecorator('groupName', {
        rules: [{ required: true, message: '그룹 이름을 입력해 주세요!' }],
      })(
        <Input
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="my Lab Name"
        />,
      )}
      </Form.Item>

      {/* 그룹 비밀번호1 */}
      <Form.Item hasFeedback>
      {getFieldDecorator('groupPassword', {
        rules: [
          {
            required: true,
            message: '비밀번호를 입력해 주세요!',
          },
          {
            validator: this.validateToNextPassword,
          },
        ],
      })(<Input.Password
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="my Lab Password" />)}
        </Form.Item>

        {/* 비밀번호2 */}
        <Form.Item hasFeedback>
        {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: '비밀번호를 다시 한번 입력해 주세요!',
            },
            {
              validator: this.compareToFirstPassword,
            },
          ],
        })(<Input.Password
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Confirm my Lab Password"
          onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          {/* 그룹 생성 버튼 */}
          <Form.Item>
            <center>
          <Button type="primary" htmlType="submit" className="button" style={{width: 80}}>
          생성하기
          </Button>
          </center>
          </Form.Item>

          </Form>

          </div>
        );
      }
    }

    export default Form.create()(MyGroupGenerate);
