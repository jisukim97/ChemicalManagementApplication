import React, { Component } from 'react';
import { Typography, Row, Col, Button, Card } from 'antd'

import MyGroupGenerate from './MyGroupGenerate';
import MyGroupInvite from './MyGroupInvite';
import MyGroupRegister from './MyGroupRegister';
import MyGroupWithdraw from './MyGroupWithdraw';
import MyGroupMember from './MyGroupMember';
import NoGroup from './NoGroup';

import { history } from '../History';
import { getUser, getLab } from '../authentication';
import { serverUrl } from '../setting'

const { Title } = Typography;

class MyGroup extends Component {

  state = {

  }

  constructor(props){
    super(props);
    this.state = {
      menu : 0,
      labexists : getLab() === null ? false : true,
      // false 도 테스트해보기
      // 속한 lab이 없을 때, labid = 0
      
    }
  }

//그룹 생성하고 나서 정보 새로고침 해주
  afterGroupGenerate = (id) => {
    console.log(12345)
    console.log(id)
    this.setState( {
      menu : 0,
      labid : id,
      labexists : id === null ? false : true
    })
  }

  firstButtonClick = () => {
    this.setState( {
      menu : 1
    })
  }

  secondButtonClick = () => {
    this.setState( {
      menu : 2
    })
  }

  thirdButtonClick = () => {
    this.setState( {
      menu : 3
    })
  }

  fourthButtonClick = () => {
    this.setState( {
      menu : 4
    })
  }

  enrollLab = (id) => {
    this.setState({labId : id,
      labexists : true})
    }

    withdrawLab = () => {
      this.setState({labId : 0,
        labexists : false})
  }

      getContent = () => {
        if (!this.state.labexists && this.state.menu === 1){
          return (
            <div>
            <MyGroupGenerate afterGroupGenerate={this.afterGroupGenerate}/>
            </div>
          )
        } else if (this.state.labexists && this.state.menu === 2){
          return (
            <div>
            <MyGroupInvite />
            </div>
          )
        } else if (!this.state.labexists && this.state.menu === 3){
          return (
            <div>
            <MyGroupRegister enrollLab={this.enrollLab}/>
            </div>
          )
        } else if (this.state.labexists && this.state.menu === 4){
          return (
            <div>
            <MyGroupWithdraw withdrawLab={this.withdrawLab}/>
            </div>
          )
        } else {
          if (this.state.labexists) {
            return (
              <div>
              <MyGroupMember members={this.state.members}/>
              </div>
            )
          }
          else {
            return(
              <div>
              <NoGroup />
              </div>
            )
          }
        }
      }

      render() {
        return (
          <div>
          <br />
          <center><Title style={{ marginBottom: 50 }}>MyGroup</Title></center>

          {/* 버튼 4개 */}
          <Row style={{margin : 20}}>
          <Col span={12}><center><Button type="primary" onClick={this.firstButtonClick}>my Lab 생성</Button></center></Col>
          <Col span={12}><center><Button type="primary" onClick={this.secondButtonClick} >멤버 초대</Button></center></Col>
          </Row>

          <Row style={{margin : 20}}>
          <Col span={12}><center><Button type="primary" onClick={this.thirdButtonClick} >Lab 가입 신청</Button></center></Col>
          <Col span={12}><center><Button type="primary" onClick={this.fourthButtonClick} >my Lab 탈퇴</Button></center></Col>
          </Row>

          {/* 내용 */}
          <div>
          <Card style={{margin : 20}}>
          {this.getContent()}
          </Card>
          </div>

          </div>
        );
      }
    }

    export default MyGroup;
