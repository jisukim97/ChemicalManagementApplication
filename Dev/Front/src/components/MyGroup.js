import React, { Component } from 'react';
import { Typography, Row, Col, Button, Card, Icon, message } from 'antd'

import MyGroupGenerate from './MyGroupGenerate';
import MyGroupInvite from './MyGroupInvite';
import MyGroupRegister from './MyGroupRegister';
import MyGroupWithdraw from './MyGroupWithdraw';
import MyGroupMember from './MyGroupMember';
import NoGroup from './NoGroup';
import MenuTitle from './MenuTitle';

import { history } from '../History';
import { getUser, getLab } from '../authentication';
import { serverUrl } from '../setting'

const { Title } = Typography;

class MyGroup extends Component {



  constructor(props) {
    super(props);
    this.state = {
      menu: 0,
      labexists: getLab() === null ? false : true,
      // false 도 테스트해보기
      // 속한 lab이 없을 때, labid = 0
      members: []


    }
    if (getLab() !== null) {
      this.getGroupMembers()
    }
  }

  getGroupMembers = () => {
    fetch(serverUrl + '/lab/' + getLab().id, {
      method: 'GET', //'GET', 'POST', 'DELETE' 등등
      headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
    }).then(response => {
      if (response.status === 200) {
        //이건 정상적으로 된 경우
        response.json().then(response => {
          console.log(response) // 이걸로 개발자모드에서 어떠한 응답이 왔는지 확인 가능
          var get = response.lab
          var members = []
          for (var i = 0; i < get.members.length; i++) {
            var a = {
              id: get.members[i].id,
              name: get.members[i].name
            }
            members.push(a)
          }

          this.setState({
            members: members

          })

        })
      } else {
        //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
      }
    }).then(response => { })
  }

  //그룹 생성하고 나서 정보 새로고침 해주
  afterGroupGenerate = (id) => {
    console.log(id)
    this.setState({
      menu: 0,
      labexists: id === null ? false : true
    })
    this.getGroupMembers()
  }

  afterGroupWithdraw = () => {
    console.log(333)
    this.setState({
      menu: 0,
      labexists: false
    })
    //this.getGroupMembers()
  }


  firstButtonClick = () => {
    this.setState({
      menu: 1
    })
  }

  firstButtonClick2 = () => {
    this.setState({
      menu: 1
    })
    message.warning('이미 가입된 my Lab이 있습니다!')
    this.getGroupMembers()
  }

  secondButtonClick = () => {
    this.setState({
      menu: 2
    })
  }

  thirdButtonClick = () => {
    this.setState({
      menu: 3
    })
  }

  thirdButtonClick2 = () => {
    this.setState({
      menu: 3
    })
    message.warning('이미 가입된 my Lab이 있습니다!')
    this.getGroupMembers()
  }

  fourthButtonClick = () => {
    this.setState({
      menu: 4
    })
    if (getLab() !== null) {
      this.getGroupMembers()
    }
  }

  enrollLab = (id) => {
    this.setState({
      labId: id,
      labexists: true
    })
  }

  withdrawLab = () => {
    this.setState({
      labId: 0,
      labexists: false
    })
  }

  getContent = () => {
    if (!this.state.labexists && this.state.menu === 1) {
      return (
        <div>
          <MyGroupGenerate afterGroupGenerate={this.afterGroupGenerate} />
        </div>
      )
    } else if (this.state.labexists && this.state.menu === 2) {
      return (
        <div>
          <MyGroupInvite />
        </div>
      )
    } else if (!this.state.labexists && this.state.menu === 3) {
      return (
        <div>
          <MyGroupRegister enrollLab={this.enrollLab} afterGroupGenerate={this.afterGroupGenerate} />
        </div>
      )
    } else if (this.state.labexists && this.state.menu === 4) {
      return (
        <div>
          <MyGroupWithdraw afterGroupWithdraw={this.afterGroupWithdraw} count={this.state.members.length} />
        </div>
      )
    } else {
      if (this.state.labexists) {
        return (
          <div>
            <MyGroupMember members={this.state.members} />
          </div>
        )
      }
      else {
        return (
          <div>
            <NoGroup />
          </div>
        )
      }
    }
  }

  render() {
    if (getLab() === null) {
      return (
        <div>

          <MenuTitle title="my Lab" />
          <div style={{ paddingTop: 20 }}>

            {/* 버튼 4개 */}
            <Row style={{ margin: 20 }}>
              <Col span={12}><center><Button style={{ width: 140 }} type="primary" onClick={this.firstButtonClick}>my Lab 생성<Icon type="contacts" style={{ size: 4 }} /></Button></center></Col>
              <Col span={12}><center><Button style={{ width: 140 }} type="primary" onClick={this.secondButtonClick} >멤버 초대 <Icon type="user-add" style={{ size: 3 }} /></Button></center></Col>
            </Row>

            <Row style={{ margin: 20 }}>
              <Col span={12}><center><Button style={{ width: 140 }} type="primary" onClick={this.thirdButtonClick} >my Lab 가입 신청</Button></center></Col>
              <Col span={12}><center><Button style={{ width: 140 }} type="primary" onClick={this.fourthButtonClick} >my Lab 탈퇴<Icon type="rocket" style={{ size: 3 }} /></Button></center></Col>
            </Row>

            {/* 내용 */}
            <div>
              <Card style={{ margin: 20 }}>
                {this.getContent()}
              </Card>
            </div>

          </div>
        </div>

      );
    }
    else {
      return (
        <div>

          <MenuTitle title="my Lab" />
          <div style={{ paddingTop: 20 }}>

            {/* 버튼 4개 */}
            <Row style={{ margin: 20 }}>
              <Col span={12}><center><Button style={{ width: 140 }} type="primary" onClick={this.firstButtonClick2}>my Lab 생성<Icon type="contacts" style={{ size: 4 }} /></Button></center></Col>
              <Col span={12}><center><Button style={{ width: 140 }} type="primary" onClick={this.secondButtonClick} >멤버 초대<Icon type="user-add" style={{ size: 3 }} /></Button></center></Col>
            </Row>

            <Row style={{ margin: 20 }}>
              <Col span={12}><center><Button style={{ width: 140 }} type="primary" onClick={this.thirdButtonClick2} >my Lab 가입 신청</Button></center></Col>
              <Col span={12}><center><Button style={{ width: 140 }} type="primary" onClick={this.fourthButtonClick} >my Lab 탈퇴<Icon type="rocket" style={{ size: 3 }} /></Button></center></Col>
            </Row>

            {/* 내용 */}
            <div>
              <Card style={{ margin: 20 }}>
                {this.getContent()}
              </Card>
            </div>
          </div>

        </div>
      );
    }
  }
}

export default MyGroup;
